'use client';

import React, { createContext, ReactNode, useState, useEffect, useContext, useMemo } from 'react';
import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { Firestore, initializeFirestore, persistentLocalCache, getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, getAuth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { firebaseConfig } from './config';

// --- SINGLE INITIALIZATION ---
// This logic now runs only once per application lifecycle.
let firebaseApp: FirebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApp();
}

const auth: Auth = getAuth(firebaseApp);
const storage: FirebaseStorage = getStorage(firebaseApp);

let firestore: Firestore;
try {
    // getFirestore will throw if it's not initialized.
    firestore = getFirestore(firebaseApp);
} catch (e) {
    // If it fails, initialize it. This handles the initial setup.
    try {
        firestore = initializeFirestore(firebaseApp, {
            localCache: persistentLocalCache({})
        });
    } catch (err: any) {
        if (err.code === 'failed-precondition') {
            console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.");
        } else if (err.code === 'unimplemented') {
            console.warn("The current browser does not support all of the features required to enable persistence.");
        }
        // Fallback to in-memory persistence if offline fails
        firestore = initializeFirestore(firebaseApp, {});
    }
}

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    try {
        initializeAppCheck(firebaseApp, {
            provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
            isTokenAutoRefreshEnabled: true
        });
    } catch (e) {
        console.warn("App Check already initialized or failed to initialize.");
    }
}

// --- STATE AND CONTEXT DEFINITION ---

export interface FirebaseContextState {
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
  storage: FirebaseStorage | null;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

// --- PROVIDER COMPONENT ---

export const FirebaseProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [userAuthState, setUserAuthState] = useState<{
    user: User | null;
    isUserLoading: boolean;
    userError: Error | null;
  }>({
    user: null,
    isUserLoading: true,
    userError: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          // User is signed in, ensure a client doc exists for them.
          // This is crucial for users signing in with social providers for the first time.
          const clientRef = doc(firestore, 'clients', firebaseUser.uid);
          const clientSnap = await getDoc(clientRef);

          if (!clientSnap.exists()) {
            const [firstName, ...lastNameParts] = (firebaseUser.displayName || '').split(' ');
            const lastName = lastNameParts.join(' ');
            
            try {
              await setDoc(clientRef, {
                id: firebaseUser.uid,
                email: firebaseUser.email,
                firstName: firstName || '',
                lastName: lastName || '',
                phone: firebaseUser.phoneNumber || '',
                companyName: '',
                referredBy: '',
              }, { merge: true });
            } catch (error) {
              console.error("FirebaseProvider: Failed to create client document for new user:", error);
            }
          }
        }
        // Finally, update the auth state for the rest of the app
        setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => {
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );
    return () => unsubscribe();
  }, []);

  const contextValue = useMemo((): FirebaseContextState => ({
    firebaseApp,
    firestore,
    auth,
    storage,
    ...userAuthState,
  }), [userAuthState]);

  return (
    <FirebaseContext.Provider value={contextValue}>
        <FirebaseErrorListener />
        {children}
    </FirebaseContext.Provider>
  );
};
