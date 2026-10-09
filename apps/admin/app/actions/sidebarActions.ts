'use server';

import { cookies } from 'next/headers';

export async function setSidebarCookie(isCollapsed: boolean) {
  const cookieStore = await cookies();
  cookieStore.set('egp-sidebar-collapsed', isCollapsed ? 'true' : 'false', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });
}
