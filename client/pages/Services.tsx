import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { useSettingsContext } from '@/contexts/SettingsContext';
import { useThemeColors } from '@/hooks/use-theme-colors';

export default function Services() {

  const { settings, loading } = useSettingsContext();
  const { primaryColor, secondaryColor } = useThemeColors();

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

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Failed to load services data</p>
      </div>
    );
  }

  // Icon Loader
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];

    if (!IconComponent) {
      return <LucideIcons.HelpCircle className="w-8 h-8" />;
    }

    return <IconComponent className="w-8 h-8" />;
  };

  // Services Items
  const servicesItems =
    settings?.services?.services_items?.services || [];
console.log("settings:", settings);
  // ✅ Find banner setting from API response
 const bannerSetting = settings?.services?.banner_title;
console.log("Banner Setting:", bannerSetting);
  // ✅ Parse banner JSON safely
  let bannerData: any = {};


  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">

      <Header />

      <main>

        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
              style={{ backgroundColor: primaryColor }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                }}
              >
                {bannerSetting?.banner_title}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {bannerSetting?.banner_description}
            </p>

          </div>
        </section>

        {/* Services Grid */}
        {servicesItems.length > 0 && (
          <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {servicesItems.map((service: any) => (
                  <div
                    key={service.id}
                    className="group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >

                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white mb-6">
                      {getIcon(service.icon)}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      {service.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features?.map((feature: string, index: number) => (
                        <li
                          key={index}
                          className="text-sm text-slate-600 dark:text-slate-400"
                        >
                          • {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={service.ctaLink}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300"
                    >
                      {service.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                  </div>
                ))}

              </div>

            </div>

          </section>
        )}

      </main>

      <Footer />

    </div>
  );
}