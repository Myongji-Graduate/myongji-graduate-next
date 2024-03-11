'use server';

import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { z } from 'zod';
import { API_PATH } from '../api-path';
import { SignUpRequestBody } from './user.type';

// message name은 logic 구현할 때 통일할 예정
const SignUpFormSchema = z
  .object({
    authId: z
      .string()
      .min(6, {
        message: 'User ID must be at least 6 characters',
      })
      .max(20, {
        message: 'User ID must be at most 20 characters',
      }),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!^%*#?&])[A-Za-z\d@$!^%*#?&]{8,}$/, {
      message: 'Password must contain at least 8 characters, one letter, one number and one special character',
    }),
    confirmPassword: z.string(),
    studentNumber: z.string().length(8, { message: '학번은 8자리 입니다' }).startsWith('60', {
      message: '학번은 60으로 시작합니다',
    }),
    engLv: z.enum(['basic', 'level12', 'level34', 'bypass']),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
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
      message: 'error',
    };
  }

  const { authId, password, studentNumber, engLv } = validatedFields.data;
  const body: SignUpRequestBody = {
    authId,
    password,
    studentNumber,
    engLv,
  };

  // Call the API to create a user
  // but now mock the response
  await fetch(`${API_PATH.user}/sign-up`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return {
    isFailure: true,
    validationError: {},
    message: '이미 존재하는 계정입니다.',
  };
}
