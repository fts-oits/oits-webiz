import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { TAGLINE } from '../constants';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        // Subtle parallax effect with rotation and translation
        if (blob1Ref.current) {
          blob1Ref.current.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.05}deg)`;
        }
        if (blob2Ref.current) {
          blob2Ref.current.style.transform = `translateY(${scrolled * 0.15}px) rotate(${scrolled * -0.05}deg)`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: Array<{x: number, y: number, dx: number, dy: number, size: number, color: string}> = [];
    let animationId: number;
    // Brand colors: brand-blue, brand-green, brand-purple
    const colors = ['#2f3f99', '#02ce80', '#642cdc'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 40 : 80; 
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.3, // Slower movement
          dy: (Math.random() - 0.5) * 0.3, // Slower movement
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        
        // Wrap around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.5; // Slightly more visible
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const getEntranceClass = (delay: number) => 
    `transition-all duration-1000 ease-out transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
    }`;

  return (
    <section ref={heroRef} id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div ref={blob1Ref} className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-blue/10 dark:bg-brand-blue/5 rounded-full blur-[100px] opacity-60 will-change-transform" />
        <div ref={blob2Ref} className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/10 dark:bg-brand-purple/5 rounded-full blur-[120px] opacity-60 will-change-transform" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide ${getEntranceClass(0)}`}>
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span> Available for new projects
            </div>
            
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] ${getEntranceClass(0)}`} style={{ transitionDelay: '150ms' }}>
              We Craft <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">Digital Excellence</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed ${getEntranceClass(0)}`} style={{ transitionDelay: '300ms' }}>
              {TAGLINE}. We build robust software solutions that drive business growth, combining technical expertise with stunning design.
            </p>
            
            <div className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start ${getEntranceClass(0)}`} style={{ transitionDelay: '500ms' }}>
              <Button 
                variant="secondary" 
                size="lg" 
                className="group shadow-xl hover:shadow-2xl hover:shadow-brand-blue/20 dark:hover:shadow-brand-blue/30 hover:scale-105 active:scale-95 transition-all duration-300 border border-slate-200 dark:border-slate-700" 
                onClick={() => navigate('/contact')}
              >
                Request a Demo <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group dark:border-slate-700 dark:text-white dark:hover:bg-slate-800" onClick={() => navigate('/portfolio')}>
                <Play className="mr-2 w-4 h-4 fill-brand-blue" /> View Our Work
              </Button>
            </div>
          </div>
          <div className={`flex-1 w-full max-w-xl lg:max-w-none transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              <div className="absolute top-4 -right-4 w-full h-full bg-slate-200 dark:bg-slate-800 rounded-2xl -rotate-2"></div>
              <div className="absolute top-2 -right-2 w-full h-full bg-slate-800 dark:bg-slate-700 rounded-2xl -rotate-1 opacity-10"></div>
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden aspect-[4/3] group transform transition-transform hover:-translate-y-2 duration-500">
                <img src="https://picsum.photos/800/600?random=10" alt="Dashboard Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel dark:bg-slate-900/80 dark:border-slate-700 rounded-xl shadow-lg transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Project Delivery</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">On Time, Every Time</p>
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