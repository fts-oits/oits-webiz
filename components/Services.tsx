import React, { useState, useRef, useEffect } from 'react';
import { Globe, Smartphone, PenTool, Cloud, ArrowUpRight, Layout, Server, Database, Cpu, DollarSign, Heart, ShoppingBag, BookOpen, Home, Truck } from 'lucide-react';
import { SERVICES, INDUSTRIES } from '../constants';
import { SectionId } from '../types';
import { Tooltip } from './ui/Tooltip';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  PenTool: <PenTool className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
};

const industryIconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  ShoppingBag: <ShoppingBag className="w-8 h-8" />,
  BookOpen: <BookOpen className="w-8 h-8" />,
  Home: <Home className="w-8 h-8" />,
  Truck: <Truck className="w-8 h-8" />,
};

const TECH_CATEGORIES = {
  'Frontend': {
    icon: <Layout size={18} />,
    description: 'Building responsive and interactive user interfaces.',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vue.js']
  },
  'Backend': {
    icon: <Server size={18} />,
    description: 'Robust server-side logic and API development.',
    stack: ['Node.js', 'Python', 'Go', 'Express', 'NestJS', 'Django']
  },
  'Database': {
    icon: <Database size={18} />,
    description: 'Secure and scalable data storage solutions.',
    stack: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Supabase', 'Prisma']
  },
  'DevOps': {
    icon: <Cpu size={18} />,
    description: 'Streamlined deployment and infrastructure management.',
    stack: ['AWS', 'Docker', 'Kubernetes', 'Google Cloud', 'CI/CD', 'Terraform']
  }
};

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof TECH_CATEGORIES>('Frontend');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id={SectionId.SERVICES} className="py-24 pt-32 bg-white relative min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Intro */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 ${getFadeInClass(0)}`}>
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-3">Our Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Comprehensive solutions for your <br/>digital transformation.
            </h3>
          </div>
          <p className="text-slate-600 max-w-md pb-2">
            We leverage modern architectures and industry best practices to build software that lasts.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className={`group relative bg-slate-50 border border-slate-100 rounded-3xl p-8 transition-all duration-300 hover:bg-slate-100 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] ${
                index === 0 || index === 3 ? 'lg:col-span-2' : ''
              } ${getFadeInClass(100 + (index * 100))}`}
              style={styleDelay(100 + (index * 100))}
            >
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-6 h-6 text-slate-400" />
              </div>

              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors cursor-help">
                <Tooltip content={service.title}>
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {iconMap[service.icon]}
                  </div>
                </Tooltip>
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
        </div>

        {/* Industries Section */}
        <div className={`mb-32 ${getFadeInClass(300)}`} style={{ transitionDelay: '300ms' }}>
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-3">Industries</h2>
            <h3 className="text-3xl font-bold text-slate-900">We serve diverse business domains.</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {INDUSTRIES.map((industry, index) => (
               <div 
                key={industry.name} 
                className={`flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl hover:border-brand-blue/30 hover:shadow-md transition-all group hover:-translate-y-1 hover:scale-105 duration-300 ${getFadeInClass(400 + (index * 50))}`}
                style={styleDelay(400 + (index * 50))}
              >
                 <div className="text-slate-400 group-hover:text-brand-purple transition-colors mb-3">
                    {industryIconMap[industry.icon]}
                 </div>
                 <span className="font-semibold text-slate-900 text-sm">{industry.name}</span>
               </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className={`bg-slate-900 rounded-3xl p-8 md:p-12 overflow-hidden relative ${getFadeInClass(600)}`} style={{ transitionDelay: '600ms' }}>
           <div className="relative z-10">
             <div className="mb-10 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Technology Stack</h3>
                <p className="text-slate-400 max-w-2xl">
                  We rely on a robust ecosystem of tools and frameworks to deliver world-class performance and security.
                </p>
             </div>

             <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
               {/* Tabs */}
               <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 min-w-max no-scrollbar">
                 {(Object.keys(TECH_CATEGORIES) as Array<keyof typeof TECH_CATEGORIES>).map((category) => (
                   <button
                     key={category}
                     onClick={() => setActiveTab(category)}
                     className={`flex items-center gap-3 px-6 py-4 rounded-xl text-left transition-all duration-200 ${
                       activeTab === category 
                         ? 'bg-brand-blue text-white shadow-lg shadow-blue-900/20 translate-x-2 lg:translate-x-0' 
                         : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                     }`}
                   >
                     {TECH_CATEGORIES[category].icon}
                     <span className="font-semibold">{category}</span>
                   </button>
                 ))}
               </div>

               {/* Content */}
               <div 
                 key={activeTab}
                 className="flex-1 bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 animate-fade-in"
               >
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-white mb-2">{activeTab}</h4>
                    <p className="text-slate-400 text-sm">{TECH_CATEGORIES[activeTab].description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {TECH_CATEGORIES[activeTab].stack.map((tech) => (
                      <div key={tech} className="bg-slate-900/80 border border-slate-700 rounded-lg p-4 text-center hover:border-brand-blue/50 hover:bg-slate-800 transition-all duration-300">
                        <span className="text-slate-200 font-medium text-sm">{tech}</span>
                      </div>
                    ))}
                  </div>
               </div>
             </div>
           </div>

           {/* Decorative Background */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </div>

      </div>
    </section>
  );
};