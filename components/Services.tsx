import React, { useEffect, useRef, useState } from 'react';
import { Globe, Smartphone, PenTool, Cloud, ArrowUpRight, Code, Database, Layout } from 'lucide-react';
import { SERVICES } from '../constants';
import { SectionId } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  PenTool: <PenTool className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
};

export const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={SectionId.SERVICES} className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Our Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Comprehensive solutions for your <br/>digital transformation.
            </h3>
          </div>
          <p className="text-slate-600 max-w-md pb-2">
            We leverage modern architectures and industry best practices to build software that lasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Services */}
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className={`group relative bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-700 ease-out hover:-translate-y-1 ${
                index === 0 || index === 3 ? 'lg:col-span-2' : ''
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-6 h-6 text-slate-400" />
              </div>

              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                {iconMap[service.icon]}
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
              <p className="text-slate-600 mb-6">{service.description}</p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Decorative/Info Card */}
          <div 
            className={`bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between overflow-hidden relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="relative z-10">
               <h4 className="text-xl font-bold mb-2">Technology Stack</h4>
               <p className="text-slate-400 text-sm">We use the latest tools.</p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-2 relative z-10">
               <div className="p-2 bg-slate-800 rounded-lg"><Code size={16}/></div>
               <div className="p-2 bg-slate-800 rounded-lg"><Database size={16}/></div>
               <div className="p-2 bg-slate-800 rounded-lg"><Layout size={16}/></div>
            </div>

             {/* Background Pattern */}
             <div className="absolute right-[-20%] bottom-[-20%] w-40 h-40 border-[20px] border-slate-800 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};