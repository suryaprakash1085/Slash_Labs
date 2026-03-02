import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';

export default function Contact() {
  const [config, setConfig] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error('Failed to load config:', err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

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

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: company.email,
      link: `mailto:${company.email}`
    },
    {
      icon: Phone,
      label: "Phone",
      value: company.phone,
      link: `tel:${company.phone}`
    },
    {
      icon: MapPin,
      label: "Address",
      value: company.address,
      link: "#"
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.techvision.com",
      link: "https://techvision.com"
    }
  ];

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
                Get in Touch
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.link}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300 group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                            {info.label}
                          </p>
                          <p className="text-lg font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Office Hours */}
                <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800/50">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p>Sat: 10:00 AM - 4:00 PM</p>
                    <p>Sun: Closed</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      submitted
                        ? 'bg-green-600 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
                    }`}
                  >
                    {submitted ? (
                      <>
                        ✓ Message Sent Successfully!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                    We'll get back to you within 24 business hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="relative h-96 bg-slate-200 dark:bg-slate-800">
          <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <p className="text-slate-700 dark:text-slate-300 font-semibold">
                {company.address}
              </p>
            </div>
          </div>
        </section>

     
      </main>

      <Footer />
    </div>
  );
}
