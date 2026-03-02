import { useEffect } from 'react';
import { useSettingsContext } from '@/contexts/SettingsContext';

export const ThemeApplier = () => {
  const { settings } = useSettingsContext();

  useEffect(() => {
    if (!settings?.global) return;

    const root = document.documentElement;
    const globalSettings = settings.global;

    // Apply colors as CSS variables
    if (globalSettings.primary_color) {
      root.style.setProperty('--primary-color', globalSettings.primary_color);
    }
    if (globalSettings.secondary_color) {
      root.style.setProperty('--secondary-color', globalSettings.secondary_color);
    }
    if (globalSettings.text_color) {
      root.style.setProperty('--text-color', globalSettings.text_color);
    }

    // Apply background
    if (globalSettings.bg_type === 'color' && globalSettings.bg_color) {
      document.body.style.backgroundColor = globalSettings.bg_color;
    } else if (globalSettings.bg_type === 'image' && globalSettings.bg_image) {
      document.body.style.backgroundImage = `url(${globalSettings.bg_image})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundAttachment = 'fixed';
    }
  }, [settings]);

  return null;
};
