import { z } from 'zod';
import { UserInfoResponse, InitUserInfoResponse } from './user.type';

// 동기화
export const UserInfoResponseSchema = z.object({
  studentNumber: z.string(),
  studentName: z.string(),
  completeDivision: z.array(
    z.object({
      majorType: z.enum(['PRIMARY', 'DUAL', 'SUB']),
      major: z.string(),
    }),
  ),
  totalCredit: z.number(),
  takenCredit: z.number(),
  graduated: z.boolean(),
});

// 동기화
export const InitUserInfoResponseSchema = z.object({
  studentNumber: z.string(),
  studentName: z.null(),
  completeDivision: z.string().array(),
  totalCredit: z.number(),
  takenCredit: z.number(),
  graduated: z.boolean(),
});

export const ValidateTokenResponseSchema = z.object({
  accessToken: z.string(),
});

// 동기화
export const SignInFormSchema = z.object({
  authId: z.string(),
  password: z.string(),
});

// 동기화
export const SignInResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

// 동기화
export const SignUpFormSchema = z
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
    engLv: z.enum(['BASIC', 'ENG12', 'ENG34', 'FREE'], {
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

export function isInitUser(x: UserInfoResponse | InitUserInfoResponse): x is InitUserInfoResponse {
  return x.studentName === null;
}
