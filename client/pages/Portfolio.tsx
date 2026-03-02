import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Portfolio() {
  const [config, setConfig] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error('Failed to load config:', err));
  }, []);

  const caseStudies = [
    {
      id: 1,
      title: "E-Commerce Platform Transformation",
      category: "web",
      company: "Global Retail Co",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
      description: "Rebuilt legacy e-commerce platform resulting in 300% increase in sales",
      results: ["300% sales increase", "50% faster load times", "99.99% uptime"]
    },
    {
      id: 2,
      title: "AI-Powered Analytics Dashboard",
      category: "ai",
      company: "Data Insights Inc",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description: "Developed custom ML models for real-time business intelligence",
      results: ["40% accuracy improvement", "Real-time insights", "70% faster processing"]
    },
    {
      id: 3,
      title: "Cloud Migration Strategy",
      category: "cloud",
      company: "Enterprise Systems Ltd",
      image: "https://images.unsplash.com/photo-1551503022-e1d5fba5f987?w=600&h=400&fit=crop",
      description: "Successfully migrated 500+ applications to cloud infrastructure",
      results: ["40% cost reduction", "Zero downtime migration", "Enhanced security"]
    },
    {
      id: 4,
      title: "Mobile App Development",
      category: "mobile",
      company: "FinTech Startup",
      image: "https://images.unsplash.com/photo-1512941691920-25bef6e9dd15?w=600&h=400&fit=crop",
      description: "Built cross-platform mobile app serving 1M+ users globally",
      results: ["1M+ downloads", "4.8-star rating", "24/7 uptime"]
    },
    {
      id: 5,
      title: "DevOps Pipeline Automation",
      category: "devops",
      company: "SaaS Provider Corp",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
      description: "Implemented CI/CD pipeline reducing deployment time by 80%",
      results: ["80% faster deployments", "95% error reduction", "Cost savings"]
    },
    {
      id: 6,
      title: "Enterprise Security Overhaul",
      category: "security",
      company: "Financial Institution",
      image: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8b12f?w=600&h=400&fit=crop",
      description: "Comprehensive security audit and implementation of modern protections",
      results: ["Zero breaches", "SOC 2 certified", "Compliance achieved"]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'devops', label: 'DevOps' },
    { id: 'security', label: 'Security' }
  ];

  const filteredStudies = activeCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeCategory);

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

  const { company, navigation } = config;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Header companyName={company.name} navigation={navigation} />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Our Portfolio
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Showcasing our finest work and successful transformations across diverse industries
            </p>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudies.map((study, index) => (
                <div
                  key={study.id}
                  className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-2xl dark:hover:shadow-2xl/20 transition-all duration-300 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-700">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all duration-300"
                      >
                        View Case Study
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">
                      {categories.find(c => c.id === study.category)?.label}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {study.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {study.company}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">
                      {study.description}
                    </p>

                    {/* Results */}
                    <div className="space-y-2">
                      {study.results.map((result, idx) => (
                        <p key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          {result}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 sm:py-28 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900">
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
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
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
