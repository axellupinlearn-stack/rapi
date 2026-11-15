import { User, UserRole } from './types';

export const STUDIO_USERS: Record<UserRole, User> = {
  admin: {
    id: 'usr_admin',
    name: 'Koffi Adams (Propriétaire)',
    email: 'admin@rapivoire.ci',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Fondateur & Directeur de la Rédaction RAP IVOIRE',
    createdAt: '2024-01-15T10:00:00Z',
  },
  editor: {
    id: 'usr_editor',
    name: 'Awa Bamba',
    email: 'redac@rapivoire.ci',
    role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    bio: 'Journaliste musique & culture',
    createdAt: '2024-02-01T12:00:00Z',
  },
  contributor: {
    id: 'usr_contrib',
    name: 'Yannick Gnahoré',
    email: 'contributeur@rapivoire.ci',
    role: 'contributor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Chroniqueur street rap',
    createdAt: '2024-03-10T15:30:00Z',
  },
};

export async function authenticate(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const result = (await response.json()) as { user?: User; error?: string };

  if (!response.ok || !result.user) {
    return {
      success: false,
      error: result.error || 'Identifiants incorrects.',
    };
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('rapivoire_user', JSON.stringify(result.user));
    window.dispatchEvent(new Event('rapivoire_user_changed'));
  }

  return { success: true, user: result.user };
}

export async function getAuthenticatedUser(): Promise<User | null> {
  const response = await fetch('/api/auth/session', { cache: 'no-store' });
  if (!response.ok) return null;

  const result = (await response.json()) as { user?: User };
  if (!result.user) return null;

  if (typeof window !== 'undefined') {
    localStorage.setItem('rapivoire_user', JSON.stringify(result.user));
    window.dispatchEvent(new Event('rapivoire_user_changed'));
  }
  return result.user;
}

export async function logout(): Promise<void> {
  try {
    const response = await fetch('/api/auth/session', { method: 'DELETE' });
    if (!response.ok) throw new Error('La déconnexion a échoué.');
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rapivoire_user');
      window.dispatchEvent(new Event('rapivoire_user_changed'));
    }
  }
}

export function getStoredUser(): User {
  if (typeof window === 'undefined') {
    return STUDIO_USERS.admin;
  }
  try {
    const saved = localStorage.getItem('rapivoire_user');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to read session:', e);
  }
  return STUDIO_USERS.admin;
}
