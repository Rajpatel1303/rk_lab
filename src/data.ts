import { Project, Developer, ServiceItem, Technology, ProcessStep, Testimonial } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "ownmyland",
    title: "OwnMyLand",
    url: "https://ownmyland.co/",
    description: "Next-generation premium land deed registration, fractional ownership, and real estate management marketplace using secure decentralized ledgers.",
    category: "SaaS Applications",
    tags: ["React Flow", "Real Estate Analytics", "Tailwind CSS", "Framer Motion", "Next.js"],
    year: "2025",
    client: "OwnMyLand Corp",
    role: "Lead Architects & Full-Stack Developers",
    highlightColor: "cyan",
    status: "Live",
    stats: [
      { label: "Assets Tokenized", value: "$42M+" },
      { label: "Deed Search Speed", value: "<150ms" },
      { label: "User Trust Rating", value: "99.8%" }
    ],
    features: [
      "Interactive 2D/3D land-deed visualization overlays",
      "Robust fractional ownership purchase smart checkout workflows",
      "Automated PDF title deed audit generators",
      "Owner management dashboards with live yield calculators"
    ],
    accentGradient: "from-cyan-500/20 via-blue-600/20 to-indigo-600/10"
  },
  {
    id: "vlands",
    title: "VLands",
    url: "https://vlands.app/",
    description: "Immersive virtual world portal and high-fidelity multiplayer spatial sandbox, rendering complex procedural environments directly inside the browser.",
    category: "Website Development",
    tags: ["Three.js", "WebXR Spatial Portal", "React Three Fiber", "WebSockets", "Tailwind CSS"],
    year: "2025",
    client: "VLands Interactive",
    role: "Graphics & Frontend Engineers",
    highlightColor: "purple",
    status: "Live",
    stats: [
      { label: "Average Frame Rate", value: "60 FPS" },
      { label: "3D Models Hosted", value: "12,000+" },
      { label: "Simultaneous Explorers", value: "5K+" }
    ],
    features: [
      "High performance GPU-accelerated WebGL renderings",
      "Dynamic multi-user avatar synchronization via persistent state relays",
      "Interactive world builder tools with drag-and-drop inventory panels",
      "Ultra eye-safe twilight color layouts optimizing extended spatial sessions"
    ],
    accentGradient: "from-purple-500/20 via-pink-600/20 to-brand-purple/10"
  },
  {
    id: "versatilearm",
    title: "Versatile Arm",
    url: "https://versatilearm.com/",
    description: "Industrial IoT robotics automation system featuring interactive real-time 3D control dashboards and telemetric synchronization.",
    category: "Software Development",
    tags: ["WebSockets Telemetry", "Three.js", "Industrial React", "Tailwind CSS", "High-Frequency API"],
    year: "2024",
    client: "Versatile Robotics LLC",
    role: "IoT Architecture & Lead Frontend Developers",
    highlightColor: "blue",
    status: "Live",
    stats: [
      { label: "Telemetry Latency", value: "0.2ms" },
      { label: "Command Precision", value: "99.999%" },
      { label: "Connected Devices", value: "1,200+" }
    ],
    features: [
      "Real-time inverse kinematics 3D previews in the viewport",
      "Advanced industrial command scheduler queues with retry fallbacks",
      "High-frequency sensor log visualizers plotting over 500 records/sec",
      "Role-based override controllers styled in strict hardware tactile formats"
    ],
    accentGradient: "from-blue-500/20 via-indigo-600/20 to-cyan-600/10"
  },
  {
    id: "propgenie",
    title: "PropGenie",
    url: "https://propgenie.co/",
    description: "State-of-the-Art generative AI real-time property analyzing engine, evaluating hundreds of active market indicators in seconds to output optimized lease templates.",
    category: "AI Solutions",
    tags: ["Gemini AI SDK", "Llama Models", "Tailwind CSS", "Next.js Architecture", "Bento Layouts"],
    year: "2026",
    client: "PropGenie Inc",
    role: "Founding AI Engineers & Architects",
    highlightColor: "emerald",
    status: "Under Development",
    stats: [
      { label: "Market Indicators analyzed", value: "100+" },
      { label: "Time-to-Value Saved", value: "85%" },
      { label: "Agent Output Accuracy", value: "96.4%" }
    ],
    features: [
      "Deep generative market rent predictive analysis pipelines",
      "AI-driven conversational assistant parsing land-lord tenant laws",
      "Frictionless smart document template builders with live inline diffing",
      "Intuitive portfolio investment value forecasts using Recharts models"
    ],
    accentGradient: "from-emerald-500/20 via-teal-600/20 to-cyan-500/10"
  }
];

export const DEVELOPERS: Developer[] = [
  {
    name: "Raj Patel",
    role: "Software Engineer & Product Developer",
    focus: "Software Architecture & Product Strategy",
    bio: "Expert in software architecture, SaaS platforms, business applications, automation systems, and digital product development.",
    avatar: "raj.jpg",
    skills: ["Software Architecture", "SaaS Platforms", "Business Applications", "Automation Systems", "Product Development", "Next.js / React 19", "NodeJS / Express", "PostgreSQL / Firebase"],
    socials: [
      { platform: "Email", url: "mailto:workeemail1303@gmail.com" }
    ],
    signatureQuote: "We design and build product architectures that align engineering discipline with business scaling targets.",
  },
  {
    name: "Kashyap Patel",
    role: "Full Stack Software Engineer",
    focus: "Frontend Excellence & Scalable API Pipelines",
    bio: "Specialized in frontend development, backend systems, APIs, cloud deployment, and scalable web applications.",
    avatar: "kashyap.jpg",
    skills: ["Frontend Engineering", "Backend Systems", "API Integration", "Cloud Deployment", "Scalable Web Apps", "Tailwind CSS v4", "Framer Motion", "Three.js / WebGL"],
    socials: [
      { platform: "Email", url: "mailto:workeemail1303@gmail.com" }
    ],
    signatureQuote: "Interfaces should react like physical components - fluid, intuitive, and immediate under high user stress.",
  },
  {
    name: "Manthan Patel",
    role: "Network & Infrastructure Engineer",
    focus: "Enterprise Infrastructure & Security Deployments",
    bio: "Specialized in networking, CCTV systems, server deployment, cloud infrastructure, IT security, and enterprise technology solutions.",
    avatar: "manthan.jpg",
    skills: ["Networking Solutions", "CCTV Systems", "Server Deployment", "Cloud Infrastructure", "IT Security", "Enterprise Solutions", "AWS / Google Cloud", "Structured Cabling"],
    socials: [
      { platform: "Email", url: "mailto:workeemail1303@gmail.com" }
    ],
    signatureQuote: "Hardware configurations and core network layers are the bedrock of any business interface. They must be resilient.",
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "software-dev",
    title: "Software Development",
    description: "Custom software, ERP systems, SaaS platforms, business automation tools, and enterprise applications.",
    iconName: "Cpu",
    size: "medium",
    bgGradient: "from-orange-500/10 via-amber-600/5 to-transparent",
    features: ["Custom ERP Architectures", "Business Automation Tools", "SaaS Systems Integrations", "Enterprise Core Applications"],
    metrics: "99.99% Execution Uptime"
  },
  {
    id: "web-mobile-apps",
    title: "Web & Mobile Applications",
    description: "Modern responsive websites, web applications, customer portals, and mobile apps.",
    iconName: "Smartphone",
    size: "large",
    bgGradient: "from-blue-600/15 via-cyan-500/10 to-transparent",
    features: ["Responsive Web Platforms", "iOS & Android Mobile Apps", "Interactive Client Portals", "Cinematic Visual Spacing"],
    metrics: "Lighthouse Score: 98+"
  },
  {
    id: "ai-solutions",
    title: "AI Automation Solutions",
    description: "AI chatbots, workflow automation, customer support automation, and business intelligence tools.",
    iconName: "BrainCircuit",
    size: "medium",
    bgGradient: "from-purple-500/10 via-pink-600/5 to-transparent",
    features: ["Generative AI Chatbots", "Workflow Automation Pipelines", "Support Desk AI Agents", "Business Intelligence Analytics"],
    metrics: "85% Labor Time Saved"
  },
  {
    id: "networking-solutions",
    title: "Networking Solutions",
    description: "Office networking, structured cabling, Wi-Fi deployment, router and switch configuration, and network optimization.",
    iconName: "Network",
    size: "medium",
    bgGradient: "from-emerald-500/10 via-teal-600/5 to-transparent",
    features: ["Structured Data Cabling", "Enterprise Wi-Fi Deployment", "Router & Switch Hardening", "Bandwidth Optimization Audits"],
    metrics: "Zero Packet Leakage"
  },
  {
    id: "cctv-systems",
    title: "CCTV & Surveillance Systems",
    description: "Security camera installation, monitoring systems, remote surveillance, and enterprise security solutions.",
    iconName: "Camera",
    size: "small",
    bgGradient: "from-red-500/10 via-orange-600/5 to-transparent",
    features: ["IP Security Camera Setup", "Central Monitoring Stations", "Secure Remote Live Feeds", "Enterprise Access Control"],
    metrics: "24/7 Real-Time Alerting"
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud & Server Infrastructure",
    description: "Cloud deployment, VPS setup, AWS, Cloudflare integration, server management, backup systems, and monitoring.",
    iconName: "Cloud",
    size: "large",
    bgGradient: "from-cyan-500/10 via-indigo-600/5 to-transparent",
    features: ["AWS & GCP Deployments", "VPS & Bare-Metal Server Setup", "Cloudflare Shield Hardening", "Automated Daily Redundancies"],
    metrics: "99.999% SLA Guarantee"
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    description: "Technology planning, infrastructure audits, digital transformation, and technical strategy.",
    iconName: "Briefcase",
    size: "small",
    bgGradient: "from-indigo-500/10 via-blue-600/5 to-transparent",
    features: ["IT Infrastructure Audits", "Digital Transformation Roadmaps", "Security Compliance Sprints", "Business Tech Valuations"],
    metrics: "100% Risk Deflected"
  },
  {
    id: "amc-maintenance",
    title: "AMC & Maintenance",
    description: "Monthly and annual maintenance contracts for software, networking, servers, and security systems.",
    iconName: "Wrench",
    size: "wide",
    bgGradient: "from-amber-500/10 via-orange-600/5 to-transparent",
    features: ["Preventative Monthly Audits", "Priority Hardware Dispatch", "Immediate SLA Troubleshooting", "Systems Integrity Logging"],
    metrics: "2-Hour Response SLA"
  }
];

export const TECHNOLOGIES: Technology[] = [
  // Languages
  { name: "TypeScript", category: "Languages", iconName: "Code", glowColor: "rgba(0, 102, 255, 0.5)" },
  { name: "JavaScript (ESNex)", category: "Languages", iconName: "FileCode", glowColor: "rgba(251, 191, 36, 0.5)" },
  { name: "Python", category: "Languages", iconName: "Terminal", glowColor: "rgba(16, 185, 129, 0.5)" },
  { name: "Go Lang", category: "Languages", iconName: "Cpu", glowColor: "rgba(6, 182, 212, 0.5)" },

  // Frameworks
  { name: "React 19 (Vite)", category: "Frameworks", iconName: "Atom", glowColor: "rgba(0, 245, 255, 0.5)" },
  { name: "Next.js Architecture", category: "Frameworks", iconName: "Layers", glowColor: "rgba(255, 255, 255, 0.4)" },
  { name: "Framer Motion", category: "Frameworks", iconName: "Compass", glowColor: "rgba(157, 78, 223, 0.5)" },
  { name: "Tailwind CSS v4", category: "Frameworks", iconName: "Flame", glowColor: "rgba(14, 165, 233, 0.5)" },
  { name: "Express / NodeJS", category: "Frameworks", iconName: "Server", glowColor: "rgba(34, 197, 94, 0.5)" },

  // Databases
  { name: "PostgreSQL & SQL", category: "Databases", iconName: "Database", glowColor: "rgba(59, 130, 246, 0.5)" },
  { name: "Firebase (Firestore)", category: "Databases", iconName: "Flame", glowColor: "rgba(245, 158, 11, 0.5)" },
  { name: "ClickHouse (Analytics)", category: "Databases", iconName: "BarChart3", glowColor: "rgba(239, 68, 68, 0.5)" },
  { name: "Redis Caching", category: "Databases", iconName: "Zap", glowColor: "rgba(220, 38, 38, 0.5)" },

  // AI & Cloud
  { name: "Gemini API SDK", category: "AI & Cloud", iconName: "BrainCircuit", glowColor: "rgba(157, 78, 223, 0.6)" },
  { name: "Docker Containerization", category: "AI & Cloud", iconName: "Container", glowColor: "rgba(14, 165, 233, 0.5)" },
  { name: "Cloud Run & GCP", category: "AI & Cloud", iconName: "CloudLightning", glowColor: "rgba(66, 133, 244, 0.5)" },
  { name: "GitHub Actions CI/CD", category: "AI & Cloud", iconName: "GitMerge", glowColor: "rgba(100, 116, 139, 0.4)" },

  // Tools & Design
  { name: "Figma Pro", category: "Tools & Design", iconName: "PenTool", glowColor: "rgba(242, 78, 30, 0.5)" },
  { name: "Three.js (WebGL)", category: "Tools & Design", iconName: "Globe", glowColor: "rgba(0, 245, 255, 0.5)" },
  { name: "Postman", category: "Tools & Design", iconName: "Send", glowColor: "rgba(249, 115, 22, 0.5)" },
  { name: "Adobe Creative", category: "Tools & Design", iconName: "Paintbrush", glowColor: "rgba(236, 72, 153, 0.5)" }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Deep Conceptual Discovery",
    duration: "Phase 1",
    iconName: "Search",
    description: "We deep dive into your product market fit. Through comprehensive feature workshops, mock layout wire-framing, and user persona analysis, we outline the exact development targets.",
    details: ["Target Audience Identification", "Core Feature Value Matrices", "Technical Feasibility Audit", "Interactive Design Direction Mockups"]
  },
  {
    step: "02",
    title: "Spatial Interactive Blueprinting",
    duration: "Phase 2",
    iconName: "LayoutGrid",
    description: "Our Interface Unit drafts structural layout concepts using strict, pixel-perfect Figma components, choosing color depths, micro-animations, typography rhythm, and establishing spatial glass elements.",
    details: ["Interactive clickable UX prototypes", "Theme design tokens and font hierarchy extraction", "Dynamic hover & micro-interaction blueprinting", "High-fidelity feedback cycles"]
  },
  {
    step: "03",
    title: "Premium Full-Stack Engineering",
    duration: "Phase 3",
    iconName: "Cpu",
    description: "Our Infrastructure Unit establishes strict type declarations, structured PostgreSQL database indices, and creates high-performance Express/Node API routers while the Interface Unit integrates animations.",
    details: ["Type-safe development files", "State synchronization and backend routing", "Liquid glass and clay component fabrication", "Interactive charts and widgets integration"]
  },
  {
    step: "04",
    title: "Rigorous Precision Auditing",
    duration: "Phase 4",
    iconName: "ShieldAlert",
    description: "Every file, element, scroll trigger, and load hook is assessed on multiple screen sizes and devices. We run extensive unit logic checks, speed audits, and secure token leaks assessments.",
    details: ["100% Mobile fluid responsiveness tests", "Lighthouse speed performance optimization", "Cross-browser system styling consistency check", "API logic integrity verification"]
  },
  {
    step: "05",
    title: "Automated Orchestrated Launch",
    duration: "Continuous",
    iconName: "Rocket",
    description: "We deploy code onto lightning fast, secure Cloud Run servers or client CDNs with completely automated GitHub Actions pipelines, granting you absolute monitoring transparency.",
    details: ["Docker container optimization", "Custom domain SSL installation", "Continuous integration deployment hooks", "Post-launch metrics tracking and support"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Vikram Malhotra",
    role: "Chief Executive Officer",
    company: "OwnMyLand Corp",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80",
    content: "NitorTech Solutions is a force multiplier. They did not just code OwnMyLand; they helped define the visual standard of real estate security. Our users consistently praise the interactive maps and fractional ledger. Our speed score is at 99%, and we tokenized $42M in our first quarter.",
    rating: 5,
    projectRelation: "OwnMyLand Launch",
    verified: true
  },
  {
    id: "t2",
    name: "Sarah Jenkins",
    role: "Product Director",
    company: "VLands Interactive",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    content: "The WebGL performance NitorTech Solutions engineered for VLands is mind-blowing. We are getting a robust 60 FPS directly inside mobile browser frames. Their backend relays state perfectly to thousands of concurrent explorers. Highly recommend NitorTech Solutions for anything pushing technical boundaries.",
    rating: 5,
    projectRelation: "VLands App Experience",
    verified: true
  },
  {
    id: "t3",
    name: "Markus Vance",
    role: "Head of Hardware Integration",
    company: "Versatile Robotics LLC",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
    content: "We needed an ultra low-latency telemetry control suite to let our enterprise customers pilot heavy arms remotely over the web. NitorTech Solutions delivered a React dashboard with 0.2ms latency sync. Outstanding engineering, absolute compliance with industrial constraints, and flawless style.",
    rating: 5,
    projectRelation: "VersatileArm Development",
    verified: true
  }
];

export const ADVANTAGES = [
  {
    title: "End-to-End Technology Partner",
    description: "One company for software, networking, cloud infrastructure, and security systems.",
    iconName: "Globe",
    gradient: "from-cyan-500/15 over-cyan-500/5 to-transparent"
  },
  {
    title: "Multi-Disciplinary Team",
    description: "Software developers and infrastructure engineers working together.",
    iconName: "UserCheck",
    gradient: "from-purple-500/15 over-purple-500/5 to-transparent"
  },
  {
    title: "Scalable Solutions",
    description: "Technology built to support future growth.",
    iconName: "Zap",
    gradient: "from-blue-600/15 over-blue-600/5 to-transparent"
  },
  {
    title: "Reliable Support",
    description: "Long-term maintenance and technical assistance.",
    iconName: "ShieldCheck",
    gradient: "from-emerald-500/15 over-emerald-500/5 to-transparent"
  },
  {
    title: "Modern Technology Stack",
    description: "Latest development frameworks and enterprise-grade infrastructure.",
    iconName: "Cpu",
    gradient: "from-orange-500/15 over-orange-500/5 to-transparent"
  },
  {
    title: "Business-Focused Approach",
    description: "Technology solutions aligned with business goals.",
    iconName: "CheckCircle2",
    gradient: "from-pink-500/15 over-pink-500/5 to-transparent"
  }
];
