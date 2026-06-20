import React from "react";
import { motion } from "motion/react";
import { SERVICES } from "../data";
import SharedIcon from "./SharedIcons";
import { playHoverTick } from "../utils/sound";

export default function ServicesBento() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18,
      },
    },
  };

  // Maps size properties to corresponding Tailwind CSS column spanning layout values
  const getSizeClasses = (size: "small" | "medium" | "large" | "wide") => {
    switch (size) {
      case "wide":
        return "md:col-span-2 lg:col-span-3";
      case "large":
        return "md:col-span-2 lg:col-span-2";
      case "medium":
        return "md:col-span-2 lg:col-span-1";
      case "small":
      default:
        return "col-span-1";
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-16" id="services-header">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-orange-500/20 text-orange-600 text-xs font-mono mb-4 tracking-wider uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Execution Capabilities
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-slate-900 mb-6"
        >
          Services <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent">Bento Grid</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-slate-500 text-base md:text-lg"
        >
          Futuristic software architecture engineered for speed, high-fidelity visualization, and modular compliance. Select cards to explore key engineering benchmarks.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        id="services-grid-wrapper"
      >
        {SERVICES.map((service, index) => {
          const isWide = service.size === "wide";
          const isLarge = service.size === "large";
          
          const accent = index % 3 === 0 
            ? {
                text: "text-orange-600",
                bg: "bg-orange-500",
                badge: "text-orange-700 bg-orange-50 border-orange-500/20",
                gradient: "from-orange-400 to-amber-500",
                grid: "to-orange-500/5",
                hud: "border-orange-500/10",
                hoverText: "group-hover:text-orange-600"
              }
            : index % 3 === 1
              ? {
                  text: "text-emerald-600",
                  bg: "bg-emerald-500",
                  badge: "text-emerald-700 bg-emerald-50 border-emerald-500/20",
                  gradient: "from-emerald-400 to-teal-500",
                  grid: "to-emerald-500/5",
                  hud: "border-emerald-500/10",
                  hoverText: "group-hover:text-emerald-600"
                }
              : {
                  text: "text-amber-600",
                  bg: "bg-amber-500",
                  badge: "text-amber-700 bg-amber-50 border-amber-500/20",
                  gradient: "from-amber-400 to-orange-500",
                  grid: "to-amber-500/5",
                  hud: "border-amber-500/10",
                  hoverText: "group-hover:text-amber-600"
                };
          
          return (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.015,
                translateY: -4,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              onMouseEnter={playHoverTick}
              className={`${getSizeClasses(service.size)} relative rounded-3xl p-8 glass-panel glass-panel-hover flex flex-col justify-between group overflow-hidden`}
              id={`service-card-${service.id}`}
            >
              {/* Dynamic back-glowing ambient light circle */}
              <div 
                className={`absolute -right-20 -top-20 w-52 h-52 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-30 bg-gradient-to-r ${accent.gradient}`}
              />

              {/* Holographic inner grid lines */}
              <div className={`absolute inset-0 bg-radial-gradient from-transparent ${accent.grid} pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />

              <div>
                <div className="flex justify-between items-start mb-6">
                  {/* Glassmorphic Neomorphic Claymorphism Circle Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center clay-card shadow-spatial-glow ${accent.text} ${accent.hud} transition-transform duration-300 group-hover:rotate-6`}>
                    <SharedIcon name={service.iconName} className={accent.text} size={24} />
                  </div>

                  <span className="text-slate-300 font-mono text-xs select-none">
                    // [CAP-0{index + 1}]
                  </span>
                </div>

                <h3 className={`text-2xl font-display font-semibold text-slate-900 tracking-tight mb-3 ${accent.hoverText} transition-colors duration-300`}>
                  {service.title}
                </h3>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Service Features list - formatted perfectly depending on card size */}
                <ul className={`space-y-2.5 mb-8 ${isWide ? "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5" : ""}`}>
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-xs text-slate-600 gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${accent.bg} group-hover:scale-125 transition-transform duration-300`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benchmark Metric Footer (Liquid Class Status indicator) */}
              <div className="border-t border-slate-200/80 pt-4 flex justify-between items-center mt-auto">
                <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">
                  Audited Output
                </span>
                <span className={`text-xs font-mono font-medium px-3 py-1 rounded-full border shadow-inner ${accent.badge}`}>
                  {service.metrics}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
