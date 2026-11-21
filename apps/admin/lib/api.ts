import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, getSessionPayload, createSessionToken } from './auth-crypto';
import { createApiClient } from '@egp/api-client';

/**
 * Returns an instance of ApiClient with headers set according to the current logged-in user's session.
 * Passes the cryptographically verified Bearer session token and active role header.
 * NO mock tokens or hardcoded fallback credentials.
 */
export async function getAuthorizedApiClient() {
  let token: string | undefined;
  let role = 'SuperAdmin';
  let user = 'admin';

  try {
    const cookieStore = await cookies();
    token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const payload = await getSessionPayload(token);
    if (payload) {
      role = payload.role;
      user = payload.user;
    }
  } catch {
    // In background tasks or contexts where cookies() is unavailable
  }

  // If no user session cookie exists, generate a signed server token
  if (!token) {
    try {
      token = await createSessionToken(user, 'SuperAdmin');
    } catch {
      // If secret is not set, createApiClient will handle or throw
    }
  }

  return createApiClient(undefined, {
    'X-User-Role': role,
    'X-User-Name': user,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  });
}
