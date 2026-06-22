import React, { useState } from "react";
import { motion } from "motion/react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { DEVELOPERS } from "../data";
import SharedIcon from "./SharedIcons";

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

export default function CompanyDivisions() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <div className="w-full" id="founders-section-container">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-emerald-500/20 text-emerald-600 text-xs font-mono mb-4 tracking-wider uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          The Leadership Team
        </motion.div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight mb-4">
          Core Team <span className="bg-gradient-to-r from-orange-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Partners</span>
        </h2>
        
        <p className="max-w-xl mx-auto text-slate-550 text-sm md:text-base">
          Our specialists work in tandem to construct complete digital ecosystems. We build software architectures, design visual interfaces, and deploy secure network frameworks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" id="founders-grid">
        {DEVELOPERS.map((dev, index) => {
          const isSelected = activeCard === dev.name;

          // Design dynamic accents for each partner card
          const accent = index === 0
            ? {
                text: "text-orange-600",
                badgeText: "text-orange-700",
                bg: "bg-orange-500",
                border: "border-orange-500/30",
                glow: "from-orange-400 to-red-400",
                label: "CORE_SYS",
                status: "STATUS: SOFTWARE ARC",
                hoverText: "group-hover:text-orange-600",
                hoverBorder: "hover:border-orange-500/30 hover:text-orange-600"
              }
            : index === 1
              ? {
                  text: "text-emerald-700",
                  badgeText: "text-emerald-800",
                  bg: "bg-emerald-500",
                  border: "border-emerald-500/30",
                  glow: "from-emerald-400 to-teal-500",
                  label: "CORE_UI",
                  status: "STATUS: FULL-STACK ENG",
                  hoverText: "group-hover:text-emerald-700",
                  hoverBorder: "hover:border-emerald-500/30 hover:text-emerald-750"
                }
              : {
                  text: "text-blue-600",
                  badgeText: "text-blue-700",
                  bg: "bg-blue-500",
                  border: "border-blue-500/30",
                  glow: "from-blue-400 to-indigo-500",
                  label: "CORE_INF",
                  status: "STATUS: INFRASTRUCTURE DEPLOY",
                  hoverText: "group-hover:text-blue-600",
                  hoverBorder: "hover:border-blue-500/30 hover:text-blue-600"
                };

          return (
            <motion.div
              key={dev.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 90 }}
              onMouseEnter={() => setActiveCard(dev.name)}
              onMouseLeave={() => setActiveCard(null)}
              whileHover={{
                scale: 1.01,
                translateY: -5,
                transition: { duration: 0.25 }
              }}
              className={`rounded-3xl glass-panel p-6 md:p-8 relative overflow-hidden flex flex-col justify-between border cursor-pointer ${
                isSelected
                  ? `${accent.border} shadow-[0_0_40px_rgba(255,95,0,0.08)]`
                  : "border-slate-200/60"
              }`}
              id={`developer-card-${index}`}
            >
              {/* Colored background splash ambient dot */}
              <div
                className={`absolute -right-20 -top-20 w-56 h-56 rounded-full blur-[100px] opacity-10 transition-opacity duration-300 pointer-events-none ${
                  isSelected ? "opacity-25" : ""
                } bg-gradient-to-tr ${accent.glow}`}
              />

              {/* Status active telemetry row */}
              <div className="flex items-center justify-between mb-6 border-b border-slate-200/80 pb-5">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${accent.bg} animate-pulse`} />
                  <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">
                    Core Module: {accent.label}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 border border-slate-200 ${accent.badgeText}`}>
                  {accent.status}
                </span>
              </div>

              {/* Primary Profile Details Block */}
              <div className="flex flex-col sm:flex-row gap-5 items-start mb-6">
                {/* Custom-framed glassmorphic portrait avatar */}
                <div className="relative shrink-0 mx-auto sm:mx-0">
                  <div className={`absolute -inset-1 rounded-2xl opacity-40 blur-sm transition-opacity duration-300 ${
                    isSelected ? "opacity-100" : ""
                  } bg-gradient-to-tr ${accent.glow}`} />
                  
                  {dev.riveFile ? (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl relative z-10 border border-slate-200/80 bg-slate-900/5 overflow-hidden flex items-center justify-center">
                      <RivePlayer src={dev.riveFile} />
                    </div>
                  ) : (
                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover relative z-10 border border-slate-200/80"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                <div className="text-center sm:text-left flex-1">
                  <span className={`text-[11px] font-mono font-medium ${accent.text}`}>
                    {dev.role}
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-display font-medium text-slate-900 mt-1">
                    {dev.name}
                  </h3>

                  <p className="text-slate-655 text-xs mt-3 leading-relaxed">
                    {dev.bio}
                  </p>

                  <div className={`text-[11px] font-mono mt-2.5 ${accent.text}`}>
                    Focus: <span className="text-slate-800 font-medium">{dev.focus}</span>
                  </div>
                </div>
              </div>

              {/* Categoric technical tags */}
              <div className="mb-6">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2.5 block">
                  Signature Stack Specializations
                </span>
                
                <div className="flex flex-wrap gap-1.5">
                  {dev.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-[11px] font-mono bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-lg transition-colors ${accent.hoverBorder}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Signature quote layout with direct responsive links */}
              <div className="border-t border-slate-200/80 pt-5 mt-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Quote details */}
                <div className="max-w-[75%]">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase mb-1">
                    Division Mission
                  </span>
                  <p className="text-[11px] italic text-slate-600 leading-normal line-clamp-2">
                    &ldquo;{dev.signatureQuote}&rdquo;
                  </p>
                </div>

                {/* Division direct channels */}
                <div className="flex gap-2">
                  {dev.socials.map((soc) => (
                    <a
                      key={soc.platform}
                      href={soc.url}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors ${accent.hoverBorder}`}
                      title={`${dev.name} ${soc.platform}`}
                      id={`social-link-${index}-${soc.platform.toLowerCase()}`}
                    >
                      <SharedIcon name={soc.platform === "Email" ? "Mail" : soc.platform} size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
