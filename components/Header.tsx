import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Sun, Moon } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { COMPANY_NAME, NAV_ITEMS } from '../constants';
import { Button } from './ui/Button';
import { useTheme } from './ThemeContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, path: string) => {
    setIsMobileMenuOpen(false);

    // 1. If we are on the Home page and the link targets a section (e.g., /services)
    if (location.pathname === '/' && path !== '/') {
      const sectionId = path.replace('/', '');
      const element = document.getElementById(sectionId);
      
      if (element) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL to reflect the section without reloading
        window.history.pushState({}, '', path);
        return;
      }
    }

    // 2. If we are clicking the link for the current page (e.g. Home -> Home)
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // 3. Otherwise, standard navigation happens (handled by Link)
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          onClick={(e) => handleNavClick(e, '/')}
        >
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105">
            <Terminal size={20} />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">{COMPANY_NAME}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label} 
              to={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive(item.href) 
                  ? 'bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue font-bold' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-brand-blue/5 dark:hover:bg-slate-800 hover:text-brand-blue dark:hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <div className="flex items-center gap-3 ml-2 pl-2 border-l border-slate-200 dark:border-slate-700">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <Button variant="primary" size="sm" onClick={() => navigate('/contact')}>
              Get Started
            </Button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 focus:outline-none"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button 
            className="p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 md:hidden p-6 shadow-xl animate-slide-in-top">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label} 
                to={item.href}
                className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive(item.href) 
                    ? 'bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue' 
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-blue'
                }`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              className="w-full mt-4" 
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/contact');
              }}
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};