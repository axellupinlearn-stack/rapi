import { createHash, createHmac, timingSafeEqual } from 'crypto';
import type { NextRequest } from 'next/server';
import { STUDIO_USERS } from './auth';
import type { User, UserRole } from './types';

export const SESSION_COOKIE_NAME = 'rapivoire_auth_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

const ACCOUNT_ENV: Record<UserRole, { email: string; password: string }> = {
  admin: { email: 'RAP_ADMIN_EMAIL', password: 'RAP_ADMIN_PASSWORD' },
  editor: { email: 'RAP_EDITOR_EMAIL', password: 'RAP_EDITOR_PASSWORD' },
  contributor: { email: 'RAP_CONTRIBUTOR_EMAIL', password: 'RAP_CONTRIBUTOR_PASSWORD' },
};

interface SessionPayload {
  email: string;
  role: UserRole;
  expiresAt: number;
}

function getSessionSecret(): string | null {
  const secret = process.env.RAP_SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

function getConfiguredAccount(role: UserRole): { email: string; password: string } | null {
  const variables = ACCOUNT_ENV[role];
  const email = process.env[variables.email]?.trim();
  const password = process.env[variables.password];
  if (!email || !password || password.length < 12 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }
  return { email, password };
}

export function isAuthConfigured(): boolean {
  return Boolean(getSessionSecret() && getConfiguredAccount('admin'));
}

function safeEqual(left: string, right: string): boolean {
  const leftHash = createHash('sha256').update(left).digest();
  const rightHash = createHash('sha256').update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

function makeUser(role: UserRole, email: string): User {
  return { ...STUDIO_USERS[role], email };
}

export function authenticateCredentials(email: string, password: string): User | null {
  if (!isAuthConfigured()) return null;

  for (const role of Object.keys(ACCOUNT_ENV) as UserRole[]) {
    const account = getConfiguredAccount(role);
    if (
      account &&
      safeEqual(email.trim().toLowerCase(), account.email.toLowerCase()) &&
      safeEqual(password, account.password)
    ) {
      return makeUser(role, account.email);
    }
  }
  return null;
}

export function createSessionToken(user: User): string {
  const secret = getSessionSecret();
  if (!secret) throw new Error('Studio authentication is not configured.');

  const payload: SessionPayload = {
    email: user.email,
    role: user.role,
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', secret).update(encodedPayload).digest('base64url');
  return `${encodedPayload}.${signature}`;
}

export function getAuthenticatedUser(request: NextRequest): User | null {
  if (!isAuthConfigured()) return null;

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const [encodedPayload, signature, extra] = token.split('.');
  if (!encodedPayload || !signature || extra) return null;

  const secret = getSessionSecret();
  if (!secret) return null;
  const expected = createHmac('sha256', secret).update(encodedPayload).digest();
  let received: Buffer;
  try {
    received = Buffer.from(signature, 'base64url');
  } catch {
    return null;
  }
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as SessionPayload;
    if (
      !payload ||
      typeof payload.email !== 'string' ||
      !Object.prototype.hasOwnProperty.call(ACCOUNT_ENV, payload.role) ||
      typeof payload.expiresAt !== 'number' ||
      payload.expiresAt <= Date.now()
    ) {
      return null;
    }

    const account = getConfiguredAccount(payload.role);
    if (!account || !safeEqual(payload.email.toLowerCase(), account.email.toLowerCase())) return null;
    return makeUser(payload.role, account.email);
  } catch {
    return null;
  }
}
