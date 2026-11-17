import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, getSessionPayload } from './auth-crypto';
import { createApiClient } from '@egp/api-client';

/**
 * Returns an instance of ApiClient with headers set according to the current logged-in user's role.
 * SuperAdmin -> 'X-User-Role': 'SuperAdmin', 'Authorization': 'Bearer mock-admin-token'
 * Operator   -> 'X-User-Role': 'Operator', 'Authorization': 'Bearer mock-operator-token'
 */
export async function getAuthorizedApiClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const payload = await getSessionPayload(token);

  const role = payload?.role || 'SuperAdmin';
  const username = payload?.user || 'admin';

  return createApiClient(undefined, {
    'X-User-Role': role,
    'X-User-Name': username,
    'Authorization': role === 'Operator' ? 'Bearer mock-operator-token' : 'Bearer mock-admin-token',
  });
}
