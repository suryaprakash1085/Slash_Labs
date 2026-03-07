import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Product } from '@/hooks/use-products';
import * as LucideIcons from 'lucide-react';

interface ProductCardProps {
  product: Product;
  variant?: 'service' | 'portfolio';
  index?: number;
}

export const ProductCard = ({ product, variant = 'portfolio', index = 0 }: ProductCardProps) => {
  const { primaryColor, secondaryColor, textColor } = useThemeColors();

  const getIcon = (iconName: string | null) => {
    if (!iconName) return null;
    const icons = LucideIcons as Record<string, any>;
    const Icon = icons[iconName];
    return Icon ? <Icon className="w-10 h-10" /> : null;
  };

  const features = product.features ? product.features.split(',').map(f => f.trim()) : [];
  const techs = product.tech ? product.tech.split(',').map(t => t.trim()) : [];

  if (variant === 'service') {
    return (
      <div
        key={product.id}
        className="group relative p-8 rounded-2xl border bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 hover:shadow-xl dark:hover:shadow-xl/20 transition-all duration-300 hover:-translate-y-2"
        style={{
          borderColor: `${primaryColor}20`,
          animationDelay: `${index! * 100}ms`,
        }}
      >
        {/* Background gradient on hover */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}05, ${secondaryColor}05)`,
            pointerEvents: 'none',
          }}
        />

        <div className="relative z-10">
          {/* Icon */}
          {product.icon || product.image ? (
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: primaryColor }}
            >
              {product.icon ? (
                getIcon(product.icon)
              ) : (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              )}
            </div>
          ) : null}

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 group-hover:transition-colors duration-300" style={{ color: textColor }}>
            {product.name}
          </h3>

          {/* Subtitle */}
          {product.subtitle && (
            <p className="text-sm font-medium mb-3" style={{ color: primaryColor }}>
              {product.subtitle}
            </p>
          )}

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Features list */}
          {features.length > 0 && (
            <ul className="space-y-2 mb-6">
              {features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <div 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ backgroundColor: primaryColor }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Tech stack */}
          {techs.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {techs.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: secondaryColor }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* CTA Link */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all duration-300 group/link"
            style={{ color: primaryColor }}
          >
            Learn more
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    );
  }

  // Portfolio variant
  return (
    <div
      key={product.id}
      className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 hover:shadow-2xl dark:hover:shadow-2xl/20 transition-all duration-300 hover:-translate-y-2"
      style={{
        border: `1px solid ${primaryColor}20`,
        animationDelay: `${index! * 50}ms`,
      }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-700">
        {product.image ? (
          <>
            <img
              src={`${import.meta.env.VITE_PUBLIC_API_BASE_URL}${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all duration-300"
              >
                View Case Study
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center text-white"
            style={{ backgroundColor: primaryColor }}
          >
            {product.icon ? getIcon(product.icon) : <ExternalLink className="w-12 h-12" />}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {product.category && (
          <p 
            className="text-sm font-semibold mb-2 uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            {product.category}
          </p>
        )}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {product.name}
        </h3>
        {product.subtitle && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {product.subtitle}
          </p>
        )}
        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Features as results */}
        {features.length > 0 && (
          <div className="space-y-2">
            {features.slice(0, 3).map((feature, idx) => (
              <p key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <span 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
                {feature}
              </p>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        {techs.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {techs.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-1 rounded text-xs font-semibold text-white"
                  style={{ backgroundColor: secondaryColor }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
