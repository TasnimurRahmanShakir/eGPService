import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'eGP Solution - Next-Gen Electronic Government & Enterprise Procurement Platform',
  description: 'Enterprise e-procurement suite engineered for transparent bidding, automated compliance scoring, encrypted tender management, and real-time vendor verification.',
  keywords: ['e-procurement', 'government tenders', 'turborepo', 'nextjs', 'procurement automation', 'vendor evaluation']
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#060913'
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
        <div className="bg-mesh" aria-hidden="true" />
        <div className="bg-grid-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
