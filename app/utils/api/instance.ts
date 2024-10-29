import { cookies } from 'next/headers';
import { fetchAxErrorHandler } from '../http/http-error-handler';
import fetchAX from 'fetch-ax';

export const instance = fetchAX.create({
  headers: {
    'Content-Type': 'application/json',
  },
  responseRejectedInterceptor: (error) => {
    fetchAxErrorHandler(error);
  },
  requestInterceptor: (config) => {
    const accessToken = cookies().get('accessToken')?.value;

    if (accessToken) {
      config.headers = new Headers(config.headers);
      config.headers?.set('Authorization', `Bearer ${accessToken}`);
    }
    return config;
  },
});
