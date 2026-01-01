import { Service, Project, Testimonial, NavItem, SectionId } from './types';

export const COMPANY_NAME = "OITS Dhaka";
export const TAGLINE = "Transforming Visions into Digital Reality";
export const CONTACT_EMAIL = "info@oitsdhaka.com";
export const ADDRESS = "House # 42, Road # 2/A, Block # Z, Dhaka 1209, Bangladesh";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: `#${SectionId.HOME}` },
  { label: 'Services', href: `#${SectionId.SERVICES}` },
  { label: 'About', href: `#${SectionId.ABOUT}` },
  { label: 'Portfolio', href: `#${SectionId.PORTFOLIO}` },
  { label: 'Contact', href: `#${SectionId.CONTACT}` },
];

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Application Development',
    description: 'Scalable, high-performance web solutions tailored to your business needs using cutting-edge technologies.',
    icon: 'Globe',
    features: ['Custom Web Apps', 'SaaS Platforms', 'E-commerce Solutions', 'Progressive Web Apps'],
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that provide seamless user experiences on iOS and Android.',
    icon: 'Smartphone',
    features: ['iOS Development', 'Android Development', 'React Native', 'Flutter'],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Human-centered design that ensures your product is intuitive, accessible, and visually stunning.',
    icon: 'PenTool',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    description: 'Streamline your deployment pipeline and ensure high availability with our cloud infrastructure expertise.',
    icon: 'Cloud',
    features: ['AWS/Azure/GCP', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Serverless Architecture'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'FinTech Dashboard',
    category: 'Web Application',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    description: 'A comprehensive financial analytics dashboard for a leading banking institution.',
  },
  {
    id: '2',
    title: 'HealthCare Connect',
    category: 'Mobile App',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    description: 'Telemedicine platform connecting patients with doctors in real-time.',
  },
  {
    id: '3',
    title: 'E-Shop Global',
    category: 'E-commerce',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    description: 'Multi-vendor marketplace solution with integrated payment gateways.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechFlow Inc.',
    content: "OITS Dhaka transformed our legacy system into a modern, scalable cloud application. The team's expertise is unmatched.",
    avatar: 'https://picsum.photos/100/100?random=4',
  },
  {
    id: 't2',
    name: 'Michael Chen',
    role: 'Founder',
    company: 'StartUp Alpha',
    content: "Their dedication to quality and timely delivery helped us launch our MVP ahead of schedule. Highly recommended!",
    avatar: 'https://picsum.photos/100/100?random=5',
  },
  {
    id: 't3',
    name: 'Emily Davis',
    role: 'Product Manager',
    company: 'InnovateX',
    content: "The UI/UX design team really understood our vision and created an interface that our users absolutely love.",
    avatar: 'https://picsum.photos/100/100?random=6',
  },
];

export const TECH_STACK = [
  "React", "Next.js", "Node.js", "TypeScript", "Python", "AWS", "Docker", "Flutter", "PostgreSQL", "GraphQL", "Tailwind"
];
