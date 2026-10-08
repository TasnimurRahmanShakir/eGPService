import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AdminSidebar } from '../components/layout/sidebar';

export const metadata: Metadata = {
  title: 'eGP Admin Command Portal',
  description: 'Enterprise Administrative Portal for eGP Client & Tender Operations',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070b16'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="admin-layout" style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#070b16' }}>
          <AdminSidebar />
          <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
