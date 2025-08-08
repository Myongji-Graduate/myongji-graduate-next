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
import { fetchAxErrorHandler, httpErrorHandler } from '@/app/utils/http/http-error-handler';
import { BadRequestError, UnauthorizedError } from '@/app/utils/http/http-error';
import {
  SignUpFormSchema,
  SignInFormSchema,
  SignInResponseSchema,
  ValidateTokenResponseSchema,
  ResetPasswordFormSchema,
  isExpiredGradeUser,
} from './user.validation';
import { cookies } from 'next/headers';
import { isValidation } from '@/app/utils/zod/validation.util';
import { redirect } from 'next/navigation';
import { fetchUser } from './user.query';
import fetchAX from 'fetch-ax';
import { instance } from '@/app/utils/api/instance';

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

    await instance.post(`${API_PATH.user}/me/withdraw`, body);
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
  deleteCookies();

  return {
    isSuccess: true,
    isFailure: false,
    validationError: {},
    message: '탈퇴가 완료되었습니다.',
  };
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
    const { data } = await instance.post(`${API_PATH.auth}/sign-in`, body);

    if (isValidation(data, SignInResponseSchema)) {
      cookies().set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      cookies().set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
    }
  } catch (error) {
    // 명세와 다르게 에러가 발생할 경우 BadRequestError가 아니라 UnauthorizedError가 발생
    if (error instanceof UnauthorizedError || error instanceof BadRequestError) {
      // 잘못된 요청 처리 로직
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: '아이디 또는 비밀번호가 일치하지 않습니다.',
      };
    } else {
      // 나머지 에러는 더 상위 수준에서 처리
      throw error;
    }
  }

  const user = await fetchUser();
  if (isExpiredGradeUser(user)) {
    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: '재업로드',
    };
  }
  redirect('/my');
  return {
    isSuccess: true,
    isFailure: false,
    validationError: {},
    message: '로그인 완료 완료되었습니다.',
  };
}

export async function refreshToken(): Promise<ValidateTokenResponse | false> {
  const refreshToken = cookies().get('refreshToken')?.value;
  try {
    const { data } = await fetchAX.post(
      `${API_PATH.auth}/token`,
      { refreshToken },
      {
        responseRejectedInterceptor: (error) => {
          fetchAxErrorHandler(error);
        },
      },
    );

    if (isValidation(data, ValidateTokenResponseSchema)) {
      return data;
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
    await instance.post(`${API_PATH.user}/sign-up`, body, {
      responseType: 'text',
    });
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
    await instance.patch(`${API_PATH.user}/password`, body, {
      responseType: 'text',
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
