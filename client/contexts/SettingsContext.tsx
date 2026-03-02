import React, { createContext, useContext } from 'react';
import { useSettings } from '@/hooks/use-settings';
import { ParsedSettings } from '@shared/types';

interface SettingsContextType {
  settings: ParsedSettings | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, loading, error, refetch } = useSettings();

  return (
    <SettingsContext.Provider value={{ settings, loading, error, refetch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within SettingsProvider');
  }
  return context;
};
