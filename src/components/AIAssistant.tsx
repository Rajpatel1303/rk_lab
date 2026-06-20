import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SharedIcon from "./SharedIcons";

interface ProposalOutput {
  conceptSummary: string;
  recommendedStack: string[];
  estimatedHours: number;
  timelineCycles: number;
  sysArchitectReview: string; // Systems perspective
  interfaceReview: string; // Interface perspective
  keyPhases: string[];
}

export default function AIAssistant() {
  // Form states
  const [clientName, setClientName] = useState("");
  const [scope, setScope] = useState("");
  const [budgetIdx, setBudgetIdx] = useState(1); // Default to Mid Tier
  const [timelineIdx, setTimelineIdx] = useState(1); // Default to Standard

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<ProposalOutput | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [submitType, setSubmitType] = useState<"lock" | "whatsapp" | null>(null);

  const budgets = [
    { label: "SaaS Starter ($10k - $20k)", code: "STARTER" },
    { label: "Growth scale ($20k - $50k)", code: "GROWTH" },
    { label: "Enterprise Custom ($50k+)", code: "ENTERPRISE" }
  ];

  const timelines = [
    { label: "Rapid Sprint (4 - 6 Cycles)", code: "SPRINT" },
    { label: "Calibrated Release (8 - 12 Cycles)", code: "CALIBRATED" },
    { label: "Deep Continuous (16+ Cycles)", code: "DEEP" }
  ];

  const loadingPhrases = [
    "Compiling Concept Semantics...",
    "Injecting Custom Security Parameters...",
    "Estimating System State Hours...",
    "Formulating Interface Layout Blueprint...",
    "Synthesizing Strategic Milestones..."
  ];

  const triggerAIComputation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scope.trim() || !clientName.trim()) return;

    setLoading(true);
    setLoadingStep(0);
    setResult(null);

    // Simulate high-tech step loading sequence
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loadingPhrases.length - 1) {
          clearInterval(interval);
          generateProposalResult();
          setLoading(false);
          return 0;
        }
        return prev + 1;
      });
    }, 900);
  };

  const generateProposalResult = () => {
    const scopeLower = scope.toLowerCase();
    let calculatedHours = 80;
    let stack = ["React 19 (TypeScript)", "Tailwind CSS v4", "Docker Containers"];
    let rajPerspective = "";
    let kashayPerspective = "";
    let phases = [
      "Conceptual Blueprint Workshops",
      "Dynamic Figma Design Phase",
      "Lead Interface Development & API bindings",
      "Rigorous Redundancy Audits"
    ];

    // Simple context analysis to make the output highly customized and real
    if (scopeLower.includes("saas") || scopeLower.includes("portal") || scopeLower.includes("platform")) {
      calculatedHours = budgetIdx === 0 ? 120 : budgetIdx === 1 ? 240 : 450;
      stack.push("Express JWT Security", "PostgreSQL", "Redis Cache", "Recharts Analytics");
      rajPerspective = "Excellent SaaS architecture candidate. I suggest launching on GCP Cloud Run using headless container sets with isolated postgreSQL channels to scale query streams effortlessly.";
      kashayPerspective = "We will build a responsive sidebar-focused administrative dashboard utilizing tactile glass panels, slideout drawers, and detailed charts with smooth transitions.";
      phases.push("Fractional organization and JWT auth configurations", "Multi-tenant role restrictions audit");
    } else if (scopeLower.includes("ai") || scopeLower.includes("model") || scopeLower.includes("llm") || scopeLower.includes("assistant")) {
      calculatedHours = budgetIdx === 0 ? 140 : budgetIdx === 1 ? 280 : 500;
      stack.push("Gemini API (Google GenAI)", "Pinecone / Vector Database", "NodeJS Task Pipelines");
      rajPerspective = "A high-fidelity AI solution. I will implement a rigid backend proxy queue utilizing server-side Gemini SDK streams and secure api key guardrails preventing direct memory leakages.";
      kashayPerspective = "The chat interfaces and markdown streams will be fitted with responsive typing indicators and fluid motion fades mimicking high-end terminal visual speeds.";
      phases.push("Vector storage semantic embeddings matrix design", "LLM Response formatting & guardrails hardening");
    } else if (scopeLower.includes("3d") || scopeLower.includes("game") || scopeLower.includes("vland") || scopeLower.includes("metaverse")) {
      calculatedHours = budgetIdx === 0 ? 160 : budgetIdx === 1 ? 300 : 600;
      stack.push("Three.js (WebGL)", "React Three Fiber", "Websockets Connection");
      rajPerspective = "Graphics-heavy processing setup. We require a sub-millisecond bidirectional websocket relay server to synchronize avatar positions safely with minimal bandwidth overload.";
      kashayPerspective = "An immersive canvas viewport with fully customizable camera constraints and mobile fluid touch mechanics. 60 FPS in-browser execution will be targeted.";
      phases.push("WebGL vertex loading optimization", "Websocket delta state compression checks");
    } else {
      // General website or standard software development
      calculatedHours = budgetIdx === 0 ? 80 : budgetIdx === 1 ? 160 : 320;
      stack.push("Vite Static Server", "Framer Motion Physics Engine", "Lucide Vector Icons");
      rajPerspective = "I will architect a lightweight server layout leveraging express routing and Cloud Run triggers to grant the highest reliability scores.";
      kashayPerspective = "This layout demands an incredible scroll-based visual storytelling style, spacious negative margins, and floating high-contrast display components.";
      phases.push("Animated interaction choreography set up", "Core Lighthouse speed optimization");
    }

    const calculatedCycles = Math.ceil(calculatedHours / 35);

    setResult({
      conceptSummary: `A customized ${budgets[budgetIdx].label.split(" (")[0]} development target engineered to execute "${scope}" within a ${timelines[timelineIdx].label.toLowerCase()} sprint pipeline.`,
      recommendedStack: stack,
      estimatedHours: calculatedHours,
      timelineCycles: calculatedCycles,
      sysArchitectReview: rajPerspective,
      interfaceReview: kashayPerspective,
      keyPhases: phases
    });
  };

  const handleRawContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setClientName("");
      setScope("");
      setResult(null);
    }, 4000);
  };

  return (
    <div className="w-full relative" id="contact-assistant-container">
      {/* Visual glowing border frame */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-transparent blur-xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
        {/* Contact form (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl glass-panel p-6 md:p-8 flex flex-col justify-between border border-slate-200/60 relative overflow-hidden" id="contact-form-card">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-650 tracking-wider uppercase">
                Interactive Proposal Terminal
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-medium text-slate-900 mb-2 leading-tight">
              Initiate Your <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Deployment</span>
            </h3>
            
            <p className="text-slate-500 text-xs md:text-sm mb-6">
              Write your scope below to let our local strategic engine outline an initial estimate, structural tech stack, and milestone blueprint.
            </p>

            <form onSubmit={triggerAIComputation} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 pl-1">
                  Full Name / Organization
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Vikram Malhotra, OwnMyLand Corp"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition-colors"
                  id="client-name-input"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 pl-1">
                  System Scope & Functional Goals
                </label>
                <textarea
                  required
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  placeholder="e.g. Build an AI-driven real estate tokenization dashboard with a real-time web socket feed..."
                  rows={4}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  id="scope-textarea"
                />
              </div>

              {/* Budget Slider Selector */}
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 pl-1">
                  Capital Allocation Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {budgets.map((b, idx) => (
                    <button
                      key={b.code}
                      type="button"
                      onClick={() => setBudgetIdx(idx)}
                      className={`py-2 px-1 rounded-xl text-center border text-[9px] font-mono transition-all ${
                        budgetIdx === idx
                          ? "bg-orange-500/10 border-orange-500 text-orange-700 font-semibold"
                          : "bg-transparent border-slate-200 text-slate-500 hover:border-slate-350 hover:text-slate-800"
                      }`}
                    >
                      {b.code}
                      <span className="block text-[8px] text-slate-400 font-sans mt-0.5 mt-1">
                        {b.label.split(" (")[1]?.replace(")", "") || ""}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Deadline Options */}
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 pl-1">
                  Delivery Urgency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timelines.map((t, idx) => (
                    <button
                      key={t.code}
                      type="button"
                      onClick={() => setTimelineIdx(idx)}
                      className={`py-2 px-1 rounded-xl text-center border text-[9px] font-mono transition-all ${
                        timelineIdx === idx
                          ? "bg-orange-500/10 border-orange-550 text-orange-700 font-semibold"
                          : "bg-transparent border-slate-200 text-slate-500 hover:border-slate-350 hover:text-slate-800"
                      }`}
                    >
                      {t.code}
                      <span className="block text-[8px] text-slate-400 font-sans mt-0.5 mt-1">
                        {t.label.split(" (")[1]?.replace(")", "") || ""}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 hover:via-amber-600 font-medium text-xs font-mono uppercase tracking-wider text-white py-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] disabled:opacity-50 select-none cursor-pointer"
                id="calculate-proposal-btn"
              >
                {loading ? (
                  <>
                    <SharedIcon name="Cpu" size={14} className="animate-spin" />
                    <span>Processing Concept Metadata...</span>
                  </>
                ) : (
                  <>
                    <SharedIcon name="BrainCircuit" size={14} />
                    <span>Calculate Strategy Proposal</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="border-t border-slate-200/80 pt-4 mt-6 flex justify-between items-center bg-slate-50/50 -mx-8 -mb-8 p-6">
            <span className="text-[10px] font-mono text-slate-500">
              Direct Contact Pipeline:
            </span>
            <a
              href="mailto:workeemail1303@gmail.com"
              className="text-xs font-mono font-medium text-orange-600 hover:underline"
            >
              workeemail1303@gmail.com
            </a>
          </div>
        </div>

        {/* AI Proposal results screen (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl clay-card border-slate-200 p-6 md:p-8 flex flex-col justify-center relative overflow-hidden" id="proposal-results-panel">
          <AnimatePresence mode="wait">
            {loading ? (
              /* LOADING PHASE SCENE */
              <motion.div
                key="loading-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full border border-dashed border-orange-500/40 border-t-transparent animate-spin mx-auto mb-6 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-dashed border-amber-500/40 border-b-transparent animate-reverse-spin" />
                </div>

                <p className="text-slate-900 font-mono text-sm tracking-widest uppercase mb-1">
                  SYSTEM_GENERATIVE_STATE
                </p>
                <p className="text-orange-600 font-mono text-xs animate-pulse">
                  {loadingPhrases[loadingStep]}
                </p>
              </motion.div>
            ) : submittedMessage ? (
              /* FLASH SENT RESPONSE SCENE */
              <motion.div
                key="submitted-banner"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-500/25 text-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <SharedIcon name={submitType === "whatsapp" ? "Send" : "Check"} size={24} className="animate-bounce" />
                </div>

                <p className="text-slate-900 font-mono text-lg tracking-wider mb-1 uppercase font-semibold">
                  {submitType === "whatsapp" ? "Redirecting to WhatsApp..." : "Estimate Locked"}
                </p>
                <p className="text-slate-550 font-mono text-xs max-w-sm mx-auto leading-relaxed">
                  {submitType === "whatsapp"
                    ? "Opening a chat window with our Dev Team at +1 (680) 888-3230. Please send the pre-filled message to share your strategy proposal instantly."
                    : "Your calculated strategy proposal has been locked to this session's interface view."}
                </p>
              </motion.div>
            ) : result ? (
              /* RESULTS DISCHARGE SCENE */
              <motion.div
                key="results-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[9px] font-mono text-orange-605 uppercase tracking-widest font-semibold">
                      CALIBRATED PROTOCOL OUTPUT
                    </span>
                    <h4 className="text-xl font-display font-medium text-slate-900 mt-0.5">
                      Target Delivery Overview
                    </h4>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block">EST. SCHEDULE</span>
                    <span className="text-sm font-mono text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-500/20">
                      {result.timelineCycles} Cycles // {result.estimatedHours} Hrs
                    </span>
                  </div>
                </div>

                {/* Scope concept summary */}
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase mb-1">
                    System Concept & Feasibility
                  </span>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed bg-slate-50/50 border border-slate-200 p-3 rounded-xl">
                    Hello <strong className="text-slate-900">{clientName}</strong>, {result.conceptSummary}
                  </p>
                </div>

                {/* Division strategic comments */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/15 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-500/30 flex items-center justify-center text-[8px] font-bold text-emerald-700">
                        SYS
                      </div>
                      <span className="text-[10px] font-mono font-medium text-emerald-700 uppercase font-semibold">
                        Systems & Infrastructure Review
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-650 leading-relaxed">
                      &ldquo;{result.sysArchitectReview}&rdquo;
                    </p>
                  </div>

                  <div className="rounded-2xl bg-teal-500/5 border border-teal-500/15 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-teal-100 border border-teal-500/30 flex items-center justify-center text-[8px] font-bold text-teal-700">
                        UI
                      </div>
                      <span className="text-[10px] font-mono font-medium text-teal-700 uppercase font-semibold">
                        Creative & Interface Review
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-650 leading-relaxed">
                      &ldquo;{result.interfaceReview}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Stack and Phases */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 block">
                      Recommended Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.recommendedStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 block">
                      Crucial Sprints Milestones
                    </span>
                    <ul className="space-y-1.5">
                      {result.keyPhases.slice(2, 5).map((phase, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          <span className="truncate">{phase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom approval triggers */}
                <div className="flex gap-3 justify-end border-t border-slate-200 pt-4 mt-2">
                  <button
                    onClick={() => {
                      setSubmitType("lock");
                      setSubmittedMessage(true);
                      setTimeout(() => {
                        setSubmittedMessage(false);
                        setSubmitType(null);
                      }, 3000);
                    }}
                    className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 uppercase font-mono font-medium transition-all cursor-pointer"
                  >
                    Lock Estimate Frame
                  </button>
                  <button
                    onClick={() => {
                      if (result) {
                        const whatsappNumber = "16808883230";
                        const whatsappText = `*Patel Software Agency - Strategy Proposal Scope Submission*
----------------------------------
*Client/Organization:* ${clientName}
*Budget Tier:* ${budgets[budgetIdx].label}
*Target Timeline:* ${timelines[timelineIdx].label}

*Scope of Work:*
${scope}

----------------------------------
*Calculated Strategy & Estimates*
----------------------------------
*Concept Summary:* ${result.conceptSummary}
*Estimated Hours:* ${result.estimatedHours} hours
*Timeline Cycles:* ${result.timelineCycles} cycles

*Recommended Tech Stack:*
${result.recommendedStack.map(tech => `- ${tech}`).join("\n")}

*Systems & Infrastructure Review:*
"${result.sysArchitectReview}"

*Creative & Interface Review:*
"${result.interfaceReview}"

*Crucial Sprints Milestones:*
${result.keyPhases.map(phase => `- ${phase}`).join("\n")}`;

                        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

                        // Open WhatsApp chat in a new tab
                        window.open(whatsappUrl, "_blank");
                      }
                      setSubmitType("whatsapp");
                      setSubmittedMessage(true);
                      setTimeout(() => {
                        setSubmittedMessage(false);
                        setSubmitType(null);
                      }, 5000);
                    }}
                    className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-xs text-white uppercase font-mono font-semibold transition-all cursor-pointer select-none"
                  >
                    Submit Scope To Dev Team // WHATSAPP
                  </button>
                </div>
              </motion.div>
            ) : (
              /* EMPTY / INSTRUCTION STATE DISPLAY CARD */
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-6 text-orange-500/40">
                  <SharedIcon name="BrainCircuit" size={26} className="animate-pulse" />
                </div>

                <p className="text-slate-400 font-mono text-xs tracking-widest uppercase mb-1">
                  AWAITING PROTOCOL TRIGGER
                </p>
                <p className="text-slate-500 text-xs max-w-xs mx-auto">
                  Fill in your credentials and system guidelines in the interactive terminal to compile a real architectural layout draft!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
