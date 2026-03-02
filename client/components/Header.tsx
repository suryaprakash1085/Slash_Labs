import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { useSettingsContext } from '@/contexts/SettingsContext';

interface NavItem {
  label: string;
  path: string;
}

interface HeaderProps {
  companyName?: string;
  navigation?: NavItem[];
}

export const Header = ({ companyName = 'TechVision', navigation = [] }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();
  const { settings, loading } = useSettingsContext();

  const company = settings?.global?.company_name || companyName;
  const logo = settings?.global?.company_logo;
  const primaryColor = settings?.global?.primary_color || '#1e4a94';

  const navItems = navigation.length > 0 ? navigation : [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    // { label: 'Pricing', path: '/pricing' },
    // { label: 'Blog', path: '/blog' },
    // { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Company Name */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl transition-all hover:scale-105"
            style={{ color: primaryColor }}
          >
            {logo ? (
              <img
                src={`${import.meta.env.VITE_PUBLIC_API_BASE_URL}${logo}`}
                alt={company}
                className="w-8 h-8 object-contain rounded-lg"
              />
            ) : (
              <div
                className="w-8 h-8 rounded-lg"
                style={{ backgroundColor: primaryColor }}
              />
            )}
            {company}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item: NavItem) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            {navItems.map((item: NavItem) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
