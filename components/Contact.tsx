import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from './ui/Button';
import { ADDRESS, CONTACT_EMAIL } from '../constants';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [isVisible, setIsVisible] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="space-y-8">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Get in Touch</h2>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                Let's build something <br/> <span className="text-blue-500">extraordinary</span> together.
              </h3>
            </div>
            
            <p className={`text-slate-400 text-lg max-w-md transition-all duration-1000 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-6 pt-8">
              {[
                { icon: Mail, label: 'Email Us', value: CONTACT_EMAIL },
                { icon: MapPin, label: 'Visit Us', value: ADDRESS },
                { icon: Phone, label: 'Call Us', value: '+880 1234 567890' }
              ].map((item, idx) => (
                <div key={item.label} className={`flex items-start gap-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: `${200 + (idx * 100)}ms` }}>
                  <div className="p-3 bg-slate-800 rounded-lg">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                    <p className="text-lg font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`bg-slate-800/50 p-8 md:p-10 rounded-3xl border border-slate-700 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
             <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className={`space-y-2 transition-all duration-700 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                   <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
                   <input 
                      type="text" 
                      id="name"
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:shadow-lg focus:-translate-y-0.5 transition-all duration-300 ease-out"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                   />
                 </div>
                 <div className={`space-y-2 transition-all duration-700 delay-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                   <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                   <input 
                      type="email" 
                      id="email"
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:shadow-lg focus:-translate-y-0.5 transition-all duration-300 ease-out"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                   />
                 </div>
               </div>
               
               <div className={`space-y-2 transition-all duration-700 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                 <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                 <textarea 
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:shadow-lg focus:-translate-y-0.5 transition-all duration-300 ease-out resize-none"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                 />
               </div>

               <div className={`transition-all duration-700 delay-800 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                 <Button 
                   type="submit" 
                   variant="primary" 
                   size="lg" 
                   className="w-full bg-blue-600 hover:bg-blue-700 border-none shadow-lg shadow-blue-900/20 active:scale-95 transition-transform"
                   disabled={status === 'sending'}
                 >
                   {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : (
                     <span className="flex items-center">
                       Send Message <Send className="ml-2 w-4 h-4" />
                     </span>
                   )}
                 </Button>
               </div>
             </form>
          </div>

        </div>
      </div>
    </section>
  );
};