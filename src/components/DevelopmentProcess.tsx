import React, { useState } from "react";
import { motion } from "motion/react";
import { PROCESS_STEPS } from "../data";
import SharedIcon from "./SharedIcons";

export default function DevelopmentProcess() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  return (
    <div className="w-full" id="process-timeline-container">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-orange-500/20 text-orange-600 text-xs font-mono mb-4 tracking-wider uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          The Execution Protocol
        </motion.div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight mb-4">
          Development <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent">Process</span>
        </h2>
        
        <p className="max-w-xl mx-auto text-slate-500 text-sm md:text-base">
          Our calibrated, time-boxed operational sprint framework. We compile abstract ideas into stable, secure production units within documented timelines.
        </p>
      </div>

      {/* Main timeline tracker */}
      <div className="relative mt-8 max-w-5xl mx-auto px-4">
        {/* Central Vertical Connector Line (hidden on small responsive blocks) */}
        <div className="absolute left-[50%] top-8 bottom-8 w-[1px] bg-gradient-to-b from-orange-500 via-amber-500 to-red-500 opacity-20 hidden md:block" />

        {/* Process Node Cards */}
        <div className="space-y-12">
          {PROCESS_STEPS.map((step, index) => {
            const isRight = index % 2 === 1;
            const isHovered = hoveredStep === step.step;

            return (
              <div
                key={step.step}
                className={`flex flex-col md:flex-row items-center gap-8 relative ${
                  isRight ? "md:flex-row-reverse" : ""
                }`}
                onMouseEnter={() => setHoveredStep(step.step)}
                onMouseLeave={() => setHoveredStep(null)}
                id={`process-node-${step.step}`}
              >
                {/* Visual Connector Dot on Central Line */}
                <div className="absolute left-[50%] -translate-x-[50%] w-4 h-4 rounded-full border-2 border-slate-300 bg-slate-50 z-10 hidden md:flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.35 : 1,
                      backgroundColor: isHovered
                        ? isRight
                          ? "#f97316"
                          : "#f59e0b"
                        : "#94a3b8",
                    }}
                    className="w-2 h-2 rounded-full"
                    transition={{ duration: 0.2 }}
                  />
                </div>

                {/* Left/Right Spacing element to push card properly (50% layout) */}
                <div className="w-full md:w-1/2" />

                {/* The Timeline Card (50% Layout) */}
                <motion.div
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                  className={`w-full md:w-1/2 p-6 md:p-8 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between cursor-pointer border ${
                    isHovered
                      ? isRight
                        ? "border-orange-500/40 shadow-[0_0_30px_rgba(249,115,22,0.08)] bg-orange-500/[0.01]"
                        : "border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.08)] bg-amber-500/[0.01]"
                      : "border-slate-200/60 bg-transparent"
                  }`}
                >
                  {/* Dynamic background splash reflective glow */}
                  <div
                    className={`absolute -right-16 -top-16 w-36 h-36 rounded-full blur-3xl opacity-10 transition-opacity duration-300 ${
                      isHovered ? "opacity-25" : "opacity-0"
                    } ${isRight ? "bg-orange-500" : "bg-amber-400"}`}
                  />

                  {/* Top-line of steps card */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-mono font-bold ${isRight ? "text-orange-600" : "text-amber-600"}`}>
                        PHASE {step.step}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-50 py-1 px-2.5 rounded-full border border-slate-200/80">
                        {step.duration}
                      </span>
                    </div>

                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center clay-card border-slate-200/50 ${
                      isHovered ? isRight ? "text-orange-600" : "text-amber-600" : "text-slate-400"
                    }`}>
                      <SharedIcon name={step.iconName} size={18} />
                    </div>
                  </div>

                  {/* Core details */}
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-slate-900 tracking-tight mb-2.5">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Checklist details (Framer Motion Height reveal!) */}
                  <div className="border-t border-slate-200/80 pt-4">
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase mb-3 block">
                      Key Deliverables Checklist
                    </span>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {step.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2 text-xs text-slate-600">
                          <SharedIcon
                            name="Check"
                            size={12}
                            className={`shrink-0 ${isRight ? "text-orange-600" : "text-amber-500"}`}
                          />
                          <span className="truncate">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
