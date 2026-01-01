import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SectionId } from '../types';

export const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1 w-full relative">
             <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100">
                <img 
                  src="https://picsum.photos/800/800?random=15" 
                  alt="Team collaboration" 
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
             <div className="absolute -bottom-8 -right-8 w-48 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
               <p className="text-slate-500 text-xs uppercase font-semibold mb-2">Projects Completed</p>
               <p className="text-4xl font-bold text-blue-600">150+</p>
             </div>
          </div>

          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">About OITS Dhaka</h2>
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
                  <CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0" />
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
      </div>
    </section>
  );
};