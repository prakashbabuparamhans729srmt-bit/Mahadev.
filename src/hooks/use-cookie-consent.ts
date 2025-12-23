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
      return { ...defaultPreferences, hasMadeChoice: true }; // Assume consent on server
    }
    try {
      const storedPrefs = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedPrefs) {
        const parsed = JSON.parse(storedPrefs);
        // Ensure necessary is always true and hasMadeChoice is set
        return { ...defaultPreferences, ...parsed, necessary: true, hasMadeChoice: true };
      }
    } catch (error) {
      console.error("Failed to parse cookie preferences from localStorage", error);
    }
    return defaultPreferences;
  });
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Re-evaluate on client mount
    try {
      const storedPrefs = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedPrefs) {
        const parsed = JSON.parse(storedPrefs);
        setPreferencesState({ ...defaultPreferences, ...parsed, necessary: true, hasMadeChoice: true });
      } else {
        setPreferencesState(defaultPreferences);
      }
    } catch (error) {
      console.error("Failed to parse cookie preferences on mount", error);
      setPreferencesState(defaultPreferences);
    }
  }, []);


  const setPreferences = useCallback((newPrefs: CookiePreferences) => {
    if (typeof window !== 'undefined') {
        try {
            const prefsToStore = { ...newPrefs, hasMadeChoice: true, necessary: true };
            localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefsToStore));
            setPreferencesState(prefsToStore);
        } catch (error) {
            console.error("Failed to save cookie preferences to localStorage", error);
        }
    }
  }, []);

  return {
    preferences,
    hasMadeChoice: isClient ? preferences.hasMadeChoice : true,
    setPreferences,
  };
}
