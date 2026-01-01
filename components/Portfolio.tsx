import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, X, ExternalLink, Calendar, Code2, ArrowUpRight, Play, Film, Tag, Volume2, VolumeX, Pause, Subtitles, MonitorPlay } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId, Project } from '../types';
import { Button } from './ui/Button';

// --- Types & Constants ---
const ALL_CATEGORY = 'All';
const ALL_TAG = 'All Tech';

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// --- Custom Video Player Component ---
interface CustomVideoPlayerProps {
  src: string;
  captionsUrl?: string;
  poster?: string;
  onClose: () => void;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, captionsUrl, poster, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const onEnded = () => setIsPlaying(false);
    const onLoadedData = () => setIsVideoLoaded(true);
    const onWaiting = () => setIsVideoLoaded(false);
    const onPlaying = () => {
      setIsVideoLoaded(true);
      setIsPlaying(true);
    };
    const onPause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', onEnded);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);

    // Auto-play when mounted
    video.play().catch(err => console.error("Autoplay failed:", err));

    // Focus container for keyboard events
    if (containerRef.current) {
      containerRef.current.focus();
    }

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  // Handle Captions Toggle
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.textTracks && video.textTracks.length > 0) {
      video.textTracks[0].mode = captionsEnabled ? 'showing' : 'hidden';
    }
  }, [captionsEnabled]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => setShowControls(false), 2000);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Reset controls visibility on key press
    handleMouseMove();
    
    switch(e.key) {
      case ' ':
      case 'Enter':
      case 'k':
      case 'K':
        e.preventDefault();
        togglePlay();
        break;
      case 'm':
      case 'M':
        e.preventDefault();
        toggleMute();
        break;
      case 'c':
      case 'C':
        if(captionsUrl) {
           e.preventDefault();
           setCaptionsEnabled(prev => !prev);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setVolume(prev => Math.min(1, prev + 0.1));
        if (videoRef.current) {
           videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1);
           setIsMuted(false);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        setVolume(prev => Math.max(0, prev - 0.1));
        if (videoRef.current) videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1);
        break;
      case 'Escape':
         // Allow escape to bubble up to modal close handler
         break;
    }
  };

  // Prevent arrow key events on inputs from bubbling up to container
  const stopPropagation = (e: React.KeyboardEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black group overflow-hidden flex flex-col justify-center outline-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Video Player"
    >
      {/* Blurred Background for Ambient Loading */}
      {/* We keep this visible until video is fully loaded to provide a nice visual cue */}
      <div 
        className={`absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          backgroundImage: poster ? `url(${poster})` : 'none',
          filter: 'blur(20px) brightness(0.4)',
          transform: 'scale(1.1)' 
        }}
        aria-hidden="true"
      />

      {/* Loading Spinner */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
           <div className="w-16 h-16 border-4 border-white/20 border-t-white/90 rounded-full animate-spin"></div>
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        poster={poster} // Keeps original poster logic as fallback
        className={`relative z-10 w-full h-full object-contain transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        onClick={togglePlay}
        playsInline
        crossOrigin="anonymous"
      >
        {captionsUrl && <track kind="captions" src={captionsUrl} srcLang="en" label="English" default={false} />}
        Your browser does not support the video tag.
      </video>

      {/* Controls Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-4 pt-16 transition-opacity duration-300 z-20 flex flex-col gap-4 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          onKeyDown={stopPropagation}
          aria-label="Seek video"
          aria-valuemin={0}
          aria-valuemax={duration || 100}
          aria-valuenow={currentTime}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:h-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={togglePlay} 
              className="p-3 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label={isPlaying ? "Pause" : "Play"}
              aria-pressed={isPlaying}
            >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
            </button>

            <div className="flex items-center gap-3 group/vol">
              <button 
                onClick={toggleMute} 
                className="p-3 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label={isMuted ? "Unmute" : "Mute"}
                aria-pressed={isMuted}
              >
                {isMuted || volume === 0 ? <VolumeX size={28} /> : <Volume2 size={28} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                onKeyDown={stopPropagation}
                aria-label="Volume"
                aria-valuemin={0}
                aria-valuemax={1}
                aria-valuenow={isMuted ? 0 : volume}
                className="w-20 sm:w-24 h-1.5 bg-white/30 rounded-lg accent-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <span className="text-sm font-mono font-medium opacity-80 select-none hidden sm:block" aria-hidden="true">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {captionsUrl && (
              <button
                onClick={() => setCaptionsEnabled(!captionsEnabled)}
                className={`p-3 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${captionsEnabled ? 'text-blue-400 bg-white/10' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                title={captionsEnabled ? "Disable Captions" : "Enable Captions"}
                aria-label={captionsEnabled ? "Disable Captions" : "Enable Captions"}
                aria-pressed={captionsEnabled}
              >
                <Subtitles size={28} />
              </button>
            )}
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-bold transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="Exit full screen video"
            >
              <ArrowDown size={18} className="rotate-90" /> <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Big Play Button Overlay (when paused) */}
      {!isPlaying && isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
          <div className="w-20 h-20 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white/90 border border-white/20 shadow-xl animate-fade-in">
            <Play size={40} fill="currentColor" className="ml-2" />
          </div>
        </div>
      )}
    </div>
  );
};

// --- Modal Component ---
interface ProjectModalProps {
  project: Project | null;
  autoPlay?: boolean;
  onClose: () => void;
  onProjectSelect: (project: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, autoPlay = false, onClose, onProjectSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(project);
  const [isClosing, setIsClosing] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (project) {
      setActiveProject(project);
      setIsVisible(true);
      setIsClosing(false);
      setIsPlayingVideo(autoPlay && !!project.demoVideoUrl);
      document.body.style.overflow = 'hidden';
      if (contentRef.current) contentRef.current.scrollTop = 0;
      // Focus management would go here in a full app
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project, autoPlay]);

  const handleClose = () => {
    setIsClosing(true);
    // Ensure animation plays out before unmounting
    setTimeout(() => {
      setIsVisible(false);
      onClose();
      setIsClosing(false);
      setIsPlayingVideo(false);
    }, 300);
  };

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

  // Transition classes
  const backdropClass = `fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] transition-opacity duration-300 ease-out ${isClosing ? 'opacity-0' : 'opacity-100'}`;
  const modalContainerClass = `fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none`;
  const modalContentClass = `relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] pointer-events-auto transform origin-center transition-all duration-300 ease-out ${
    isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
  }`;

  return (
    <>
      <div className={backdropClass} onClick={handleClose} aria-hidden="true" />
      <div className={modalContainerClass} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className={modalContentClass}>
          
          <div ref={contentRef} className="overflow-y-auto custom-scrollbar scroll-smooth">
            
            {/* Media Area */}
            <div className={`relative w-full shrink-0 bg-slate-900 ${isPlayingVideo ? 'aspect-video' : 'h-64 md:h-96'}`}>
               {isPlayingVideo && activeProject.demoVideoUrl ? (
                 <CustomVideoPlayer 
                    src={activeProject.demoVideoUrl}
                    captionsUrl={activeProject.captionsUrl}
                    poster={activeProject.imageUrl}
                    onClose={() => setIsPlayingVideo(false)}
                 />
               ) : (
                 <div className="relative w-full h-full group">
                  <img 
                    src={activeProject.imageUrl} 
                    alt={activeProject.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  
                  <button 
                    ref={closeButtonRef}
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors z-30 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20 pointer-events-none">
                    <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm border border-blue-500/50">
                      {activeProject.category}
                    </span>
                    <h3 id="modal-title" className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">{activeProject.title}</h3>
                  </div>

                  {activeProject.demoVideoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                       <button 
                         onClick={() => setIsPlayingVideo(true)}
                         className="pointer-events-auto flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 rounded-full text-white font-bold transition-all hover:scale-105 hover:animate-pulse group/play shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
                         aria-label="Watch demo video"
                       >
                         <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 group-hover/play:scale-110 transition-transform">
                           <Play size={16} fill="currentColor" />
                         </div>
                         Watch Demo
                       </button>
                    </div>
                  )}
                 </div>
               )}
            </div>

            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Project Overview</h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                      {activeProject.fullDescription || activeProject.description}
                    </p>
                  </div>
                  
                  {activeProject.technologies && (
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Code2 size={20} className="text-blue-500" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 hover:border-blue-300 transition-colors cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                   <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 sticky top-6">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">At a Glance</h4>
                      <ul className="space-y-4 text-sm">
                        <li className="flex flex-col pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                          <span className="text-slate-500 dark:text-slate-400 mb-1">Client</span>
                          <span className="font-semibold text-slate-900 dark:text-white">Confidential Partner</span>
                        </li>
                        <li className="flex flex-col pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                          <span className="text-slate-500 dark:text-slate-400 mb-1">Timeline</span>
                          <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                             <Calendar size={14} className="text-blue-500"/> 3 Months
                          </span>
                        </li>
                        <li className="flex flex-col pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                          <span className="text-slate-500 dark:text-slate-400 mb-1">Services</span>
                          <span className="font-semibold text-slate-900 dark:text-white">{activeProject.category}</span>
                        </li>
                      </ul>
                      
                      <Button className="w-full mt-8 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 group" variant="primary" onClick={() => window.open(activeProject.link || '#', '_blank')}>
                        Visit Live Site <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Button>
                   </div>
                </div>
              </div>

              {relatedProjects.length > 0 && (
                <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Projects</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {relatedProjects.map((relProject) => (
                      <div 
                        key={relProject.id} 
                        className="group cursor-pointer"
                        onClick={() => onProjectSelect(relProject)}
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-slate-100 dark:border-slate-700">
                          <img 
                            src={relProject.imageUrl} 
                            alt={relProject.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10 backdrop-blur-[1px]">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-1">
                              View Project <ArrowUpRight size={14} />
                            </div>
                          </div>
                        </div>
                        <h5 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{relProject.title}</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{relProject.category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
          border: 2px solid #fff;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569;
          border-color: #0f172a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}</style>
    </>
  );
};

// --- Project Card Component ---
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onViewDemo: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, onViewDemo }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.disconnect(); };
  }, []);

  // Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current || !isVisible) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate position relative to viewport
      // 0 = top of viewport, 1 = bottom of viewport
      const progress = (rect.top + rect.height / 2) / viewHeight;
      
      // Adjust speed differential (factor) for more pronounced effect
      const speed = 40; 
      const offset = (progress - 0.5) * speed;
      
      setParallaxOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calc

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (project.demoVideoUrl) {
      setShouldLoadVideo(true);
      setTimeout(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {});
        }
      }, 0);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (project.demoVideoUrl && videoRef.current) videoRef.current.pause();
  };

  return (
    <div 
      ref={cardRef}
      className={`group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl dark:hover:shadow-blue-900/10 transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-pointer" onClick={onClick}>
        {/* Parallax Image Container */}
        <div 
          className="absolute inset-0 h-[120%] -top-[10%] w-full will-change-transform"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            loading="lazy" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {project.demoVideoUrl && shouldLoadVideo && (
            <video
                ref={videoRef}
                src={project.demoVideoUrl}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                muted={isMuted}
                loop
                playsInline
                poster={project.imageUrl}
            />
        )}
        
        {!isHovered && project.demoVideoUrl && (
          <div className="absolute top-3 right-3 z-10 bg-slate-900/60 backdrop-blur-md p-1.5 rounded-full text-white/90 border border-white/10 shadow-lg animate-fade-in">
             <Film size={14} />
          </div>
        )}
        
        {project.demoVideoUrl && shouldLoadVideo && isHovered && (
            <button 
                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-all hover:scale-110 animate-fade-in focus:outline-none focus:ring-2 focus:ring-white"
                title={isMuted ? "Unmute" : "Mute"}
                aria-label={isMuted ? "Unmute video preview" : "Mute video preview"}
            >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
        )}
        
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10 bg-slate-900/50 backdrop-blur-[2px]`}>
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 flex flex-col sm:flex-row gap-3 items-center">
            
            {/* View Case Study Button */}
            <button 
              className="bg-white text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm shadow-xl hover:bg-blue-600 hover:text-white flex items-center gap-2 transition-colors border border-transparent hover:border-blue-600/20 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={(e) => { e.stopPropagation(); onClick(); }}
            >
              View Case Study <ArrowUpRight size={16} />
            </button>

            {/* View Demo Button - Visible on Hover */}
            {project.demoVideoUrl && (
              <button 
                className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-xl hover:bg-blue-700 flex items-center gap-2 transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={(e) => { e.stopPropagation(); onViewDemo(); }}
              >
                Watch Demo <MonitorPlay size={16} />
              </button>
            )}

          </div>
        </div>
      </div>
      <div className="p-6 relative z-20 bg-white dark:bg-slate-900" onClick={onClick}>
        <div className="flex items-start justify-between mb-3">
           <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-[10px] font-bold uppercase tracking-wider">{project.category}</span>
        </div>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">{project.description}</p>
        
        {project.technologies && (
            <div className="flex flex-wrap gap-1 mt-3">
                {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">
                        {tech}
                    </span>
                ))}
                {project.technologies.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">+{project.technologies.length - 3}</span>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

// --- Main Portfolio Component ---
export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  
  const [selectedProjectState, setSelectedProjectState] = useState<{ project: Project; autoPlay: boolean } | null>(null);
  
  const [visibleCount, setVisibleCount] = useState(6);
  const [isVisible, setIsVisible] = useState(false);
  const [isFilterAnimating, setIsFilterAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  // Using generic window check instead of router location to avoid routing dependency issues
  const isPage = typeof window !== 'undefined' && window.location.pathname === '/portfolio';
  const HeadingTag = isPage ? 'h1' : 'h3';

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

  const handleCategoryChange = (cat: string) => {
    if (activeCategory === cat) return;
    setIsFilterAnimating(true);
    setTimeout(() => {
      setActiveCategory(cat);
      // Removed resetting activeTag to allow for cross-filtering
      setVisibleCount(6);
      requestAnimationFrame(() => {
        setIsFilterAnimating(false);
      });
    }, 300);
  };

  const handleTagChange = (tag: string) => {
    if (activeTag === tag) return;
    setIsFilterAnimating(true);
    setTimeout(() => {
      setActiveTag(tag);
      setVisibleCount(6);
      requestAnimationFrame(() => {
        setIsFilterAnimating(false);
      });
    }, 300);
  };

  const categories = [ALL_CATEGORY, ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  const allTags = [ALL_TAG, ...Array.from(new Set(PROJECTS.flatMap(p => p.technologies || []))).sort()];

  // Enhanced dynamic counts that respect both filters bi-directionally
  const getCategoryCount = (cat: string) => {
     return PROJECTS.filter(p => {
       const matchCat = cat === ALL_CATEGORY || p.category === cat;
       const matchTag = activeTag === ALL_TAG || (p.technologies && p.technologies.includes(activeTag));
       return matchCat && matchTag;
     }).length;
  };
  
  const getTagCount = (tag: string) => {
    return PROJECTS.filter(p => {
       const matchCat = activeCategory === ALL_CATEGORY || p.category === activeCategory;
       const matchTag = tag === ALL_TAG || (p.technologies && p.technologies.includes(tag));
       return matchCat && matchTag;
    }).length;
  };

  const filteredProjects = PROJECTS.filter(p => {
    return (activeCategory === ALL_CATEGORY || p.category === activeCategory) && 
           (activeTag === ALL_TAG || (p.technologies && p.technologies.includes(activeTag)));
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  const getFadeInClass = (delay: number) => 
    `transition-all duration-700 ease-out transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`;

  return (
    <section ref={sectionRef} id={SectionId.PORTFOLIO} className="py-24 pt-32 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-12 ${getFadeInClass(0)}`}>
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">{isPage ? 'Portfolio' : 'Featured Work'}</h2>
          <HeadingTag className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
            Showcasing our success stories.
          </HeadingTag>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            From concept to launch, we've helped businesses across the globe achieve their digital goals.
          </p>
        </div>

        {/* Category Filters */}
        <div className={`flex flex-wrap justify-center gap-3 mb-8 ${getFadeInClass(0)}`} style={{ transitionDelay: '100ms' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              aria-label={`Filter by category ${cat}, ${getCategoryCount(cat)} projects available`}
              aria-pressed={activeCategory === cat}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform flex items-center gap-2 ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-lg scale-105 ring-2 ring-slate-900 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105'
              }`}
            >
              {cat} 
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full transition-colors duration-300 tabular-nums ml-1 ${
                activeCategory === cat 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {getCategoryCount(cat)}
              </span>
            </button>
          ))}
        </div>

        {/* Tag Filters */}
        <div className={`flex items-center justify-center gap-2 mb-12 overflow-x-auto no-scrollbar py-2 px-4 max-w-5xl mx-auto ${getFadeInClass(0)}`} style={{ transitionDelay: '200ms' }}>
          <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 p-2 rounded-full border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
             <Tag size={16} className="text-slate-400 ml-2" />
             {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                aria-label={`Filter by technology ${tag}, ${getTagCount(tag)} projects available`}
                aria-pressed={activeTag === tag}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                  activeTag === tag
                    ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 shadow-sm'
                    : 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {tag} 
                <span className={`text-[10px] opacity-70 transition-colors duration-200 tabular-nums ml-1 ${getTagCount(tag) === 0 ? 'text-slate-300 dark:text-slate-600' : ''}`}>
                   {getTagCount(tag)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid with Fade Transition */}
        <div className={`transition-opacity duration-300 ease-in-out ${isFilterAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            {displayedProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProjectState({ project, autoPlay: false })} 
                onViewDemo={() => setSelectedProjectState({ project, autoPlay: true })}
              />
            ))}
            {displayedProjects.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center text-slate-400 py-12">
                 <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4"><Code2 className="w-8 h-8 text-slate-300" /></div>
                 <p className="font-medium">No projects found matching your criteria.</p>
                 <button onClick={() => { handleCategoryChange(ALL_CATEGORY); handleTagChange(ALL_TAG); }} className="mt-4 text-brand-blue text-sm hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
        
        {visibleCount < filteredProjects.length && (
          <div className={`mt-16 text-center ${getFadeInClass(0)}`}>
            <Button variant="outline" onClick={() => setVisibleCount(p => p + 3)} className="group px-8 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800">
              View More Projects <ArrowDown className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
        )}
      </div>

      <ProjectModal 
        project={selectedProjectState?.project || null} 
        autoPlay={selectedProjectState?.autoPlay}
        onClose={() => setSelectedProjectState(null)} 
        onProjectSelect={(p) => setSelectedProjectState({ project: p, autoPlay: false })} 
      />
    </section>
  );
};