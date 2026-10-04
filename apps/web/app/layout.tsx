import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'e-GP Tender BD | From Opportunity to Award. We Handle the Rest.',
  description: 'e-GP Tender BD is a professional tender service provider in Bangladesh, helping businesses navigate the e-GP procurement system with expertise, accuracy and commitment.',
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
  themeColor: '#05261C'
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
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
