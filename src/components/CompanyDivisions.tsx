import React, { useState } from "react";
import { motion } from "motion/react";
import { DEVELOPERS } from "../data";
import SharedIcon from "./SharedIcons";

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
          The Engineering Divisions
        </motion.div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight mb-4">
          Core Service <span className="bg-gradient-to-r from-orange-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Divisions</span>
        </h2>
        
        <p className="max-w-xl mx-auto text-slate-500 text-sm md:text-base">
          Our specialized divisions work in tandem to construct robust digital products. We map your layouts, architect your scalable backends, and verify your server limits under extreme traffic stress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto" id="founders-grid">
        {DEVELOPERS.map((dev, index) => {
          const isSystems = dev.name.includes("Systems");
          const isSelected = activeCard === dev.name;

          return (
            <motion.div
              key={dev.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 90 }}
              onMouseEnter={() => setActiveCard(dev.name)}
              onMouseLeave={() => setActiveCard(null)}
              whileHover={{
                scale: 1.01,
                translateY: -5,
                transition: { duration: 0.25 }
              }}
              className={`rounded-3xl glass-panel p-6 md:p-8 relative overflow-hidden flex flex-col justify-between border cursor-pointer ${
                isSelected
                  ? isSystems
                    ? "border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.08)]"
                    : "border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.08)]"
                  : "border-slate-200/60"
              }`}
              id={`developer-card-${index}`}
            >
              {/* Colored background splash ambient dot */}
              <div
                className={`absolute -right-20 -top-20 w-56 h-56 rounded-full blur-[100px] opacity-10 transition-opacity duration-300 pointer-events-none ${
                  isSelected ? "opacity-25" : ""
                } ${isSystems ? "bg-orange-500" : "bg-emerald-500"}`}
              />

              {/* Status active telemetry row */}
              <div className="flex items-center justify-between mb-6 border-b border-slate-200/80 pb-5">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isSystems ? "bg-orange-500 animate-pulse" : "bg-emerald-500 animate-pulse"}`} />
                  <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">
                    Core Module // {isSystems ? "CORE_SYS" : "CORE_UI"}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 border border-slate-200 ${
                  isSystems ? "text-orange-600" : "text-emerald-700"
                }`}>
                  {isSystems ? "STATUS: ACTIVE // SPRINT" : "STATUS: ACTIVE // DESIGN"}
                </span>
              </div>

              {/* Primary Profile Details Block */}
              <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
                {/* Custom-framed glassmorphic portrait avatar */}
                <div className="relative shrink-0 mx-auto sm:mx-0">
                  <div className={`absolute -inset-1 rounded-2xl opacity-40 blur-sm transition-opacity duration-300 ${
                    isSelected ? "opacity-100" : ""
                  } bg-gradient-to-tr ${isSystems ? "from-orange-400 to-red-400" : "from-emerald-400 to-teal-500"}`} />
                  
                  <img
                    src={dev.avatar}
                    alt={dev.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover relative z-10 border border-slate-200/80"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-center sm:text-left flex-1">
                  <span className={`text-xs font-mono font-medium ${isSystems ? "text-orange-600" : "text-emerald-700"}`}>
                    {dev.role}
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-display font-medium text-slate-900 mt-1">
                    {dev.name}
                  </h3>

                  <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
                    {dev.bio}
                  </p>

                  <div className={`text-xs font-mono mt-2 ${isSystems ? "text-orange-600" : "text-emerald-600"}`}>
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
                      className={`text-[11px] font-mono bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg transition-colors ${
                        isSystems ? "hover:border-orange-500/30 hover:text-orange-600" : "hover:border-emerald-500/30 hover:text-emerald-600"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Signature quote layout with direct responsive links */}
              <div className="border-t border-slate-200/80 pt-5 mt-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Quote details */}
                <div className="max-w-[80%]">
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
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors ${
                        isSystems ? "hover:text-orange-600 hover:border-orange-500/30" : "hover:text-emerald-600 hover:border-emerald-500/30"
                      }`}
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
