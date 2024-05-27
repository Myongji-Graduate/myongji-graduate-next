import type { NextRequest } from 'next/server';
import { validateToken } from './app/business/user/user.command';
import { fetchUserInfo } from './app/business/user/user.query';

async function getAuth(request: NextRequest): Promise<{
  role: 'guest' | 'user' | 'init';
}> {
  const accessToken = request.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return {
      role: 'guest',
    };
  }

  const validatedResult = await validateToken();

  if (!validatedResult) {
    request.cookies.delete('accessToken');
    request.cookies.delete('refreshToken');
    return {
      role: 'guest',
    };
  }

  request.cookies.set('accessToken', validatedResult.accessToken);

  const user = await fetchUserInfo();
  return {
    role: user.studentName ? 'user' : 'init',
  };
}

const allowdGuestPath = ['/tutorial', '/sign-in', '/sign-up', '/find-password', '/find-id'];

function isAllowedGuestPath(path: string) {
  if (path === '/') {
    return true;
  }

  return allowdGuestPath.some((allowedPath) => path.startsWith(allowedPath));
}

export async function middleware(request: NextRequest) {
  const isAuth = request.nextUrl.searchParams.get('isAuth');

  // 개발용이성을 위해 isAuth=true 일 때만 동작
  const auth = await getAuth(request);
  if (auth.role === 'init' && !request.nextUrl.pathname.startsWith('/grade-upload')) {
    return Response.redirect(new URL('/grade-upload', request.url));
  }

  if (auth.role === 'guest' && !isAllowedGuestPath(request.nextUrl.pathname)) {
    return Response.redirect(new URL('/sign-in', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|mockServiceWorker|_next/static|_next/image|.*\\.png$).*)'],
};
