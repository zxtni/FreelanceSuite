import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login'];
  
  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // For API routes, allow all requests
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // For public paths, continue
  if (isPublicPath) {
    return NextResponse.next();
  }

  // For all other paths (protected), the client-side auth will handle it
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon|apple-icon).*)'],
};
