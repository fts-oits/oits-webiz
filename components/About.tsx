import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Lightbulb, Shield, Award, Users, Target, Eye } from 'lucide-react';
import { SectionId } from '../types';
import { TEAM_MEMBERS, CORE_VALUES } from '../constants';

const valueIconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Award: <Award className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
};

export const About: React.FC = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isTeamVisible, setIsTeamVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const teamObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTeamVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    if (teamRef.current) {
      teamObserver.observe(teamRef.current);
    }

    return () => {
      observer.disconnect();
      teamObserver.disconnect();
    };
  }, []);

  return (
    <section id={SectionId.ABOUT} className="py-24 pt-32 bg-white min-h-screen" ref={sectionRef}>
      <div className="container mx-auto px-6">
        
        {/* Intro Section */}
        <div className={`flex flex-col lg:flex-row items-center gap-16 transition-all duration-1000 ease-out transform mb-24 ${isSectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex-1 w-full relative">
             <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 shadow-2xl">
                <img 
                  src="https://picsum.photos/800/800?random=15" 
                  alt="Team collaboration" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="text-3xl font-bold">10+</p>
                    <p className="text-sm opacity-80">Years of Excellence</p>
                  </div>
                </div>
             </div>
             {/* Floater */}
             <div className="absolute -bottom-8 -right-8 w-48 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block animate-float">
               <p className="text-slate-500 text-xs uppercase font-semibold mb-2">Projects Completed</p>
               <p className="text-4xl font-bold text-brand-blue">150+</p>
             </div>
          </div>

          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-3">About OITS Dhaka</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Partnering with startups and enterprises to build the future.
              </h3>
            </div>
            
            <p className="text-slate-600 text-lg leading-relaxed">
              We are a team of passionate developers, designers, and strategists dedicated to delivering digital solutions that make a difference. At OITS Dhaka, we don't just write code; we solve complex business problems through innovation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Agile Methodology', '24/7 Support', 'Dedicated Teams', 'Top-tier Security'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-brand-green w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
               <div className="h-px w-full bg-slate-200 mb-8"></div>
               <div className="flex gap-12">
                 <div>
                   <p className="text-3xl font-bold text-slate-900">50+</p>
                   <p className="text-sm text-slate-500 mt-1">Experts</p>
                 </div>
                 <div>
                   <p className="text-3xl font-bold text-slate-900">98%</p>
                   <p className="text-sm text-slate-500 mt-1">Client Retention</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
             <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center mb-6">
                <Target size={24} />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
             <p className="text-slate-600 leading-relaxed">
               To empower businesses globally by delivering innovative, reliable, and scalable software solutions that drive tangible growth and efficiency.
             </p>
          </div>
          <div className="bg-slate-900 p-10 rounded-3xl text-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-blue-900/20">
             <div className="w-12 h-12 bg-brand-blue text-white rounded-xl flex items-center justify-center mb-6">
                <Eye size={24} />
             </div>
             <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
             <p className="text-slate-300 leading-relaxed">
               To be the most trusted technology partner for organizations seeking to transform their digital presence and operational capabilities.
             </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-3">Our Culture</h2>
            <h3 className="text-3xl font-bold text-slate-900">Core Values that drive us.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE_VALUES.map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all text-center hover:-translate-y-2 duration-300">
                <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  {valueIconMap[value.icon]}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h4>
                <p className="text-sm text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div ref={teamRef}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-3">Our Team</h2>
            <h3 className="text-3xl font-bold text-slate-900">Meet the experts behind our success.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <div 
                key={member.id} 
                className={`group text-center transition-all duration-700 ease-out transform ${isTeamVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-slate-100 group-hover:border-brand-blue/30 transition-colors shadow-lg">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Social Overlay */}
                  <div className="absolute inset-0 bg-brand-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                     {/* Placeholder Social Icons */}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900">{member.name}</h4>
                <p className="text-brand-blue font-medium mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm max-w-xs mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};