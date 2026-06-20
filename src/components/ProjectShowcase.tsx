import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import SharedIcon from "./SharedIcons";
import { playHoverTick, playSelectTick } from "../utils/sound";

export default function ProjectShowcase() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);
  const [inspectingId, setInspectingId] = useState<string | null>(null);

  // Active project selection
  const activeProj = PROJECTS.find((p) => p.id === activeId) || PROJECTS[0];

  // Helper to color borders and indicators based on brand state
  const getBrandColors = (color: string) => {
    switch (color) {
      case "cyan":
        return {
          text: "text-orange-600",
          border: "border-orange-500/20",
          bg: "bg-orange-500/10",
          blob: "from-orange-500/10 via-amber-500/5 to-transparent",
          accent: "#ff5d00",
          textBg: "bg-orange-50",
        };
      case "purple":
        return {
          text: "text-red-600",
          border: "border-red-500/20",
          bg: "bg-red-500/10",
          blob: "from-red-500/10 via-orange-500/5 to-transparent",
          accent: "#ef4444",
          textBg: "bg-red-50",
        };
      case "emerald":
        return {
          text: "text-teal-600",
          border: "border-teal-500/20",
          bg: "bg-teal-500/10",
          blob: "from-teal-500/10 via-emerald-500/5 to-transparent",
          accent: "#0d9488",
          textBg: "bg-teal-50",
        };
      case "blue":
      default:
        return {
          text: "text-orange-500",
          border: "border-orange-500/20",
          bg: "bg-orange-500/10",
          blob: "from-orange-500/10 via-orange-400/5 to-transparent",
          accent: "#ff7c00",
          textBg: "bg-orange-50/50",
        };
    }
  };

  const style = getBrandColors(activeProj.highlightColor);

  return (
    <div className="w-full" id="projects-section-container">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-orange-500/20 text-orange-600 text-xs font-mono mb-4 tracking-wider uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Flagship Integrations
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight mb-4">
          Featured <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent">Productions</span>
        </h2>
        <p className="max-w-xl mx-auto text-slate-550 text-sm md:text-base">
          Interactive deep dives into live code bases, rendering real-time operational status metrics and layout benchmarks.
        </p>
      </div>

      {/* Primary Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Project Switcher tabs (3 cols) */}
        <div className="col-span-1 lg:col-span-4 space-y-3" id="project-selector-tabs">
          <p className="text-xs font-mono text-slate-500 tracking-wider uppercase mb-2 pl-2">
            Select Active Core
          </p>
          {PROJECTS.map((proj) => {
            const isSelected = proj.id === activeId;
            const pStyle = getBrandColors(proj.highlightColor);
            
            return (
              <button
                key={proj.id}
                onClick={() => {
                  playSelectTick();
                  setActiveId(proj.id);
                  setInspectingId(null);
                }}
                onMouseEnter={playHoverTick}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? `glass-panel ${pStyle.border} bg-orange-500/[0.02]`
                    : "border-transparent bg-transparent hover:bg-orange-500/[0.015]"
                }`}
                id={`project-tab-btn-${proj.id}`}
              >
                {/* Active selector background accent glow */}
                {isSelected && (
                  <motion.div
                    layoutId="activeProjIndicator"
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-500/[0.03] to-transparent pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-mono tracking-wider uppercase ${pStyle.text}`}>
                        {proj.category}
                      </span>
                      {proj.status === "Under Development" && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 border border-amber-500/20 animate-pulse">
                          WIP
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-display font-medium text-slate-900 group-hover:text-slate-800 transition-colors">
                      {proj.title}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isSelected ? "bg-orange-100 text-orange-600" : "text-slate-400 bg-slate-50 group-hover:bg-slate-100 group-hover:text-slate-600"
                  }`}>
                    <SharedIcon name="ChevronRight" size={16} className={isSelected ? pStyle.text : ""} />
                  </div>
                </div>

                <p className="text-[12px] text-slate-500 mt-2 line-clamp-1 group-hover:text-slate-700 transition-colors">
                  {proj.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Central Display Card (8 cols) */}
        <div className="col-span-1 lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProj.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl glass-panel p-6 md:p-8 relative overflow-hidden"
              id={`project-display-card-${activeProj.id}`}
            >
              {/* Core visual glow behind card */}
              <div className={`absolute -right-36 -bottom-36 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-r ${style.blob}`} />
              <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-400 select-none">
                SYSTEM_ID: {activeProj.id.toUpperCase()}_STABLE
              </div>

              {/* Title Header with responsive components */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className={`text-xs font-mono font-medium tracking-wider px-2.5 py-0.5 rounded-md border ${style.border} ${style.textBg} ${style.text}`}>
                      {activeProj.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Year: {activeProj.year}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      •
                    </span>
                    <span className="text-xs font-mono text-slate-600">
                      Client: {activeProj.client}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
                    {activeProj.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={activeProj.url}
                    target="_blank"
                    rel="noreferrer referrer"
                    className="px-5 py-2.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 flex items-center gap-2 transition-all"
                  >
                    <span>Launch App</span>
                    <SharedIcon name="ArrowUpRight" size={14} />
                  </a>

                  <button
                    onClick={() => setInspectingId(inspectingId === activeProj.id ? null : activeProj.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-medium border flex items-center gap-2 transition-all ${
                      inspectingId === activeProj.id
                        ? "bg-orange-500/20 border-orange-500 text-orange-700 font-semibold"
                        : "bg-orange-50 hover:bg-orange-100 border-orange-500/20 text-orange-600"
                    }`}
                  >
                    <SharedIcon name="Cpu" size={14} className={inspectingId === activeProj.id ? "animate-spin" : ""} />
                    <span>{inspectingId === activeProj.id ? "Close Inspector" : "Inspect Portal"}</span>
                  </button>
                </div>
              </div>

              {/* Interactive Holographic Server Monitor view! (When Inspecting is active) */}
              {inspectingId === activeProj.id ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 rounded-2xl border border-dashed border-orange-500/20 p-5 bg-orange-500/[0.02] overflow-hidden"
                  id={`project-inspector-${activeProj.id}`}
                >
                  <div className="flex items-center justify-between mb-4 border-b border-orange-500/10 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping inline-block" />
                      <span className="text-xs font-mono text-orange-600 font-semibold tracking-wider uppercase">
                        Holographic Deployment Inspector
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-orange-550/70 text-orange-600">
                      SECURE_SHIELD_V4_ONLINE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Process Simulation list */}
                    <div className="space-y-2 text-[11px] font-mono text-slate-600">
                      <div className="flex justify-between border-b border-slate-200 pb-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        <span>Process</span>
                        <span>Signal Status</span>
                      </div>
                      <div className="flex justify-between px-2 text-slate-600">
                        <span>GET /api/{activeProj.id}/telemetry</span>
                        <span className="text-emerald-600">200 OK — 1.2ms</span>
                      </div>
                      <div className="flex justify-between px-2 text-slate-600">
                        <span>VITE_DEPS_INJECT_CHECK</span>
                        <span className="text-orange-600 font-semibold">// VERIFIED</span>
                      </div>
                      <div className="flex justify-between px-2 text-slate-600">
                        <span>BACKDROP_STABILITY_FILTER</span>
                        <span className="text-emerald-600">99.85% CALIBRATED</span>
                      </div>
                      <div className="flex justify-between px-2 text-slate-600">
                        <span>STATE_SYNCHRONIZATION</span>
                        <span className="text-blue-600">ACTIVE RELAY</span>
                      </div>
                    </div>

                    {/* Simulation Graph Indicator */}
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono text-slate-400 font-medium">NETWORK FLUIDITY</span>
                        <span className="text-xs font-mono text-orange-500 font-bold">100%</span>
                      </div>
                      
                      <div className="h-16 flex items-end gap-1.5 justify-center">
                        {[40, 55, 30, 80, 95, 60, 45, 90, 85, 100, 70, 85, 95].map((height, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{
                              duration: 0.8,
                              delay: i * 0.05,
                              repeat: Infinity,
                              repeatType: "reverse",
                              repeatDelay: 0.2
                            }}
                            className="bg-gradient-to-t from-orange-500 to-orange-300 flex-1 rounded-t-sm"
                            style={{ minWidth: "3px" }}
                          />
                        ))}
                      </div>

                      <p className="text-[9px] font-mono text-orange-600 text-center mt-2 uppercase">
                        Real-time microsecond performance logs buffered
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : null}

              {/* Grid with features and project-statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="project-body-grid">
                <div>
                  <h4 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-3">
                    Architectural Narrative
                  </h4>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                    {activeProj.description}
                  </p>

                  <h4 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-3">
                    Core Capabilities Engineered
                  </h4>
                  <ul className="space-y-3">
                    {activeProj.features.map((feat, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-slate-600">
                        <SharedIcon name="CheckCircle2" size={16} className={`mt-0.5 shrink-0 ${style.text}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right side with Stats & Tag bubbles */}
                <div className="flex flex-col justify-between space-y-6">
                  {/* Stats Container */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-mono text-slate-500 uppercase tracking-wider">
                      Engineering Benchmarks
                    </h4>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {activeProj.stats.map((stat, sIdx) => (
                        <div
                          key={sIdx}
                          className="clay-card rounded-2xl p-4 text-center border-slate-200 shadow-inner"
                        >
                          <div className={`text-lg md:text-2xl font-display font-bold ${style.text}`}>
                            {stat.value}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase leading-snug">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Roles */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Role & Contribution
                    </span>
                    <p className="text-xs text-slate-800 font-medium mt-1">
                      {activeProj.role}
                    </p>
                  </div>

                  {/* Tech stack tags */}
                  <div>
                    <h4 className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2.5">
                      Operational Stack Used
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full hover:border-orange-500/30 hover:text-orange-600 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
