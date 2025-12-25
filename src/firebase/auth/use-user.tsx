'use client';

import { useContext } from 'react';
import { FirebaseContext, FirebaseContextState } from '@/firebase/provider';

/**
 * Interface for the user authentication state.
 */
interface UserAuthState {
  user: FirebaseContextState['user'];
  isUserLoading: FirebaseContextState['isUserLoading'];
  userError: FirebaseContextState['userError'];
}

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
