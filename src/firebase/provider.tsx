'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, getAuth } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { firebaseConfig } from './config';

// Internal state for user authentication
interface UserAuthState {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// Combined state for the Firebase context
export interface FirebaseContextState extends UserAuthState {
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
}

// React Context
export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

// Moved initialization logic inside a function to be called on the client
function initializeFirebase() {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  } else {
    return getApp();
  }
}

/**
 * FirebaseProvider manages and provides Firebase services and user authentication state.
 */
export const FirebaseProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [services, setServices] = useState<{
    firebaseApp: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
  } | null>(null);

  const [userAuthState, setUserAuthState] = useState<UserAuthState>({
    user: null,
    isUserLoading: true, // Start loading until first auth event
    userError: null,
  });
  
  useEffect(() => {
    // Initialize Firebase on the client side
    const app = initializeFirebase();
    const authInstance = getAuth(app);
    const firestoreInstance = getFirestore(app);
    setServices({ firebaseApp: app, firestore: firestoreInstance, auth: authInstance });

    const unsubscribe = onAuthStateChanged(
      authInstance,
      (firebaseUser) => {
        setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => {
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );
    return () => unsubscribe();
  }, []);

  // Memoize the context value
  const contextValue = useMemo((): FirebaseContextState => ({
    firebaseApp: services?.firebaseApp || null,
    firestore: services?.firestore || null,
    auth: services?.auth || null,
    ...userAuthState
  }), [services, userAuthState]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

/** Hook to access Firebase Auth instance. */
export const useAuth = (): Auth | null => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseProvider.');
  }
  return context.auth;
};

/** Hook to access Firestore instance. */
export const useFirestore = (): Firestore | null => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirestore must be used within a FirebaseProvider.');
  }
  return context.firestore;
};

/** Hook to access Firebase App instance. */
export const useFirebaseApp = (): FirebaseApp | null => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebaseApp must be used within a FirebaseProvider.');
  }
  return context.firebaseApp;
};

/**
 * Hook specifically for accessing the authenticated user's state.
 * This provides the User object, loading status, and any auth errors.
 * @returns {UserAuthState} Object with user, isUserLoading, userError.
 */
export const useUser = (): UserAuthState => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a FirebaseProvider.");
  }
  const { user, isUserLoading, userError } = context;
  return { user, isUserLoading, userError };
};
