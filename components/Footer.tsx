import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Github, Linkedin, Twitter, Facebook, Check, Loader2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_NAME, NAV_ITEMS } from '../constants';
import { Tooltip } from './ui/Tooltip';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || subscribeStatus === 'loading') return;

    setSubscribeStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus('idle');
      }, 5000);
    }, 1500);
  };

  const getFadeInClass = (delayIndex: number) => {
    return `transition-all duration-700 ease-out transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`;
  };

  const styleDelay = (index: number) => ({ transitionDelay: `${index * 150}ms` });

  return (
    <footer 
      ref={footerRef}
      className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800 mt-auto"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Company Info */}
          <div className={`space-y-6 ${getFadeInClass(0)}`} style={styleDelay(0)}>
            <Link to="/" className="flex items-center gap-2 text-white group">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <Terminal size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold">{COMPANY_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Empowering businesses through innovative software solutions. Your digital transformation partner.
            </p>
            <div className="flex gap-4">
              <Tooltip content="GitHub">
                <a href="#" className="hover:text-brand-green hover:-translate-y-1 transition-all duration-300 block" aria-label="Visit our GitHub profile">
                  <Github size={20} />
                </a>
              </Tooltip>
              <Tooltip content="LinkedIn">
                <a href="#" className="hover:text-brand-green hover:-translate-y-1 transition-all duration-300 block" aria-label="Visit our LinkedIn profile">
                  <Linkedin size={20} />
                </a>
              </Tooltip>
              <Tooltip content="Twitter">
                <a href="#" className="hover:text-brand-green hover:-translate-y-1 transition-all duration-300 block" aria-label="Visit our Twitter profile">
                  <Twitter size={20} />
                </a>
              </Tooltip>
              <Tooltip content="Facebook">
                <a href="#" className="hover:text-brand-green hover:-translate-y-1 transition-all duration-300 block" aria-label="Visit our Facebook page">
                  <Facebook size={20} />
                </a>
              </Tooltip>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className={getFadeInClass(1)} style={styleDelay(1)}>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-brand-green transition-colors inline-block hover:translate-x-1 duration-200">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className={getFadeInClass(2)} style={styleDelay(2)}>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="hover:text-brand-green transition-colors inline-block hover:translate-x-1 duration-200">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-brand-green transition-colors inline-block hover:translate-x-1 duration-200">Mobile Apps</Link></li>
              <li><Link to="/services" className="hover:text-brand-green transition-colors inline-block hover:translate-x-1 duration-200">UI/UX Design</Link></li>
              <li><Link to="/services" className="hover:text-brand-green transition-colors inline-block hover:translate-x-1 duration-200">Cloud Solutions</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className={getFadeInClass(3)} style={styleDelay(3)}>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest tech news and updates.</p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address" 
                  className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-blue transition-colors disabled:opacity-50"
                  disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                  required
                />
                <button 
                  type="submit"
                  className={`bg-brand-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue/90 transition-all flex items-center justify-center min-w-[3rem] disabled:opacity-70 disabled:cursor-not-allowed`}
                  disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                >
                  {subscribeStatus === 'loading' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : subscribeStatus === 'success' ? (
                    <Check size={16} />
                  ) : (
                    'OK'
                  )}
                </button>
              </div>
              
              {/* Success Message */}
              <div className={`overflow-hidden transition-all duration-300 ${subscribeStatus === 'success' ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}>
                 <p className="text-brand-green text-xs flex items-center gap-1.5 font-medium">
                   <Check size={12} />
                   Thanks for subscribing!
                 </p>
              </div>
            </form>
          </div>

        </div>
        
        {/* Footer Bottom */}
        <div className={`pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm ${getFadeInClass(4)}`} style={styleDelay(4)}>
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};