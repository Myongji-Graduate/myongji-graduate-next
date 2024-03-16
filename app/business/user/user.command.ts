'use server';

import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { z } from 'zod';
import { API_PATH } from '../api-path';
import { SignUpRequestBody } from './user.type';
import { httpErrorHandler } from '@/app/utils/http/http-error-handler';
import { BadRequestError } from '@/app/utils/http/http-error';
import { redirect } from 'next/navigation';

const SignUpFormSchema = z
  .object({
    authId: z
      .string()
      .min(6, {
        message: '아이디는 6자 이상 20자 이하여야 합니다.',
      })
      .max(20, {
        message: 'User ID must be at most 20 characters',
      }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
        message: '비밀번호는 문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.',
      })
      .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
    confirmPassword: z.string(),
    studentNumber: z.string().length(8, { message: '학번은 8자리여야 합니다.' }).startsWith('60', {
      message: '학번은 60으로 시작해야 합니다.',
    }),
    engLv: z.enum(['basic', 'ENG12', 'ENG34', 'bypass'], {
      invalid_type_error: '올바른 영어 레벨을 선택해주세요.',
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
      });
    }
  });

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
        isFailure: true,
        validationError: {},
        message: error.message,
      };
    } else {
      // 나머지 에러는 더 상위 수준에서 처리
      throw error;
    }
  }

  // 회원가입 성공 시 로그인 페이지로 이동(로그인 페이지 경로로 변경 필요)
  redirect('/login');

  // storybook test에서는 redirect가 동작하지 않으므로 임시로 성공 메시지 반환
  return {
    isFailure: false,
    validationError: {},
    message: '회원가입이 완료되었습니다.',
  };
}
