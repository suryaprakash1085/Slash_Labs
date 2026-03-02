import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [config, setConfig] = useState<any>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
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

  const { pricing, company, navigation } = config;

  const getMonthlyPrice = (yearlyPrice: number) => {
    return Math.round((yearlyPrice / 12) * 0.85); // 15% discount for yearly
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Header companyName={company.name} navigation={navigation} />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your business with flexible pricing options and no hidden fees
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-slate-100 dark:bg-slate-800 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                  billingCycle === 'yearly'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs font-bold bg-green-500 text-white px-2 py-1 rounded">Save 15%</span>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricing.map((plan: any, index: number) => {
                const displayPrice = billingCycle === 'monthly' 
                  ? getMonthlyPrice(plan.price) 
                  : plan.price;

                return (
                  <div
                    key={plan.id}
                    className={`relative group rounded-2xl transition-all duration-300 ${
                      plan.popular
                        ? 'md:scale-105 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 shadow-2xl'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-lg/20 hover:-translate-y-2'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full font-bold text-sm">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className={`p-8 sm:p-10 ${plan.popular ? 'text-white' : ''}`}>
                      {/* Plan Name */}
                      <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {plan.name}
                      </h3>

                      {/* Description */}
                      <p className={`text-sm mb-6 ${plan.popular ? 'text-white/80' : 'text-slate-600 dark:text-slate-400'}`}>
                        {plan.description}
                      </p>

                      {/* Price */}
                      <div className="mb-8">
                        <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                          ${displayPrice}
                        </span>
                        <span className={`text-sm ml-2 ${plan.popular ? 'text-white/80' : 'text-slate-600 dark:text-slate-400'}`}>
                          per month
                        </span>
                      </div>

                      {/* CTA Button */}
                      <Link
                        to="/contact"
                        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 mb-8 ${
                          plan.popular
                            ? 'bg-white text-blue-600 hover:bg-slate-100'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                        }`}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      {/* Features List */}
                      <div className="space-y-4">
                        {plan.features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3">
                            <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-yellow-300' : 'text-green-500'}`} />
                            <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-slate-700 dark:text-slate-300'}`}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Everything you need to know about our pricing
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Can I change my plan anytime?",
                  answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers. Enterprise customers can arrange custom payment terms."
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes, we offer a 14-day free trial for all plans. No credit card required to get started."
                },
                {
                  question: "What if I need a custom plan?",
                  answer: "Contact our sales team to discuss custom pricing and enterprise solutions tailored to your needs."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "We offer a 30-day money-back guarantee if you're not satisfied with our service."
                },
                {
                  question: "Are there any setup fees?",
                  answer: "No hidden fees! Our pricing is transparent and includes everything listed in your plan."
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 sm:py-28 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to transform your business?
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              Start your free trial today. No credit card required.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
