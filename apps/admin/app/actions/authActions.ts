'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, createSessionToken, getSessionPayload, type SessionRole } from '@/lib/auth-crypto';

interface AppUser {
  username: string;
  password: string;
  role: SessionRole;
}

/**
 * Loads allowed users purely from environment variables.
 * NO hardcoded fallback usernames, passwords, or mock values.
 */
function getAppUsers(): AppUser[] {
  const users: AppUser[] = [];

  const adminUser = process.env.ADMIN_USERNAME?.trim().toLowerCase();
  const adminPass = process.env.ADMIN_PASSWORD?.trim();
  if (adminUser && adminPass) {
    users.push({ username: adminUser, password: adminPass, role: 'SuperAdmin' });
  }

  const op1User = process.env.OPERATOR1_USERNAME?.trim().toLowerCase();
  const op1Pass = process.env.OPERATOR1_PASSWORD?.trim();
  if (op1User && op1Pass) {
    users.push({ username: op1User, password: op1Pass, role: 'Operator' });
  }

  const op2User = process.env.OPERATOR2_USERNAME?.trim().toLowerCase();
  const op2Pass = process.env.OPERATOR2_PASSWORD?.trim();
  if (op2User && op2Pass) {
    users.push({ username: op2User, password: op2Pass, role: 'Operator' });
  }

  return users;
}

export async function loginAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const inputUsername = formData.get('username')?.toString().trim().toLowerCase();
  const inputPassword = formData.get('password')?.toString().trim();

  if (!inputUsername || !inputPassword) {
    return { success: false, error: 'Username and password are required.' };
  }

  const appUsers = getAppUsers();
  if (appUsers.length === 0) {
    return { 
      success: false, 
      error: 'Authentication is not configured. Please define valid user credentials in environment variables.' 
    };
  }

  // Strict credentials matching - NO hardcoded fallback or master passwords
  const matchedUser = appUsers.find(
    (u) => u.username === inputUsername && u.password === inputPassword
  );

  if (!matchedUser) {
    return { 
      success: false, 
      error: 'Invalid username or password. Please try again.' 
    };
  }

  // Generate cryptographically signed HMAC-SHA256 session token with embedded role
  const sessionToken = await createSessionToken(matchedUser.username, matchedUser.role);

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, sessionToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true };
}

export async function getCurrentUserAction(): Promise<{ username: string; role: SessionRole } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const payload = await getSessionPayload(token);
  if (!payload) return null;
  return { username: payload.user, role: payload.role };
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect('/login');
}
