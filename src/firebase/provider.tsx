'use client';

import React, { createContext, ReactNode, useMemo, useState, useEffect, useContext } from 'react';
import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, getAuth } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { firebaseConfig } from './config';

// --- STATE AND CONTEXT DEFINITION ---

export interface FirebaseContextState {
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);


// --- INITIALIZATION LOGIC ---

function getFirebaseServices() {
  if (typeof window === 'undefined') {
    return { firebaseApp: null, firestore: null, auth: null };
  }
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const authInstance = getAuth(app);
  const firestoreInstance = getFirestore(app);
  return { firebaseApp: app, firestore: firestoreInstance, auth: authInstance };
}


// --- PROVIDER COMPONENT ---

export const FirebaseProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
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
    return () => unsubscribe();
  }, [services.auth]);

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


// --- HOOKS ---

/**
 * Custom hook to access the entire Firebase context state.
 * Throws an error if used outside of a FirebaseProvider.
 * @returns {FirebaseContextState} The full state of the Firebase context.
 */
export const useFirebase = (): FirebaseContextState => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }
  return context;
};

/** Hook to access Firebase Auth instance. */
export const useAuth = (): Auth | null => {
  return useFirebase().auth;
};

/** Hook to access Firestore instance. */
export const useFirestore = (): Firestore | null => {
  return useFirebase().firestore;
};

/** Hook to access Firebase App instance. */
export const useFirebaseApp = (): FirebaseApp | null => {
  return useFirebase().firebaseApp;
};

/**
 * Hook specifically for accessing the authenticated user's state.
 * This provides the User object, loading status, and any auth errors.
 * @returns {UserAuthState} Object with user, isUserLoading, userError.
 */
export const useUser = () => {
  const { user, isUserLoading, userError } = useFirebase();
  return { user, isUserLoading, userError };
};
