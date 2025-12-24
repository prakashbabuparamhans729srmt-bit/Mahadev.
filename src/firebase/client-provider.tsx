'use client';

import React from 'react';
import { FirebaseProvider } from './provider';

/**
 * A client component wrapper around FirebaseProvider.
 * This ensures that the FirebaseProvider and its initialization logic
 * only run on the client-side, preventing SSR issues.
 */
export const FirebaseClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <FirebaseProvider>{children}</FirebaseProvider>;
};
