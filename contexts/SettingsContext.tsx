"use client";

import { createContext, useContext, ReactNode } from "react";

interface Settings {
  [key: string]: string;
}

interface SettingsContextType {
  settings: Settings;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({
  children,
  initialSettings,
}: {
  children: ReactNode;
  initialSettings: Settings;
}) {
  return (
    <SettingsContext.Provider value={{ settings: initialSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
} 