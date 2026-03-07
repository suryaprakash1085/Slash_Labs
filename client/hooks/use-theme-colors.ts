import { useSettingsContext } from '@/contexts/SettingsContext';

export const useThemeColors = () => {
  const { settings } = useSettingsContext();
  const globalSettings = settings?.global || {};

  return {
    primaryColor: globalSettings.primary_color || '#1e4a94',
    secondaryColor: globalSettings.secondary_color || '#53548d',
    textColor: globalSettings.text_color || '#1f4db7',
    bgColor: globalSettings.bg_color || '#ffffff',
    bgType: globalSettings.bg_type || 'color',
    bgImage: globalSettings.bg_image,
  };
};
