import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, Send, AlertCircle, CheckCircle2, Loader2, Clock } from 'lucide-react';
import { Button } from './ui/Button';
import { ADDRESS, CONTACT_EMAIL } from '../constants';
import { SectionId } from '../types';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'Name is required' : undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
        return undefined;
      case 'subject':
        return !value.trim() ? 'Subject is required' : undefined;
      case 'message':
        return !value.trim() ? 'Message is required' : undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Real-time validation
    const error = validateField(id, value);
    setErrors(prev => ({
      ...prev,
      [id]: error
    }));
  };

  // Animation helper
  const getAnimationClass = (delay: number) => 
    `transition-all duration-700 ease-out transform will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;

  return (
    <section id={SectionId.CONTACT} className="py-24 pt-32 bg-slate-900 text-white relative overflow-hidden min-h-screen" ref={sectionRef}>
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-brand-green uppercase tracking-widest mb-3">Contact Us</h2>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Let's Start a Conversation.
          </h3>
          <p className="text-slate-400 text-lg">
            Whether you have a question about our services, pricing, or need a custom solution, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-brand-blue/50 transition-colors">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-brand-green mb-6">
              <Mail size={24} />
            </div>
            <h4 className="text-xl font-bold mb-2">Email Us</h4>
            <p className="text-slate-400 text-sm mb-4">Our team is here to help.</p>
            <p className="font-semibold text-brand-green">{CONTACT_EMAIL}</p>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-brand-blue/50 transition-colors">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-brand-green mb-6">
              <MapPin size={24} />
            </div>
            <h4 className="text-xl font-bold mb-2">Visit Us</h4>
            <p className="text-slate-400 text-sm mb-4">Come say hello at our office.</p>
            <p className="font-semibold text-brand-green">{ADDRESS}</p>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-brand-blue/50 transition-colors">
             <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-brand-green mb-6">
               <Phone size={24} />
             </div>
             <h4 className="text-xl font-bold mb-2">Call Us</h4>
             <p className="text-slate-400 text-sm mb-4">Mon-Fri from 8am to 5pm.</p>
             <p className="font-semibold text-brand-green">+880 1234 567890</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-800/30 p-8 md:p-12 rounded-3xl border border-slate-800">
           
           {/* Contact Form */}
           <div>
             <h3 className={`text-2xl font-bold mb-6 ${getAnimationClass(0)}`}>Send us a message</h3>
             {status === 'success' && (
                <div className="bg-brand-green/10 border border-brand-green/20 rounded-lg p-4 mb-6 flex items-start gap-3 animate-slide-in-top">
                  <CheckCircle2 className="text-brand-green shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-brand-green font-semibold text-sm">Message Sent Successfully!</h4>
                    <p className="text-brand-green/80 text-xs mt-1">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
             )}

             <form onSubmit={handleSubmit} className="space-y-6" noValidate>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className={`space-y-2 ${getAnimationClass(100)}`} style={{ transitionDelay: '100ms' }}>
                   <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
                   <input 
                      type="text" 
                      id="name"
                      disabled={status === 'sending'}
                      className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-brand-blue'}`}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                   />
                   {errors.name && <p className="text-red-400 text-xs flex items-center mt-1"><AlertCircle size={12} className="mr-1"/> {errors.name}</p>}
                 </div>
                 <div className={`space-y-2 ${getAnimationClass(200)}`} style={{ transitionDelay: '200ms' }}>
                   <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                   <input 
                      type="email" 
                      id="email"
                      disabled={status === 'sending'}
                      className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-brand-blue'}`}
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                   />
                   {errors.email && <p className="text-red-400 text-xs flex items-center mt-1"><AlertCircle size={12} className="mr-1"/> {errors.email}</p>}
                 </div>
               </div>
               
               <div className={`space-y-2 ${getAnimationClass(300)}`} style={{ transitionDelay: '300ms' }}>
                 <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                 <input 
                    type="text" 
                    id="subject"
                    disabled={status === 'sending'}
                    className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${errors.subject ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-brand-blue'}`}
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                 />
                 {errors.subject && <p className="text-red-400 text-xs flex items-center mt-1"><AlertCircle size={12} className="mr-1"/> {errors.subject}</p>}
               </div>

               <div className={`space-y-2 ${getAnimationClass(400)}`} style={{ transitionDelay: '400ms' }}>
                 <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                 <textarea 
                    id="message"
                    rows={4}
                    disabled={status === 'sending'}
                    className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-brand-blue'}`}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                 />
                 {errors.message && <p className="text-red-400 text-xs flex items-center mt-1"><AlertCircle size={12} className="mr-1"/> {errors.message}</p>}
               </div>

               <div className={getAnimationClass(500)} style={{ transitionDelay: '500ms' }}>
                 <Button 
                   type="submit" 
                   variant="primary" 
                   size="lg" 
                   className="w-full bg-brand-blue hover:bg-brand-blue/90 border-none disabled:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed"
                   disabled={status === 'sending'}
                 >
                   {status === 'sending' ? (
                     <span className="flex items-center">
                       <Loader2 className="animate-spin mr-2 h-4 w-4" />
                       Sending...
                     </span>
                   ) : status === 'success' ? 'Message Sent!' : (
                     <span className="flex items-center">
                       Send Message <Send className="ml-2 w-4 h-4" />
                     </span>
                   )}
                 </Button>
               </div>
             </form>
           </div>

           {/* Map Placeholder */}
           <div className={`h-full min-h-[400px] bg-slate-900 rounded-xl overflow-hidden relative ${getAnimationClass(600)}`} style={{ transitionDelay: '600ms' }}>
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430136!2d90.39108331536293!3d23.75085809467772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad3b91bf%3A0xb00b1297e6466f8!2sKarwan%20Bazar%2C%20Dhaka%201215!5e0!3m2!1sen!2sbd!4v1646808542314!5m2!1sen!2sbd" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy"
               className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
             ></iframe>
             <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur p-4 rounded-lg border border-slate-700">
               <div className="flex items-center gap-2 text-sm font-medium">
                 <Clock size={16} className="text-brand-green"/>
                 <span>9:00 AM - 6:00 PM (Sun-Thu)</span>
               </div>
             </div>
           </div>

        </div>
      </div>
    </section>
  );
};