import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import SharedIcon from "./SharedIcons";
import { playHoverTick, playSelectTick } from "../utils/sound";

interface StepDetail {
  title: string;
  sub: string;
  description: string;
  badge: string;
  icon: string;
  riveFile: string;
  stat: string;
  statLabel: string;
  bulletPoints: string[];
}

/* ── Individual Rive player ── */
function RivePlayer({ src }: { src: string }) {
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return <RiveComponent className="w-full h-full" />;
}

export default function TechShowcase3D() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps: StepDetail[] = [
    {
      title: "Custom Software Engineering",
      sub: "Bespoke Logic Stacks",
      badge: "SOFTWARE",
      icon: "💻",
      riveFile: "rive/software.riv",
      stat: "150+",
      statLabel: "Projects Delivered",
      description:
        "We build custom enterprise systems, SaaS platforms, ERP structures, and automations tailored to business operations.",
      bulletPoints: [
        "TypeScript & React architecture",
        "Microservices & API pipelines",
        "Multi-tenant database design",
        "Automated CI/CD workflows",
      ],
    },
    {
      title: "Cloud & Virtual Servers",
      sub: "Elastic Infrastructure",
      badge: "CLOUD",
      icon: "☁️",
      riveFile: "rive/cloud.riv",
      stat: "99.9%",
      statLabel: "Uptime Guaranteed",
      description:
        "High-availability serverless deployments on GCP/AWS with auto-scaling and disaster recovery baked in.",
      bulletPoints: [
        "Docker container orchestration",
        "AWS & GCP landing zones",
        "Cloudflare WAF & CDN",
        "Automated disaster backups",
      ],
    },
    {
      title: "Office Networking",
      sub: "Enterprise Connectivity",
      badge: "NETWORK",
      icon: "🌐",
      riveFile: "rive/networking.riv",
      stat: "10Gbps",
      statLabel: "Max Throughput",
      description:
        "Full office networking — structured fiber cabling, firewalls, switches, routers, and enterprise Wi-Fi access points.",
      bulletPoints: [
        "Cat6A / Fiber cabling",
        "VLAN segmentation",
        "Enterprise switch deployment",
        "Intrusion detection systems",
      ],
    },
    {
      title: "CCTV & Surveillance",
      sub: "Physical Security",
      badge: "SECURITY",
      icon: "📹",
      riveFile: "rive/cctv.riv",
      stat: "24/7",
      statLabel: "Monitoring Active",
      description:
        "Enterprise IP camera deployments, NVR cabinets, secure remote viewing, and intelligent motion alerting.",
      bulletPoints: [
        "HD IP surveillance cameras",
        "Centralized NVR cabinets",
        "Secure VPN remote access",
        "AI motion detection alerts",
      ],
    },
    {
      title: "Unified Ecosystem",
      sub: "End-to-End IT",
      badge: "ECOSYSTEM",
      icon: "🔗",
      riveFile: "rive/unified.riv",
      stat: "2hr",
      statLabel: "Response SLA",
      description:
        "Software, networks, cloud, and security merged into one cohesive ecosystem backed by AMC contracts.",
      bulletPoints: [
        "Single point of contact",
        "Proactive health monitoring",
        "Priority SLA support",
        "Annual maintenance planning",
      ],
    },
  ];

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    playSelectTick();
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(165deg, #1a1f2e 0%, #1e2433 40%, #1c2130 100%)",
      }}
    >
      {/* ─── Animated background grid ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,95,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,95,0,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner glow accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-orange-500/[0.08] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.07] blur-[150px] pointer-events-none" />

      {/* ─── Top edge separator ─── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
        {/* ─── Section Header ─── */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-orange-500/25 bg-orange-500/[0.08] mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <span className="text-[11px] font-mono text-orange-400 uppercase tracking-[0.2em]">
              Command Center
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-5"
          >
            <span className="text-white">Our Technology </span>
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-emerald-400 bg-clip-text text-transparent">
              Arsenal
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-400/90 text-sm md:text-base leading-relaxed"
          >
            Explore each layer of our full-stack technology infrastructure.
            Click any sector below to inspect its capabilities.
          </motion.p>
        </div>

        {/* ─── Main Content: Animation + Details ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-12 md:mb-16">

          {/* ── Left: Rive Animation Display ── */}
          <div className="lg:col-span-7 relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-orange-500/25 via-transparent to-emerald-500/20 blur-[1px]" />

            <div className="relative rounded-[28px] overflow-hidden border border-white/[0.08] bg-[#161b27]">
              {/* Status bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f56]" />
                    <span className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
                    <span className="w-[10px] h-[10px] rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="h-4 w-px bg-white/12" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeStep}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      className="text-[10px] font-mono text-slate-500 tracking-wider"
                    >
                      SECTOR_{steps[activeStep].badge} // ACTIVE
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-emerald-500/70">LIVE</span>
                </div>
              </div>

              {/* Rive Canvas */}
              <div className="relative w-full" style={{ height: "460px" }}>
                {/* Subtle radial gradient behind animation */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.04] via-transparent to-emerald-500/[0.03]" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <RivePlayer src={steps[activeStep].riveFile} />
                  </motion.div>
                </AnimatePresence>

                {/* Floating stat badge */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-5 right-5 px-4 py-2.5 rounded-2xl bg-[#1a1f2e]/80 backdrop-blur-xl border border-white/[0.1] text-right"
                  >
                    <div className="text-2xl font-display font-bold text-orange-400 leading-none">
                      {steps[activeStep].stat}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 mt-1 uppercase tracking-wider">
                      {steps[activeStep].statLabel}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Right: Detail Panel ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Step number + badge */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/20">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-orange-400/70 uppercase tracking-[0.15em] block leading-none mb-1">
                      Sector 0{activeStep + 1} / 05
                    </span>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {steps[activeStep].sub}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white/95 mb-4 leading-tight">
                  {steps[activeStep].title}
                </h3>

                {/* Description */}
                <p className="text-slate-400/90 text-sm md:text-[15px] leading-relaxed mb-6">
                  {steps[activeStep].description}
                </p>

                {/* Capabilities list */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em]">
                    Core Capabilities
                  </span>
                  {steps[activeStep].bulletPoints.map((pt, pIdx) => (
                    <motion.div
                      key={pIdx}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + pIdx * 0.08 }}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-orange-500/30 group-hover:bg-orange-500/[0.08] transition-colors">
                        <svg width="10" height="10" viewBox="0 0 10 10" className="text-orange-400">
                          <path d="M1.5 5 L4 7.5 L8.5 2.5" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-[13px] text-slate-300/90 font-light">{pt}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    playSelectTick();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-8 px-6 py-3 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-[0_0_30px_rgba(255,95,0,0.25)] transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  Get Started
                  <SharedIcon name="ChevronRight" size={12} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ─── Step Navigator Tabs ─── */}
        <div className="relative">
          {/* Connector line behind tabs */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.08] -translate-y-1/2 hidden md:block" />

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 relative z-10">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  onMouseEnter={() => playHoverTick()}
                  className={`
                    relative group cursor-pointer px-4 md:px-5 py-3 md:py-3.5 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all duration-400 border
                    ${isActive
                      ? "bg-gradient-to-r from-orange-500/15 to-orange-500/5 border-orange-500/30 text-orange-400 shadow-[0_0_25px_rgba(255,95,0,0.12)]"
                      : "bg-white/[0.04] border-white/[0.08] text-slate-400 hover:border-white/[0.15] hover:text-slate-200 hover:bg-white/[0.07]"
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{step.icon}</span>
                    <span className="hidden sm:inline">{step.badge}</span>
                    <span className="sm:hidden">0{idx + 1}</span>
                  </div>

                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabDot"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,95,0,0.6)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Bottom tagline ─── */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-slate-500 text-xs font-mono tracking-wider">
            <span className="text-emerald-400">●</span> ALL SYSTEMS OPERATIONAL — ONE PARTNER, COMPLETE TECHNOLOGY ECOSYSTEM
          </p>
        </div>
      </div>

      {/* ─── Bottom edge separator ─── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent" />
    </section>
  );
}
