import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from './ui/Button';
import { TAGLINE } from '../constants';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Entrance Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Particle Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      targetAlpha: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        // Smaller size for subtlety (0.5 to 2.0)
        this.size = Math.random() * 1.5 + 0.5; 
        // Very slow speed for calm, subtle movement
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        // Strictly Brand colors: Blue-500 (#3b82f6) and Indigo-500 (#6366f1)
        const isBlue = Math.random() > 0.5;
        this.color = isBlue ? '59, 130, 246' : '99, 102, 241';
        this.alpha = Math.random() * 0.3 + 0.1;
        this.targetAlpha = this.alpha;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Pulse effect
        if (Math.abs(this.alpha - this.targetAlpha) < 0.01) {
             this.targetAlpha = Math.random() * 0.3 + 0.1;
        } else {
             this.alpha += (this.targetAlpha - this.alpha) * 0.01;
        }
        
        // Wrap around screen
        if (canvas) {
           if (this.x > canvas.width) this.x = 0;
           if (this.x < 0) this.x = canvas.width;
           if (this.y > canvas.height) this.y = 0;
           if (this.y < 0) this.y = canvas.height;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = Math.floor(window.innerWidth / 15); // Balanced density
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });

    resizeCanvas();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById(SectionId.CONTACT);
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} id={SectionId.HOME} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        {/* Blurred Background Image Layer */}
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 blur-sm scale-110"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070")' }}
            aria-hidden="true"
        />
        {/* Overlay to blend image with theme background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/70 to-slate-50/90 dark:from-slate-950/80 dark:via-slate-950/70 dark:to-slate-950/90" />

        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] opacity-60 animate-float" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 space-y-8 text-center lg:text-left relative z-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 backdrop-blur-sm border border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wide transition-all duration-1000 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for new projects
            </div>
            
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              We Craft <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Excellence</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {TAGLINE}. We build robust software solutions that drive business growth, combining technical expertise with stunning design.
            </p>

            <div className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Button 
                size="lg" 
                variant="secondary"
                className="group relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40" 
                onClick={scrollToContact}
              >
                Request a Demo
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group bg-white/50 backdrop-blur-sm hover:bg-white/80">
                <Play className="mr-2 w-4 h-4 fill-slate-900" />
                How We Work
              </Button>
            </div>
          </div>

          <div className={`flex-1 w-full max-w-xl lg:max-w-none transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              {/* Decorative Card Stack Effect */}
              <div className="absolute top-4 -right-4 w-full h-full bg-slate-200/50 rounded-2xl -rotate-2 backdrop-blur-sm"></div>
              <div className="absolute top-2 -right-2 w-full h-full bg-slate-800/10 rounded-2xl -rotate-1 opacity-10"></div>
              
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden aspect-[4/3] group">
                <img 
                  src="https://picsum.photos/800/600?random=10" 
                  alt="Dashboard Preview"
                  fetchPriority="high" // Optimize LCP
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