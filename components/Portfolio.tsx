import React from 'react';
import { PROJECTS } from '../constants';
import { SectionId } from '../types';

export const Portfolio: React.FC = () => {
  return (
    <section id={SectionId.PORTFOLIO} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Featured Work</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            Showcasing our success stories.
          </h3>
          <p className="text-slate-600">
            From concept to launch, we've helped businesses across the globe achieve their digital goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-slate-900 px-6 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Case Study
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{project.category}</p>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h4>
                <p className="text-slate-600 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
           <a href="#" className="inline-flex items-center text-slate-900 font-semibold border-b-2 border-slate-900 hover:text-blue-600 hover:border-blue-600 transition-colors pb-1">
             View All Projects
           </a>
        </div>
      </div>
    </section>
  );
};