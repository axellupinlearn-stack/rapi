import { NextRequest, NextResponse } from 'next/server';
import {
  authenticateCredentials,
  createSessionToken,
  isAuthConfigured,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from '@/lib/server-auth';

export async function POST(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Les accès du studio ne sont pas configurés sur ce déploiement.' },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Requête invalide.' }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== 'object' ||
    !('email' in body) ||
    !('password' in body) ||
    typeof body.email !== 'string' ||
    typeof body.password !== 'string'
  ) {
    return NextResponse.json({ success: false, error: 'Adresse e-mail et mot de passe requis.' }, { status: 400 });
  }

  const user = authenticateCredentials(body.email, body.password);
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Identifiants incorrects.' },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true, user });
  response.cookies.set(SESSION_COOKIE_NAME, createSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
