// https://stackoverflow.com/questions/76957592/error-only-async-functions-are-allowed-to-be-exported-in-a-use-server-file
// server action 파일에서는 async function만 export 가능

import { Major } from '../result/result.type';
import { SignInResponseSchema, UserInfoResponseSchema, ValidateTokenResponseSchema } from './user.validation';
import z from 'zod';

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

export type SignInResponse = z.infer<typeof SignInResponseSchema>;

export type UserInfoResponse = z.infer<typeof UserInfoResponseSchema>;

export type ValidateTokenResponse = z.infer<typeof ValidateTokenResponseSchema>;

export interface MockUser {
  authId: string;
  password: string;
  studentNumber: string;
  engLv: string;
}

export interface User {
  studentNumber: string;
  studentName: string;
  completionDivision: Major[];
  totalCredit: number;
  takenCredit: number;
  graduated: boolean;
}

export interface Init {
  studentNumber: string;
  studentName: null;
  completionDivision: null;
  totalCredit: null;
  takenCredit: null;
  graduated: null;
}
