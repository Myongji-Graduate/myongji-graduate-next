import fetchAx, { FetchAxError } from 'fetch-ax';
import { cookies } from 'next/headers';
import { fetchAxErrorHandler } from '../http/http-error-handler';

export const instance = fetchAx.create({
  headers: {
    'Content-Type': 'application/json',
  },
  responseRejectedInterceptor: (error) => {
    fetchAxErrorHandler(error);
  },
  requestInterceptor: (config) => {
    const accessToken = cookies().get('accessToken')?.value;
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
});
