'use server';

import { cookies } from 'next/headers';

export const getToken = (): string | undefined => {
  return cookies().get('accessToken')?.value;
};
