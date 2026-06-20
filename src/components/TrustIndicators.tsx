import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS, ADVANTAGES } from "../data";
import SharedIcon from "./SharedIcons";

export default function TrustIndicators() {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const activeTestimonial = TESTIMONIALS[activeTestimonialIdx];

  const handleNext = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="w-full space-y-24" id="trust-indicators-container">
      {/* 1. WHY CHOOSE US */}
      <div id="why-choose-us-section">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-emerald-500/20 text-emerald-600 text-xs font-mono mb-4 tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Competitive Advantages
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight mb-4">
            Why Partner With <span className="bg-gradient-to-r from-orange-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">RK Kinetic</span>
          </h2>
          
          <p className="max-w-xl mx-auto text-slate-550 text-sm md:text-base">
            We operate with surgical precision. Here are the core pillars that distinguish our product delivery from bloated corporate agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto" id="why-choose-us-grid">
          {ADVANTAGES.map((adv, index) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.012,
                translateY: -3,
                transition: { duration: 0.25 }
              }}
              className="rounded-2xl glass-panel p-6 md:p-8 border border-slate-200/60 relative overflow-hidden flex gap-5 md:gap-6 group"
              id={`advantage-card-${index}`}
            >
              {/* Core glow */}
              <div className="absolute -left-12 -top-12 w-28 h-28 bg-orange-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center clay-card border-slate-200 text-orange-600 mt-1 shadow-spatial-glow">
                <SharedIcon name={adv.iconName} size={20} className="group-hover:scale-110 transition-transform" />
              </div>

              <div>
                <h3 className="text-xl font-display font-medium text-slate-900 mb-2 group-hover:text-orange-650 transition-colors">
                  {adv.title}
                </h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  {adv.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. TESTIMONIALS SLIDESHOW */}
      <div id="testimonials-section" className="border-t border-slate-200 pt-20">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-emerald-500/20 text-emerald-600 text-xs font-mono mb-4 tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Verified Client Logs
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">
            Endorsements & <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent">Praise</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-550 text-sm md:text-base">
            Read direct diagnostic summaries from the founders of companies we have scaled from scratch.
          </p>
        </div>

        {/* Carousel Slide container */}
        <div className="max-w-3xl mx-auto relative px-4" id="testimonials-carousel-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl glass-panel p-8 md:p-10 border border-slate-200/80 relative overflow-hidden"
            >
              {/* Large graphic quotation marks */}
              <span className="absolute right-8 top-4 font-serif text-8xl text-slate-200/30 select-none leading-none pointer-events-none">
                “
              </span>

              {/* Verified Badge */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-1">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <SharedIcon key={i} name="Star" size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-500/25 px-2 py-0.5 rounded">
                  <SharedIcon name="Check" size={10} />
                  <span>VERIFIED INTEGRATION // {activeTestimonial.projectRelation}</span>
                </div>
              </div>

              {/* Comment text */}
              <p className="text-slate-700 text-sm md:text-base leading-relaxed italic mb-8 relative z-10">
                &ldquo;{activeTestimonial.content}&rdquo;
              </p>

              {/* Author row */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-6 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-orange-400 to-amber-500 blur-xs opacity-50" />
                    <img
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.name}
                      className="w-12 h-12 rounded-xl object-cover relative z-10 border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div>
                    <h4 className="text-slate-900 font-medium text-sm md:text-base">
                      {activeTestimonial.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">
                      {activeTestimonial.role} — <span className="text-orange-600 font-semibold">{activeTestimonial.company}</span>
                    </p>
                  </div>
                </div>

                {/* Left/Right switches */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                    id="prev-testimonial-btn"
                  >
                    <SharedIcon name="ChevronRight" size={16} className="rotate-180" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                    id="next-testimonial-btn"
                  >
                    <SharedIcon name="ChevronRight" size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Indicators dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonialIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeTestimonialIdx ? "w-6 bg-orange-500" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to review index ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
