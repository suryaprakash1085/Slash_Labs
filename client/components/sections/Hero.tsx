import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
  image?: string;
  badge_text?: string;
  stats?: string;
}

export const Hero = ({ 
  title, 
  subtitle, 
  cta_primary, 
  cta_secondary,
  badge_text,
  stats,
  image 
}: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6 sm:space-y-8 z-10">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50">
                {badge_text}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {cta_primary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300"
              >
                {cta_secondary}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">5K+</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Clients</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">150+</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Countries</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-pink-600 dark:text-pink-400">99.9%</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Uptime</p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-96 sm:h-[500px] lg:h-[600px] hidden lg:block">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={image || 'https://images.unsplash.com/photo-1634365582032-c6bc9eaf5e4f?w=600&h=700&fit=crop'}
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 max-w-xs backdrop-blur-sm border border-slate-200 dark:border-slate-700 animate-float">
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Enterprise Ready</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Trusted by Fortune 500 companies worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="animate-bounce text-slate-400 dark:text-slate-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};
