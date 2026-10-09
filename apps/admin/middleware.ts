import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME, verifySessionToken } from './lib/auth-crypto';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve and cryptographically verify session token with HMAC-SHA256 signature
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = await verifySessionToken(sessionCookie);

  // If accessing the login page
  if (pathname === '/login') {
    // If already authenticated, redirect straight to the dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // If unauthenticated or token is tampered/expired on any other admin route, redirect immediately to /login
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    if (pathname !== '/') {
      loginUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all admin portal pages, blocking manual URL navigation when unauthenticated.
     * Exclude Next.js internal static assets and metadata files.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
