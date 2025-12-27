'use client';

import React, { useEffect, useState } from 'react';
import { FirebaseProvider } from './provider';
import SentryProvider from '@/app/sentry-provider';
import { Toaster } from '@/components/ui/toaster';
import { HelpAssistant } from '@/components/help-assistant';
import { CookieConsent } from '@/components/cookie-consent';

// A simple hook to check if the component is running on the client
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
};

export const FirebaseClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isClient = useIsClient();

  return (
    <FirebaseProvider>
      <SentryProvider>
        {children}
        <Toaster />
        {isClient && (
          <>
            <HelpAssistant />
            <CookieConsent />
          </>
        )}
      </SentryProvider>
    </FirebaseProvider>
  );
};
