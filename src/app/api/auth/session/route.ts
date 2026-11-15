import { NextRequest, NextResponse } from 'next/server';
import {
  getAuthenticatedUser,
  isAuthConfigured,
  SESSION_COOKIE_NAME,
} from '@/lib/server-auth';

export async function GET(request: NextRequest) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json(
      { success: false, configured: isAuthConfigured() },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }
  return NextResponse.json(
    { success: true, user },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
