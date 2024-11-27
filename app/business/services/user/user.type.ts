// https://stackoverflow.com/questions/76957592/error-only-async-functions-are-allowed-to-be-exported-in-a-use-server-file
// server action 파일에서는 async function만 export 가능

import {
  FindIdFormSchema,
  FindIdResponseSchema,
  InitUserInfoResponseSchema,
  ResetPasswordFormSchema,
  SignInResponseSchema,
  UserInfoResponseSchema,
  ValidateTokenResponseSchema,
} from './user.validation';
import z from 'zod';

export interface SignInRequestBody {
  authId: string;
  password: string;
}

export interface SignUpRequestBody {
  authId: string;
  password: string;
  studentNumber: string;
  engLv: string;
}

export interface SignInRequestBody {
  authId: string;
  password: string;
}

export interface UserDeleteRequestBody {
  password: string;
}

export interface ResetPasswordRequestBody {
  authId: string;
  newPassword: string;
  passwordCheck: string;
}

export type SignInResponse = z.infer<typeof SignInResponseSchema>;

export type UserInfoResponse = z.infer<typeof UserInfoResponseSchema>;
export type InitUserInfoResponse = z.infer<typeof InitUserInfoResponseSchema>;

export type ValidateTokenResponse = z.infer<typeof ValidateTokenResponseSchema>;

export type FindIdResponse = z.infer<typeof FindIdResponseSchema>;
export type FindIdFormSchema = z.infer<typeof FindIdFormSchema>;
export type FindPasswordFormSchema = z.infer<typeof ResetPasswordFormSchema>;
