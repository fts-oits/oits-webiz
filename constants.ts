import { Service, Project, Testimonial, TeamMember, NavItem, SectionId, CoreValue, Industry, ProcessStep } from './types';

export const COMPANY_NAME = "OITS Dhaka";
export const TAGLINE = "Transforming Visions into Digital Reality";
export const CONTACT_EMAIL = "info@oitsdhaka.com";
export const ADDRESS = "House # 42, Road # 2/A, Block # Z, Dhaka 1209, Bangladesh";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: `#${SectionId.HOME}` },
  { label: 'Services', href: `#${SectionId.SERVICES}` },
  { label: 'About', href: `#${SectionId.ABOUT}` },
  { label: 'Process', href: `#${SectionId.PROCESS}` },
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
    fullDescription: 'We developed a high-performance financial dashboard that aggregates data from multiple sources to provide real-time insights. The solution features advanced data visualization, secure transaction monitoring, and role-based access control, helping the bank reduce reporting time by 60%.',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Redis'],
    link: '#'
  },
  {
    id: '2',
    title: 'HealthCare Connect',
    category: 'Mobile App',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    description: 'Telemedicine platform connecting patients with doctors in real-time.',
    fullDescription: 'HealthCare Connect facilitates secure video consultations between patients and doctors. The app includes prescription management, appointment scheduling, and integration with wearable devices to monitor patient vitals remotely.',
    technologies: ['Flutter', 'WebRTC', 'Firebase', 'Python', 'TensorFlow'],
    link: '#'
  },
  {
    id: '3',
    title: 'E-Shop Global',
    category: 'E-commerce',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    description: 'Multi-vendor marketplace solution with integrated payment gateways.',
    fullDescription: 'A scalable multi-vendor e-commerce platform supporting thousands of products and high concurrent user traffic. Key features include AI-powered product recommendations, dynamic pricing engines, and a seamless checkout experience.',
    technologies: ['Next.js', 'GraphQL', 'Stripe API', 'MongoDB', 'AWS'],
    link: '#'
  },
  {
    id: '4',
    title: 'EduLearn LMS',
    category: 'Web Application',
    imageUrl: 'https://picsum.photos/800/600?random=7',
    description: 'A robust Learning Management System for universities with live class integration.',
    fullDescription: 'EduLearn is a comprehensive LMS designed for modern education. It supports live streaming classes, automated grading, student progress tracking, and interactive forums. The platform is accessible and fully responsive.',
    technologies: ['Vue.js', 'Django', 'PostgreSQL', 'Zoom API', 'Celery'],
    link: '#'
  },
  {
    id: '5',
    title: 'Urban Eats',
    category: 'Mobile App',
    imageUrl: 'https://picsum.photos/800/600?random=8',
    description: 'Food delivery application with real-time tracking and AI-based recommendations.',
    fullDescription: 'Urban Eats revolutionizes food delivery with a user-friendly app offering real-time order tracking, personalized meal suggestions based on dietary preferences, and optimized delivery routing for drivers.',
    technologies: ['React Native', 'Google Maps API', 'Node.js', 'Socket.io', 'MongoDB'],
    link: '#'
  },
  {
    id: '6',
    title: 'SecureChain',
    category: 'Blockchain',
    imageUrl: 'https://picsum.photos/800/600?random=9',
    description: 'Supply chain management solution utilizing blockchain for transparency and security.',
    fullDescription: 'SecureChain leverages blockchain technology to create an immutable record of product journey from manufacturer to consumer. This enhances transparency, prevents counterfeiting, and streamlines inventory management.',
    technologies: ['Solidity', 'Ethereum', 'React', 'Web3.js', 'IPFS'],
    link: '#'
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

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    role: 'CEO & Founder',
    image: 'https://picsum.photos/400/400?random=20',
    bio: 'Visionary leader with 15+ years in software architecture and business strategy.',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Lead Designer',
    image: 'https://picsum.photos/400/400?random=21',
    bio: 'Award-winning UI/UX designer passionate about user-centric digital experiences.',
  },
  {
    id: '3',
    name: 'David Kim',
    role: 'CTO',
    image: 'https://picsum.photos/400/400?random=22',
    bio: 'Tech enthusiast specializing in cloud infrastructure, scalable systems, and AI integration.',
  },
];

export const CORE_VALUES: CoreValue[] = [
  {
    title: 'Innovation',
    description: 'We constantly push boundaries to create forward-thinking solutions.',
    icon: 'Lightbulb'
  },
  {
    title: 'Integrity',
    description: 'We believe in transparent communication and honest partnerships.',
    icon: 'Shield'
  },
  {
    title: 'Excellence',
    description: 'We are committed to delivering the highest quality in every line of code.',
    icon: 'Award'
  },
  {
    title: 'Client Focus',
    description: 'Your success is our success. We are dedicated to your growth.',
    icon: 'Users'
  }
];

export const INDUSTRIES: Industry[] = [
  { name: 'Fintech', icon: 'DollarSign' },
  { name: 'Healthcare', icon: 'Heart' },
  { name: 'E-Commerce', icon: 'ShoppingBag' },
  { name: 'Education', icon: 'BookOpen' },
  { name: 'Real Estate', icon: 'Home' },
  { name: 'Logistics', icon: 'Truck' },
];

export const TECH_STACK = [
  "React", "Next.js", "Node.js", "TypeScript", "Python", "AWS", "Docker", "Flutter", "PostgreSQL", "GraphQL", "Tailwind"
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your business goals, requirements, and target audience to lay a solid foundation.',
    icon: 'Search',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    description: 'Our creative team crafts intuitive and visually stunning interfaces that resonate with your users.',
    icon: 'PenTool',
  },
  {
    id: 'development',
    number: '03',
    title: 'Development',
    description: 'We build robust, scalable, and secure solutions using cutting-edge technologies and best practices.',
    icon: 'Code',
  },
  {
    id: 'launch',
    number: '04',
    title: 'Launch & Scale',
    description: 'We ensure a smooth deployment and provide ongoing support to help your business grow.',
    icon: 'Rocket',
  },
];