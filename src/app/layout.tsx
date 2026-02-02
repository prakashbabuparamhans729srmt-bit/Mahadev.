import type { Metadata, Viewport } from 'next';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import React from 'react';

const pt_sans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hajaro Grahako - Digital Solutions',
  description:
    'Your trusted partner for website, mobile app, and custom software solutions. We turn your vision into powerful software.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hajaro Grahako',
  },
  keywords: ["software development agency", "web development", "mobile apps", "custom software", "Hajaro Grahako", "digital solutions", "tech solutions"],
  authors: [{ name: "Hajaro Grahako" }],
};

export const viewport: Viewport = {
  themeColor: '#01091A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={`${pt_sans.variable} ${playfair_display.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
          <FirebaseClientProvider>
              {children}
          </FirebaseClientProvider>
      </body>
    </html>
  );
}
