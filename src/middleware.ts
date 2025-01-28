import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 로그인이 필요한 페이지
const PROTECTED_ROUTES = [
  '/profile', 
  '/settings',
  '/payment',
  '/my-courses'
];

// 로그인한 사용자가 접근하면 안 되는 페이지
const AUTH_ROUTES = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 정적 리소스 제외
  if (pathname.startsWith('/_next') || pathname.startsWith('/images')) {
    return NextResponse.next();
  }

  // 인증 페이지 (로그인/회원가입) 처리
  if (AUTH_ROUTES.includes(pathname)) {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // 보호된 경로 처리
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
  


