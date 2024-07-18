'use server';

import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { API_PATH } from '../../api-path';
import {
  SignUpRequestBody,
  SignInRequestBody,
  ValidateTokenResponse,
  UserDeleteRequestBody,
  ResetPasswordRequestBody,
} from './user.type';
import { httpErrorHandler } from '@/app/utils/http/http-error-handler';
import { BadRequestError, UnauthorizedError } from '@/app/utils/http/http-error';
import {
  SignUpFormSchema,
  SignInFormSchema,
  SignInResponseSchema,
  ValidateTokenResponseSchema,
  ResetPasswordFormSchema,
} from './user.validation';
import { cookies } from 'next/headers';
import { isValidation } from '@/app/utils/zod/validation.util';
import { redirect } from 'next/navigation';
import { auth } from './user.query';

function deleteCookies() {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
}

export async function signOut() {
  deleteCookies();

  redirect('/sign-in');
}

export async function deleteUser(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const body: UserDeleteRequestBody = {
      password: formData.get('password') as string,
    };

    const response = await fetch(`${API_PATH.user}/me`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      body: JSON.stringify(body),
    });

    if (response.status !== 200) {
      const result = await response.json();
      httpErrorHandler(response, result);
    }
  } catch (error) {
    console.log(error);
    if (error instanceof BadRequestError) {
      // 잘못된 요청 처리 로직
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: error.message,
      };
    } else {
      // 나머지 에러는 더 상위 수준에서 처리
      throw error;
    }
  }
  deleteCookies();
  redirect('/sign-in');
}

export async function authenticate(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = SignInFormSchema.safeParse({
    authId: formData.get('authId'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: validatedFields.error.flatten().fieldErrors,
      message: '양식에 맞춰 다시 입력해주세요.',
    };
  }

  const body: SignInRequestBody = {
    ...validatedFields.data,
  };

  try {
    const response = await fetch(`${API_PATH.auth}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    httpErrorHandler(response, result);

    if (isValidation(result, SignInResponseSchema)) {
      cookies().set('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      cookies().set('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
    }
  } catch (error) {
    // 명세와 다르게 에러가 발생할 경우 BadRequestError가 아니라 UnauthorizedError가 발생
    if (error instanceof UnauthorizedError) {
      // 잘못된 요청 처리 로직
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: error.message,
      };
    } else {
      // 나머지 에러는 더 상위 수준에서 처리
      throw error;
    }
  }

  redirect('/my');
}

export async function refreshToken(): Promise<ValidateTokenResponse | false> {
  const refreshToken = cookies().get('refreshToken')?.value;
  try {
    const response = await fetch(`${API_PATH.auth}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await response.json();

    httpErrorHandler(response, result);

    if (isValidation(result, ValidateTokenResponseSchema)) {
      return result;
    } else {
      throw 'Invalid token response schema.';
    }
  } catch (error) {
    if (error instanceof BadRequestError) {
      return false;
    } else {
      throw error;
    }
  }
}

export async function createUser(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = SignUpFormSchema.safeParse({
    authId: formData.get('authId'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    studentNumber: formData.get('studentNumber'),
    engLv: formData.get('engLv'),
  });

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: validatedFields.error.flatten().fieldErrors,
      message: '양식에 맞춰 다시 입력해주세요.',
    };
  }

  const { authId, password, studentNumber, engLv } = validatedFields.data;
  const body: SignUpRequestBody = {
    authId,
    password,
    studentNumber,
    engLv,
  };

  try {
    const response = await fetch(`${API_PATH.user}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status !== 200) {
      const result = await response.json();
      httpErrorHandler(response, result);
    }
  } catch (error) {
    if (error instanceof BadRequestError) {
      // 잘못된 요청 처리 로직
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: error.message,
      };
    } else {
      // 나머지 에러는 더 상위 수준에서 처리
      throw error;
    }
  }

  return {
    isSuccess: true,
    isFailure: false,
    validationError: {},
    message: '회원가입이 완료되었습니다.',
  };
}

export async function resetPassword(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = ResetPasswordFormSchema.safeParse({
    authId: formData.get('authId'),
    newPassword: formData.get('newPassword'),
    passwordCheck: formData.get('passwordCheck'),
  });
  if (!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: validatedFields.error.flatten().fieldErrors,
      message: '양식에 맞춰 다시 입력해주세요.',
    };
  }
  const { newPassword, passwordCheck, authId } = validatedFields.data;
  const body: ResetPasswordRequestBody = {
    authId,
    newPassword,
    passwordCheck,
  };
  try {
    const response = await fetch(`${API_PATH.user}/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: '',
    };
  } catch (error) {
    if (error instanceof BadRequestError) {
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: '비밀번호 변경에 실패했습니다.',
      };
    } else {
      throw error;
    }
  }
}
