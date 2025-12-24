
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
    setIsClient(true);
    try {
      const storedPrefs = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedPrefs) {
        const parsed = JSON.parse(storedPrefs);
        // Ensure necessary is always true and hasMadeChoice is set from storage
        setPreferencesState({ ...defaultPreferences, ...parsed, necessary: true });
      }
    } catch (error) {
      console.error("Failed to parse cookie preferences from localStorage", error);
      setPreferencesState(defaultPreferences);
    }
  }, []);


  const setPreferences = useCallback((newPrefs: Partial<CookiePreferences>) => {
    if (typeof window !== 'undefined') {
        try {
            const currentStoredPrefs = localStorage.getItem(COOKIE_CONSENT_KEY);
            const currentPrefs = currentStoredPrefs ? JSON.parse(currentStoredPrefs) : defaultPreferences;
            
            const updatedPrefs: CookiePreferences = { ...currentPrefs, ...newPrefs, hasMadeChoice: true, necessary: true };
            localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(updatedPrefs));
            setPreferencesState(updatedPrefs);
        } catch (error) {
            console.error("Failed to save cookie preferences to localStorage", error);
        }
    }
  }, []);

  return {
    preferences,
    hasMadeChoice: isClient ? preferences.hasMadeChoice : false, // Return false on server/initial render to ensure banner shows
    setPreferences,
  };
}
