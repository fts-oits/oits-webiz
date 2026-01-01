import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, Send, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { ADDRESS, CONTACT_EMAIL } from '../constants';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
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

  const validate = (field: string, value: string) => {
    switch (field) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters.' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address.' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters.' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Validate immediately if already touched
    if (touched[id as keyof typeof touched]) {
      setErrors(prev => ({ ...prev, [id]: validate(id, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setTouched(prev => ({ ...prev, [id]: true }));
    setErrors(prev => ({ ...prev, [id]: validate(id, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      name: validate('name', formData.name),
      email: validate('email', formData.email),
      message: validate('message', formData.message)
    };
    
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.values(newErrors).some(err => err !== '')) {
      return;
    }

    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const isFormInvalid = Object.values(errors).some(err => err !== '') || 
                        !formData.name || !formData.email || !formData.message;

  return (
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="space-y-8">
            <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Get in Touch</h2>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                Let's build something <br/> <span className="text-blue-500">extraordinary</span> together.
              </h3>
            </div>
            
            <p className={`text-slate-300 text-lg max-w-md transition-all duration-700 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-6 pt-8">
              {[
                { icon: Mail, label: 'Email Us', value: CONTACT_EMAIL },
                { icon: MapPin, label: 'Visit Us', value: ADDRESS },
                { icon: Phone, label: 'Call Us', value: '+880 1234 567890' }
              ].map((item, idx) => (
                <div key={item.label} className={`flex items-start gap-4 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`} style={{ transitionDelay: `${200 + (idx * 100)}ms` }}>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                    <p className="text-lg font-medium text-slate-100">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`bg-slate-800/50 p-8 md:p-10 rounded-3xl border border-slate-700 transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
             <form onSubmit={handleSubmit} className="space-y-6" noValidate>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 <div className={`group relative transition-all duration-500 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                   <label 
                      htmlFor="name" 
                      className={`block text-sm font-medium mb-2 transition-all duration-500 ease-in-out transform ${
                         errors.name ? 'text-red-400' : 'text-blue-400'
                      } ${
                         formData.name ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-focus-within:opacity-100 group-focus-within:translate-y-0'
                      }`}
                   >
                      Name
                   </label>
                   <input 
                      type="text" 
                      id="name"
                      required
                      className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:shadow-lg focus:-translate-y-0.5 transition-all duration-300 ease-out ${
                        errors.name && touched.name 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/50'
                      }`}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                   />
                   {errors.name && touched.name && (
                     <p className="mt-1 text-xs text-red-400 flex items-center gap-1 animate-fade-in">
                       <AlertCircle size={12} /> {errors.name}
                     </p>
                   )}
                 </div>

                 <div className={`group relative transition-all duration-500 delay-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                   <label 
                      htmlFor="email" 
                      className={`block text-sm font-medium mb-2 transition-all duration-500 ease-in-out transform ${
                         errors.email ? 'text-red-400' : 'text-blue-400'
                      } ${
                         formData.email ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-focus-within:opacity-100 group-focus-within:translate-y-0'
                      }`}
                   >
                      Email
                   </label>
                   <input 
                      type="email" 
                      id="email"
                      required
                      className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:shadow-lg focus:-translate-y-0.5 transition-all duration-300 ease-out ${
                        errors.email && touched.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/50'
                      }`}
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                   />
                   {errors.email && touched.email && (
                     <p className="mt-1 text-xs text-red-400 flex items-center gap-1 animate-fade-in">
                       <AlertCircle size={12} /> {errors.email}
                     </p>
                   )}
                 </div>
               </div>
               
               <div className={`group relative transition-all duration-500 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                 <label 
                    htmlFor="message" 
                    className={`block text-sm font-medium mb-2 transition-all duration-500 ease-in-out transform ${
                       errors.message ? 'text-red-400' : 'text-blue-400'
                    } ${
                       formData.message ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-focus-within:opacity-100 group-focus-within:translate-y-0'
                    }`}
                 >
                    Message
                 </label>
                 <textarea 
                    id="message"
                    required
                    rows={4}
                    className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:shadow-lg focus:-translate-y-0.5 transition-all duration-300 ease-out resize-none ${
                        errors.message && touched.message
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/50'
                    }`}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                 />
                 {errors.message && touched.message && (
                     <p className="mt-1 text-xs text-red-400 flex items-center gap-1 animate-fade-in">
                       <AlertCircle size={12} /> {errors.message}
                     </p>
                   )}
               </div>

               <div className={`transition-all duration-500 delay-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                 <Button 
                   type="submit" 
                   variant="primary" 
                   size="lg" 
                   className="w-full bg-blue-600 hover:bg-blue-700 border-none shadow-lg shadow-blue-900/20 active:scale-95 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
                   disabled={status === 'sending' || isFormInvalid}
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