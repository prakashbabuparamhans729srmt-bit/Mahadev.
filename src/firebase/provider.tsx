'use client';

import React, { createContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, getAuth } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { firebaseConfig } from './config';

// Combined state for the Firebase context
export interface FirebaseContextState {
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// React Context
export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

// Moved initialization logic inside a function to be called on the client
function getFirebaseServices() {
  if (typeof window === 'undefined') {
    return { firebaseApp: null, firestore: null, auth: null };
  }
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const authInstance = getAuth(app);
  const firestoreInstance = getFirestore(app);
  return { firebaseApp: app, firestore: firestoreInstance, auth: authInstance };
}

/**
 * FirebaseProvider manages and provides Firebase services and user authentication state.
 */
export const FirebaseProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // Initialize services directly. This is safe inside a 'use client' component.
  const services = useMemo(() => getFirebaseServices(), []);

  const [userAuthState, setUserAuthState] = useState<{
    user: User | null;
    isUserLoading: boolean;
    userError: Error | null;
  }>({
    user: services.auth?.currentUser ?? null,
    isUserLoading: true,
    userError: null,
  });

  useEffect(() => {
    if (!services.auth) {
        setUserAuthState({ user: null, isUserLoading: false, userError: new Error("Firebase Auth not initialized.") });
        return;
    }
    const unsubscribe = onAuthStateChanged(
      services.auth,
      (firebaseUser) => {
        setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => {
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [services.auth]);

  // Memoize the context value
  const contextValue = useMemo((): FirebaseContextState => ({
    ...services,
    ...userAuthState,
  }), [services, userAuthState]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};
