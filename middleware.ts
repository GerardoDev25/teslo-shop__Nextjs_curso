import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const address = '/checkout/address';
  const summary = '/checkout/summary';

  const token = request.cookies.get('token')?.value || '';

  if (
    request.nextUrl.pathname.startsWith(address) ||
    request.nextUrl.pathname.startsWith(summary)
  ) {
    return token
      ? NextResponse.next()
      : NextResponse.rewrite(
          new URL(`/auth/login?p=${request.nextUrl.pathname}`, request.url)
        );
  }
}
