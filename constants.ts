import { Service, Project, Testimonial, NavItem, SectionId, TechDomain } from './types';

export const COMPANY_NAME = "OITS Dhaka";
export const TAGLINE = "Transforming Visions into Digital Reality";
export const CONTACT_EMAIL = "info@oitsdhaka.com";
export const ADDRESS = "House # 42, Road # 2/A, Block # Z, Dhaka 1209, Bangladesh";

export const PROCESS_STEPS = [
  {
    id: 'discovery',
    icon: 'Search',
    number: '01',
    title: 'Discovery',
    description: 'Understanding your goals, requirements, and target audience.',
  },
  {
    id: 'design',
    icon: 'Layers',
    number: '02',
    title: 'Design',
    description: 'Creating wireframes, prototypes, and visual designs.',
  },
  {
    id: 'development',
    icon: 'Code',
    number: '03',
    title: 'Development',
    description: 'Building your solution with clean, maintainable code.',
  },
  {
    id: 'testing',
    icon: 'ShieldCheck',
    number: '04',
    title: 'Testing',
    description: 'Ensuring quality through rigorous testing and QA.',
  },
  {
    id: 'deployment',
    icon: 'Rocket',
    number: '05',
    title: 'Deployment',
    description: 'Launching your project and providing ongoing support.',
  },
];

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
    fullDescription: 'We built a high-performance financial dashboard that processes millions of transactions in real-time. Features include predictive analytics, customizable reporting widgets, and bank-grade security protocols.',
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    captionsUrl: 'https://gist.githubusercontent.com/samdutton/ca37f3adaf4e23679950b80847045b3d/raw/e37bfb9d10e6f530f1d63d6998ff69094f71a47f/subtitle_en.vtt',
    link: 'https://example.com/fintech'
  },
  {
    id: '2',
    title: 'HealthCare Connect',
    category: 'Mobile App',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    description: 'Telemedicine platform connecting patients with doctors in real-time.',
    fullDescription: 'A HIPAA-compliant mobile application that facilitates secure video consultations, prescription management, and appointment scheduling. Built with Flutter for a seamless cross-platform experience.',
    technologies: ['Flutter', 'Firebase', 'WebRTC'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    captionsUrl: 'https://gist.githubusercontent.com/samdutton/ca37f3adaf4e23679950b80847045b3d/raw/e37bfb9d10e6f530f1d63d6998ff69094f71a47f/subtitle_en.vtt',
    link: 'https://example.com/healthcare'
  },
  {
    id: '3',
    title: 'E-Shop Global',
    category: 'E-commerce',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    description: 'Multi-vendor marketplace solution with integrated payment gateways.',
    fullDescription: 'A robust multi-vendor marketplace supporting thousands of SKUs, real-time inventory tracking, and AI-driven product recommendations to boost sales.',
    technologies: ['Next.js', 'GraphQL', 'Stripe', 'PostgreSQL'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    captionsUrl: 'https://gist.githubusercontent.com/samdutton/ca37f3adaf4e23679950b80847045b3d/raw/e37bfb9d10e6f530f1d63d6998ff69094f71a47f/subtitle_en.vtt',
    link: 'https://example.com/eshop'
  },
  {
    id: '4',
    title: 'Smart Home Hub',
    category: 'IoT',
    imageUrl: 'https://picsum.photos/800/600?random=7',
    description: 'Centralized control system for smart home devices with voice integration.',
    fullDescription: 'An IoT dashboard that aggregates control for lights, thermostats, and security systems. Supports custom automation routines and energy usage monitoring.',
    technologies: ['React Native', 'MQTT', 'Node.js'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    captionsUrl: 'https://gist.githubusercontent.com/samdutton/ca37f3adaf4e23679950b80847045b3d/raw/e37bfb9d10e6f530f1d63d6998ff69094f71a47f/subtitle_en.vtt',
  }
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

export const TECH_DOMAINS: TechDomain[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'Redux', 'Framer Motion']
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: ['Node.js', 'Python', 'Go', 'Java', 'NestJS', 'Express', 'Django', 'GraphQL']
  },
  {
    id: 'mobile',
    label: 'Mobile',
    skills: ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin)', 'Expo']
  },
  {
    id: 'database',
    label: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase', 'DynamoDB', 'Supabase']
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    skills: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD Pipelines']
  }
];