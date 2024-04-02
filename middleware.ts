import type { NextRequest } from 'next/server';
import { validateToken } from './app/business/user/user.command';
import { getUserInfo } from './app/business/user/user.query';

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

  // 유저 정보 요청
  const user = await getUserInfo();
  return {
    role: user.isSumbitted ? 'user' : 'init',
  };
}

const allowdGuestPath = ['/tutorial', '/sign-in', '/sign-up', '/find-password', '/find-id'];

function isAllowedGuestPath(path: string) {
  return allowdGuestPath.some((allowedPath) => path.startsWith(allowedPath));
}

export async function middleware(request: NextRequest) {
  const auth = await getAuth(request);

  if (auth.role === 'init' && !request.nextUrl.pathname.startsWith('/grade-upload')) {
    return Response.redirect(new URL('/grade-upload', request.url));
  }

  if (auth.role === 'guest' && !isAllowedGuestPath(request.nextUrl.pathname)) {
    return Response.redirect(new URL('/sign-in', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
