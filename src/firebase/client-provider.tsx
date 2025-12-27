'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { FirebaseProvider } from './provider';
import { Toaster } from '@/components/ui/toaster';
import { HelpAssistant } from '@/components/help-assistant';
import { CookieConsent } from '@/components/cookie-consent';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import SentryProvider only on the client-side
const SentryProvider = dynamic(() => import('@/app/sentry-provider'), {
    ssr: false,
    loading: () => <div className="h-screen w-screen"><Skeleton className="h-full w-full" /></div>
});


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
