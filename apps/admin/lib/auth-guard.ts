import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, getSessionPayload, type SessionRole, type SessionPayload } from './auth-crypto';

export async function getCurrentSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return await getSessionPayload(token);
}

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getCurrentSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

/**
 * Ensures the currently logged-in user has the SuperAdmin role.
 * If the user is an Operator, redirects them to /tenders immediately.
 */
export async function requireAdminRole(): Promise<SessionPayload> {
  const session = await requireAuth();
  if (session.role !== 'SuperAdmin') {
    redirect('/tenders');
  }
  return session;
}
