import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './app/business/services/user/user.query';
import { isExpiredGradeUser, isInitUser } from './app/business/services/user/user.validation';
import { refreshToken } from './app/business/services/user/user.command';

async function getAuth(request: NextRequest): Promise<{
  role: 'guest' | 'expired' | 'user' | 'init';
}> {
  const accessToken = request.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return {
      role: 'guest',
    };
  }

  const user = await auth();

  if (!user) {
    return {
      role: 'expired',
    };
  }

  return {
    role: isInitUser(user) || isExpiredGradeUser(user) ? 'init' : 'user',
  };
}

const allowedOnlyGuestPath = ['/sign-in', '/sign-up', '/find-password', '/find-id'];
const allowedGuestPath = ['/', '/tutorial', ...allowedOnlyGuestPath];
const allowInitUserPath = ['/', '/tutorial', '/grade-upload'];

function isAllowedGuestPath(path: string, strict: boolean = false) {
  const allowedPath = strict ? allowedOnlyGuestPath : allowedGuestPath;

  return allowedPath.some((allowedPath) => path === allowedPath);
}

export async function middleware(request: NextRequest) {
  const auth = await getAuth(request);

  if (auth.role === 'expired') {
    return await retryAuth(request);
  }

  if (auth.role === 'guest' && !isAllowedGuestPath(request.nextUrl.pathname)) {
    return Response.redirect(new URL('/sign-in', request.url));
  }

  if (auth.role !== 'guest' && isAllowedGuestPath(request.nextUrl.pathname, true)) {
    return Response.redirect(new URL('/my', request.url));
  }

  if (auth.role === 'init' && !allowInitUserPath.some((path) => request.nextUrl.pathname === path)) {
    return Response.redirect(new URL('/grade-upload', request.url));
  }

  if (auth.role === 'user' && request.nextUrl.pathname === '/') {
    return Response.redirect(new URL('/my', request.url));
  }
}

async function retryAuth(request: NextRequest) {
  const response = NextResponse.redirect(request.url);
  const result = await refreshToken();
  if (result === false) {
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
  } else {
    response.cookies.set('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
  }
  return response;
}

export const config = {
  matcher: ['/((?!api|robots|sitemap|mockServiceWorker|_next/static|_next/image|.*\\.png$).*)'],
};
