import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Services } from './components/Services';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SectionId } from './types';
import { COMPANY_NAME, TAGLINE } from './constants';

const SEO_DATA = {
  [SectionId.HOME]: {
    title: `${COMPANY_NAME} | ${TAGLINE}`,
    description: "Transforming ideas into digital reality with expert web and mobile development services in Dhaka."
  },
  [SectionId.SERVICES]: {
    title: `Services - ${COMPANY_NAME}`,
    description: "Explore our expert services in Web Development, Mobile Apps, UI/UX Design, and Cloud Solutions."
  },
  [SectionId.ABOUT]: {
    title: `About Us - ${COMPANY_NAME}`,
    description: "Meet the expert team behind OITS Dhaka. We are dedicated to delivering digital excellence."
  },
  [SectionId.PORTFOLIO]: {
    title: `Portfolio - ${COMPANY_NAME}`,
    description: "Browse our success stories and case studies. See how we help businesses grow."
  },
  [SectionId.CONTACT]: {
    title: `Contact Us - ${COMPANY_NAME}`,
    description: "Get in touch with OITS Dhaka for your next software project. We are ready to build the future."
  },
  // Fallback for sections not explicitly in enum if any, or mapped incorrectly
  'process': {
    title: `Our Process - ${COMPANY_NAME}`,
    description: "Discover our agile development methodology."
  }
};

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check local storage or system preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const seoInfo = SEO_DATA[sectionId as SectionId] || SEO_DATA[SectionId.HOME];
          
          if (seoInfo) {
            document.title = seoInfo.title;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
              metaDesc.setAttribute('content', seoInfo.description);
            }
            
            // Update URL hash without scrolling
            if (window.history.replaceState) {
               window.history.replaceState(null, '', `#${sectionId}`);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3 // Trigger when 30% of section is visible
    });

    // Observe all sections
    Object.values(SectionId).forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;