import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { Toaster } from 'sonner';
import { AdminLayoutWrapper } from '../components/layout/sidebar';

export const metadata: Metadata = {
  title: 'eGP Admin Command Portal',
  description: 'Enterprise Administrative Portal for eGP Client & Tender Operations',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#059669'
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get('egp-sidebar-collapsed')?.value === 'true';

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AdminLayoutWrapper initialCollapsed={isCollapsed}>
          {children}
        </AdminLayoutWrapper>
        <Toaster richColors position="top-right" theme="light" />
      </body>
    </html>
  );
}
