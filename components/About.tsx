import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Target, Heart, Users } from 'lucide-react';
import { SectionId } from '../types';

const TEAM = [
  {
    name: 'Alex Morgan',
    role: 'CEO & Founder',
    image: 'https://picsum.photos/400/400?random=20',
  },
  {
    name: 'Sarah Chen',
    role: 'Lead Architect',
    image: 'https://picsum.photos/400/400?random=21',
  },
  {
    name: 'James Wilson',
    role: 'Head of Design',
    image: 'https://picsum.photos/400/400?random=22',
  },
  {
    name: 'Maria Garcia',
    role: 'Project Manager',
    image: 'https://picsum.photos/400/400?random=23',
  },
];

export const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTeamVisible, setIsTeamVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

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

  // Separate observer for Team section to ensure staggered animation plays when user scrolls to it
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTeamVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 } 
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={SectionId.ABOUT} className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          
          <div className={`flex-1 w-full relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
             <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-2xl group">
                <img 
                  src="https://picsum.photos/800/800?random=15" 
                  alt="Team collaboration" 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="text-3xl font-bold">10+</p>
                    <p className="text-sm opacity-80">Years of Excellence</p>
                  </div>
                </div>
             </div>
             {/* Floater */}
             <div className="absolute -bottom-8 -right-8 w-48 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 hidden md:block z-10">
               <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold mb-2">Projects Completed</p>
               <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">150+</p>
             </div>
          </div>

          <div className="flex-1 space-y-12">
            {/* Mission & Vision Subsection */}
            <div className={`space-y-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div>
                <div className="flex items-center gap-2 mb-3">
                   <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                   <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Our Mission & Vision</h2>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                  Partnering with startups and enterprises to build the future.
                </h3>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                We are a team of passionate developers, designers, and strategists dedicated to delivering digital solutions that make a difference. At OITS Dhaka, we don't just write code; we solve complex business problems through innovation.
              </p>
            </div>

            {/* Core Values Subsection */}
            <div className={`transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
               <div className="flex items-center gap-2 mb-6">
                   <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                   <h4 className="text-lg font-bold text-slate-900 dark:text-white">Core Values</h4>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Agile Methodology', '24/7 Support', 'Dedicated Teams', 'Top-tier Security'].map((item, idx) => (
                    <div 
                      key={item} 
                      className={`flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50 transition-all duration-500`} 
                      style={{ transitionDelay: `${300 + (idx * 50)}ms` }}
                    >
                      <CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">{item}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className={`pt-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
               <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mb-8"></div>
               <div className="flex gap-12">
                 <div>
                   <p className="text-3xl font-bold text-slate-900 dark:text-white">50+</p>
                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Experts</p>
                 </div>
                 <div>
                   <p className="text-3xl font-bold text-slate-900 dark:text-white">98%</p>
                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Client Retention</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div ref={teamRef}>
          <div className={`text-center mb-12 transition-all duration-700 ease-out ${isTeamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Our Team</h2>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Meet the minds behind the magic.</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, index) => (
              <div 
                key={member.name}
                className={`group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-700 ease-out transform ${isTeamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-lg">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">{member.name}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{member.role}</p>
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