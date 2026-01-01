import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from './ui/Button';
import { TAGLINE } from '../constants';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  return (
    <section id={SectionId.HOME} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-60 animate-float" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for new projects
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              We Craft <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Excellence</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {TAGLINE}. We build robust software solutions that drive business growth, combining technical expertise with stunning design.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group" onClick={() => window.location.href=`#${SectionId.PORTFOLIO}`}>
                View Our Work
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 w-4 h-4 fill-slate-900" />
                How We Work
              </Button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <div className="relative">
              {/* Decorative Card Stack Effect */}
              <div className="absolute top-4 -right-4 w-full h-full bg-slate-200 rounded-2xl -rotate-2"></div>
              <div className="absolute top-2 -right-2 w-full h-full bg-slate-800 rounded-2xl -rotate-1 opacity-10"></div>
              
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden aspect-[4/3] group">
                <img 
                  src="https://picsum.photos/800/600?random=10" 
                  alt="Dashboard Preview" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Elements mimicking UI components */}
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-xl shadow-lg transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Project Delivery</p>
                      <p className="text-xs text-slate-500">On Time, Every Time</p>
                    </div>
                    <div className="ml-auto text-green-600 font-bold text-sm">+24%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};