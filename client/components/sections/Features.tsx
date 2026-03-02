import * as LucideIcons from 'lucide-react';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface FeaturesProps {
  features: Feature[];
}

export const Features = ({ features }: FeaturesProps) => {
  const getIcon = (iconName: string) => {
    const icons = LucideIcons as Record<string, any>;
    const Icon = icons[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : null;
  };

  return (
    <section className="relative py-20 sm:py-28 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Why Choose Us
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Powerful features designed to help your business grow and succeed in the digital age
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 hover:shadow-lg dark:hover:shadow-lg/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(feature.icon)}
                </div>

                {/* Text */}
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Accent Line */}
                <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-12 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
