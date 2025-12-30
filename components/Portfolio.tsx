import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, X, ExternalLink, Calendar, Code2, ArrowUpRight, Play, Film, Tag } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId, Project } from '../types';
import { Button } from './ui/Button';

// --- Types & Constants ---
const ALL_CATEGORY = 'All';
const ALL_TAG = 'All Tech';

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
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      setActiveProject(project);
      setIsVisible(true);
      setIsClosing(false);
      setIsPlayingVideo(false);
      document.body.style.overflow = 'hidden';
      // Reset scroll position when project changes
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to finish
    setTimeout(() => {
      setIsVisible(false);
      onClose();
      setIsClosing(false);
      setIsPlayingVideo(false);
    }, 300);
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

  // Animation Classes
  const backdropClass = `absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity duration-300 ease-out ${isClosing ? 'opacity-0' : 'opacity-100'}`;
  
  const modalBaseClass = "relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transform";
  const animationClass = isClosing 
    ? 'opacity-0 scale-100 transition-all duration-300 ease-out' 
    : 'animate-zoom-in';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className={backdropClass} 
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div 
        className={`${modalBaseClass} ${animationClass}`}
      >
        
        {/* Scrollable Container */}
        <div ref={contentRef} className="overflow-y-auto custom-scrollbar scroll-smooth">
          
          {/* Header Media (Image or Video) */}
          <div className="relative h-64 md:h-96 shrink-0 group bg-slate-900">
             {isPlayingVideo && activeProject.demoVideoUrl ? (
               <div className="w-full h-full flex items-center justify-center">
                 <video 
                   src={activeProject.demoVideoUrl} 
                   controls 
                   autoPlay 
                   className="w-full h-full object-contain"
                 />
                 <button 
                   onClick={() => setIsPlayingVideo(false)}
                   className="absolute top-4 left-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-20"
                 >
                   Back to Image
                 </button>
               </div>
             ) : (
               <>
                <img 
                  src={activeProject.imageUrl} 
                  alt={activeProject.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                
                {activeProject.demoVideoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                     <button 
                       onClick={() => setIsPlayingVideo(true)}
                       className="pointer-events-auto flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 rounded-full text-white font-bold transition-all hover:scale-105 group/play"
                     >
                       <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-blue group-hover/play:scale-110 transition-transform">
                         <Play size={16} fill="currentColor" />
                       </div>
                       Watch Demo
                     </button>
                  </div>
                )}
               </>
             )}
            
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors z-30"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            
            {!isPlayingVideo && (
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
                <span className="inline-block px-3 py-1 bg-brand-blue rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm border border-blue-500/50">
                  {activeProject.category}
                </span>
                <h3 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">{activeProject.title}</h3>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
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
                      <Code2 size={20} className="text-brand-blue" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech) => (
                        <span key={tech} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium border border-slate-200 hover:border-brand-blue/30 transition-colors cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Details */}
              <div className="space-y-6">
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 sticky top-6">
                    <h4 className="font-bold text-slate-900 mb-6 text-lg">At a Glance</h4>
                    <ul className="space-y-4 text-sm">
                      <li className="flex flex-col pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                        <span className="text-slate-500 mb-1">Client</span>
                        <span className="font-semibold text-slate-900">Confidential Partner</span>
                      </li>
                      <li className="flex flex-col pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                        <span className="text-slate-500 mb-1">Timeline</span>
                        <span className="font-semibold text-slate-900 flex items-center gap-2">
                           <Calendar size={14} className="text-brand-blue"/> 3 Months
                        </span>
                      </li>
                      <li className="flex flex-col pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                        <span className="text-slate-500 mb-1">Services</span>
                        <span className="font-semibold text-slate-900">{activeProject.category}</span>
                      </li>
                    </ul>
                    
                    <Button className="w-full mt-8 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 group" variant="primary" onClick={() => window.open(activeProject.link || '#', '_blank')}>
                      Visit Live Site <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
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
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-slate-100">
                        <img 
                          src={relProject.imageUrl} 
                          alt={relProject.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                         {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10 backdrop-blur-[1px]">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-1">
                            View Project <ArrowUpRight size={14} />
                          </div>
                        </div>
                      </div>
                      <h5 className="font-bold text-slate-900 group-hover:text-brand-purple transition-colors">{relProject.title}</h5>
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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
      className={`group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
        
        {/* Hover Overlay with Distinct Button */}
        <div 
          className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10 cursor-pointer backdrop-blur-[2px]" 
          onClick={onClick}
        >
          {/* Wrapper for entrance transition to avoid conflict with pulse animation */}
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 flex flex-col items-center gap-3">
            <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm shadow-xl hover:bg-brand-purple hover:text-white flex items-center gap-2 group/btn transition-colors animate-subtle-pulse">
              View Case Study 
              <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
            
            {project.demoVideoUrl && (
               <span className="inline-flex items-center gap-1 text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                 <Film size={12} />
                 Video Demo Available
               </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 relative z-20 bg-white">
        <div className="flex items-start justify-between mb-3">
           <span className="px-2 py-1 bg-brand-blue/10 text-brand-blue rounded text-[10px] font-bold uppercase tracking-wider">{project.category}</span>
           {/* Tags Preview */}
           <div className="flex gap-1">
             {project.technologies?.slice(0, 2).map(t => (
               <span key={t} className="w-2 h-2 rounded-full bg-slate-200" title={t}></span>
             ))}
           </div>
        </div>
        <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-purple transition-colors">{project.title}</h4>
        <p className="text-slate-600 text-sm line-clamp-2">{project.description}</p>
      </div>
    </div>
  );
};

// --- Main Portfolio Component ---
export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Derive unique categories and tags
  const categories = [ALL_CATEGORY, ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  
  const allTags = [ALL_TAG, ...Array.from(new Set(PROJECTS.flatMap(p => p.technologies || []))).sort()];

  const getCategoryCount = (cat: string) => {
    if (cat === ALL_CATEGORY) return PROJECTS.length;
    return PROJECTS.filter(p => p.category === cat).length;
  };

  // Filter projects
  const filteredProjects = PROJECTS.filter(p => {
    const categoryMatch = activeCategory === ALL_CATEGORY || p.category === activeCategory;
    const tagMatch = activeTag === ALL_TAG || (p.technologies && p.technologies.includes(activeTag));
    return categoryMatch && tagMatch;
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setVisibleCount(6);
  };

  return (
    <section id={SectionId.PORTFOLIO} className="py-24 pt-32 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-3">Featured Work</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            Showcasing our success stories.
          </h3>
          <p className="text-slate-600 text-lg">
            From concept to launch, we've helped businesses across the globe achieve their digital goals.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform ${
                activeCategory === cat
                  ? 'bg-brand-blue text-white shadow-lg scale-105 ring-2 ring-brand-blue ring-offset-2 ring-offset-slate-50'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:scale-105'
              }`}
            >
              {cat}
              <span className={`ml-2 text-xs font-bold ${activeCategory === cat ? 'text-slate-200' : 'text-slate-400'}`}>
                {getCategoryCount(cat)}
              </span>
            </button>
          ))}
        </div>

        {/* Tech Tag Filters */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto no-scrollbar py-2 px-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 bg-white/50 p-2 rounded-full border border-slate-200 backdrop-blur-sm">
             <Tag size={16} className="text-slate-400 ml-2" />
             <div className="w-px h-4 bg-slate-300 mx-1"></div>
             {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTag === tag
                    ? 'bg-slate-800 text-white shadow-md'
                    : 'bg-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
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
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Code2 className="w-8 h-8 text-slate-300" />
               </div>
               <p className="font-medium">No projects found for these filters.</p>
               <button 
                 onClick={() => { setActiveCategory(ALL_CATEGORY); setActiveTag(ALL_TAG); }}
                 className="mt-4 text-brand-blue text-sm hover:underline"
               >
                 Clear all filters
               </button>
            </div>
          )}
        </div>
        
        {hasMore && (
          <div className="mt-16 text-center">
            <Button 
              variant="outline"
              onClick={handleLoadMore}
              className="group px-8"
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