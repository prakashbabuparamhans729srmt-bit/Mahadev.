
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
  const [preferences, setPreferencesState] = useState<CookiePreferences>(() => {
    if (typeof window === 'undefined') {
      return { ...defaultPreferences, hasMadeChoice: true }; // Assume no consent on server, banner will show on client
    }
    try {
      const storedPrefs = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedPrefs) {
        const parsed = JSON.parse(storedPrefs);
        // Ensure necessary is always true and hasMadeChoice is set from storage
        return { ...defaultPreferences, ...parsed, necessary: true };
      }
    } catch (error) {
      console.error("Failed to parse cookie preferences from localStorage", error);
    }
    return defaultPreferences;
  });
  
  const [isClient, setIsClient] = useState(false);

  // This effect ensures we only check localStorage on the client
  useEffect(() => {
    setIsClient(true);
    try {
      const storedPrefs = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedPrefs) {
        const parsed = JSON.parse(storedPrefs);
        setPreferencesState({ ...defaultPreferences, ...parsed, necessary: true });
      }
    } catch (error) {
      console.error("Failed to parse cookie preferences on mount", error);
      setPreferencesState(defaultPreferences);
    }
  }, []);


  const setPreferences = useCallback((newPrefs: Partial<CookiePreferences>) => {
    if (typeof window !== 'undefined') {
        try {
            const updatedPrefs: CookiePreferences = { ...preferences, ...newPrefs, hasMadeChoice: true, necessary: true };
            localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(updatedPrefs));
            setPreferencesState(updatedPrefs);
        } catch (error) {
            console.error("Failed to save cookie preferences to localStorage", error);
        }
    }
  }, [preferences]);

  return {
    preferences,
    hasMadeChoice: isClient ? preferences.hasMadeChoice : true, // Prevent banner flash on server render
    setPreferences,
  };
}
