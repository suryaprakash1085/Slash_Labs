import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';

export default function Index() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        // Set theme colors as CSS variables
        const root = document.documentElement;
        if (data.theme) {
          root.style.setProperty('--primary-color', data.theme.primaryColor);
          root.style.setProperty('--secondary-color', data.theme.secondaryColor);
          root.style.setProperty('--accent-color', data.theme.accentColor);
        }
      })
      .catch(err => console.error('Failed to load config:', err));
  }, []);

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  const { home, company, navigation } = config;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Header companyName={company.name} navigation={navigation} />
      
      <main>
        {/* Hero Section */}
        <Hero
          title={home.hero.title}
          subtitle={home.hero.subtitle}
          cta_primary={home.hero.cta_primary}
          cta_secondary={home.hero.cta_secondary}
          image={home.hero.image}
        />

        {/* Features Section */}
        <Features features={home.features} />

        {/* Testimonials Section */}
        <Testimonials testimonials={home.testimonials} />

        {/* CTA Section */}
        <CTA
          title={home.cta_section.title}
          description={home.cta_section.description}
          button_text={home.cta_section.button_text}
        />
      </main>

      <Footer />
    </div>
  );
}
