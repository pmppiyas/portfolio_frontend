import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const adminCookie = request.cookies.get('portfolio_admin_user');

  if (!adminCookie?.value) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const middleware = proxy;

export const config = {
  matcher: ['/admin/:path*'],
};
