'use client';

import { useUser } from '@/firebase';
import type { User } from 'firebase/auth';

// This is a placeholder for a real admin check. 
// In a production app, this should be a custom claim on the Firebase user token.
const ADMIN_EMAIL = 'divyahanssuperpower@gmail.com';

/**
 * Checks if a user is an admin based on their email.
 * @param user The Firebase user object.
 * @returns boolean
 */
export const checkIsAdmin = (user: User | null): boolean => {
    if (!user) return false;
    return user.email === ADMIN_EMAIL;
}

/**
 * Hook to determine if the current user is an admin.
 * @returns An object with an `isAdmin` boolean property.
 */
export const useAdmin = () => {
    const { user } = useUser();
    return { isAdmin: checkIsAdmin(user) };
}
