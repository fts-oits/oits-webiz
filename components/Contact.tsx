import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from './ui/Button';
import { ADDRESS, CONTACT_EMAIL } from '../constants';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

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
    <section id={SectionId.CONTACT} className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Get in Touch</h2>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                Let's build something <br/> <span className="text-blue-500">extraordinary</span> together.
              </h3>
            </div>
            
            <p className="text-slate-400 text-lg max-w-md">
              Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-6 pt-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-800 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Email Us</p>
                  <p className="text-lg font-medium">{CONTACT_EMAIL}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-800 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Visit Us</p>
                  <p className="text-lg font-medium">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-800 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Call Us</p>
                  <p className="text-lg font-medium">+880 1234 567890</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-8 md:p-10 rounded-3xl border border-slate-700">
             <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
                   <input 
                      type="text" 
                      id="name"
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                   />
                 </div>
                 <div className="space-y-2">
                   <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                   <input 
                      type="email" 
                      id="email"
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                   />
                 </div>
               </div>
               
               <div className="space-y-2">
                 <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                 <textarea 
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                 />
               </div>

               <Button 
                 type="submit" 
                 variant="primary" 
                 size="lg" 
                 className="w-full bg-blue-600 hover:bg-blue-700 border-none"
                 disabled={status === 'sending'}
               >
                 {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : (
                   <span className="flex items-center">
                     Send Message <Send className="ml-2 w-4 h-4" />
                   </span>
                 )}
               </Button>
             </form>
          </div>

        </div>
      </div>
    </section>
  );
};