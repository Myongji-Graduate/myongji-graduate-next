'use server';
import { cookies } from 'next/headers';

export const getToken = async (): Promise<string | undefined> => {
  return cookies().get('accessToken')?.value;
};
// server action은 async를 써야함
