import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import SharedIcon from "./SharedIcons";

export default function TrustIndicators() {
  const [activeTab, setActiveTab] = useState<"latency" | "security">("latency");

  // --- TAB 1: LATENCY & SLA SIMULATOR STATE ---
  const [cdnEnabled, setCdnEnabled] = useState(true);
  const [replicaCount, setReplicaCount] = useState(2);
  const [concurrentUsers, setConcurrentUsers] = useState(2500);
  const [cachingLevel, setCachingLevel] = useState<"none" | "redis" | "full">("redis");
  const [serverRegion, setServerRegion] = useState<"single" | "global-multi">("single");

  // --- TAB 2: SECURITY THREAT SIMULATOR STATE ---
  const [wafEnabled, setWafEnabled] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [idsEnabled, setIdsEnabled] = useState(false);
  const [cctvEnabled, setCctvEnabled] = useState(true);
  const [backupsEnabled, setBackupsEnabled] = useState(false);

  const [activeThreat, setActiveThreat] = useState<string | null>(null);
  const [secStatus, setSecStatus] = useState<"STABLE" | "BREACH_ATTEMPT" | "COMPROMISED" | "MITIGATED">("STABLE");
  const [secLogs, setSecLogs] = useState<string[]>([
    "[SYSTEM] Security kernel v4.2.1 initialized...",
    "[SYSTEM] All local and distributed nodes online.",
    "[SEC] MFA protection layer active on admin ports.",
    "[SEC] Closed-loop CCTV camera sensor relay active.",
    "[SYSTEM] Monitoring active traffic gateways..."
  ]);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll console logs
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [secLogs]);

  // Latency & SLA Calculation logic
  const calculateLatencyMetrics = () => {
    let latency = 250; // Base latency in ms
    if (cdnEnabled) latency -= 140;
    if (cachingLevel === "redis") latency -= 50;
    else if (cachingLevel === "full") latency -= 80;

    // Traffic congestion penalty
    const capacity = replicaCount * (serverRegion === "global-multi" ? 4500 : 3000);
    if (concurrentUsers > capacity) {
      const overload = concurrentUsers - capacity;
      latency += Math.round(overload / 40);
    }

    latency = Math.max(6, Math.min(650, latency));

    let sla = 99.9;
    if (replicaCount >= 2) sla += 0.05;
    if (replicaCount === 3) sla += 0.03;
    if (serverRegion === "global-multi") sla += 0.019;
    sla = Math.min(99.999, sla);

    let downtime = "";
    if (sla >= 99.999) downtime = "5.26 mins / year";
    else if (sla >= 99.99) downtime = "52.56 mins / year";
    else if (sla >= 99.95) downtime = "4.38 hours / year";
    else downtime = "8.77 hours / year";

    let status: "Optimal" | "Degraded" | "Congested" = "Optimal";
    if (latency > 200) status = "Congested";
    else if (latency > 80 || concurrentUsers > capacity) status = "Degraded";

    return { latency, sla, downtime, status };
  };

  // Security calculations
  const calculateSecurityMetrics = () => {
    let score = 0;
    if (wafEnabled) score += 20;
    if (mfaEnabled) score += 20;
    if (idsEnabled) score += 20;
    if (cctvEnabled) score += 20;
    if (backupsEnabled) score += 20;

    let grade = "F";
    if (score === 100) grade = "A+";
    else if (score === 80) grade = "A";
    else if (score === 60) grade = "B";
    else if (score === 40) grade = "C";
    else if (score === 20) grade = "D";

    return { score, grade };
  };

  const latencyMetrics = calculateLatencyMetrics();
  const securityMetrics = calculateSecurityMetrics();

  // Threat triggers simulation
  const triggerThreat = (threatType: string) => {
    if (activeThreat) return;
    setActiveThreat(threatType);
    setSecStatus("BREACH_ATTEMPT");

    const threatNames: Record<string, string> = {
      ddos: "Distributed DDoS Attack",
      sqli: "SQL Database Injection Exploitation",
      bruteforce: "SSH Brute-Force Password stuffing",
      physical: "Physical server room backdoor entry"
    };

    setSecLogs(prev => [
      ...prev,
      `[ATTACK] Detected: ${threatNames[threatType]}`,
      `[ATTACK] Vector Origin: ${threatType === "physical" ? "Intrusion Zone C" : "IP 172.90.115.42"}`
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) {
        if (threatType === "ddos") {
          setSecLogs(prev => [...prev, "[ATTACK] Sending packet flood of 120,000 requests/sec..."]);
        } else if (threatType === "sqli") {
          setSecLogs(prev => [...prev, "[ATTACK] Injecting payload query: UNION SELECT * FROM system_hashes..."]);
        } else if (threatType === "bruteforce") {
          setSecLogs(prev => [...prev, "[ATTACK] Launching auth attempts against admin keys on port 22..."]);
        } else if (threatType === "physical") {
          setSecLogs(prev => [...prev, "[ATTACK] Alert: Rack cabinet door latch open trigger detected..."]);
        }
      } else if (step === 2) {
        if (threatType === "ddos") {
          if (wafEnabled) {
            setSecLogs(prev => [
              ...prev,
              "[DEFENSE] Web Application Firewall rate limit triggered.",
              "[DEFENSE] Malicious edge requests blacklisted. Attack mitigated."
            ]);
          } else {
            setSecLogs(prev => [
              ...prev,
              "[WARNING] Web Application Firewall is disabled.",
              "[CRITICAL] API gateways saturated. Server memory overload at 96%."
            ]);
          }
        } else if (threatType === "sqli") {
          if (wafEnabled || idsEnabled) {
            setSecLogs(prev => [
              ...prev,
              `[DEFENSE] ${idsEnabled ? "Intrusion Detection (IDS)" : "WAF"} blocked query signature.`,
              "[DEFENSE] Query execution aborted. Input parsed as literal string."
            ]);
          } else {
            setSecLogs(prev => [
              ...prev,
              "[WARNING] Input sanitization disabled on SQL route.",
              "[CRITICAL] Database query executed. Administrative table records leaked."
            ]);
          }
        } else if (threatType === "bruteforce") {
          if (mfaEnabled) {
            setSecLogs(prev => [
              ...prev,
              "[DEFENSE] Multifactor authentication active.",
              "[DEFENSE] IP locked out after 3 failed password trials. Challenge sent."
            ]);
          } else {
            setSecLogs(prev => [
              ...prev,
              "[WARNING] Standard single-factor portal configuration active.",
              "[CRITICAL] Admin privilege access granted. Credentials cracked."
            ]);
          }
        } else if (threatType === "physical") {
          if (cctvEnabled) {
            setSecLogs(prev => [
              ...prev,
              "[DEFENSE] Smart CCTV tracking active. Latch trigger captured on camera.",
              "[DEFENSE] Guard dispatch signal sent. System lockdown engaged."
            ]);
          } else {
            setSecLogs(prev => [
              ...prev,
              "[WARNING] Closed-circuit CCTV systems disabled.",
              "[CRITICAL] Server rack console input logged. Server USB access compromised."
            ]);
          }
        }
      } else if (step === 3) {
        clearInterval(interval);
        let success = false;
        if (threatType === "ddos" && wafEnabled) success = true;
        if (threatType === "sqli" && (wafEnabled || idsEnabled)) success = true;
        if (threatType === "bruteforce" && mfaEnabled) success = true;
        if (threatType === "physical" && cctvEnabled) success = true;

        if (success) {
          setSecLogs(prev => [
            ...prev,
            "[SEC] Threat fully neutralized. All firewall policies active.",
            "------------------------------------------------"
          ]);
          setSecStatus("MITIGATED");
        } else {
          setSecLogs(prev => [
            ...prev,
            `[CRITICAL] Server compromised! ${backupsEnabled ? "Initiating recovery backup replication..." : "Warning: Data corruption risk high."}`,
            "------------------------------------------------"
          ]);
          setSecStatus("COMPROMISED");
        }
        setActiveThreat(null);
      }
    }, 1200);
  };

  return (
    <div className="w-full space-y-12" id="trust-indicators-container">
      <style>{`
        @keyframes dashflow {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-dash-flow {
          animation: dashflow 1.5s linear infinite;
        }
        .console-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .console-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        .console-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(52, 211, 153, 0.3);
          border-radius: 2px;
        }
      `}</style>

      {/* Main Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-orange-500/20 text-orange-700 text-xs font-mono mb-4 tracking-wider uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Interactive Strategic Labs
        </motion.div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight mb-4">
          Simulation & <span className="bg-gradient-to-r from-orange-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Architecture Labs</span>
        </h2>
        <p className="max-w-2xl mx-auto text-slate-550 text-sm md:text-base">
          Choose a testing suite to simulate network traffic loads, verify SLA performance boundaries, or trigger security threat injection vectors.
        </p>

        {/* Tab Selector Switcher */}
        <div className="flex justify-center gap-3 mt-8 select-none">
          <button
            onClick={() => setActiveTab("latency")}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "latency"
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 border border-slate-900"
                : "glass-panel border-slate-200 text-slate-500 hover:text-slate-800"
            }`}
          >
            <SharedIcon name="Network" size={14} />
            Performance & SLA Lab
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "security"
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 border border-slate-900"
                : "glass-panel border-slate-200 text-slate-500 hover:text-slate-800"
            }`}
          >
            <SharedIcon name="ShieldAlert" size={14} />
            Security & CCTV Threat Lab
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "latency" ? (
          <motion.div
            key="latency-lab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto"
          >
            {/* Controls Panel */}
            <div className="lg:col-span-5 rounded-3xl glass-panel p-6 md:p-8 border border-slate-200/80 space-y-6">
              <h3 className="text-lg font-display font-semibold text-slate-950 border-b border-slate-200 pb-3 flex items-center gap-2">
                <SharedIcon name="Wrench" size={16} className="text-orange-500" />
                Performance Parameters
              </h3>

              {/* Concurrent users slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">CONCURRENT TRAFFIC</span>
                  <span className="text-orange-600 font-bold">{concurrentUsers.toLocaleString()} req/min</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={concurrentUsers}
                  onChange={(e) => setConcurrentUsers(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>100 req</span>
                  <span>5,000 req</span>
                  <span>10,000 req</span>
                </div>
              </div>

              {/* CDN toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="space-y-0.5">
                  <label className="text-xs font-mono font-bold text-slate-800">EDGE CACHE SHIELD (CDN)</label>
                  <p className="text-[10px] text-slate-500 leading-none">Cloudflare Edge Route Optimizer</p>
                </div>
                <button
                  onClick={() => setCdnEnabled(!cdnEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    cdnEnabled ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      cdnEnabled ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              {/* DB cache options */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-800 block">DATABASE CACHING TIER</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "none", label: "None", desc: "Raw Query" },
                    { value: "redis", label: "Redis", desc: "Session Cache" },
                    { value: "full", label: "Full Cache", desc: "Key-Val Store" }
                  ].map((tier) => (
                    <button
                      key={tier.value}
                      onClick={() => setCachingLevel(tier.value as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        cachingLevel === tier.value
                          ? "border-orange-500/35 bg-orange-500/[0.03] text-orange-650"
                          : "border-slate-200 hover:border-slate-350 bg-white text-slate-600"
                      }`}
                    >
                      <span className="text-xs font-mono font-bold block">{tier.label}</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">{tier.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Server Replication scale */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-800 block">APP NODE REPLICATIONS</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 1, label: "1 Node", desc: "No Redundancy" },
                    { value: 2, label: "2 Nodes", desc: "Failover Node" },
                    { value: 3, label: "3 Nodes", desc: "Load Balanced" }
                  ].map((rep) => (
                    <button
                      key={rep.value}
                      onClick={() => setReplicaCount(rep.value)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        replicaCount === rep.value
                          ? "border-emerald-500/35 bg-emerald-500/[0.02] text-emerald-700"
                          : "border-slate-200 hover:border-slate-350 bg-white text-slate-600"
                      }`}
                    >
                      <span className="text-xs font-mono font-bold block">{rep.label}</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">{rep.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Server hosting Region */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-800 block">ROUTING ARCHITECTURE</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "single", label: "Single Region", desc: "Centralized routing latency" },
                    { value: "global-multi", label: "Multi-Region", desc: "Distributed active clustering" }
                  ].map((reg) => (
                    <button
                      key={reg.value}
                      onClick={() => setServerRegion(reg.value as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        serverRegion === reg.value
                          ? "border-teal-500/35 bg-teal-500/[0.02] text-teal-700"
                          : "border-slate-200 hover:border-slate-350 bg-white text-slate-600"
                      }`}
                    >
                      <span className="text-xs font-mono font-bold block">{reg.label}</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5 leading-tight">{reg.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Telemetry Output & Flow Diagram */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              {/* Live Metrics Grid */}
              <div className="grid grid-cols-3 gap-4">
                {/* Latency */}
                <div className="clay-card rounded-2xl p-4 border border-slate-200 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Response Latency</span>
                    <div className={`text-2xl md:text-3xl font-display font-bold mt-1 ${
                      latencyMetrics.status === "Congested" ? "text-red-500" : latencyMetrics.status === "Degraded" ? "text-amber-500" : "text-emerald-500"
                    }`}>
                      {latencyMetrics.latency}ms
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400 uppercase">STATUS:</span>
                    <span className={`text-[9px] font-mono font-bold uppercase ${
                      latencyMetrics.status === "Congested" ? "text-red-650" : latencyMetrics.status === "Degraded" ? "text-amber-650" : "text-emerald-700"
                    }`}>
                      {latencyMetrics.status}
                    </span>
                  </div>
                </div>

                {/* SLA */}
                <div className="clay-card rounded-2xl p-4 border border-slate-200 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">SLA Availability</span>
                    <div className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-1">
                      {latencyMetrics.sla.toFixed(3)}%
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400 uppercase">UPTIME BUDGET:</span>
                    <span className="text-[9px] font-mono font-bold text-slate-650 uppercase">HIGH</span>
                  </div>
                </div>

                {/* Downtime */}
                <div className="clay-card rounded-2xl p-4 border border-slate-200 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Downtime Budget</span>
                    <div className="text-xl md:text-2xl font-display font-bold text-slate-900 mt-1.5">
                      {latencyMetrics.downtime.split(" ")[0]}
                      <span className="text-xs font-mono text-slate-400 font-normal ml-1">{latencyMetrics.downtime.split(" ").slice(1).join(" ")}</span>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400 uppercase">MAX LIMIT</span>
                    <span className="text-[9px] font-mono font-bold text-orange-600 uppercase">SECURE</span>
                  </div>
                </div>
              </div>

              {/* Interactive Network Diagram */}
              <div className="rounded-3xl bg-slate-950 p-6 border border-slate-800 relative overflow-hidden flex-1 min-h-[220px] flex flex-col justify-between shadow-inner">
                <div className="absolute inset-0 spatial-grid opacity-10 pointer-events-none" />

                <div className="flex justify-between items-center relative z-10 border-b border-slate-800/80 pb-3">
                  <span className="text-[10px] font-mono text-slate-405 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Live Topology Flow Router
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded uppercase">
                    Routing: {serverRegion === "global-multi" ? "Distributed CDN Edge" : "Local Gateway Direct"}
                  </span>
                </div>

                {/* SVG Connector Lines */}
                <div className="relative h-28 my-auto flex items-center">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <path
                      d={cdnEnabled ? "M 35 60 Q 80 60 125 60" : "M 35 60 Q 120 100 230 60"}
                      fill="none"
                      stroke={cdnEnabled ? "#10b981" : "#f97316"}
                      strokeWidth="1.5"
                      strokeDasharray="5,4"
                      className="animate-dash-flow"
                    />

                    {cdnEnabled && (
                      <path
                        d="M 165 60 Q 195 60 230 60"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                        strokeDasharray="5,4"
                        className="animate-dash-flow"
                      />
                    )}

                    {replicaCount >= 1 && (
                      <path
                        d="M 270 60 C 295 60, 315 25, 345 25"
                        fill="none"
                        stroke="#00f0ff"
                        strokeWidth="1.2"
                        strokeDasharray="5,4"
                        className="animate-dash-flow"
                      />
                    )}
                    {replicaCount >= 2 && (
                      <path
                        d="M 270 60 Q 305 60 345 60"
                        fill="none"
                        stroke="#00f0ff"
                        strokeWidth="1.2"
                        strokeDasharray="5,4"
                        className="animate-dash-flow"
                      />
                    )}
                    {replicaCount === 3 && (
                      <path
                        d="M 270 60 C 295 60, 315 95, 345 95"
                        fill="none"
                        stroke="#00f0ff"
                        strokeWidth="1.2"
                        strokeDasharray="5,4"
                        className="animate-dash-flow"
                      />
                    )}

                    <path
                      d={replicaCount === 3
                        ? "M 385 25 Q 405 60 440 60 M 385 60 Q 410 60 440 60 M 385 95 Q 405 60 440 60"
                        : replicaCount === 2
                          ? "M 385 25 Q 410 60 440 60 M 385 60 Q 410 60 440 60"
                          : "M 385 25 Q 410 60 440 60"
                      }
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                      className="animate-dash-flow"
                    />
                  </svg>

                  {/* Nodes Layout */}
                  <div className="absolute inset-0 flex justify-between items-center w-full px-2">
                    <div className="flex flex-col items-center gap-1 relative z-10">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-200">
                        <SharedIcon name="User" size={14} />
                      </div>
                      <span className="text-[8px] font-mono text-slate-500 font-bold uppercase">Client</span>
                    </div>

                    <div className={`flex flex-col items-center gap-1 transition-opacity duration-300 relative z-10 ${
                      cdnEnabled ? "opacity-100" : "opacity-20"
                    }`}>
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <SharedIcon name="ShieldAlert" size={14} />
                      </div>
                      <span className="text-[8px] font-mono text-slate-500 font-bold uppercase">CDN</span>
                    </div>

                    <div className="flex flex-col items-center gap-1 relative z-10">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                        <SharedIcon name="Network" size={14} />
                      </div>
                      <span className="text-[8px] font-mono text-slate-500 font-bold uppercase">LB</span>
                    </div>

                    <div className="flex flex-col justify-center gap-1.5 h-full relative z-10 w-12 items-center">
                      {replicaCount >= 1 && (
                        <div className="w-6 h-6 rounded-md bg-slate-900 border border-cyan-500/20 flex items-center justify-center text-cyan-500 text-[9px] font-mono">
                          N1
                        </div>
                      )}
                      {replicaCount >= 2 && (
                        <div className="w-6 h-6 rounded-md bg-slate-900 border border-cyan-500/20 flex items-center justify-center text-cyan-500 text-[9px] font-mono">
                          N2
                        </div>
                      )}
                      {replicaCount === 3 && (
                        <div className="w-6 h-6 rounded-md bg-slate-900 border border-cyan-500/20 flex items-center justify-center text-cyan-500 text-[9px] font-mono">
                          N3
                        </div>
                      )}
                      <span className="text-[8px] font-mono text-slate-500 font-bold uppercase absolute -bottom-5">Nodes</span>
                    </div>

                    <div className="flex flex-col items-center gap-1 relative z-10">
                      <div className={`w-9 h-9 rounded-xl bg-slate-900 border flex items-center justify-center transition-colors ${
                        cachingLevel !== "none" ? "border-emerald-500/40 text-emerald-400" : "border-slate-800 text-slate-400"
                      }`}>
                        <SharedIcon name="Database" size={14} />
                      </div>
                      <span className="text-[8px] font-mono text-slate-500 font-bold uppercase">Database</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[9px] font-mono text-slate-500">
                  <span>SIMULATED LOAD: {(concurrentUsers / 100).toFixed(1)}k req/sec</span>
                  <span className={latencyMetrics.status === "Congested" ? "text-red-500 font-bold" : latencyMetrics.status === "Degraded" ? "text-amber-500 font-bold" : "text-emerald-500 font-bold"}>
                    • NETWORK STATUS: {latencyMetrics.status === "Optimal" ? "STABLE" : latencyMetrics.status === "Degraded" ? "DEGRADED" : "CONGESTED"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="security-lab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto"
          >
            {/* Controls Panel (Defenses) */}
            <div className="lg:col-span-5 rounded-3xl glass-panel p-6 md:p-8 border border-slate-200/80 space-y-6">
              <h3 className="text-lg font-display font-semibold text-slate-950 border-b border-slate-200 pb-3 flex items-center gap-2">
                <SharedIcon name="ShieldAlert" size={16} className="text-orange-500" />
                Active Cyber Defenses
              </h3>

              {/* WAF Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="space-y-0.5">
                  <label className="text-xs font-mono font-bold text-slate-800">WEB APPLICATION FIREWALL</label>
                  <p className="text-[10px] text-slate-500 leading-none">Filters HTTP/SQL Injection attempts</p>
                </div>
                <button
                  onClick={() => setWafEnabled(!wafEnabled)}
                  disabled={activeThreat !== null}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${activeThreat ? "opacity-50 cursor-not-allowed" : ""} ${
                    wafEnabled ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      wafEnabled ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              {/* MFA IAM Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="space-y-0.5">
                  <label className="text-xs font-mono font-bold text-slate-800">IAM MFA LOGIN CONTROLS</label>
                  <p className="text-[10px] text-slate-500 leading-none">Blocks dictionary brute force logins</p>
                </div>
                <button
                  onClick={() => setMfaEnabled(!mfaEnabled)}
                  disabled={activeThreat !== null}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${activeThreat ? "opacity-50 cursor-not-allowed" : ""} ${
                    mfaEnabled ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      mfaEnabled ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              {/* IDS Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="space-y-0.5">
                  <label className="text-xs font-mono font-bold text-slate-800">INTRUSION DETECTION SYSTEM</label>
                  <p className="text-[10px] text-slate-500 leading-none">Deep packet inspect for payload hazards</p>
                </div>
                <button
                  onClick={() => setIdsEnabled(!idsEnabled)}
                  disabled={activeThreat !== null}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${activeThreat ? "opacity-50 cursor-not-allowed" : ""} ${
                    idsEnabled ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      idsEnabled ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              {/* CCTV Alerts Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="space-y-0.5">
                  <label className="text-xs font-mono font-bold text-slate-800">CCTV SMART MOTION RELAY</label>
                  <p className="text-[10px] text-slate-500 leading-none">Surveillance alerting on rack cabinet entry</p>
                </div>
                <button
                  onClick={() => setCctvEnabled(!cctvEnabled)}
                  disabled={activeThreat !== null}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${activeThreat ? "opacity-50 cursor-not-allowed" : ""} ${
                    cctvEnabled ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      cctvEnabled ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Cloud backups Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="space-y-0.5">
                  <label className="text-xs font-mono font-bold text-slate-800">CLOUDFLARE BACKUP REPLICATION</label>
                  <p className="text-[10px] text-slate-500 leading-none">Automated recovery nodes on breach</p>
                </div>
                <button
                  onClick={() => setBackupsEnabled(!backupsEnabled)}
                  disabled={activeThreat !== null}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${activeThreat ? "opacity-50 cursor-not-allowed" : ""} ${
                    backupsEnabled ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      backupsEnabled ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Security Telemetry & Active Terminal */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              {/* Telemetry Cards */}
              <div className="grid grid-cols-3 gap-4">
                {/* Score */}
                <div className="clay-card rounded-2xl p-4 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Firewall Grade</span>
                    <div className={`text-2xl md:text-3xl font-display font-bold mt-1 ${
                      securityMetrics.score >= 80 ? "text-emerald-500" : securityMetrics.score >= 40 ? "text-amber-500" : "text-red-500"
                    }`}>
                      {securityMetrics.grade}
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400 uppercase">SCORE:</span>
                    <span className="text-[9px] font-mono font-bold text-slate-600">{securityMetrics.score}%</span>
                  </div>
                </div>

                {/* Defense Status */}
                <div className="clay-card rounded-2xl p-4 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Mitigation Status</span>
                    <div className={`text-xl md:text-2xl font-display font-bold mt-1.5 uppercase ${
                      secStatus === "STABLE" || secStatus === "MITIGATED"
                        ? "text-emerald-500"
                        : secStatus === "BREACH_ATTEMPT"
                          ? "text-amber-500"
                          : "text-red-500 animate-pulse"
                    }`}>
                      {secStatus === "BREACH_ATTEMPT" ? "Active Threat" : secStatus}
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400 uppercase">SENSORS:</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-700 uppercase">LIVE</span>
                  </div>
                </div>

                {/* Injector Actions */}
                <div className="clay-card rounded-2xl p-4 border border-slate-200 flex flex-col justify-between">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase mb-1.5">Threat Injector</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { type: "ddos", label: "DDoS" },
                      { type: "sqli", label: "SQLi" },
                      { type: "bruteforce", label: "Auth" },
                      { type: "physical", label: "CCTV Latch" }
                    ].map((t) => (
                      <button
                        key={t.type}
                        onClick={() => triggerThreat(t.type)}
                        disabled={activeThreat !== null}
                        className={`text-[9px] font-mono font-bold py-1 px-1.5 rounded transition-all select-none text-center cursor-pointer ${
                          activeThreat
                            ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                            : "bg-red-50 hover:bg-red-100 text-red-650 border border-red-500/25 shadow-sm"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terminal Logs Component */}
              <div className="rounded-3xl bg-slate-950 p-6 border border-slate-800 flex-1 flex flex-col justify-between min-h-[240px] shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 spatial-grid opacity-10 pointer-events-none" />

                <div className="flex justify-between items-center relative z-10 border-b border-slate-850 pb-2 mb-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${activeThreat ? "bg-red-500 animate-ping" : "bg-emerald-500 animate-pulse"}`} />
                    Active Threat Intelligence Log
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">
                    Security Kernel v4.2
                  </span>
                </div>

                {/* Console Log Feed */}
                <div className="flex-1 overflow-y-auto console-scrollbar pr-2 space-y-1 font-mono text-[10px] leading-relaxed max-h-[140px] select-text">
                  {secLogs.map((log, index) => {
                    let color = "text-slate-400";
                    if (log.startsWith("[ATTACK]")) color = "text-red-400 font-bold";
                    else if (log.startsWith("[DEFENSE]")) color = "text-cyan-400";
                    else if (log.startsWith("[SEC]")) color = "text-emerald-400 font-bold";
                    else if (log.startsWith("[WARNING]")) color = "text-amber-400";
                    else if (log.startsWith("[CRITICAL]")) color = "text-red-500 font-black animate-pulse";

                    return (
                      <div key={index} className={color}>
                        {log}
                      </div>
                    );
                  })}
                  <div ref={consoleEndRef} />
                </div>

                <div className="border-t border-slate-900 pt-3 mt-3 flex justify-between items-center text-[9px] font-mono text-slate-500">
                  <span>THREAT SCENARIO: {activeThreat ? activeThreat.toUpperCase() : "NONE"}</span>
                  <span className={activeThreat ? "text-red-500 font-bold" : "text-emerald-500 font-bold"}>
                    {activeThreat ? "• SIMULATION RUNNING" : "• SECURE GATEWAY ENFORCED"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
