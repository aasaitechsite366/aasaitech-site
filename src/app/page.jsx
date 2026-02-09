use client;
import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Globe, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Box, 
  Layers, 
  Activity, 
  Code, 
  Terminal, 
  Menu, 
  X, 
  CheckCircle,
  TrendingUp,
  Server
} from 'lucide-react';

/* --- GLOBAL STYLES & FONTS --- 
  Injecting Google Fonts (Inter & JetBrains Mono) and custom animations 
*/
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      --bg-dark: #050505;
      --bg-card: #0a0a0a;
      --accent-teal: #22d3ee;
      --accent-purple: #a855f7;
    }

    body {
      background-color: var(--bg-dark);
      color: #e5e5e5;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }

    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0a0a0a;
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #444;
    }

    /* Animations */
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 10px rgba(34, 211, 238, 0.1); }
      50% { box-shadow: 0 0 25px rgba(34, 211, 238, 0.3); }
    }

    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .neon-text {
      text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
    }
    
    .grid-bg {
      background-size: 50px 50px;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    }

    .spotlight {
      background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.06), transparent 40%);
    }
  `}</style>
);

/* --- COMPONENT: DIGITAL TWIN CANVAS --- 
  A background effect simulating a neural network / IoT mesh 
*/
const DigitalTwinCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = width < 768 ? 40 : 80;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = 'rgba(34, 211, 238, 0.3)'; // Teal
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections
      particles.forEach((p, index) => {
        p.update();
        p.draw();
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 - dist / 1500})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />;
};

/* --- COMPONENT: NAVIGATION --- 
*/
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Architecture', href: '#aaisa' },
    { name: 'Services', href: '#services' },
    { name: 'Impact', href: '#impact' },
    { name: 'Proof', href: '#proof' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded flex items-center justify-center text-black font-bold font-mono">
            A
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            AAS<span className="text-gray-500">.AI</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-400 hover:text-white hover:tracking-wide transition-all"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-5 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all text-white"
          >
            Deploy Agent
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-lg text-gray-300"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

/* --- COMPONENT: HERO SECTION --- 
*/
const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      <DigitalTwinCanvas />
      
      <div className="z-10 text-center max-w-4xl px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-8 animate-float">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          SYSTEM STATUS: ONLINE // AGENTS ACTIVE
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Orchestrating the <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-pulse">
            Agentic Future
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          From Physical AI in Manufacturing to Edge Intelligence in IoT. 
          We turn dormant data into autonomous action using the <span className="text-white font-semibold">AAISA™ Framework</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#contact"
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
            <span className="relative z-10 flex items-center gap-2">
              Deploy Your First Agent <ArrowRight className="w-4 h-4" />
            </span>
          </a>
          
          <a 
            href="#aaisa"
            className="px-8 py-4 bg-transparent border border-gray-700 text-white rounded-lg hover:border-gray-500 transition-all font-mono text-sm flex items-center justify-center"
          >
             ./explore_architecture.sh
          </a>
        </div>
      </div>

      {/* Live Ticker */}
      <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/50 backdrop-blur-sm overflow-hidden py-3">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap text-xs font-mono text-gray-500 px-6">
          <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-cyan-500" /> ACTIVE AGENTS: 4,201</span>
          <span className="flex items-center gap-2"><Server className="w-3 h-3 text-purple-500" /> EDGE NODES SECURED: 18,050</span>
          <span className="flex items-center gap-2"><Globe className="w-3 h-3 text-green-500" /> DATA POINTS/SEC: 1.2M</span>
          <span className="flex items-center gap-2"><Zap className="w-3 h-3 text-yellow-500" /> ENERGY SAVED: 450 MWh</span>
          {/* Duplicate for infinite scroll feel */}
          <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-cyan-500" /> ACTIVE AGENTS: 4,201</span>
          <span className="flex items-center gap-2"><Server className="w-3 h-3 text-purple-500" /> EDGE NODES SECURED: 18,050</span>
        </div>
      </div>
    </section>
  );
};

/* --- COMPONENT: AAISA FRAMEWORK --- 
*/
const AAISASection = () => {
  return (
    <section id="aaisa" className="py-24 px-6 relative bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet <span className="text-cyan-400">AAISA™</span></h2>
          <p className="text-gray-400 text-lg">
            Most consultants give you a slide deck. We give you a blueprint. 
            AAISA is our proprietary framework for de-risking AI adoption—bridging the gap between 
            Business Logic and Engineering Rigor.
          </p>
        </div>

        {/* Interactive Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 relative">
          
          {/* Strategy Column */}
          <div className="lg:pr-12 flex flex-col justify-center space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-cyan-900/30 rounded text-cyan-400"><TrendingUp size={20} /></div>
                <h3 className="font-bold text-white">ROI Modeling</h3>
              </div>
              <p className="text-sm text-gray-500 group-hover:text-gray-300">Predictive cost analysis before a single line of code is written.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-cyan-900/30 rounded text-cyan-400"><ShieldCheck size={20} /></div>
                <h3 className="font-bold text-white">Governance</h3>
              </div>
              <p className="text-sm text-gray-500 group-hover:text-gray-300">Compliance-first frameworks for Fintech & Healthtech.</p>
            </div>
          </div>

          {/* The Core Bridge */}
          <div className="flex items-center justify-center py-12 lg:py-0 relative z-10">
            <div className="relative w-64 h-64 rounded-full border border-white/10 flex items-center justify-center bg-[#0a0a0a] group hover:scale-105 transition-transform duration-500 cursor-pointer">
              {/* Animated Glow Rings */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping opacity-20"></div>
              <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-pulse"></div>
              
              <div className="text-center z-10">
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tighter">
                  AAISA
                </div>
                <div className="text-xs text-gray-500 font-mono mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  STRATEGY MEETS SCALE
                </div>
              </div>
            </div>
            
            {/* Connecting Lines (Visual CSS) */}
            <div className="hidden lg:block absolute left-0 top-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900 to-transparent -z-10"></div>
            <div className="hidden lg:block absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-900 to-transparent -z-10"></div>
          </div>

          {/* Architecture Column */}
          <div className="lg:pl-12 flex flex-col justify-center space-y-6 text-right lg:text-left">
            <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group">
              <div className="flex items-center gap-4 mb-2 lg:flex-row-reverse">
                <div className="p-2 bg-purple-900/30 rounded text-purple-400"><Cpu size={20} /></div>
                <h3 className="font-bold text-white">Edge Inference</h3>
              </div>
              <p className="text-sm text-gray-500 group-hover:text-gray-300">Running Transformer models locally on factory hardware.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group">
              <div className="flex items-center gap-4 mb-2 lg:flex-row-reverse">
                <div className="p-2 bg-purple-900/30 rounded text-purple-400"><Layers size={20} /></div>
                <h3 className="font-bold text-white">RAG Pipelines</h3>
              </div>
              <p className="text-sm text-gray-500 group-hover:text-gray-300">Vector databases connecting proprietary data to LLMs.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

/* --- COMPONENT: SERVICES (BENTO GRID) --- 
*/
const ServiceCard = ({ title, desc, icon: Icon, span = "", accent = "cyan" }) => (
  <div className={`p-8 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-${accent}-500/30 transition-all group relative overflow-hidden ${span}`}>
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${accent}-500`}>
      <Icon size={120} />
    </div>
    
    <div className={`w-12 h-12 rounded-lg bg-${accent}-900/20 flex items-center justify-center text-${accent}-400 mb-6`}>
      <Icon size={24} />
    </div>
    
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
    
    <div className="mt-6 flex items-center gap-2 text-xs font-mono text-gray-500 group-hover:text-white transition-colors">
      <Terminal size={12} />
      <span>Initiate Protocol</span>
    </div>
  </div>
);

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-sm font-mono text-cyan-400 mb-2">03 // CAPABILITIES</h2>
            <h3 className="text-4xl font-bold text-white">The 2026 Innovation Stack</h3>
          </div>
          <p className="text-gray-400 max-w-md text-sm">
            We move beyond standard consulting. We build autonomous multi-agent systems that plan, execute, and self-correct.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ServiceCard 
            title="Enterprise Agentic Systems" 
            desc="Beyond chatbots. We deploy autonomous agents that handle complex workflows, from supply chain negotiation to customer support tier-2 resolution."
            icon={Box}
            span="md:col-span-2"
            accent="cyan"
          />
          <ServiceCard 
            title="Algorithmic Trust" 
            desc="Real-time fraud dynamics for Fintech. Anomaly detection powered by self-learning neural networks."
            icon={ShieldCheck}
            accent="purple"
          />
          <ServiceCard 
            title="Physical AI & Edge" 
            desc="Bringing Transformer models to the factory floor. Latency-free inference on edge devices for predictive maintenance."
            icon={Cpu}
            accent="purple"
          />
          <ServiceCard 
            title="Digital Twins" 
            desc="Simulate production shifts before they happen. Reduce downtime by visualizing bottlenecks in a 3D environment."
            icon={Globe}
            span="md:col-span-2"
            accent="cyan"
          />
        </div>
      </div>
    </section>
  );
};

/* --- COMPONENT: CASE STUDIES (PROOF) --- 
*/
const CaseStudies = () => {
  return (
    <section id="proof" className="py-24 px-6 bg-gradient-to-b from-black to-[#050505]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-mono text-purple-400 mb-12">04 // PROOF OF WORK</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Case 1 */}
          <div className="border-l-2 border-cyan-500 pl-8 py-2">
            <div className="text-6xl font-bold text-white mb-2">65%</div>
            <p className="text-gray-400 mb-6">Reduction in transaction audit time</p>
            <div className="bg-[#111] p-6 rounded-lg border border-white/5">
              <p className="italic text-gray-300 mb-4">"AAISA-driven NLP pipelines didn't just automate our work; they restructured how we handle compliance."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                <div>
                  <div className="text-sm font-bold text-white">Christos Xidias</div>
                  <div className="text-xs text-gray-500">CEO, Built to Sell (Fintech)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Case 2 */}
          <div className="border-l-2 border-purple-500 pl-8 py-2">
            <div className="text-6xl font-bold text-white mb-2">1M+</div>
            <p className="text-gray-400 mb-6">IoT Events Processed / Second</p>
            <div className="bg-[#111] p-6 rounded-lg border border-white/5">
              <p className="italic text-gray-300 mb-4">"Scaled our ingestion layer with zero downtime. The Edge Intelligence architecture is bulletproof."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                <div>
                  <div className="text-sm font-bold text-white">Saurabh Parikh</div>
                  <div className="text-xs text-gray-500">CIO, Sourcebits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- COMPONENT: CONCIERGE TERMINAL --- 
  Replaces standard contact form 
*/
const ConciergeTerminal = () => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: '> INITIALIZING AAISA_CONCIERGE_V2...' },
    { type: 'system', text: '> CONNECTED.' },
    { type: 'ai', text: 'Hello. I am the AAS intake agent. What challenge are you trying to solve today?' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, { type: 'user', text: input }];
    setHistory(newHistory);
    setInput('');

    // Simulated AI Response Logic
    setTimeout(() => {
      let response = '';
      if (step === 0) {
        response = "Understood. I've logged that context. What is your primary timeline for deployment?";
        setStep(1);
      } else if (step === 1) {
        response = "Noted. Finally, please provide your email address so a senior architect can send you the preliminary blueprint.";
        setStep(2);
      } else {
        response = "Transmission received. An architect will contact you shortly. Session terminated.";
        setStep(3);
      }
      setHistory(prev => [...prev, { type: 'ai', text: response }]);
    }, 800);
  };

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <section id="contact" className="py-24 px-6 bg-black flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-[#050505] rounded-xl border border-gray-800 overflow-hidden shadow-2xl shadow-cyan-900/10">
          {/* Terminal Header */}
          <div className="bg-[#111] px-4 py-2 border-b border-gray-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs font-mono text-gray-500">bash — aaisa_intake.sh</div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 h-96 overflow-y-auto font-mono text-sm">
            {history.map((msg, idx) => (
              <div key={idx} className={`mb-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`${
                  msg.type === 'system' ? 'text-gray-500' : 
                  msg.type === 'ai' ? 'text-cyan-400' : 'text-white'
                }`}>
                  {msg.type === 'system' ? '' : msg.type === 'ai' ? 'AAS_AGENT: ' : 'YOU: '}
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-[#0a0a0a] border-t border-gray-800 flex gap-2">
            <span className="text-cyan-500 font-mono">{'>'}</span>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={step === 3 ? "Session Closed" : "Type your response..."}
              disabled={step === 3}
              className="bg-transparent text-white w-full outline-none font-mono text-sm"
              autoFocus
            />
          </form>
        </div>
        <p className="text-center text-gray-600 text-xs mt-4">
          Prefer email? <a href="mailto:help@aas-ai.tech" className="text-gray-400 hover:text-white underline">help@aas-ai.tech</a>
        </p>
      </div>
    </section>
  );
};

/* --- COMPONENT: FOOTER --- 
*/
const Footer = () => (
  <footer className="py-12 border-t border-white/5 bg-black text-center md:text-left">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-sm text-gray-500">
        © 2026 Anagha Agile Systems Pvt Ltd. <br className="md:hidden"/> All rights reserved.
      </div>
      <div className="flex gap-6 text-sm font-mono text-gray-500">
        <a href="#" className="hover:text-cyan-400 transition-colors">LINKEDIN</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">GITHUB</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">LEGAL</a>
      </div>
      <div className="text-xs text-gray-700 font-mono">
        v2.4.0-stable // Bengaluru, IN
      </div>
    </div>
  </footer>
);

/* --- MAIN APP --- 
*/
export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      // Update CSS variable for spotlight effect
      document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative spotlight">
      <GlobalStyles />
      <Navbar />
      <Hero />
      <AAISASection />
      <Services />
      <CaseStudies />
      <ConciergeTerminal />
      <Footer />
    </div>
  );
}