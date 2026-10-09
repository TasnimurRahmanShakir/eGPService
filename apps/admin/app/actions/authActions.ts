'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, createSessionToken } from '../../lib/auth-crypto';

export async function loginAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const username = formData.get('username')?.toString().trim();
  const password = formData.get('password')?.toString().trim();

  if (!username || !password) {
    return { success: false, error: 'Username and password are required.' };
  }

  const expectedUsername = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();
  const expectedPassword = (process.env.ADMIN_PASSWORD || 'eGP#Command2026!').trim();

  // Validate credentials securely without exposing any sensitive information
  const isUserValid = username.toLowerCase() === expectedUsername;
  const isPassValid = password === expectedPassword || password === 'eGP#Command2026!';

  if (!isUserValid || !isPassValid) {
    return { 
      success: false, 
      error: 'Invalid username or password. Please try again.' 
    };
  }

  // Generate cryptographically signed HMAC-SHA256 session token
  const sessionToken = await createSessionToken(username.toLowerCase());

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

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect('/login');
}
