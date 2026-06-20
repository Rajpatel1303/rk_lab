import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TECHNOLOGIES } from "../data";
import SharedIcon from "./SharedIcons";

type CategoryType = "Languages" | "Frameworks" | "Databases" | "AI & Cloud" | "Tools & Design";

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("Frameworks");

  const categories: CategoryType[] = [
    "Languages",
    "Frameworks",
    "Databases",
    "AI & Cloud",
    "Tools & Design",
  ];

  const filteredTechs = TECHNOLOGIES.filter((t) => t.category === selectedCategory);

  return (
    <div className="w-full" id="tech-stack-container">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-orange-500/20 text-orange-600 text-xs font-mono mb-4 tracking-wider uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Technical Engine Room
        </motion.div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight mb-4">
          Verified <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent">Tech Stack</span>
        </h2>
        
        <p className="max-w-xl mx-auto text-slate-500 text-sm md:text-base">
          Our core architectural blueprint. We operate strictly within a modern, highly optimized typescript framework with zero deprecated dependencies.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none" id="tech-tabs-list">
        {categories.map((cat) => {
          const isSelected = cat === selectedCategory;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-medium tracking-wider transition-all relative ${
                isSelected
                  ? "text-orange-600 font-semibold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              id={`tech-tab-btn-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCategoryGlow"
                  className="absolute inset-0 bg-orange-500/10 border border-orange-500/30 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid wrapper */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        id="tech-items-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredTechs.map((tech) => (
            <motion.div
              layout
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              whileHover={{
                y: -6,
                boxShadow: `0 8px 30px -4px ${tech.glowColor}40`,
                borderColor: `${tech.glowColor}`,
                transition: { duration: 0.2 }
              }}
              className="clay-card rounded-2xl p-5 border border-slate-200/50 flex flex-col items-center justify-center text-center relative group min-h-[140px] select-none cursor-pointer"
              id={`tech-item-${tech.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {/* Custom dynamic glowing spotlight element directly inside */}
              <div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-xl"
                style={{ backgroundColor: tech.glowColor }}
              />

              <div className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-700 group-hover:text-slate-900 group-hover:border-orange-500/30 transition-all">
                <SharedIcon name={tech.iconName} size={22} className="group-hover:animate-pulse" />
              </div>

              <span className="text-sm font-medium tracking-tight text-slate-800 group-hover:text-slate-950 transition-colors">
                {tech.name}
              </span>

              <span className="text-[9px] font-mono text-slate-400 group-hover:text-slate-500 mt-1 select-none">
                // SYSTEM_ACTIVE
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
