import React, { useEffect, useRef, useState } from 'react';
import { Globe, Smartphone, PenTool, Cloud, ArrowUpRight, Code2, Server, Database, Layers, Terminal } from 'lucide-react';
import { SERVICES, TECH_DOMAINS } from '../constants';
import { SectionId } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  PenTool: <PenTool className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
};

const domainIcons: Record<string, React.ReactNode> = {
  frontend: <Code2 size={18} />,
  backend: <Server size={18} />,
  mobile: <Smartphone size={18} />,
  database: <Database size={18} />,
  cloud: <Cloud size={18} />,
};

export const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(TECH_DOMAINS[0].id);
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
    <section ref={sectionRef} id={SectionId.SERVICES} className="py-24 bg-white dark:bg-slate-900 relative transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        {/* Services Header & Grid */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Our Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Comprehensive solutions for your <br/>digital transformation.
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-md pb-2">
            We leverage modern architectures and industry best practices to build software that lasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className={`group relative bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-8 hover:shadow-2xl dark:hover:shadow-blue-900/20 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-blue-200 dark:hover:border-blue-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              </div>

              <div className="w-12 h-12 shrink-0 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white shadow-sm mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:animate-subtle-bounce">
                {iconMap[service.icon]}
              </div>

              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{service.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">{service.description}</p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technology Expertise Section */}
        <div className={`mt-24 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Layers size={14} /> Technology Stack
             </div>
             <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Built with the best tools.</h3>
             <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
               Our engineering team selects the right technologies to ensure your product is scalable, secure, and future-proof.
             </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden">
             {/* Tabs */}
             <div className="flex overflow-x-auto no-scrollbar border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 p-2 gap-2">
                {TECH_DOMAINS.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => setActiveTab(domain.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                      activeTab === domain.id
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    {domainIcons[domain.id]}
                    {domain.label}
                  </button>
                ))}
             </div>

             {/* Tab Content */}
             <div className="p-8 md:p-12 min-h-[300px]">
                {TECH_DOMAINS.map((domain) => (
                  <div 
                    key={domain.id} 
                    className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-500 ${
                      activeTab === domain.id 
                        ? 'opacity-100 translate-y-0 relative' 
                        : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                    }`}
                    style={{ display: activeTab === domain.id ? 'grid' : 'none' }}
                  >
                    {domain.skills.map((skill, idx) => (
                      <div 
                        key={skill} 
                        className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group cursor-default hover:bg-white dark:hover:bg-slate-800"
                      >
                         <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors shadow-sm border border-slate-100 dark:border-slate-700">
                            <Terminal size={16} />
                         </div>
                         <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{skill}</span>
                      </div>
                    ))}
                    
                    {/* Decorative Add-on */}
                    <div className="col-span-1 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center p-4 text-slate-400 text-sm font-medium hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-default">
                       And more...
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};