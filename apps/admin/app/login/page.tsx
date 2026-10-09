import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth-crypto';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = await verifySessionToken(session);

  // If already authenticated, redirect straight to the dashboard
  if (isAuthenticated) {
    redirect('/');
  }

  return <LoginForm />;
}
