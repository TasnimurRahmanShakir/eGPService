import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'e-GP Tender BD | Professional e-GP Registration, Preparation & Submission Support',
  description: 'Expert guidance for Bangladesh government electronic procurement (e-GP). We simplify e-GP registration, BOQ preparation, document compliance, and error-free tender submission. Make every submission count.',
  keywords: [
    'e-GP Bangladesh',
    'e-GP tender support',
    'e-GP registration BD',
    'BOQ preparation',
    'tender submission service Dhaka',
    'e-GP consulting Bangladesh',
    'CPTU tender help'
  ],
  authors: [{ name: 'e-GP Tender BD' }],
  metadataBase: new URL('https://egptenderbd.com')
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#006A4E'
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
