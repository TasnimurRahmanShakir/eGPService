import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'e-GP Tender BD | e-GP Registration & Tender Support in Bangladesh',
  description: 'Professional e-GP registration, tender preparation, tender submission, consultancy and training support for businesses in Bangladesh.',
  keywords: [
    'e-GP registration Bangladesh',
    'e-GP tender support',
    'e-GP tender submission',
    'e-GP consultant Bangladesh',
    'tender preparation Bangladesh',
    'e-GP consultancy Dhaka',
    'tender submission service Bangladesh',
    'e-GP training Bangladesh'
  ],
  authors: [{ name: 'e-GP Tender BD' }],
  metadataBase: new URL('https://egptenderbd.com')
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#013A28'
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
        {children}
      </body>
    </html>
  );
}
