import React from "react";
import { motion } from "motion/react";
import SharedIcon from "./SharedIcons";
import { playHoverTick } from "../utils/sound";

interface Industry {
  name: string;
  desc: string;
  icon: string;
  gradient: string;
}

export default function IndustriesWeServe() {
  const industries: Industry[] = [
    {
      name: "Real Estate",
      desc: "Deed registries, property dashboards, and interactive tokenized market assets.",
      icon: "Globe",
      gradient: "from-cyan-500/10 to-blue-600/5"
    },
    {
      name: "Construction",
      desc: "Structured workflows, layout blueprints, and multi-tier operational control frameworks.",
      icon: "Layers",
      gradient: "from-orange-500/10 to-amber-500/5"
    },
    {
      name: "Startups",
      desc: "High-fidelity MVPs, SaaS launchpads, scaling pipelines, and growth engineering.",
      icon: "Rocket",
      gradient: "from-emerald-500/10 to-teal-500/5"
    },
    {
      name: "Educational Institutions",
      desc: "Interactive portals, student registries, cloud servers, and fast network deployments.",
      icon: "LayoutGrid",
      gradient: "from-purple-500/10 to-pink-500/5"
    },
    {
      name: "Healthcare",
      desc: "HIPAA-compliant servers, secure database logs, and failover backup systems.",
      icon: "ShieldCheck",
      gradient: "from-blue-600/10 to-indigo-500/5"
    },
    {
      name: "Manufacturing",
      desc: "Industrial telemetry, IoT setups, automated tracking, and hardware integration.",
      icon: "Cpu",
      gradient: "from-red-500/10 to-orange-500/5"
    },
    {
      name: "Retail Businesses",
      desc: "Secure transaction channels, custom inventory managers, and CCTV installations.",
      icon: "Briefcase",
      gradient: "from-amber-500/10 to-yellow-500/5"
    },
    {
      name: "Professional Services",
      desc: "IT consulting audits, digital transformation plans, and annual maintenance agreements.",
      icon: "UserCheck",
      gradient: "from-pink-500/10 to-brand-purple/5"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="w-full" id="industries-serve-container">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-emerald-500/20 text-emerald-600 text-xs font-mono mb-4 tracking-wider uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Market Ecosystem
        </motion.div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight mb-4">
          Industries <span className="bg-gradient-to-r from-orange-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">We Serve</span>
        </h2>
        
        <p className="max-w-xl mx-auto text-slate-550 text-sm md:text-base">
          Delivering calibrated software engineering, secure server configurations, and enterprise hardware infrastructure to empower leading industry sectors.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        id="industries-grid"
      >
        {industries.map((ind, idx) => (
          <motion.div
            key={ind.name}
            variants={cardVariants}
            onMouseEnter={playHoverTick}
            whileHover={{
              scale: 1.02,
              translateY: -4,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="rounded-2xl glass-panel p-6 border border-slate-200/60 relative overflow-hidden flex flex-col justify-between group cursor-pointer"
            id={`industry-card-${idx}`}
          >
            {/* Glowing ambient background blur */}
            <div className={`absolute -right-16 -top-16 w-36 h-36 rounded-full blur-2xl opacity-10 transition-opacity duration-300 group-hover:opacity-20 bg-gradient-to-tr ${ind.gradient}`} />
            
            <div className="space-y-4">
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center clay-card border-slate-200/50 text-orange-600 transition-transform duration-300 group-hover:scale-105">
                <SharedIcon name={ind.icon} size={18} />
              </div>
              
              <h3 className="text-lg font-display font-bold text-slate-900 leading-tight group-hover:text-orange-650 transition-colors">
                {ind.name}
              </h3>
              
              <p className="text-slate-600 text-xs leading-relaxed">
                {ind.desc}
              </p>
            </div>
            
            <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-[9px] font-mono text-slate-400">
              <span>ACTIVE_DEPLOYMENTS</span>
              <span className="text-orange-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
