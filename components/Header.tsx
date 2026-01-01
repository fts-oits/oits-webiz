import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Sun, Moon } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { COMPANY_NAME, NAV_ITEMS } from '../constants';
import { Button } from './ui/Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        window.history.pushState({}, '', path);
        return;
      }
    }

    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' 
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
          <span className="text-xl font-bold text-slate-900 tracking-tight transition-colors">{COMPANY_NAME}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label} 
              to={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                isActive(item.href) 
                  ? 'bg-brand-blue/10 text-brand-blue font-bold' 
                  : 'text-slate-600 hover:bg-brand-blue/10 hover:text-brand-blue'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <div className="ml-4 pl-4 border-l border-slate-200">
            <Button variant="primary" size="sm" onClick={() => navigate('/contact')}>
              Get Started
            </Button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            className="p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 md:hidden p-6 shadow-xl animate-slide-in-top">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label} 
                to={item.href}
                className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive(item.href) 
                    ? 'bg-brand-blue/10 text-brand-blue' 
                    : 'text-slate-800 hover:bg-brand-blue/5 hover:text-brand-blue'
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