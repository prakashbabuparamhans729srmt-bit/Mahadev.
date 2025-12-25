
"use client";

import { useState, useEffect, useCallback } from 'react';

const NOTIFICATION_SETTINGS_KEY = 'hghub-notification-settings';

export interface NotificationPreferences {
  channels: {
    email: boolean;
    push: boolean;
  };
  detailed: {
    newMessages: boolean;
    projectUpdates: boolean;
    fileUploads: boolean;
    invoices: boolean;
    promotions: boolean;
  };
}

const defaultPreferences: NotificationPreferences = {
  channels: {
    email: true,
    push: false,
  },
  detailed: {
    newMessages: true,
    projectUpdates: true,
    fileUploads: true,
    invoices: true,
    promotions: false,
  },
};

export function useNotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);

  useEffect(() => {
    try {
      const storedPrefs = localStorage.getItem(NOTIFICATION_SETTINGS_KEY);
      if (storedPrefs) {
        const parsed = JSON.parse(storedPrefs);
        setPreferences(parsed);
      }
    } catch (error) {
      console.error("Failed to parse notification settings from localStorage", error);
    }
  }, []);

  const setPreference = useCallback(<T extends keyof NotificationPreferences, K extends keyof NotificationPreferences[T]>(
    category: T,
    key: K,
    value: NotificationPreferences[T][K]
  ) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  }, []);
  
  const savePreferences = useCallback(() => {
    try {
      localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error("Failed to save notification settings to localStorage", error);
    }
  }, [preferences]);

  return {
    preferences,
    setPreference,
    savePreferences,
  };
}
