import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import GlowBackground from "./components/GlowBackground";
import ServicesBento from "./components/ServicesBento";
import ProjectShowcase from "./components/ProjectShowcase";
import TechStack from "./components/TechStack";
import DevelopmentProcess from "./components/DevelopmentProcess";
import CompanyDivisions from "./components/CompanyDivisions";
import TrustIndicators from "./components/TrustIndicators";
import AIAssistant from "./components/AIAssistant";
import SharedIcon from "./components/SharedIcons";
import InteractiveHUD from "./components/InteractiveHUD";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playHoverTick, playMenuHover, playSelectTick } from "./utils/sound";

// Register ScrollTrigger for our custom scroll reveals
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedHeroStat, setSelectedHeroStat] = useState<number | null>(null);

  // Persistent Theme State Changer Selection
  const [theme, setTheme] = useState<"light" | "dark" | "cyber" >(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("patel-devs-theme");
      if (saved === "light" || saved === "dark" || saved === "cyber") {
        return saved;
      }
    }
    return "light";
  });

  useEffect(() => {
    localStorage.setItem("patel-devs-theme", theme);
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark", "theme-cyber");
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  // Track scroll position to trigger floating menu glass intensity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section tracking for active highlighter state
      const sections = ["home", "about", "services", "projects", "process", "founders", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cinematic Section ScrollTrigger Reveals and Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const revealItems = [
        { selector: "#about", y: 40 },
        { selector: "#services", y: 50 },
        { selector: "#projects", y: 50 },
        { selector: "#process", y: 45 },
        { selector: "#founders", y: 40 },
        { selector: "#contact", y: 40 },
      ];

      revealItems.forEach((item) => {
        gsap.fromTo(
          item.selector,
          { y: item.y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item.selector,
              start: "top 85%", // starts animating when top of container hits 85% viewport
              toggleActions: "play none none none",
            }
          }
        );
      });

      // Special hero parallax on dynamic canvas card enter
      gsap.fromTo(
        "#hero-interactive-hud",
        { scale: 0.94, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.75)",
          delay: 0.25
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Projects", id: "projects" },
    { label: "Process", id: "process" },
    { label: "Divisions", id: "founders" },
    { label: "Contact", id: "contact" }
  ];

  const handleNavClick = (id: string) => {
    setShowMobileMenu(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const heroStats = [
    { label: "Avg Lighthouse Score", value: "100%", detail: "Surgical file size reduction, dynamic element tree flattening, and complete asset preloading targets." },
    { label: "Telemetry API Sync", value: "0.2ms", detail: "Multi-threaded state relays executing high-frequency remote robotic instructions over express layers." },
    { label: "Connected Asset Capital", value: "$42M+", detail: "Real-time fractionalized ledger calculations verified across 15 global node relays for OwnMyLand." },
    { label: "Interface Layout Density", value: "60 FPS", detail: "GPU-accelerated WebGL shader layers rendering procedural sandbox environments seamlessly inside the browser." }
  ];

  return (
    <div className={`relative min-h-screen font-sans selection:bg-orange-500/20 selection:text-orange-600 transition-colors duration-500 ${
      theme === "dark" ? "text-slate-200" : theme === "cyber" ? "text-slate-100" : "text-slate-800"
    }`}>
      {/* 1. Dynamic Ambient Light Grid Underlay */}
      <GlowBackground theme={theme} />

      {/* 2. Floating Glass Navigation Bar */}
      <nav
        className={`fixed top-5 inset-x-0 z-50 max-w-5xl mx-auto px-4 md:px-6 transition-all duration-300`}
        id="main-navigation-bar"
      >
        <div
          className={`flex items-center justify-between py-4 px-6 rounded-full border transition-all duration-500 ${
            scrolled
              ? "background-glass-scrolled backdrop-blur-2xl border-orange-500/10 bg-white/70 shadow-lg"
              : "border-transparent bg-transparent"
          }`}
          style={{
            backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none"
          }}
        >
          {/* Logo Brand Title */}
          <button
            onClick={() => {
              playSelectTick();
              handleNavClick("home");
            }}
            onMouseEnter={playMenuHover}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-red-500 flex items-center justify-center border border-orange-500/10 shadow-inner group-hover:rotate-6 transition-transform">
              <span className="text-white font-mono font-bold text-[10px] select-none">RK</span>
            </div>
            <div className="text-left">
              <span className="text-slate-800 font-display font-medium text-sm tracking-tight group-hover:text-orange-600 transition-colors">
                RK Kinetic
              </span>
              <span className="text-[9px] font-mono block text-slate-500 leading-none">
                // SYSTEM_ALPHA
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/60 border border-slate-200/80 py-1 px-1.5 rounded-full">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playSelectTick();
                    handleNavClick(item.id);
                  }}
                  onMouseEnter={playHoverTick}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all relative cursor-pointer ${
                    isActive ? "text-orange-600 font-semibold" : "text-slate-500 hover:text-slate-900"
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navActiveHighlighter"
                      className="absolute inset-0 bg-white border border-slate-200/60 shadow-sm rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Connect Action Trigger and Theme Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme switcher pill group */}
            <div className="flex bg-slate-100 border border-slate-200 p-0.5 rounded-full items-center select-none shrink-0">
              <button
                onClick={() => {
                  playSelectTick();
                  setTheme("light");
                }}
                onMouseEnter={playHoverTick}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  theme === "light" ? "bg-white shadow-sm text-orange-500 scale-105" : "text-slate-400 hover:text-slate-600"
                }`}
                title="Light Slate Theme"
              >
                <SharedIcon name="Sun" size={13.5} />
              </button>
              <button
                onClick={() => {
                  playSelectTick();
                  setTheme("dark");
                }}
                onMouseEnter={playHoverTick}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  theme === "dark" ? "bg-slate-900 shadow-sm text-emerald-400 scale-105" : "text-slate-400 hover:text-slate-200"
                }`}
                title="Cosmic Dark Theme"
              >
                <SharedIcon name="Moon" size={13.5} />
              </button>
              <button
                onClick={() => {
                  playSelectTick();
                  setTheme("cyber");
                }}
                onMouseEnter={playHoverTick}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  theme === "cyber" ? "bg-slate-950 shadow-sm text-pink-400 scale-105" : "text-slate-400 hover:text-slate-200"
                }`}
                title="Neon Cyberpunk Theme"
              >
                <SharedIcon name="Zap" size={13.5} />
              </button>
            </div>

            <button
              onClick={() => {
                playSelectTick();
                handleNavClick("contact");
              }}
              onMouseEnter={playMenuHover}
              className="px-5 py-2 rounded-full text-xs font-mono text-white font-semibold bg-slate-900 hover:bg-orange-500 border border-slate-900 hover:shadow-[0_0_15px_rgba(255,95,0,0.3)] transition-all cursor-pointer shrink-0 animate-none"
            >
              Compile Proposal
            </button>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => {
              playSelectTick();
              setShowMobileMenu(!showMobileMenu);
            }}
            onMouseEnter={playHoverTick}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            <SharedIcon name={showMobileMenu ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile menu dropdown panel */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-center rounded-3xl border border-orange-500/10 bg-white/95 backdrop-blur-2xl p-6 md:hidden space-y-4 shadow-2xl"
              id="mobile-navigation-dropdown"
            >
              <div className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full py-2.5 rounded-xl text-sm font-mono tracking-wider transition-colors ${
                      activeSection === item.id ? "bg-orange-500/10 text-orange-600 font-semibold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile theme option switches */}
              <div className="pt-3 pb-1 border-t border-slate-200/50 flex flex-col gap-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block text-left mb-1">
                  // SELECTION ENGINE STYLE:
                </span>
                <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
                  <button
                    onClick={() => {
                      playSelectTick();
                      setTheme("light");
                    }}
                    onMouseEnter={playHoverTick}
                    className={`py-2 px-3 text-[10px] font-mono font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      theme === "light" ? "bg-white text-orange-650 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    <SharedIcon name="Sun" size={12} />
                    LIGHT
                  </button>
                  <button
                    onClick={() => {
                      playSelectTick();
                      setTheme("dark");
                    }}
                    onMouseEnter={playHoverTick}
                    className={`py-2 px-3 text-[10px] font-mono font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      theme === "dark" ? "bg-slate-900 text-emerald-400 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    <SharedIcon name="Moon" size={12} />
                    DARK
                  </button>
                  <button
                    onClick={() => {
                      playSelectTick();
                      setTheme("cyber");
                    }}
                    onMouseEnter={playHoverTick}
                    className={`py-2 px-3 text-[10px] font-mono font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      theme === "cyber" ? "bg-slate-950 text-pink-400 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    <SharedIcon name="Zap" size={12} />
                    CYBER
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleNavClick("contact")}
                className="w-full bg-orange-500 text-white py-3 rounded-full text-sm font-mono font-bold hover:bg-orange-600"
              >
                COMPILE NEW PROPOSAL
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 3. HERO SECTION */}
      <section
        id="home"
        className="pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-28 max-w-6xl mx-auto px-4 md:px-6 relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="hero-layout-grid">
          {/* Left Hero Core Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Version Pro inspired status capsule */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-emerald-500/20 text-emerald-600 text-xs font-mono mx-auto lg:mx-0 uppercase tracking-widest leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              STATUS: STABLE_PRODUCTION_MATRIX_V4
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-slate-900 tracking-tight leading-[1.2] sm:leading-[1.1] md:leading-none pb-2">
              <span className="block sm:inline">Futuristic</span>{" "}
              <span className="bg-gradient-to-r from-orange-500 via-emerald-500 to-teal-600 bg-clip-text text-transparent block sm:inline mt-1 sm:mt-0">
                Software Agency
              </span>{" "}
              <span className="block sm:inline mt-2 sm:mt-0 text-slate-800 font-medium sm:font-bold">
                For High-End Startups
              </span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-light">
              We engineer custom digital monuments and high-performance web applications. Zero fluff, zero generic templates—just pixel-perfect aesthetics backed by fast, reliable, bespoke software architectures.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 text-[11px] font-mono text-slate-500 select-none pb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Pixel-Perfect UI
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                Bespoke Systems
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Extreme Scaling
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => handleNavClick("projects")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
              >
                Explore Productions // [FLAG]
              </button>
              
              <button
                onClick={() => handleNavClick("contact")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer"
              >
                Synthesize Architecture
              </button>
            </div>
          </div>

          {/* Right Hero Interactive 3D Mock HUD (5 cols) */}
          <div className="lg:col-span-5 relative" id="hero-interactive-hud">
            {/* Ambient Background Sphere blur */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-3xl blur-2xl -z-10" />

            <InteractiveHUD />
          </div>
        </div>

        {/* Interactive Stats Grid Selector at the bottom of hero */}
        <div className="mt-16 md:mt-24 border-t border-slate-200/60 pt-12" id="hero-stats-row">
          <p className="text-xs font-mono text-slate-500 tracking-wider uppercase mb-6 text-center select-none">
            Verified Architectural Benchmarks // Select units to inspect details
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {heroStats.map((stat, i) => {
              const isSelected = selectedHeroStat === i;
              return (
                <div
                  key={stat.label}
                  onClick={() => setSelectedHeroStat(isSelected ? null : i)}
                  className={`clay-card rounded-2xl p-5 border cursor-pointer select-none transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? "border-orange-500/40 bg-orange-500/[0.03] shadow-[0_0_20px_rgba(255,95,0,0.06)]"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                  id={`hero-stat-card-${i}`}
                >
                  <div className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-slate-950 to-slate-700 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  
                  <div className="text-xs font-mono text-slate-500 mt-2 flex items-center justify-between">
                    <span>{stat.label}</span>
                    <SharedIcon
                      name="ChevronRight"
                      size={12}
                      className={`text-slate-400 transition-transform ${isSelected ? "rotate-90 text-orange-500" : ""}`}
                    />
                  </div>

                  {/* Expanded explanations block */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.p
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="text-[11px] text-orange-950 font-medium leading-normal border-t border-orange-500/10 pt-2"
                      >
                        {stat.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ABOUT AGENY SECTION */}
      <section
        id="about"
        className="py-20 md:py-24 lg:py-28 max-w-5xl mx-auto px-4 md:px-6 relative overflow-hidden border-t border-slate-200/60"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="about-layout-grid">
          {/* Visual left element (Custom Clay-panel showing split architectural specialties) */}
          <div className="relative order-2 lg:order-1" id="about-split-specialties">
            <div className="absolute -inset-2 bg-gradient-to-tr from-orange-500/10 to-amber-500/5 blur-xl pointer-events-none" />
            
            <div className="rounded-3xl glass-panel p-6 md:p-8 relative overflow-hidden space-y-6">
              <span className="text-[10px] font-mono text-slate-500 uppercase select-none tracking-widest block border-b border-slate-200 pb-2">
                Unified Division Specifications
              </span>

              {/* Systems division Block */}
              <div className="flex gap-4 items-start bg-emerald-50/70 border border-emerald-500/15 p-4 rounded-xl relative group">
                <div className="absolute -right-2 -top-2 w-10 h-10 rounded-full bg-emerald-500/15 blur-md" />
                <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-500/30 flex items-center justify-center text-emerald-600 font-bold font-mono text-xs select-none">
                  SYS
                </div>

                <div>
                  <h4 className="text-base font-display font-semibold text-slate-900">
                    The Logic Core System
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Our Systems & Infrastructure division designs server configurations, persistent cloud registries (Firestore), multi-thread data workers, and constructs strict type safety parameters.
                  </p>
                </div>
              </div>

              {/* Interface division Block */}
              <div className="flex gap-4 items-start bg-teal-50/50 border border-teal-500/10 p-4 rounded-xl relative group">
                <div className="absolute -right-2 -top-2 w-10 h-10 rounded-full bg-teal-500/15 blur-md" />
                <div className="w-10 h-10 rounded-xl bg-teal-100 border border-teal-500/30 flex items-center justify-center text-teal-750 font-bold font-mono text-xs select-none">
                  INT
                </div>

                <div>
                  <h4 className="text-base font-display font-semibold text-slate-900">
                    The Immersive Visual Layer
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Our Creative & Interface division maps complete visual structures, extracts precise design token parameters, constructs liquid glass cards, and choreographs Framer Motion physical limits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right about narrative content (7 cols) */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-emerald-500/20 text-emerald-600 text-xs font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              The Partnership Formula
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              An Alignment of <br />
              <span className="bg-gradient-to-r from-orange-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Systems & Fluidity
              </span>
            </h2>

            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              We started RK Kinetic because we grew frustrated with the industry norm: agencies taking large budgets, only to outsource actual code development to junior interns. This leads to bloated code blocks, security leaks, and poor layout fluidity.
            </p>

            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              When you partner with us, you work strictly with in-house specialists. Our Systems Division designs and manages the secure infrastructure, while our Interface Division designs and shapes the responsive interface. Together, we deliver unified, secure, high-performance platforms that support extreme traffic scales and win industry design awards.
            </p>

            <div className="border-t border-slate-200 pt-6 flex gap-6">
              <div>
                <span className="text-[20px] font-bold text-slate-900 block">100%</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">In-House Code</span>
              </div>
              <div className="border-l border-slate-200/80 pl-6">
                <span className="text-[20px] font-bold text-slate-900 block">&lt; 150ms</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Average Latency Speed</span>
              </div>
              <div className="border-l border-slate-200/80 pl-6">
                <span className="text-[20px] font-bold text-slate-900 block">0</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Outsourced Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES BENTO GRID SECTION */}
      <section id="services" className="py-20 md:py-24 lg:py-28 max-w-6xl mx-auto px-4 md:px-6 relative overflow-hidden border-t border-slate-200/60">
        <ServicesBento />
      </section>

      {/* 6. FEATURED PROJECTS SHOWCASE SECTION */}
      <section id="projects" className="py-20 md:py-24 lg:py-28 max-w-6xl mx-auto px-4 md:px-6 relative overflow-hidden border-t border-slate-200/60">
        <ProjectShowcase />
      </section>

      {/* 7. TECHNOLOGY STACK SECTION */}
      <section id="tech-stack" className="py-20 md:py-24 lg:py-28 max-w-6xl mx-auto px-4 md:px-6 relative overflow-hidden border-t border-slate-200/60">
        <TechStack />
      </section>

      {/* 8. DEVELOPMENT PROCESS TIMELINE SECTION */}
      <section id="process" className="py-20 md:py-24 lg:py-28 max-w-6xl mx-auto px-4 md:px-6 relative overflow-hidden border-t border-slate-200/60">
        <DevelopmentProcess />
      </section>

      {/* 9. SERVICE DIVISIONS SECTION */}
      <section id="founders" className="py-20 md:py-24 lg:py-28 max-w-6xl mx-auto px-4 md:px-6 relative overflow-hidden border-t border-slate-200/60">
        <CompanyDivisions />
      </section>

      {/* 10. TESTIMONIALS & TRUST SECTION */}
      <section id="trust-testimonials" className="py-20 md:py-24 lg:py-28 max-w-6xl mx-auto px-4 md:px-6 relative overflow-hidden border-t border-slate-200/60">
        <TrustIndicators />
      </section>

      {/* 11. QUANTUM PROPOSAL / CONTACT CTA SECTION */}
      <section id="contact" className="py-20 md:py-24 lg:py-28 max-w-6xl mx-auto px-4 md:px-6 relative overflow-hidden border-t border-slate-200/60">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-orange-500/20 text-orange-700 text-xs font-mono mb-4 tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Strategic Estimator Initialization
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight mb-4">
            Begin the <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent">Deployment</span>
          </h2>
          
          <p className="max-w-xl mx-auto text-slate-500 text-sm md:text-base">
            Get an instant structural breakdown. Fill in your project credentials and system guidelines in the interactive terminal below to calculate immediate development estimations.
          </p>
        </div>

        <AIAssistant />
      </section>

      {/* 12. FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-12 text-slate-600 text-xs font-mono" id="main-footer">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-800 font-mono text-[8.5px]">
              RK
            </div>
            <div>
              <span className="text-slate-900 font-display font-medium text-sm block">RK Kinetic</span>
              <span className="text-[10px] text-slate-400 leading-none">© 2026 RK Kinetic. All Rights Reserved.</span>
            </div>
          </div>

          {/* Contact details list instead of build/ENVR */}
          <div className="flex items-center gap-4 flex-wrap justify-center text-xs text-slate-605">
            <a href="tel:1236547891" className="hover:text-orange-600 flex items-center gap-1 font-semibold">
              <span>📞 1236547891</span>
            </a>
            <span>•</span>
            <a href="tel:9876543219" className="hover:text-orange-600 flex items-center gap-1 font-semibold">
              <span>📞 9876543219</span>
            </a>
            <span>•</span>
            <a
              href="mailto:abc@gmail.com"
              className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1"
            >
              <span>✉️ abc@gmail.com</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
