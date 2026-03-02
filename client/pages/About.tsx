import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettingsContext } from '@/contexts/SettingsContext';
import * as LucideIcons from 'lucide-react';

export default function About() {
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

  if (!settings?.about) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">Failed to load about data</p>
        </div>
      </div>
    );
  }

  const aboutData = settings.about;
  const globalData = settings.global;

  // Parse JSON data if needed
  const introSection = typeof aboutData.intro_section === 'string' ? JSON.parse(aboutData.intro_section) : aboutData.intro_section;
  const stats = typeof aboutData.stats === 'string' ? JSON.parse(aboutData.stats) : aboutData.stats;
  const missionValuesCulture = typeof aboutData.mission_values_culture === 'string' ? JSON.parse(aboutData.mission_values_culture) : aboutData.mission_values_culture;
  const aboutJourney = typeof aboutData.about_journey === 'string' ? JSON.parse(aboutData.about_journey) : aboutData.about_journey;
  const joinUsCta = typeof aboutData.join_us_cta === 'string' ? JSON.parse(aboutData.join_us_cta) : aboutData.join_us_cta;

  const getIcon = (iconName: string) => {
    const icons = LucideIcons as Record<string, any>;
    const Icon = icons[iconName];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Header />

      <main>
        {/* Intro Section */}
        {introSection && (
          <section className="relative py-20 sm:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      {introSection.title}{' '}
                      {introSection.subtitle && (
                        <span className="block">{introSection.subtitle}</span>
                      )}
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    {introSection.description}
                  </p>
                </div>

                <div className="relative h-96 hidden lg:block">
                  <img
                    src={introSection.image}
                    alt={introSection.title}
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        {stats && stats.length > 0 && (
          <section className="py-20 sm:py-28 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat: any, index: number) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </p>
                    <p className="text-white/80 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Mission & Values */}
        {missionValuesCulture && missionValuesCulture.length > 0 && (
          <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {missionValuesCulture.map((item: any, index: number) => (
                  <div key={index} className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                      {getIcon(item.icon)}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Journey Timeline */}
        {aboutJourney && aboutJourney.length > 0 && (
          <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  Our Journey
                </h2>
              </div>

              <div className="space-y-8">
                {aboutJourney.map((milestone: any, index: number) => (
                  <div key={index} className="flex gap-8 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      {index < aboutJourney.length - 1 && (
                        <div className="w-1 h-16 bg-gradient-to-b from-blue-600 to-purple-600 mt-4" />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className="text-blue-600 dark:text-blue-400 font-bold">{milestone.year}</p>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{milestone.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 mt-2">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {joinUsCta && (
          <section className="relative py-20 sm:py-28 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {joinUsCta.title}
              </h2>
              <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
                {joinUsCta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {joinUsCta.buttons && joinUsCta.buttons.map((button: any, index: number) => (
                  <Link
                    key={index}
                    to={button.link}
                    className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-all duration-300 transform ${
                      button.style === 'primary'
                        ? 'bg-white text-blue-600 hover:scale-105 shadow-xl'
                        : 'border-2 border-white text-white hover:bg-white/10'
                    }`}
                  >
                    {button.text}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
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
