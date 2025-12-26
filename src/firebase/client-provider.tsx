'use client';

import { Toaster } from '@/components/ui/toaster';
import { FirebaseProvider } from '@/firebase/provider';
import { HelpAssistant } from '@/components/help-assistant';
import { CookieConsent } from '@/components/cookie-consent';
import dynamic from 'next/dynamic';

const SentryProvider = dynamic(() => import('../app/sentry-provider'), {
  ssr: false,
});

export const FirebaseClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <FirebaseProvider>
      <SentryProvider>{children}</SentryProvider>
      <Toaster />
      <HelpAssistant />
      <CookieConsent />
    </FirebaseProvider>
  );
};
