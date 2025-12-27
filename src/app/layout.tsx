import type { Metadata } from 'next';
import './globals.css';
import { FirebaseProvider } from '@/firebase/provider';
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Hajaro Grahako - Digital Solutions',
  description:
    'Your trusted partner for website, mobile app, and custom software solutions. We turn your vision into powerful software.',
  manifest: '/manifest.json',
  themeColor: '#4B0082',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hajaro Grahako',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="dark">
      <head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
          `}
        </style>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <FirebaseProvider>
            {children}
        </FirebaseProvider>
      </body>
    </html>
  );
}
