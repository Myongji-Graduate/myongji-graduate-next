import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './app/business/services/user/user.query';
import { isInitUser } from './app/business/services/user/user.validation';
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
    role: isInitUser(user) ? 'init' : 'user',
  };
}

const allowedOnlyGuestPath = ['/sign-in', '/sign-up', '/find-password', '/find-id'];
const allowedGuestPath = ['/tutorial', ...allowedOnlyGuestPath];

function isAllowedGuestPath(path: string, strict: boolean = false) {
  if (path === '/') {
    return true;
  }

  const allowedPath = strict ? allowedOnlyGuestPath : allowedGuestPath;
  return allowedPath.some((allowedPath) => path.startsWith(allowedPath));
}

export async function middleware(request: NextRequest) {
  const auth = await getAuth(request);

  if (auth.role === 'expired') {
    return await retryAuth(request);
  }

  if (auth.role === 'init' && !request.nextUrl.pathname.startsWith('/grade-upload')) {
    return Response.redirect(new URL('/grade-upload', request.url));
  }

  if (auth.role === 'guest' && !isAllowedGuestPath(request.nextUrl.pathname)) {
    return Response.redirect(new URL('/sign-in', request.url));
  }

  if (auth.role !== 'guest' && isAllowedGuestPath(request.nextUrl.pathname, true)) {
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
  matcher: ['/((?!api|mockServiceWorker|_next/static|_next/image|.*\\.png$).*)'],
};
