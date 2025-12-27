'use client';

import { useContext } from 'react';
import { FirebaseContext, type FirebaseContextState } from './provider';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';


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
