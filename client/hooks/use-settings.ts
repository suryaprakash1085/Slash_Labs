import { useState, useEffect, useCallback } from 'react';
import { SettingsResponse, ParsedSettings, Setting } from '@shared/types';

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL || 'http://localhost:9005';

export const useSettings = () => {
  const [settings, setSettings] = useState<ParsedSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const parseSettings = useCallback((data: Setting[]): ParsedSettings => {
    const parsed: ParsedSettings = {
      global: {},
      home: {},
      about: {},
    };

    data.forEach((item) => {
      const page = item.page_name || 'global';
      if (!parsed[page]) {
        parsed[page] = {};
      }

      // Try to parse JSON values
      let value: any = item.value;
      try {
        value = JSON.parse(item.value);
      } catch {
        // Keep as string if not valid JSON
      }

      parsed[page][item.key] = value;
    });

    return parsed;
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/settings`);
      if (!response.ok) {
        throw new Error(`Failed to fetch settings: ${response.statusText}`);
      }
      
      const data: SettingsResponse = await response.json();
      if (data.success) {
        const parsedSettings = parseSettings(data.data);
        setSettings(parsedSettings);
      } else {
        throw new Error('API returned unsuccessful response');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  }, [parseSettings]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    error,
    refetch: fetchSettings,
  };
};
