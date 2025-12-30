import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105">
            <Terminal size={20} />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">{COMPANY_NAME}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label} 
              to={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href) ? 'text-brand-blue font-bold' : 'text-slate-600 hover:text-brand-blue'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="primary" size="sm" onClick={() => navigate('/contact')}>
            Get Started
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 md:hidden p-6 shadow-xl animate-slide-in-top">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label} 
                to={item.href}
                className={`text-lg font-medium ${
                  isActive(item.href) ? 'text-brand-blue' : 'text-slate-800 hover:text-brand-blue'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
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