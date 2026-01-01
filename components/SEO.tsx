import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COMPANY_NAME, TAGLINE } from '../constants';

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': { title: `${COMPANY_NAME} | ${TAGLINE}`, description: 'Empowering businesses through innovative software solutions. Your digital transformation partner.', },
  '/services': { title: `Services | ${COMPANY_NAME}`, description: 'Explore our comprehensive software development services, including Web, Mobile, AI, and Cloud solutions.', },
  '/about': { title: `About Us | ${COMPANY_NAME}`, description: 'Meet the team behind OITS Dhaka. We are passionate developers and strategists building the future.', },
  '/process': { title: `Our Process | ${COMPANY_NAME}`, description: 'Discover our proven agile methodology for delivering high-quality software on time and within budget.', },
  '/portfolio': { title: `Portfolio | ${COMPANY_NAME}`, description: 'View our success stories and case studies. See how we help businesses achieve their digital goals.', },
  '/contact': { title: `Contact Us | ${COMPANY_NAME}`, description: 'Get in touch with OITS Dhaka. Let\'s discuss your next project and how we can help you succeed.', },
};

export const SEO: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const meta = routeMeta[currentPath] || routeMeta['/'];
  useEffect(() => { document.title = meta.title; const metaDescTag = document.querySelector('meta[name="description"]'); if (metaDescTag) { metaDescTag.setAttribute('content', meta.description); } else { const newMeta = document.createElement('meta'); newMeta.name = 'description'; newMeta.content = meta.description; document.head.appendChild(newMeta); } }, [currentPath, meta]);
  return null;
};