import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/use-products';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { ProductCard } from '@/components/ProductCard';

export default function Portfolio() {
  const { products, loading } = useProducts();
  const { primaryColor, secondaryColor } = useThemeColors();
  const [activeCategory, setActiveCategory] = useState('all');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderBottomColor: primaryColor }} />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Get unique categories from products
  const categories = [
    { id: 'all', label: 'All Projects' },
    ...Array.from(new Set(products.map(p => p.category).filter(Boolean))).map(cat => ({
      id: cat as string,
      label: (cat as string).charAt(0).toUpperCase() + (cat as string).slice(1)
    }))
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

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
                Our Portfolio
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Showcasing our finest work and successful transformations across diverse industries
            </p>
          </div>
        </section>

        {/* Filter Categories */}
        {products.length > 0 && (
          <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="px-6 py-2 rounded-full font-semibold transition-all duration-300 text-white shadow-lg"
                    style={{
                      backgroundColor: activeCategory === cat.id ? primaryColor : '#e2e8f0',
                      color: activeCategory === cat.id ? 'white' : '#1f2937',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Portfolio Grid */}
        {filteredProducts.length > 0 && (
          <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} variant="portfolio" index={index} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section
          className="py-20 sm:py-28"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "Projects Delivered" },
                { number: "150+", label: "Countries Served" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "$500M+", label: "Combined Client Value" }
              ].map((stat, index) => (
                <div key={index}>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </p>
                  <p className="text-white/80 font-medium text-sm sm:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 sm:py-28 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to start your project?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with proven solutions and expert execution
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              }}
            >
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
