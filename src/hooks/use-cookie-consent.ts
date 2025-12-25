
"use client";

import { useState, useEffect, useCallback } from 'react';

const COOKIE_CONSENT_KEY = 'hghub-cookie-consent';

export interface CookiePreferences {
  hasMadeChoice: boolean;
  necessary: boolean;
  performance: boolean;
  functional: boolean;
  advertising: boolean;
}

const defaultPreferences: CookiePreferences = {
  hasMadeChoice: false,
  necessary: true,
  performance: false,
  functional: false,
  advertising: false,
};

export function useCookieConsent() {
  const [preferences, setPreferencesState] = useState<CookiePreferences>(defaultPreferences);
  const [isClient, setIsClient] = useState(false);

  // This effect runs only on the client, after the initial render.
  useEffect(() => {
    setIsClient(true); // Indicate that we are now on the client
    try {
      const storedPrefs = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedPrefs) {
        const parsed = JSON.parse(storedPrefs);
        // Ensure necessary is always true and hasMadeChoice is set from storage
        setPreferencesState({ ...defaultPreferences, ...parsed, necessary: true });
      } else {
        // If no stored preferences, ensure we are using the default state
        setPreferencesState(defaultPreferences);
      }
    } catch (error) {
      console.error("Failed to parse cookie preferences from localStorage", error);
      setPreferencesState(defaultPreferences);
    }
  }, []);


  const setPreferences = useCallback((newPrefs: Partial<CookiePreferences>) => {
    if (typeof window !== 'undefined') {
        try {
            // Start with current state in case localStorage is out of sync
            const currentPrefs = preferences;
            
            const updatedPrefs: CookiePreferences = { ...currentPrefs, ...newPrefs, hasMadeChoice: true, necessary: true };
            localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(updatedPrefs));
            setPreferencesState(updatedPrefs);
        } catch (error) {
            console.error("Failed to save cookie preferences to localStorage", error);
        }
    }
  }, [preferences]);

  return {
    preferences,
    // On the server or before the client-side effect has run, always return false.
    // This ensures consistent server and initial client renders to avoid hydration mismatches.
    // The correct value will be available after the component mounts on the client.
    hasMadeChoice: isClient ? preferences.hasMadeChoice : false,
    setPreferences,
  };
}
