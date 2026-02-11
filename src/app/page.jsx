"use client";

import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileText,
  Lock,
  MoveUpRight,
  Server,
  Shield,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const capabilities = [
  {
    title: "Robotic Diagnostic",
    metric: "0.4ms Latency",
    desc: "Sub-millisecond inference at the edge for high-speed sortation.",
    icon: <Cpu size={20} className="text-cyan-400" />,
    modal: "robotic_diag",
    image: "/images/robotic-diag.png", // Use your generated image path
  },
  {
    title: "Sub-Fab Monitoring",
    metric: "99.9% Uptime",
    desc: "Predictive vibration analysis for critical semiconductor infrastructure.",
    icon: <Activity size={20} className="text-purple-400" />,
    modal: "sub_fab",
    image: "/images/subfab-monitor.png",
  },
  {
    title: "Smart HMI Panels",
    metric: "Zero-Trust",
    desc: "Biometric and touch-secure control interfaces for the factory floor.",
    icon: <Shield size={20} className="text-cyan-400" />,
    modal: "hmi_panel",
    image: "/images/hmi-panel.png",
  },
  {
    title: "Core Telemetry",
    metric: "4.2 GB/s",
    desc: "Real-time data orchestration across global industrial nodes.",
    icon: <Zap size={20} className="text-purple-400" />,
    modal: "telemetry_core",
    image: "/images/telemetry-dash.png",
  },
];

const CapabilityGallery = ({ setActiveModal }) => {
  return (
    <section className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-xs font-mono text-cyan-500 mb-4 uppercase tracking-[0.3em]">
              Operational Visibility
            </h2>
            <h3 className="text-4xl font-bold text-white tracking-tighter">
              Unified Asset Intelligence.
            </h3>
          </div>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
            Selected_Modules_v4.2
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              onClick={() => setActiveModal(cap.modal)}
              className="group relative h-[450px] rounded-3xl overflow-hidden border border-white/5 cursor-pointer hover:border-cyan-500/30 transition-all duration-500"
            >
              {/* Image Background with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                style={{
                  backgroundImage: cap.image
                    ? `url(${cap.image})`
                    : "linear-gradient(to bottom, #111, #000)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Content Box (Glass-morphism) */}
              <div className="absolute inset-x-4 bottom-4 p-6 glass-panel rounded-2xl border border-white/10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-black/50 rounded-lg border border-white/5">
                    {cap.icon}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                    {cap.metric}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white mb-2">
                  {cap.title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {cap.desc}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-mono text-white/50 group-hover:text-cyan-400 transition-colors">
                  INSPECT_COMPONENT <MoveUpRight size={12} />
                </div>
              </div>

              {/* Scanline Effect on Hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-1/2 w-full animate-[scanline_3s_linear_infinite]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Sub-Component: Technical Brief Modal Content ---
const TechnicalBriefContent = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted)
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="w-16 h-16 text-cyan-500 mb-4" />
        <h3 className="text-2xl font-bold mb-2 text-white">
          Request Transmitted
        </h3>
        <p className="text-gray-400">
          The encrypted whitepaper link has been sent to your registered
          endpoint.
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-cyan-500 pl-4 py-2 bg-cyan-500/5">
        <h3 className="text-xl font-bold text-white italic">
          Protocol v4.2 Technical Whitepaper
        </h3>
        <p className="text-sm text-gray-400 italic">
          Security clearance required for full access.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">
            Email (Corporate Only)
          </label>
          <input
            type="email"
            placeholder="dev.ops@enterprise.com"
            className="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-cyan-500 outline-none transition-all text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">
            Clearance Level
          </label>
          <select className="w-full bg-black border border-white/10 p-3 rounded-lg outline-none text-gray-300">
            <option>L1 - Standard Access</option>
            <option>L2 - Technical Architecture</option>
            <option>L3 - Security Lead</option>
          </select>
        </div>
      </div>
      <button
        onClick={() => setSubmitted(true)}
        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-sm"
      >
        <FileText size={18} /> Request Encrypted PDF
      </button>
    </div>
  );
};

// --- Sub-Component: System Stats Modal Content ---
const SystemStatsContent = () => {
  const [lines, setLines] = useState([
    "Initializing root access...",
    "Connecting to cluster-01...",
  ]);

  useEffect(() => {
    const logs = [
      "Auth token verified.",
      "Mounting /mnt/secure_kernel...",
      "Allocating virtual memory: 128GB",
      "Ping response: 0.04ms from us-east-1",
      "CPU Temperature: 42°C",
      "Running heuristic diagnostic...",
      "SYSTEM STABLE: NO ANOMALIES DETECTED.",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setLines((prev) => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black p-6 rounded-lg font-mono text-xs md:text-sm border border-cyan-900/30">
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-cyan-500" />
        <span className="ml-2 text-cyan-500/50">view_system_stats.exe</span>
      </div>
      <div className="space-y-1 h-64 overflow-y-auto custom-scrollbar">
        {lines.map((line, idx) => (
          <div key={idx} className="flex gap-3">
            <span className="text-gray-600">
              [{new Date().toLocaleTimeString()}]
            </span>
            <span
              className={
                idx === lines.length - 1
                  ? "text-cyan-400 animate-pulse"
                  : "text-cyan-600"
              }
            >
              {line}
            </span>
          </div>
        ))}
        <div className="text-cyan-400 pt-4">_</div>
      </div>
    </div>
  );
};

// --- Sub-Component: Strategic De-risking Content ---
const DeRiskingContent = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setScore(94), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white/5 p-6 rounded-2xl border border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white">Current Risk Posture</h3>
          <p className="text-sm text-gray-500">
            Based on real-time threat intelligence
          </p>
        </div>
        <div className="text-right">
          <div
            className="text-4xl font-black text-cyan-400 transition-all duration-1000"
            style={{ opacity: score > 0 ? 1 : 0 }}
          >
            {score}%
          </div>
          <div className="text-[10px] uppercase font-bold text-cyan-500 tracking-tighter">
            Stability Index
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
          <Shield className="text-cyan-500" size={24} />
          <div>
            <p className="font-semibold text-sm text-white">
              Automated Compliance
            </p>
            <p className="text-xs text-gray-500">
              GDPR, HIPAA & SOC2 Type II active monitoring.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
          <Activity className="text-purple-500" size={24} />
          <div>
            <p className="font-semibold text-sm text-white">
              Fault Tolerance v3
            </p>
            <p className="text-xs text-gray-500">
              Zero-downtime failover with triple redundancy.
            </p>
          </div>
        </div>
      </div>

      <button className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all">
        Download Risk Assessment Report <ChevronRight size={18} />
      </button>
    </div>
  );
};

// --- Sub-Component: Edge-Native Content ---
const EdgeNativeContent = () => {
  return (
    <div className="space-y-6">
      <div className="relative h-48 bg-black rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right,#22d3ee 1px,transparent 1px),linear-gradient(to bottom,#22d3ee 1px,transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="relative flex gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center animate-pulse ${
                  i === 2
                    ? "border-cyan-500 bg-cyan-500/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <Server
                  size={20}
                  className={i === 2 ? "text-cyan-400" : "text-gray-600"}
                />
              </div>
              <span className="text-[10px] font-mono text-gray-500">
                NODE_00{i}
              </span>
            </div>
          ))}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent -z-10"></div>
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl">
        <div className="flex gap-3">
          <Zap className="text-cyan-400 shrink-0" size={20} />
          <p className="text-sm text-gray-300">
            <span className="font-bold text-cyan-400">
              Low Latency Edge-Native:
            </span>{" "}
            Our orchestrator intelligently routes tasks to the nearest available
            node, reducing TTL by 40%.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-[10px] text-gray-500 uppercase font-bold">
            Latency
          </p>
          <p className="text-lg font-bold text-cyan-400">12ms avg</p>
        </div>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-[10px] text-gray-500 uppercase font-bold">
            Throughput
          </p>
          <p className="text-lg font-bold text-purple-400">4.2 GB/s</p>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Robotic Diagnostic (Live Kinematics) ---
const RoboticDiagContent = () => {
  const [logs, setLogs] = useState([
    "Initializing kinematic solver...",
    "Calibrating Joint_01...",
  ]);

  useEffect(() => {
    const newLogs = [
      "Servo_01 Torque: 12.4Nm [NOMINAL]",
      "Servo_02 Torque: 8.1Nm [NOMINAL]",
      "Gripper Pressure: 45 PSI",
      "Path Planning: A* Algorithm Converged (4ms)",
      "Collision Detection: ACTIVE",
      "Payload Detected: 14.2kg",
      "Haptic Feedback loop: SYNCHRONIZED",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < newLogs.length) {
        setLogs((prev) => [...prev, newLogs[i]]);
        i++;
      } else clearInterval(interval);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black p-6 rounded-lg font-mono text-xs md:text-sm border border-cyan-900/30">
      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
        <span className="text-cyan-500 font-bold uppercase tracking-widest">
          ARM_KINEMATICS_V4
        </span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-cyan-500/30" />
        </div>
      </div>
      <div className="space-y-2 h-64 overflow-y-auto custom-scrollbar font-mono text-xs">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className="flex gap-3 border-l-2 border-cyan-900/50 pl-2"
          >
            <span className="text-gray-600">{`[${(Date.now() + idx).toString().slice(-6)}]`}</span>
            <span
              className={
                log.includes("Active") || log.includes("SYNCHRONIZED")
                  ? "text-white font-bold"
                  : "text-cyan-400"
              }
            >
              {log}
            </span>
          </div>
        ))}
        <div className="text-cyan-500 animate-pulse pt-2">
          &gt; AWAITING NEXT INSTRUCTION_
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Sub-Fab Monitoring (Predictive Maintenance) ---
const SubFabContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
          <div className="text-[10px] uppercase text-gray-500 mb-1">
            Vacuum Pump A
          </div>
          <div className="text-xl font-bold text-white">1,200 RPM</div>
          <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
            <CheckCircle2 size={10} /> Optimal
          </div>
        </div>
        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
          <div className="relative z-10">
            <div className="text-[10px] uppercase text-gray-500 mb-1">
              Chiller Loop B
            </div>
            <div className="text-xl font-bold text-red-400">Vibration!</div>
            <div className="text-xs text-red-300 mt-1">
              Harmonic Deviation &gt; 2%
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <h4 className="text-sm font-bold text-white mb-3">
          Predictive Analysis
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Bearing Wear (Est.)</span>
            <span className="text-white">12%</span>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-[12%]"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Filter Efficacy</span>
            <span className="text-white">89%</span>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 w-[89%]"></div>
          </div>
        </div>
      </div>

      <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
        Initiate Maintenance Ticket
      </button>
    </div>
  );
};

// --- Sub-Component: Smart HMI (Access Control) ---
const SmartHMIContent = () => {
  return (
    <div className="text-center space-y-8 py-4">
      <div className="relative w-24 h-24 mx-auto border-2 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
        <div className="absolute inset-2 border border-cyan-500 rounded-full flex items-center justify-center bg-cyan-500/10">
          <Lock size={32} className="text-cyan-400" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white">Restricted Interface</h3>
        <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
          This HMI panel requires biometric authentication for configuration
          access.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto opacity-50 pointer-events-none">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <div
            key={n}
            className="aspect-square bg-white/5 border border-white/10 rounded flex items-center justify-center text-xs font-mono text-gray-500"
          >
            {n}
          </div>
        ))}
      </div>

      <div className="text-[10px] font-mono text-red-400 animate-pulse">
        ACCESS_DENIED // CONNECT_PHYSICAL_KEY
      </div>
    </div>
  );
};

// --- Sub-Component: Core Telemetry (Global Mesh) ---
const CoreTelemetryContent = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-2">
        <span>MESH_TOPOLOGY_MAP</span>
        <span>LIVE_FEED</span>
      </div>

      <div className="relative h-40 bg-black border border-white/10 rounded-lg overflow-hidden">
        {/* Abstract Map Visualization */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#22d3ee 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
        <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-white rounded-full animate-ping"></div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <line
            x1="25%"
            y1="50%"
            x2="66%"
            y2="33%"
            stroke="#22d3ee"
            strokeWidth="1"
          />
          <line
            x1="66%"
            y1="33%"
            x2="50%"
            y2="75%"
            stroke="#a855f7"
            strokeWidth="1"
          />
          <line
            x1="50%"
            y1="75%"
            x2="25%"
            y2="50%"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="space-y-2">
        {[
          {
            label: "Global Packet Loss",
            val: "0.0001%",
            color: "text-green-400",
          },
          { label: "Edge Nodes Active", val: "8,402", color: "text-cyan-400" },
          {
            label: "Mesh Latency (Avg)",
            val: "14ms",
            color: "text-purple-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5"
          >
            <span className="text-xs text-gray-400">{stat.label}</span>
            <span className={`font-mono text-sm font-bold ${stat.color}`}>
              {stat.val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleMouseMove = (e) => {
      document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Modal Configuration for centralized management
  const modalConfigs = {
    brief: {
      title: "SYSTEM_PROPOSAL_V4.2",
      component: <TechnicalBriefContent />,
    },
    stats: {
      title: "KERNEL_TELEMETRY_LIVE",
      component: <SystemStatsContent />,
    },
    derisking: {
      title: "RISK_INTELLIGENCE_PORTAL",
      component: <DeRiskingContent />,
    },
    orchestration: {
      title: "GLOBAL_EDGE_ORCHESTRATOR",
      component: <EdgeNativeContent />,
    },
    // NEW CAPABILITY CONTEXTS
    robotic_diag: {
      title: "ROBOTIC_ARM_04_DIAGNOSTICS",
      component: <RoboticDiagContent />,
    },
    sub_fab: { title: "SUB_FAB_INFRASTRUCTURE", component: <SubFabContent /> },
    hmi_panel: { title: "SECURE_HMI_ACCESS", component: <SmartHMIContent /> },
    telemetry_core: {
      title: "CORE_MESH_TELEMETRY",
      component: <CoreTelemetryContent />,
    },
  };

  const Modal = ({ type, onClose }) => {
    if (!type || !modalConfigs[type]) return null;
    const config = modalConfigs[type];

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-all duration-500">
        <div className="relative w-full max-w-2xl glass-panel border border-cyan-500/30 rounded-2xl overflow-hidden animate-[zoomIn_0.3s_ease-out]">
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                {config.title}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-8 max-h-[80vh] overflow-y-auto">
            {config.component}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-cyan-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@300;400;600;800&display=swap');
        :root { --mouse-x: 50%; --mouse-y: 50%; }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .spotlight { background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.08), transparent 40%); }
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        .scanline-effect::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, rgba(34, 211, 238, 0.1), transparent); animation: scanline 3s linear infinite; }
        @keyframes orbit-pulse { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.1); opacity: 0.6; } }
        .animate-orbit-pulse { animation: orbit-pulse 4s ease-in-out infinite; }
        .tech-card-glow:hover { box-shadow: 0 0 30px rgba(34, 211, 238, 0.15); border-color: rgba(34, 211, 238, 0.4); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.2); border-radius: 10px; }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>

      <Modal type={activeModal} onClose={() => setActiveModal(null)} />

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded flex items-center justify-center text-black font-bold font-mono">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              AAS<span className="text-gray-500">.AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Architecture", "Intelligence", "Security"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setActiveModal("brief")}
              className="px-5 py-2 text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
            >
              INITIATE_PROTOCOL
            </button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 spotlight overflow-hidden text-center">
        <div className="z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono mb-8 tracking-widest">
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
            AGENTIC ORCHESTRATION FOR INDUSTRIAL 5.0
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-6 leading-[0.9] tracking-tighter">
            Bridging Physical AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500">
              with Edge Velocity.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Autonomous monitoring, predictive maintenance, and cyber-physical
            security for the modern enterprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveModal("brief")}
              className="px-8 py-4 bg-white text-black font-bold rounded-sm hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
            >
              Request Technical Brief <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setActiveModal("stats")}
              className="px-8 py-4 bg-transparent border border-gray-800 text-gray-400 rounded-sm font-mono text-sm hover:border-gray-500 transition-colors"
            >
              view_system_stats.exe
            </button>
          </div>
        </div>
      </section>

      {/* Intelligence Section */}
      <section id="intelligence" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-xs font-mono text-cyan-500 mb-4 uppercase tracking-[0.3em]">
                Machine Intelligence
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Predictive AI That <br /> Feels the Vibration.
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Utilizing high-frequency sensing and magnetic flux analysis to
                identify issues weeks before a failure occurs.
              </p>
              <div className="space-y-4">
                {[
                  "Automated Diagnostics",
                  "Edge Analytics",
                  "Fleet Observability",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <div className="mt-1 bg-cyan-500/20 p-1 rounded-full">
                      <Zap size={14} className="text-cyan-400" />
                    </div>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setActiveModal("stats")}
                className="glass-panel p-8 rounded-2xl flex flex-col justify-end min-h-[200px] cursor-pointer hover:border-cyan-500/30 transition-all group"
              >
                <Activity
                  className="text-cyan-500 mb-4 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <div className="text-3xl font-bold text-white">40%</div>
                <div className="text-[10px] font-mono text-gray-500 uppercase">
                  Reduction in downtime
                </div>
              </div>
              <div className="glass-panel p-8 rounded-2xl flex flex-col justify-end mt-12 bg-gradient-to-br from-white/5 to-purple-500/5 cursor-pointer group">
                <BarChart3
                  className="text-purple-500 mb-4 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <div className="text-3xl font-bold text-white">3.5x</div>
                <div className="text-[10px] font-mono text-gray-500 uppercase">
                  Average ROI Multiplier
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CapabilityGallery setActiveModal={setActiveModal} />
      {/* Architecture Section */}
      <section id="architecture" className="py-32 px-6 bg-black relative">
        <div className="max-w-7xl mx-auto border border-white/10 rounded-[40px] p-8 md:p-24 overflow-hidden relative bg-[#080808]">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #22d3ee 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono mb-6 uppercase tracking-widest">
                The Architecture
              </div>
              <h2 className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-[0.3em]">
                THE BLUEPRINT
              </h2>
              <h3 className="text-5xl font-bold text-white mb-8 tracking-tighter">
                AAISA™ Engine
              </h3>

              <div className="space-y-6">
                <div
                  onClick={() => setActiveModal("derisking")}
                  className="flex gap-6 p-6 rounded-xl glass-panel tech-card-glow transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="scanline-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="h-12 w-12 shrink-0 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 font-bold font-mono text-xl border border-white/10 group-hover:border-cyan-500/50">
                    01
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1 group-hover:text-cyan-400">
                      Strategic De-risking
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Simulate hardware limits before deployment to ensure 100%
                      uptime.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setActiveModal("orchestration")}
                  className="flex gap-6 p-6 rounded-xl glass-panel tech-card-glow transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="scanline-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="h-12 w-12 shrink-0 rounded-lg bg-white/5 flex items-center justify-center text-purple-400 font-bold font-mono text-xl border border-white/10 group-hover:border-purple-500/50">
                    02
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1 group-hover:text-purple-400">
                      Edge-Native Orchestration
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Deterministic task scheduling for non-interruptible
                      industrial processes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center relative">
              <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center">
                <div className="absolute inset-0 border border-dashed border-cyan-500/10 rounded-full animate-[spin_40s_linear_infinite]"></div>
                <div className="absolute inset-12 border border-cyan-500/20 rounded-full animate-orbit-pulse"></div>
                <div
                  className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-tr from-black to-gray-900 border border-white/20 flex flex-col items-center justify-center shadow-2xl group-hover:border-cyan-400/50 transition-all cursor-pointer"
                  onClick={() => setActiveModal("stats")}
                >
                  <div className="text-5xl font-black text-white tracking-tighter">
                    AAISA
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 mt-2 tracking-[0.4em] uppercase">
                    Engine v4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <div
              className="flex items-center gap-2 mb-6 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="w-6 h-6 bg-white rounded-sm"></div>
              <span className="text-lg font-bold text-white">AAS.AI</span>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Architecting the autonomous industrial future through
              deterministic AI and Edge Intelligence.
            </p>
            <div className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">
              v4.2.0-PROD // BENGALURU // SILICON VALLEY
            </div>
          </div>
          <div className="text-gray-500 text-sm font-mono">
            © 2026 AAS.AI SECURE SYSTEMS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
