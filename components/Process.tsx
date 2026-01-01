import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, PenTool, Code, Rocket } from 'lucide-react';
import { PROCESS_STEPS } from '../constants';
import { SectionId } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-6 h-6" />,
  PenTool: <PenTool className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
};

export const Process: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const isPage = location.pathname === '/process';
  const HeadingTag = isPage ? 'h1' : 'h3';

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  const getFadeInClass = (delay: number) => 
    `transition-all duration-700 ease-out transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`;

  const styleDelay = (index: number) => ({ transitionDelay: `${index}ms` });

  return (
    <section ref={sectionRef} id={SectionId.PROCESS} className="py-24 pt-32 bg-slate-50 border-t border-slate-200 min-h-screen">
      <div className="container mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-20 ${getFadeInClass(0)}`}>
          <h2 className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-3">How We Work</h2>
          <HeadingTag className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            A proven process for success.
          </HeadingTag>
          <p className="text-slate-600 mt-4">
            We follow a structured approach to ensure transparency, efficiency, and exceptional results.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className={`hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0 transition-all duration-1000 ${isVisible ? 'opacity-100 w-full' : 'opacity-0 w-0'}`} style={{ transitionDelay: '300ms' }}></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.id} className={`group relative ${getFadeInClass(0)}`} style={styleDelay(200 + (index * 150))}>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative h-full hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-lg border-4 border-slate-50 shadow-lg group-hover:bg-slate-900 transition-colors">
                    {step.number}
                  </div>

                  <div className="mt-8 text-center">
                    <div className="w-12 h-12 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-brand-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                      {iconMap[step.icon]}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};