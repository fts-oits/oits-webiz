import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, X, ExternalLink, Calendar, Code2, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId, Project } from '../types';
import { Button } from './ui/Button';

// --- Types & Constants ---
const ALL_CATEGORY = 'All';

// --- Modal Component ---
interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onProjectSelect: (project: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onProjectSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(project);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (project) {
      setActiveProject(project);
      setIsVisible(true);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    } else {
       // Reset active project after animation if needed, handled by isVisible logic
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!isVisible || !activeProject) return null;

  const relatedProjects = PROJECTS.filter(
    p => p.category === activeProject.category && p.id !== activeProject.id
  ).slice(0, 3);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100 animate-in fade-in zoom-in-95'}`}>
        
        {/* Scrollable Container */}
        <div className="overflow-y-auto custom-scrollbar">
          
          {/* Header Image */}
          <div className="relative h-64 md:h-96 shrink-0">
            <img 
              src={activeProject.imageUrl} 
              alt={activeProject.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors z-10"
            >
              <X size={24} />
            </button>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
                {activeProject.category}
              </span>
              <h3 className="text-3xl md:text-5xl font-bold mb-2">{activeProject.title}</h3>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              
              {/* Main Description */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Project Overview</h4>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {activeProject.fullDescription || activeProject.description}
                  </p>
                </div>
                
                {activeProject.technologies && (
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Code2 size={20} className="text-blue-600" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech) => (
                        <span key={tech} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium border border-slate-200 hover:border-blue-200 transition-colors cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Details */}
              <div className="space-y-6">
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-6 text-lg">At a Glance</h4>
                    <ul className="space-y-4 text-sm">
                      <li className="flex flex-col pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                        <span className="text-slate-500 mb-1">Client</span>
                        <span className="font-semibold text-slate-900">Confidential Partner</span>
                      </li>
                      <li className="flex flex-col pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                        <span className="text-slate-500 mb-1">Timeline</span>
                        <span className="font-semibold text-slate-900 flex items-center gap-2">
                           <Calendar size={14} className="text-blue-500"/> 3 Months
                        </span>
                      </li>
                      <li className="flex flex-col pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                        <span className="text-slate-500 mb-1">Services</span>
                        <span className="font-semibold text-slate-900">{activeProject.category}</span>
                      </li>
                    </ul>
                    
                    <Button className="w-full mt-8 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20" variant="primary" onClick={() => window.open(activeProject.link || '#', '_blank')}>
                      Visit Live Site <ExternalLink size={16} />
                    </Button>
                 </div>
              </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="mt-16 pt-10 border-t border-slate-100">
                <h4 className="text-2xl font-bold text-slate-900 mb-6">Related Projects</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedProjects.map((relProject) => (
                    <div 
                      key={relProject.id} 
                      className="group cursor-pointer"
                      onClick={() => onProjectSelect(relProject)}
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                        <img 
                          src={relProject.imageUrl} 
                          alt={relProject.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                      </div>
                      <h5 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{relProject.title}</h5>
                      <p className="text-xs text-slate-500">{relProject.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Project Card Component ---
const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Parallax Effect
    const handleScroll = () => {
      if (wrapperRef.current) {
        const parent = wrapperRef.current.parentElement;
        if (parent) {
          const rect = parent.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          if (rect.top < windowHeight && rect.bottom > 0) {
            const speed = 0.1;
            const yOffset = (windowHeight - rect.top) * speed - (windowHeight * speed * 0.5);
            wrapperRef.current.style.transform = `translateY(${yOffset}px)`;
          }
        }
      }
    };

    // Visibility Observer for Entrance Animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
        <div 
          ref={wrapperRef} 
          className="absolute inset-0 h-[120%] -top-[10%] w-full will-change-transform"
        >
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        
        {/* Hover Overlay with Button */}
        <div 
          className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10 cursor-pointer backdrop-blur-[2px]" 
          onClick={onClick}
        >
          <button className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm shadow-xl hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 group/btn">
            View Case Study 
            <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
      <div className="p-6 relative z-20 bg-white">
        <div className="flex items-start justify-between mb-3">
           <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{project.category}</p>
        </div>
        <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h4>
        <p className="text-slate-600 text-sm line-clamp-2">{project.description}</p>
      </div>
    </div>
  );
};

// --- Main Portfolio Component ---
export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Derive unique categories
  const categories = [ALL_CATEGORY, ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  // Filter projects
  const filteredProjects = activeCategory === ALL_CATEGORY 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  return (
    <section id={SectionId.PORTFOLIO} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Featured Work</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            Showcasing our success stories.
          </h3>
          <p className="text-slate-600">
            From concept to launch, we've helped businesses across the globe achieve their digital goals.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {displayedProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
          
          {displayedProjects.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center text-slate-400 py-12">
               <p>No projects found in this category.</p>
            </div>
          )}
        </div>
        
        {hasMore && (
          <div className="mt-16 text-center">
            <Button 
              variant="outline"
              onClick={handleLoadMore}
              className="group"
            >
              View More Projects
              <ArrowDown className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onProjectSelect={setSelectedProject}
      />
    </section>
  );
};