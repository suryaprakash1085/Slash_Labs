export interface Setting {
  id: number;
  key: string;
  value: string;
  updatedAt: string;
  page_name: string;
}

export interface SettingsResponse {
  success: boolean;
  data: Setting[];
}

export interface ParsedSettings {
  global: Record<string, any>;
  home: Record<string, any>;
  about: Record<string, any>;
  [key: string]: Record<string, any>;
}

export interface CompanyDetails {
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  company_logo: string;
  footer_text: string;
  social_facebook: string;
  social_twitter: string;
}

export interface ThemeColors {
  primary_color: string;
  secondary_color: string;
  text_color: string;
  bg_image: string;
  bg_type: string;
  bg_color: string;
}

export interface HomePageData {
  hero: {
    title: string;
    subtitle: string;
    cta_primary: string;
    cta_secondary: string;
    image: string;
  };
  home_stats: Array<{
    id: number;
    value: string;
    label: string;
    color: string;
  }>;
  features: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
  }>;
  cta_section: {
    title: string;
    description: string;
    button_text: string;
  };
}

export interface AboutPageData {
  intro_section: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  stats: Array<{
    label: string;
    value: string;
  }>;
  mission_values_culture: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  about_journey: Array<{
    year: number;
    title: string;
    description: string;
  }>;
  join_us_cta: {
    title: string;
    description: string;
    buttons: Array<{
      text: string;
      link: string;
      style: string;
    }>;
  };
}
