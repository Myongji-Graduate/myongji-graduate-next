import type { NextRequest } from 'next/server';
import { validateToken } from './app/business/user/user.command';
import { fetchUser } from './app/business/auth';

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

  const user = await fetchUser();
  return {
    role: user.studentName ? 'user' : 'init',
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

export const config = {
  matcher: ['/((?!api|mockServiceWorker|_next/static|_next/image|.*\\.png$).*)'],
};
