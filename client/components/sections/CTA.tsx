import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CTAProps {
  title: string;
  description: string;
  button_text: string;
}

export const CTA = ({ title, description, button_text }: CTAProps) => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        
        <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 hover:text-purple-600 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
          >
            {button_text}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            Contact Sales
          </Link>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 pt-12 border-t border-white/20">
          <p className="text-sm text-white/80 mb-6">Trusted by companies worldwide</p>
          <div className="flex justify-center items-center gap-6 sm:gap-8 flex-wrap">
            {['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'].map((company) => (
              <div key={company} className="text-white/60 font-medium text-sm sm:text-base hover:text-white/100 transition-colors duration-300">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
