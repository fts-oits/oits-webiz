import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { TAGLINE } from '../constants';
import { Particles } from './ui/Particles';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Parallax Effect
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (blob1Ref.current) {
          blob1Ref.current.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        if (blob2Ref.current) {
          blob2Ref.current.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Entrance Animation Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-slate-50/50">
      {/* Background Elements with Parallax and Particles */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <Particles />
        <div 
          ref={blob1Ref}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] opacity-60 will-change-transform" 
        />
        <div 
          ref={blob2Ref}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] opacity-60 will-change-transform" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wide transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
              Available for new projects
            </div>
            
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              We Craft <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">Digital Excellence</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {TAGLINE}. We build robust software solutions that drive business growth, combining technical expertise with stunning design.
            </p>

            <div className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <Button 
                variant="primary" 
                size="lg" 
                className="group shadow-xl hover:shadow-brand-blue/40 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out transform"
                onClick={() => navigate('/contact')}
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group" onClick={() => navigate('/portfolio')}>
                <Play className="mr-2 w-4 h-4 fill-brand-blue" />
                View Our Work
              </Button>
            </div>
          </div>

          <div className={`flex-1 w-full max-w-xl lg:max-w-none transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              {/* Decorative Card Stack Effect */}
              <div className="absolute top-4 -right-4 w-full h-full bg-slate-200 rounded-2xl -rotate-2 transition-transform hover:rotate-0 duration-500"></div>
              <div className="absolute top-2 -right-2 w-full h-full bg-slate-800 rounded-2xl -rotate-1 opacity-10 transition-transform hover:rotate-0 duration-500"></div>
              
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden aspect-[4/3] group transform transition-transform hover:-translate-y-2 duration-500">
                <img 
                  src="https://picsum.photos/800/600?random=10" 
                  alt="Dashboard Preview" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Elements mimicking UI components */}
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-xl shadow-lg transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Project Delivery</p>
                      <p className="text-xs text-slate-500">On Time, Every Time</p>
                    </div>
                    <div className="ml-auto text-brand-green font-bold text-sm">+24%</div>
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