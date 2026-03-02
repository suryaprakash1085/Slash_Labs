import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MapPin, Briefcase, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Careers() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error('Failed to load config:', err));
  }, []);

  const jobListings = [
    {
      id: 1,
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$150K - $200K",
      description: "Build scalable web applications using React, Node.js, and cloud technologies.",
      requirements: ["5+ years experience", "React/TypeScript", "Node.js", "AWS/GCP"]
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130K - $170K",
      description: "Lead product strategy and roadmap for our flagship platform.",
      requirements: ["4+ years PM experience", "Analytics", "User Research", "Technical Background"]
    },
    {
      id: 3,
      title: "ML Engineer",
      department: "AI & ML",
      location: "Remote",
      type: "Full-time",
      salary: "$160K - $220K",
      description: "Develop and deploy machine learning models for enterprise clients.",
      requirements: ["3+ years ML experience", "Python", "TensorFlow", "MLOps"]
    },
    {
      id: 4,
      title: "Cloud Architect",
      department: "Infrastructure",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$140K - $190K",
      description: "Design and implement cloud infrastructure solutions.",
      requirements: ["7+ years cloud experience", "AWS/Azure", "Kubernetes", "DevOps"]
    },
    {
      id: 5,
      title: "Security Engineer",
      department: "Security",
      location: "Remote",
      type: "Full-time",
      salary: "$130K - $180K",
      description: "Protect our infrastructure and help clients with security implementations.",
      requirements: ["5+ years experience", "Network Security", "Penetration Testing", "Compliance"]
    },
    {
      id: 6,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "London, UK",
      type: "Full-time",
      salary: "£120K - £160K",
      description: "Build and maintain CI/CD pipelines and deployment infrastructure.",
      requirements: ["4+ years experience", "Docker/Kubernetes", "CI/CD", "Cloud Platforms"]
    },
    {
      id: 7,
      title: "UX/UI Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$100K - $140K",
      description: "Create beautiful and intuitive user interfaces for enterprise applications.",
      requirements: ["4+ years experience", "Figma", "Design Systems", "User Research"]
    },
    {
      id: 8,
      title: "Sales Executive",
      department: "Sales",
      location: "Remote",
      type: "Full-time",
      salary: "$80K - $150K + Commission",
      description: "Drive business growth by managing enterprise client relationships.",
      requirements: ["3+ years SaaS sales", "Enterprise selling", "CRM proficiency", "Communication"]
    }
  ];

  const benefits = [
    { icon: "💰", title: "Competitive Salary", description: "Industry-leading compensation packages" },
    { icon: "🏥", title: "Health Benefits", description: "Comprehensive health, dental, and vision coverage" },
    { icon: "🏠", title: "Remote Work", description: "Flexible work arrangements and remote options" },
    { icon: "📚", title: "Learning Budget", description: "Annual stipend for professional development" },
    { icon: "🎉", title: "Team Events", description: "Regular team outings and company celebrations" },
    { icon: "⏱️", title: "Flexible Hours", description: "Work-life balance with flexible schedules" },
    { icon: "📈", title: "Career Growth", description: "Clear career paths and advancement opportunities" },
    { icon: "🌍", title: "Global Team", description: "Work with talented people from around the world" }
  ];

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
                Join Our Team
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Be part of a team transforming the future of digital innovation. We're always looking for talented individuals passionate about technology and impact.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Why Work With Us?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Enjoy a competitive package and work environment that values growth and innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-800 hover:shadow-lg dark:hover:shadow-lg/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Open Positions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Check out our current job openings and apply today
              </p>
            </div>

            <div className="space-y-4">
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg dark:hover:shadow-lg/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {job.title}
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                        {job.department}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 lg:justify-end">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        {job.salary}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {job.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                      Requirements:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Our Culture
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  We believe in creating an environment where innovation thrives and talented people can do their best work.
                </p>
                <ul className="space-y-3">
                  {[
                    "Collaborative and inclusive workplace",
                    "Continuous learning and development",
                    "Diverse perspectives and backgrounds",
                    "Work-life balance and wellness",
                    "Transparent communication",
                    "Impact on meaningful projects"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-96 hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 sm:py-28 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Don't see a fit? We're always looking for talent
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              Send us your resume and tell us what you're interested in. We review all applications.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
