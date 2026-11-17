import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, getSessionPayload } from '@/lib/auth-crypto';
import { AdminLayoutWrapper } from '@/components/layout/sidebar';

export default async function DashboardProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const payload = await getSessionPayload(session);

  // If unauthenticated, redirect to login page immediately on Node.js server
  if (!payload) {
    redirect('/login');
  }

  const isCollapsed = cookieStore.get('egp-sidebar-collapsed')?.value === 'true';

  return (
    <AdminLayoutWrapper
      initialCollapsed={isCollapsed}
      userRole={payload.role}
      username={payload.user}
    >
      {children}
    </AdminLayoutWrapper>
  );
}
