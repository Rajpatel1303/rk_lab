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
    name: "Systems & Infrastructure Unit",
    role: "RK Kinetic Technical Division",
    bio: "Our highly specialized engineering division builds robust backend architectures, scalable serverless cloud container pipelines, and customized microservice structures. We ensure your core data layers and transactions remain continuously protected, resilient and incredibly fast.",
    avatar: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&h=400&q=80",
    skills: ["System Architecture", "NodeJS / Express", "Next.js / React 19", "Three.js / WebGL", "Docker / Cloud Run", "PostgreSQL / Firebase", "State Management", "Performance Optimization"],
    socials: [
      { platform: "GitHub", url: "https://github.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "Email", url: "mailto:abc@gmail.com" }
    ],
    signatureQuote: "We craft stable and clean architectural foundations. Modern enterprise backends deserve total resilience, strict type bounds, and zero execution leaks.",
    focus: "Backend Engines & Scalable Core Deployments"
  },
  {
    name: "Creative & Interface Unit",
    role: "RK Kinetic Visual Division",
    focus: "Spatial Interface Engineering & WebGL Mastery",
    bio: "Our digital design division transforms standard layouts into engaging high-definition runtimes. We pair strict design tokens, responsive fluid layouts, and cinematic scroll transitions to capture attention and deliver organic feedback loop micro-interactions.",
    avatar: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&h=400&q=80",
    skills: ["UI/UX Master", "Tailwind CSS v4", "Framer Motion", "Interactive WebGL", "Responsive Fluidity", "Figma Prototyping", "Dynamic Color Systems", "Micro-Interactions"],
    socials: [
      { platform: "GitHub", url: "https://github.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "Email", url: "mailto:abc@gmail.com" }
    ],
    signatureQuote: "Interfaces should behave like physical elements reacting dynamically to user gestures—fluid, meaningful, and striking to interact with.",
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Website Development",
    description: "Highly interactive landing pages and portfolio displays built to command the highest web award standards. Blends cinematic animations, 3D viewport models, and perfect fluid spacing.",
    iconName: "Globe",
    size: "medium",
    bgGradient: "from-cyan-500/10 via-blue-600/5 to-transparent",
    features: ["Cinematic Hero Introductions", "Framer Motion Physics Engine Effects", "Speed Optimized Core Web Vitals (100 Score)"],
    metrics: "Average Google Lighthouse score: 98+"
  },
  {
    id: "software-dev",
    title: "Software Development",
    description: "Robust industrial systems driving internal team operations, real-time telemetry pipelines, and customized interactive physical automation portals.",
    iconName: "Cpu",
    size: "medium",
    bgGradient: "from-purple-500/10 via-pink-600/5 to-transparent",
    features: ["Sub-Millisecond WebSockets Updates", "Tactile Native-Fidelity User Interfaces", "Multi-Threaded Node Task Queues"],
    metrics: "99.99% Operational precision"
  },
  {
    id: "saas-apps",
    title: "SaaS Applications",
    description: "Fully featured multi-tenant web systems, complete with complex organization managers, flexible billing systems, interactive charts, and live notifications.",
    iconName: "Layers",
    size: "large",
    bgGradient: "from-blue-600/15 via-cyan-500/10 to-transparent",
    features: ["Secure Fractional Account Portals", "Dynamic SVG Visual Analytics & Recharts Panels", "Configurable Webhooks and Alert Feeds", "Interactive Admin Roles System"],
    metrics: "Over $42M in transacted client asset value"
  },
  {
    id: "ai-solutions",
    title: "AI Solutions",
    description: "Direct server-side integration with Large Language Models and AI tool chains to analyze unstructured data sets and generate high-fidelity files.",
    iconName: "BrainCircuit",
    size: "wide",
    bgGradient: "from-emerald-500/10 via-teal-600/5 to-transparent",
    features: ["Gemini API 2.5 SDK server pipelines", "Vector embedding similarity semantic searches", "Custom real-time markdown analyzers", "Advanced LLM guardrails prompting architecture"],
    metrics: "85% decrease in routine analytical labor"
  },
  {
    id: "enterprise-software",
    title: "Enterprise Software",
    description: "Secure, highly durable databases, rigid server architecture, role validation checks, and automatic backup modules designed for larger scale operations.",
    iconName: "ShieldAlert",
    size: "small",
    bgGradient: "from-indigo-500/10 via-blue-600/5 to-transparent",
    features: ["Strict Type-Safe Schema Declarations", "JWT Auth with Secure httpOnly Cookie Relay", "Automated Daily Redundancy Backups"],
    metrics: "Enterprise SLA: 99.999% uptime"
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Creative design sprints, interactive prototype drafting, full design tokens extraction, and custom font pairings creating a striking modern brand signature.",
    iconName: "Figma",
    size: "small",
    bgGradient: "from-pink-500/10 via-brand-purple/5 to-transparent",
    features: ["Figma components auto-mirroring", "Tailwind Theme custom-token extraction", "Slippery fast tactile micro-interactions"],
    metrics: "Over 45 completed premium layouts"
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
    content: "RK Kinetic is a force multiplier. They did not just code OwnMyLand; they helped define the visual standard of real estate security. Our users consistently praise the interactive maps and fractional ledger. Our speed score is at 99%, and we tokenized $42M in our first quarter.",
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
    content: "The WebGL performance RK Kinetic engineered for VLands is mind-blowing. We are getting a robust 60 FPS directly inside mobile browser frames. Their backend relays state perfectly to thousands of concurrent explorers. Highly recommend RK Kinetic for anything pushing technical boundaries.",
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
    content: "We needed an ultra low-latency telemetry control suite to let our enterprise customers pilot heavy arms remotely over the web. RK Kinetic delivered a React dashboard with 0.2ms latency sync. Outstanding engineering, absolute compliance with industrial constraints, and flawless style.",
    rating: 5,
    projectRelation: "VersatileArm Development",
    verified: true
  }
];

export const ADVANTAGES = [
  {
    title: "Expert Teams Delivery",
    description: "You work directly with our lead division architects. No offshore outsourcers, no untrained managers, and absolutely zero communication lag. Highly focused craft from day one.",
    iconName: "UserCheck",
    gradient: "from-cyan-500/15 over-cyan-500/5 to-transparent"
  },
  {
    title: "100% Clean Architectural Roots",
    description: "Zero bloated wordpress plugins or generic templates. Every single code file is written by hand in highly optimized, type-safe Next/React and clean, semantic Tailwind classes.",
    iconName: "Scissors",
    gradient: "from-purple-500/15 over-purple-500/5 to-transparent"
  },
  {
    title: "Spatial Glass Visual Physics",
    description: "We are at the frontier of premium UI. Our products support high-end backdrop-filters, Apple Vision Pro spatial depth, responsive physical feedback shadows, and delicate glows.",
    iconName: "Sparkles",
    gradient: "from-blue-600/15 over-blue-600/5 to-transparent"
  },
  {
    title: "Server Security Hardening",
    description: "Enterprise validation, robust JWT models, lazy API database initialization, and rigorous automated injection safety tests. Your code will resist modern threat vectors.",
    iconName: "ShieldCheck",
    gradient: "from-emerald-500/15 over-emerald-500/5 to-transparent"
  }
];
