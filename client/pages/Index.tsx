import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';
import { useSettingsContext } from '@/contexts/SettingsContext';

export default function Index() {
  const { settings, loading } = useSettingsContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!settings?.home) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">Failed to load home data</p>
        </div>
      </div>
    );
  }

  const homeData = settings.home;

  // Parse JSON data if needed
  const hero = typeof homeData.hero === 'string' ? JSON.parse(homeData.hero) : homeData.hero;
  const features = typeof homeData.features === 'string' ? JSON.parse(homeData.features) : homeData.features;
  const ctaSection = typeof homeData.cta_section === 'string' ? JSON.parse(homeData.cta_section) : homeData.cta_section;
  const homeStats = typeof homeData.home_stats === 'string' ? JSON.parse(homeData.home_stats) : homeData.home_stats;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Header />

      <main>
        {/* Hero Section */}
        {hero && (
          <Hero
            title={hero.title}
            subtitle={hero.subtitle}
            cta_primary={hero.cta_primary}
            cta_secondary={hero.cta_secondary}
            image={hero.image}
          />
        )}

        {/* Features Section */}
        {features && features.length > 0 && (
          <Features features={features} />
        )}

        {/* Testimonials Section */}
        <Testimonials testimonials={[]} />

        {/* CTA Section */}
        {ctaSection && (
          <CTA
            title={ctaSection.title}
            description={ctaSection.description}
            button_text={ctaSection.button_text}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
