'use client';

import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { HelpAssistant } from '@/components/help-assistant';
import { CookieConsent } from '@/components/cookie-consent';
import dynamic from 'next/dynamic';

const SentryProvider = dynamic(() => import('./sentry-provider'), { ssr: false });

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
      </head>
      <body>
        <SentryProvider>
            <FirebaseClientProvider>{children}</FirebaseClientProvider>
        </SentryProvider>
        <Toaster />
        <HelpAssistant />
        <CookieConsent />
      </body>
    </html>
  );
}
