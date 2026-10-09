
"use client";

import {createContext,useCallback,useContext,useEffect,useState,} from "react";

import { DEFAULT_SETTINGS } from "@/lib/settings-defaults";

const SettingsContext = createContext(null);

const cloneDefaults = () =>
  JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

function mergeSettings(received = {}) {
  const defaults = cloneDefaults();

  return {
    ...defaults,
    ...received,

    store: {
      ...defaults.store,
      ...(received.store || {}),
    },

    appearance: {
      ...defaults.appearance,
      ...(received.appearance || {}),
    },

    notifications: {
      ...defaults.notifications,
      ...(received.notifications || {}),
    },

    commerce: {
      ...defaults.commerce,
      ...(received.commerce || {}),
      payments: {
        ...defaults.commerce.payments,
        ...(received.commerce?.payments || {}),
      },
    },

    security: {
      ...defaults.security,
      ...(received.security || {}),
    },
  };
}

export function SettingsProvider({ children }) {

  const [settings, setSettings] = useState(cloneDefaults);
  const [loading] = useState(false);
  
  const refreshSettings = useCallback(async () => {
    return settings;
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    const appearance = settings.appearance || {};

    const language = appearance.language === "fa" ? "fa" : "en";
    const direction = "ltr";

    root.lang = language;
    root.dir = direction;

    root.dataset.language = language;
    root.dataset.theme = appearance.theme || "dark";
    root.dataset.compact = String(
      Boolean(appearance.compactMode)
    );

    const media = window.matchMedia(
      "(prefers-color-scheme: light)"
    );

    const applySystemTheme = () => {
      if (appearance.theme === "system") {
        root.dataset.resolvedTheme = media.matches
          ? "light"
          : "dark";
      } else {
        root.dataset.resolvedTheme =
          appearance.theme || "dark";
      }
    };

    applySystemTheme();

    if (appearance.theme === "system") {
      media.addEventListener("change", applySystemTheme);

      return () => {
        media.removeEventListener(
          "change",
          applySystemTheme
        );
      };
    }
  }, [settings.appearance]);

   const updateSettings = useCallback((changes) => {
    setSettings((current) =>
      mergeSettings({
        ...current,
        ...changes,

        appearance: {
          ...current.appearance,
          ...(changes.appearance || {}),
        },

        store: {
          ...current.store,
          ...(changes.store || {}),
        },

        notifications: {
          ...current.notifications,
          ...(changes.notifications || {}),
        },

        commerce: {
          ...current.commerce,
          ...(changes.commerce || {}),
          payments: {
            ...current.commerce.payments,
            ...(changes.commerce?.payments || {}),
          },
        },

        security: {
          ...current.security,
          ...(changes.security || {}),
        },
      })
    );
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        updateSettings,
        loading,
        refreshSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useStoreSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useStoreSettings must be used inside SettingsProvider"
    );
  }

  return context;
}
