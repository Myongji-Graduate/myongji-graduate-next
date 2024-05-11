// https://stackoverflow.com/questions/76957592/error-only-async-functions-are-allowed-to-be-exported-in-a-use-server-file
// server action 파일에서는 async function만 export 가능

import {
  InitUserInfoResponseSchema,
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

export type SignInResponse = z.infer<typeof SignInResponseSchema>;

export type UserInfoResponse = z.infer<typeof UserInfoResponseSchema>;
export type InitUserInfoResponse = z.infer<typeof InitUserInfoResponseSchema>;

export type ValidateTokenResponse = z.infer<typeof ValidateTokenResponseSchema>;
