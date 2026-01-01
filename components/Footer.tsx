import React from 'react';
import { Terminal, Github, Linkedin, Twitter, Facebook, Sun, Moon } from 'lucide-react';
import { COMPANY_NAME, NAV_ITEMS } from '../constants';

interface FooterProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, toggleTheme }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <a href="#" className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Terminal size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold">{COMPANY_NAME}</span>
            </a>
            <p className="text-sm leading-relaxed">
              Empowering businesses through innovative software solutions. Your digital transformation partner.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Github"><Github size={20} /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
            </div>
            
            <div className="pt-2">
               <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors bg-slate-900 px-3 py-2 rounded-lg border border-slate-800"
                  aria-label="Toggle theme"
               >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
               </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-blue-500 transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Cloud Solutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest tech news and updates.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-blue-600 text-white"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                OK
              </button>
            </form>
          </div>

        </div>
        
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};