'use server';

import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { API_PATH } from '../api-path';
import { SignUpRequestBody } from './user.type';
import { httpErrorHandler } from '@/app/utils/http/http-error-handler';
import { BadRequestError } from '@/app/utils/http/http-error';
import { SignUpFormSchema } from './user.validation';

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

    const result = await response.json();

    httpErrorHandler(response, result);
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
