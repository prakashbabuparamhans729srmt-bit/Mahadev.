import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Assume a convention where presence of a session cookie indicates authentication
  // NOTE: This is a simplified example. In a real app, you'd verify a JWT
  // or use a library like NextAuth.js to check the session's validity.
  const sessionCookie = request.cookies.get('firebase-session');

  // If the user is trying to access a protected route and has no session cookie
  if (request.nextUrl.pathname.startsWith('/dashboard') && !sessionCookie) {
    // Redirect them to the login page
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is authenticated and tries to access login/signup, redirect to dashboard
  if (sessionCookie && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
