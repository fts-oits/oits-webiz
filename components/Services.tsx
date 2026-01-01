import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Globe, Smartphone, PenTool, Cloud, ArrowUpRight, Layout, Server, Database, Cpu, DollarSign, Heart, ShoppingBag, BookOpen, Home, Truck } from 'lucide-react';
import { SERVICES, INDUSTRIES } from '../constants';
import { SectionId } from '../types';
import { Tooltip } from './ui/Tooltip';

// Map specific abstract/modern imagery to service IDs for a unique "generated" look
const serviceBackgrounds: Record<string, string> = {
  'web-dev': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', // Abstract 3D Shapes
  'mobile-dev': 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80', // Fluid Gradient
  'ui-ux': 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80', // Neon Abstract
  'cloud': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', // Tech/Network
};

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
  const location = useLocation();
  const isPage = location.pathname === '/services';
  
  const HeadingTag = isPage ? 'h1' : 'h3';
  const sectionLabel = isPage ? 'Services' : 'Our Expertise';

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
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
    }`;

  const styleDelay = (index: number) => ({ transitionDelay: `${index}ms` });

  return (
    <section 
      ref={sectionRef}
      id={SectionId.SERVICES} 
      className="py-24 pt-32 bg-white dark:bg-slate-950 relative min-h-screen transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        
        {/* Intro */}
        <div className={`mb-16 max-w-3xl ${getFadeInClass(0)}`}>
          <h2 className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-3">{sectionLabel}</h2>
          <HeadingTag className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            Comprehensive solutions for your <br/>digital transformation.
          </HeadingTag>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed border-l-4 border-brand-blue pl-6">
            We leverage modern architectures and industry best practices to build software that lasts. Our diverse range of services is designed to scale with your business and drive technological advancement.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className={`group relative rounded-3xl overflow-hidden hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl ${
                index === 0 || index === 3 ? 'lg:col-span-2' : ''
              } ${getFadeInClass(0)}`}
              style={styleDelay(index * 150)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={serviceBackgrounds[service.id]} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-0 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 via-slate-50/90 to-slate-100/90 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-900/80 group-hover:from-slate-50/80 group-hover:to-slate-100/40 dark:group-hover:from-slate-900/90 dark:group-hover:to-slate-900/60 transition-all duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-8 h-full flex flex-col backdrop-blur-[1px] group-hover:backdrop-blur-[2px] transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white shadow-md group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                    <Tooltip content={service.title}>
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        {iconMap[service.icon]}
                      </div>
                    </Tooltip>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-white/30 dark:bg-black/30 p-2 rounded-full backdrop-blur-md">
                    <ArrowUpRight className="w-5 h-5 text-slate-900 dark:text-white" />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-blue dark:group-hover:text-brand-purple transition-colors">{service.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors duration-300">{service.description}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 backdrop-blur-sm shadow-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industries Section */}
        <div className={`mb-32 ${getFadeInClass(0)}`} style={styleDelay(200)}>
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-3">Industries</h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">We serve diverse business domains.</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {INDUSTRIES.map((industry, index) => (
               <div 
                 key={industry.name} 
                 className={`flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-brand-blue/30 hover:shadow-md dark:hover:shadow-blue-900/10 transition-all group hover:-translate-y-1 hover:scale-105 duration-300 cursor-default ${getFadeInClass(0)}`}
                 style={styleDelay(300 + (index * 50))}
               >
                 <div className="text-slate-400 group-hover:text-brand-purple transition-colors mb-3">
                    {industryIconMap[industry.icon]}
                 </div>
                 <span className="font-semibold text-slate-900 dark:text-white text-sm">{industry.name}</span>
               </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className={`bg-slate-900 rounded-3xl p-8 md:p-12 overflow-hidden relative shadow-2xl ${getFadeInClass(0)}`} style={styleDelay(400)}>
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
                 className="flex-1 bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 animate-fade-in backdrop-blur-sm"
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
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
};