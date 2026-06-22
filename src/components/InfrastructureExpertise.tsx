import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import SharedIcon from "./SharedIcons";
import { playHoverTick } from "../utils/sound";

interface InfrastructureNode {
  id: string;
  label: string;
  sub: string;
  icon: string;
  glow: string;
  tech: string[];
}

export default function InfrastructureExpertise() {
  const [activeNode, setActiveNode] = useState(0);

  // Auto cycle active nodes for organic motion indicator unless hovered
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nodes: InfrastructureNode[] = [
    {
      id: "software",
      label: "Business Software",
      sub: "Logic Layer",
      icon: "Code",
      glow: "rgba(249, 115, 22, 0.15)",
      tech: ["Custom SaaS", "ERP Portals", "AI Automation", "API Gateways"]
    },
    {
      id: "cloud",
      label: "Cloud Infrastructure",
      sub: "Deployment Layer",
      icon: "Cloud",
      glow: "rgba(56, 189, 248, 0.15)",
      tech: ["GCP / AWS", "Docker / K8s", "Cloudflare CDN", "Failover Backups"]
    },
    {
      id: "networking",
      label: "Networking",
      sub: "Connectivity Layer",
      icon: "Network",
      glow: "rgba(16, 185, 129, 0.15)",
      tech: ["Structured Cabling", "High-Speed Wi-Fi", "VPN Setup", "Switch Hardening"]
    },
    {
      id: "security",
      label: "Security Systems",
      sub: "Surveillance Layer",
      icon: "Camera",
      glow: "rgba(239, 68, 68, 0.15)",
      tech: ["IP Camera CCTV", "Enterprise Storage", "Remote Feeds", "Access Logs"]
    },
    {
      id: "support",
      label: "Ongoing Support",
      sub: "Sustainment Layer",
      icon: "Wrench",
      glow: "rgba(245, 158, 11, 0.15)",
      tech: ["AMC Maintenance", "SLA Monitoring", "Tech Audits", "Helpdesk Desk"]
    }
  ];

  return (
    <div className="w-full" id="infrastructure-expertise-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Copy Narrative */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-orange-500/20 text-orange-600 text-xs font-mono mb-2 tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Beyond Software
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-tight">
            Complete Technology <br />
            <span className="bg-gradient-to-r from-orange-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Infrastructure
            </span>
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light">
            Unlike traditional software agencies, NitorTech Solutions combines software engineering, networking expertise, infrastructure management, and security solutions to deliver complete business technology ecosystems.
          </p>

          <div className="border-t border-slate-200/80 pt-6 space-y-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
              CURRENT PIPELINE FOCUS:
            </span>
            <div className="rounded-2xl bg-slate-50/50 border border-slate-200/60 p-4 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 border border-slate-200 shadow-sm">
                  <SharedIcon name={nodes[activeNode].icon} size={18} className="text-orange-500" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-display font-bold text-slate-900">
                    {nodes[activeNode].label}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">
                    {nodes[activeNode].sub}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {nodes[activeNode].tech.map((t) => (
                  <span key={t} className="text-[10px] font-mono bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Animated Pipeline */}
        <div className="lg:col-span-7 relative flex flex-col items-center">
          {/* Vertical connection line */}
          <div className="absolute left-[50%] -translate-x-[50%] top-6 bottom-6 w-[2px] bg-gradient-to-b from-orange-500 via-emerald-500 to-teal-500 opacity-20" />

          <div className="space-y-8 w-full max-w-md relative z-10">
            {nodes.map((node, index) => {
              const isActive = activeNode === index;
              return (
                <motion.div
                  key={node.id}
                  onClick={() => {
                    playHoverTick();
                    setActiveNode(index);
                  }}
                  whileHover={{ scale: 1.02, translateY: -2 }}
                  className={`flex items-center gap-5 p-4 rounded-2xl glass-panel cursor-pointer select-none transition-all duration-300 border ${
                    isActive
                      ? "border-orange-500/40 bg-orange-500/[0.02] shadow-[0_0_25px_rgba(249,115,22,0.06)]"
                      : "border-slate-200 hover:border-slate-350 bg-white"
                  }`}
                  id={`infra-node-${node.id}`}
                >
                  {/* Left node serial badge */}
                  <span className="text-xs font-mono text-slate-400 select-none w-8">
                    0{index + 1}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                      isActive ? "bg-orange-500 text-white shadow-md scale-110" : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}
                  >
                    <SharedIcon name={node.icon} size={18} />
                  </div>

                  {/* Details */}
                  <div className="text-left flex-1">
                    <h4 className="text-sm md:text-base font-display font-medium text-slate-900 leading-none">
                      {node.label}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                      {node.sub}
                    </span>
                  </div>

                  {/* Flow arrow indicators */}
                  {index < nodes.length - 1 && (
                    <div className="absolute left-[50%] -translate-x-[50%] bottom-[-22px] w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center z-20 pointer-events-none hidden md:flex">
                      <motion.div
                        animate={{
                          y: isActive ? [0, 4, 0] : 0,
                          opacity: isActive ? 1 : 0.4
                        }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <SharedIcon name="ChevronRight" size={10} className="rotate-90 text-slate-400" />
                      </motion.div>
                    </div>
                  )}

                  {/* Interactive stack tag previews on large screens */}
                  <div className="hidden sm:flex flex-wrap gap-1 max-w-[150px] justify-end">
                    {node.tech.slice(0, 2).map((t) => (
                      <span key={t} className="text-[8px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 border border-slate-200/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
