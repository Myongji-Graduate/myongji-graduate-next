import fetchAx, { FetchAxError } from 'fetch-ax';
import { fetchAxErrorHandler } from './http-error-handler';
import { cookies } from 'next/headers';

export const instance = fetchAx.create({
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${cookies().get('accessToken')?.value}`, 서버라서 안되지 않을까? 공유 인스턴스 처럼.. 근데 그러면 기존에는 어캐 디는거야>
  },
  responseRejectedInterceptor: (error) => {
    fetchAxErrorHandler(error);
  },
  requestInterceptor: (config) => {
    const accessToken = cookies().get('accessToken')?.value;
    // if (accessToken) {
    //   config.headers;
    // }
    console.log(accessToken);
    return config;
  },
});
