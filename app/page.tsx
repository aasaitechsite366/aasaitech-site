'use client';

import { AnimatePresence, motion, useScroll } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  ChevronDown,
  Cloud,
  Cpu,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  X,
  Zap,
} from 'lucide-react';
import React, { FC, useState } from 'react';

// Get the base path from the environment variable set by next.config.js 
// We default to an empty string if not defined (i.e., local development)
const basePath = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BASE_PATH || '';

// Define a small component to replace alert()
const SubmissionMessage: FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8 }}
      className="bg-white rounded-xl p-8 max-w-sm w-full shadow-2xl border-t-4 border-purple-600"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xl font-bold text-purple-600">Request Sent!</h4>
        <button onClick={onClose}><X className="w-5 h-5 text-gray-500 hover:text-gray-800" /></button>
      </div>
      <p className="text-gray-700">{message}</p>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [showBlog, setShowBlog] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  // **FIX: Updated video paths to use basePath for correct subdirectory resolution**
  const videos = [
    { title: "AI Services Overview", src: `${basePath}/videos/ai-services.mp4` },
    { title: "Digital Ad Services", src: `${basePath}/videos/digital-Ad-services-1.mp4` },
    { title: "Advanced AI Solutions", src: `${basePath}/videos/digital-AI-services-2.mp4` },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Replaced alert() with state update for the custom message box
    setSubmitMessage(`Thank you, ${formData.name}! We'll contact you soon.`);

    setConsultOpen(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 },
  };

  const blogContent = `
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            color: #1a1a1a;
            line-height: 1.6;
            overflow-x: hidden;
        }
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 120px 20px 80px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }
        .hero-content {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }
        h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 24px;
            letter-spacing: -1px;
            animation: fadeInUp 0.8s ease;
        }
        .hero-subtitle {
            font-size: 1.4rem;
            margin-bottom: 40px;
            opacity: 0.95;
            font-weight: 300;
            animation: fadeInUp 1s ease;
        }
        .cta-button {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 16px 48px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 1.1rem;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: fadeInUp 1.2s ease;
        }
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 80px 20px;
        }
        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 20px;
            color: #2d3748;
        }
        .section-subtitle {
            text-align: center;
            font-size: 1.2rem;
            color: #718096;
            margin-bottom: 60px;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-top: 60px;
        }
        .feature-card {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            border: 1px solid #e2e8f0;
        }
        .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(102,126,234,0.15);
        }
        .feature-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            margin-bottom: 24px;
        }
        .feature-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 16px;
            color: #2d3748;
        }
        .feature-description {
            color: #4a5568;
            line-height: 1.8;
        }
        .stats-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 80px 20px;
            text-align: center;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            max-width: 1000px;
            margin: 60px auto 0;
        }
        .stat-item h3 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 12px;
        }
        .stat-item p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        .business-models {
            background: #f7fafc;
        }
        .model-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 30px;
        }
        .model-card {
            background: white;
            padding: 32px;
            border-radius: 16px;
            border-left: 4px solid #667eea;
            transition: all 0.3s ease;
        }
        .model-card:hover {
            border-left-width: 8px;
            transform: translateX(4px);
        }
        .model-card h4 {
            font-size: 1.3rem;
            color: #667eea;
            margin-bottom: 12px;
            font-weight: 700;
        }
        .approach-section {
            background: white;
        }
        .approach-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 24px;
            margin-top: 40px;
        }
        .approach-item {
            display: flex;
            align-items: flex-start;
            padding: 24px;
            background: #f8f9fa;
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        .approach-item:hover {
            background: #e8eef5;
        }
        .approach-number {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            margin-right: 16px;
            flex-shrink: 0;
        }
        .cta-section {
            background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
            color: white;
            padding: 100px 20px;
            text-align: center;
        }
        .cta-section h2 {
            font-size: 2.8rem;
            margin-bottom: 24px;
        }
        .cta-section p {
            font-size: 1.3rem;
            margin-bottom: 40px;
            opacity: 0.9;
        }
        .cta-secondary {
            background: transparent;
            color: white;
            border: 2px solid white;
            padding: 16px 48px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 1.1rem;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
        }
        .cta-secondary:hover {
            background: white;
            color: #2d3748;
            transform: translateY(-3px);
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @media (max-width: 768px) {
            h1 {
                font-size: 2.2rem;
            }
            .hero-subtitle {
                font-size: 1.1rem;
            }
            .section-title {
                font-size: 2rem;
            }
            .features-grid, .model-grid, .approach-list {
                grid-template-columns: 1fr;
            }
        }
    </style>
    <div class="hero">
        <div class="hero-content">
            <h1>Transform Your Business with AI & IoT Intelligence</h1>
            <p class="hero-subtitle">Accelerate innovation, maximize ROI, and stay ahead of the curve with enterprise-grade AI solutions built for tomorrow's challenges</p>
            <a href="#contact" class="cta-button">Start Your Transformation</a>
        </div>
    </div>
    <div class="container">
        <h2 class="section-title">Why Industry Leaders Choose AAS-AI.tech</h2>
        <p class="section-subtitle">20+ years of Fortune 50 expertise. Cutting-edge AI architecture. One unstoppable partner.</p>
       
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <h3 class="feature-title">Greenfield & Brownfield Excellence</h3>
                <p class="feature-description">Whether building from scratch or transforming legacy systems, we deliver seamless integration with zero compromise on innovation. Your timeline, accelerated.</p>
            </div>
           
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3 class="feature-title">2-4 Week Time-to-Value</h3>
                <p class="feature-description">Our proven Agile methodology and local testing partnerships slash deployment cycles. Get to market faster with validated, certified solutions ready for commercialization.</p>
            </div>
           
            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h3 class="feature-title">AAISA: Our Secret Weapon</h3>
                <p class="feature-description">Advanced AI Strategy Architecture (AAISA) turns complex data into competitive advantage. Make smarter decisions, automate intelligently, and unlock growth engines others can't see.</p>
            </div>
           
            <div class="feature-card">
                <div class="feature-icon">🛡️</div>
                <h3 class="feature-title">Quality That Never Compromises</h3>
                <p class="feature-description">AI-powered testing, dedicated security teams, and real-time stakeholder feedback ensure your solution exceeds expectations—every single time.</p>
            </div>
           
            <div class="feature-card">
                <div class="feature-icon">🌐</div>
                <h3 class="feature-title">End-to-End IoT Mastery</h3>
                <p class="feature-description">From sensors to insights, we bridge IT, OT, and business domains. Hardware, firmware, cloud—we orchestrate the entire ecosystem so you focus on outcomes.</p>
            </div>
           
            <div class="feature-card">
                <div class="feature-icon">💡</div>
                <h3 class="feature-title">Business Models That Scale</h3>
                <p class="feature-description">Process-as-a-Service. Product-as-a-Service. Data monetization. We architect revenue models designed for exponential IoT growth and sustainable profitability.</p>
            </div>
        </div>
    </div>
    <div class="stats-section">
        <h2 class="section-title" style="color: white;">Proven Track Record Across Industries</h2>
        <div class="stats-grid">
            <div class="stat-item">
                <h3>20+</h3>
                <p>Years IT Business Experience</p>
            </div>
            <div class="stat-item">
                <h3>Fortune 50</h3>
                <p>Enterprise Partnerships</p>
            </div>
            <div class="stat-item">
                <h3>6+</h3>
                <p>Industries Transformed</p>
            </div>
            <div class="stat-item">
                <h3>100%</h3>
                <p>Client Success Focus</p>
            </div>
        </div>
    </div>
    <div class="container business-models">
        <h2 class="section-title">IoT Business Models That Drive Revenue</h2>
        <p class="section-subtitle">Not all IoT strategies are created equal. We architect the model that maximizes your competitive advantage.</p>
       
        <div class="model-grid">
            <div class="model-card">
                <h4>Process-as-a-Service</h4>
                <p>Deploy sensors and connectivity to monitor and automate operations. Gain supply chain visibility, reduce costs, and boost efficiency through real-time process intelligence.</p>
            </div>
           
            <div class="model-card">
                <h4>Smart Retail Products</h4>
                <p>Transform traditional offerings into connected experiences. From wearables to smart home devices, deliver premium value that commands premium pricing.</p>
            </div>
           
            <div class="model-card">
                <h4>Product-as-a-Service</h4>
                <p>Shift from one-time sales to recurring revenue. Offer IoT hardware at minimal cost while building sustainable subscription models that scale exponentially.</p>
            </div>
           
            <div class="model-card">
                <h4>Data-as-a-Service</h4>
                <p>Monetize insights from connected equipment. Predictive maintenance, health monitoring, and operational intelligence that customers gladly pay for—month after month.</p>
            </div>
        </div>
    </div>
    <div class="container approach-section">
        <h2 class="section-title">Our Quality-First Approach</h2>
        <p class="section-subtitle">Excellence isn't an accident. It's engineered into every line of code, every test cycle, every deployment.</p>
       
        <div class="approach-list">
            <div class="approach-item">
                <div class="approach-number">1</div>
                <p><strong>Reliable QA Partners</strong> create robust testing environments that catch issues before customers do</p>
            </div>
            <div class="approach-item">
                <div class="approach-number">2</div>
                <p><strong>Automated Testing</strong> reduces risk and costs while accelerating iteration cycles</p>
            </div>
            <div class="approach-item">
                <div class="approach-number">3</div>
                <p><strong>Security & Performance Teams</strong> ensure your solution scales without compromise</p>
            </div>
            <div class="approach-item">
                <div class="approach-number">4</div>
                <p><strong>Real-Time Stakeholder Feedback</strong> drives immediate improvements and perfect alignment</p>
            </div>
            <div class="approach-item">
                <div class="approach-number">5</div>
                <p><strong>AI-Powered Solutions</strong> automate testing and deliver business intelligence you can act on today</p>
            </div>
            <div class="approach-item">
                <div class="approach-number">6</div>
                <p><strong>Post-Launch Support</strong> ensures long-term success with continuous optimization and versioning</p>
            </div>
        </div>
    </div>
    <div class="container">
        <h2 class="section-title">The AAISA Difference: Strategy Meets Execution</h2>
        <p class="section-subtitle">Our proprietary Advanced AI Strategy Architecture answers the questions that separate market leaders from the rest</p>
       
        <div class="features-grid">
            <div class="feature-card">
                <h3 class="feature-title">Product Strategy</h3>
                <p class="feature-description">Deep SWOT analysis reveals competitive advantages through market segmentation, competitor intelligence, and technology landscape mapping.</p>
            </div>
           
            <div class="feature-card">
                <h3 class="feature-title">Revenue Optimization</h3>
                <p class="feature-description">Maximize growth, retention, and profitability through precise understanding of customer perception and value delivery.</p>
            </div>
           
            <div class="feature-card">
                <h3 class="feature-title">Distribution Mastery</h3>
                <p class="feature-description">Scale efficiently with lean sales forces powered by motivated partner ecosystems and superior channel strategies.</p>
            </div>
           
            <div class="feature-card">
                <h3 class="feature-title">Prospecting Intelligence</h3>
                <p class="feature-description">Target the right customers with precision through buyer journey mapping, persona development, and use-case prioritization.</p>
            </div>
        </div>
    </div>
    <div class="cta-section">
        <h2>Ready to Build Your Competitive Edge?</h2>
        <p>Join industry leaders who chose innovation over incremental improvement.</p>
        <a href="#contact" class="cta-secondary">Schedule Your Strategy Session</a>
    </div>
  `;

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 text-gray-900 overflow-hidden">
        {/* Light Background Pattern */}
        <div className="fixed inset-0 -z-10 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-purple-200/20 to-indigo-200/20" />
        </div>

        {/* Navigation */}
        <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 w-full z-40 backdrop-blur-xl bg-white/80 border-b border-purple-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <motion.img
                src={`${basePath}/logo.png`} // Replace with your logo file path in public/ (e.g., public/logo.png)
                alt="AAS Logo"
                className="w-12 h-12 rounded-full shadow-2xl shadow-purple-500/25 border-2 border-purple-200/50" // Highly rounded (full circle), 3D shadow with purple tint
                initial={{ scale: 1, y: 0 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  y: -2, // Slight lift on hover for more 3D feel
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" // Enhanced dynamic shadow on hover
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ width: '108px', height: '108px' }} // Exact 50x50px override
              />
              <span className="text-[21px] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ANAGHA AGILE SYSTEMS PVT LTD
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-10">
              {['home', 'services', 'differentiator', 'testimonials', 'contact'].map((id) => (
                <button key={id} onClick={() => scrollTo(id)} className="capitalize text-gray-700 hover:text-purple-600 transition font-medium">
                  {id === 'differentiator' ? 'Why AAS' : id}
                </button>
              ))}
              <button onClick={() => setConsultOpen(true)} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-purple-500/40 transition">
                Book Consultation
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
              <ChevronDown className={`w-8 h-8 text-purple-600 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </motion.nav>

        {/* Mobile Menu (unchanged for brevity, but relies on scrollTo function) */}

        {/* HERO */}
        <section id="home" className="pt-32 pb-24 px-6 text-center">
          <div className="max-w-7xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Bleeding Edge Technology.
              </span>
              <br />
              <span className="text-gray-800">Cutting-Edge Results.</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={() => setConsultOpen(true)} className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-purple-600/50 transition-all flex items-center gap-4">
                Book Free Consultation <ArrowRight className="w-7 h-7" />
              </button>
              <button onClick={() => setVideoOpen(true)} className="px-12 py-6 text-xl font-bold border-2 border-purple-600 text-purple-700 rounded-2xl hover:bg-purple-50 transition-all flex items-center gap-4">
                <Play className="w-7 h-7" /> Watch Demo
              </button>
            </motion.div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="services" className="py-24 px-1">
          <div className="max-w-7xl mx-auto">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl font-bold text-center mb-20">
              Our <span className="text-purple-600">Capabilities</span>
            </motion.h2>

            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid lg:grid-cols-3 gap-10">
              {[
                // **FIX APPLIED HERE:** Paths now correctly use the calculated basePath for the runtime environment
                { title: "AI & Deep Learning", icon: Brain, image: `${basePath}/images/AI-Consulting.jpeg`, alt: "AI Consulting" },
                { title: "IoT & Edge Computing", icon: Zap, image: `${basePath}/images/IOT-EdgeComputing.png`, alt: "IoT Edge Computing" },
                { title: "Fintech & Enterprise IT", icon: Cloud, image: `${basePath}/images/Fintech.png`, alt: "Fintech Solutions" },
              ].map((card) => (
                <motion.div key={card.title} variants={item} whileHover={{ y: -15, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }} className="group relative overflow-hidden rounded-3xl bg-white shadow-xl border border-purple-100">
                  {/* Using standard HTML img tag */}
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    // Added fixed sizes for consistency
                    style={{ width: '100%', height: '16rem' }}
                  />
                  <div className="p-8">
                    <card.icon className="w-16 h-16 text-purple-600 mb-4" />
                    <h3 className="text-3xl font-bold mb-4 text-gray-800">{card.title}</h3>
                    <p className="text-gray-600">End-to-end strategy, architecture, and deployment.</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WHY AAS (unchanged) */}
        <section id="differentiator" className="py-32 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto">
            <motion.h2 initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-center mb-20 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AAS — The AI Differentiator
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12">
                {[
                  { Icon: Sparkles, title: "Greenfield & Brownfield Mastery", color: "text-blue-600" },
                  { Icon: Rocket, title: "Innovation Through AI & IoT", color: "text-purple-600" },
                  { Icon: Timer, title: "Accelerated Time-to-Value", color: "text-indigo-600" },
                  { Icon: ShieldCheck, title: "Turnkey & Lifelong Support", color: "text-emerald-600" },
                ].map((point, i) => (
                  <motion.div key={i} variants={item} className="flex items-start gap-4">
                    <point.Icon className={`w-10 h-10 ${point.color} flex-shrink-0`} />
                    <div>
                      <h3 className={`text-2xl font-bold ${point.color} mb-3`}>{point.title}</h3>
                      <p className="text-gray-700">We deliver precision, speed, and long-term success.</p>
                    </div>
                  </motion.div>
                ))}
                <motion.div variants={item} className="pt-8 border-t border-purple-200">
                  <p className="text-2xl font-bold text-purple-600">20+ Years Fortune 50 Experience</p>
                  <p className="text-gray-700 mt-3">Healthcare • Energy • Finance • Retail • Tech — transformed.</p>
                </motion.div>
              </motion.div>
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} className="">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-16 text-center shadow-2xl border border-purple-200">
                  <Cpu className="w-32 h-32 mx-auto text-purple-600 mb-8" />
                  <h3 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AAISA</h3>
                  <p
                    className="text-2xl mt-4 text-purple-600 font-semibold cursor-pointer hover:text-purple-800 transition-colors"
                    onClick={() => setShowBlog(true)}
                  >
                    Adv AI Strategy Architecture
                  </p>
                  <p className="text-lg text-gray-700 mt-6">Your Engine of Growth</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS (unchanged) */}
        <section id="testimonials" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl font-bold text-center mb-20">
              Voices of <span className="text-purple-600">Trust</span>
            </motion.h2>

            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { name: "Christos Xidias", role: "CEO @ Built to Sell", quote: "Exceptional AI & IoT software. Industry best practices and outstanding results." },
                { name: "Saurabh Parikh", role: "CIO @ Sourcebits", quote: "True partners. Delivered revenue-boosting tools and operational excellence." },
                { name: "Eduard Vazquez", role: "Tech Manager", quote: "AAISA saves massive time. Time is money — they deliver both." },
              ].map((t) => (
                <motion.div key={t.name} variants={item} whileHover={{ y: -10 }} className="bg-gradient-to-br from-blue-50 to-purple-50 p-10 rounded-3xl border border-purple-200 shadow-lg">
                  <div className="flex text-yellow-500 mb-6">{Array.from({ length: 5 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="cursor-pointer"
                      initial={{ scale: 1 }}
                      whileHover={{
                        scale: 1.2,
                        rotate: 10,
                        color: '#FFD700' // Gold on hover for extra shine
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      whileTap={{ scale: 0.95 }} // Subtle press effect on click (optional interactivity)
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </motion.div>
                  ))}</div>
                  <p className="text-xl italic mb-8 leading-relaxed text-gray-700">&quot;{t.quote}&quot;</p>
                  <p className="font-bold text-purple-600">{t.name}</p>
                  <p className="text-gray-600">{t.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CONTACT (unchanged) */}
        <section id="contact" className="py-32 px-6 bg-gradient-to-b from-purple-50 to-blue-50">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-5xl mx-auto text-center">
            <h2 className="text-6xl font-black mb-12">
              Ready for the <span className="text-purple-600">Future</span>?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <a href="tel:+919035000499" className="p-10 bg-white rounded-3xl border border-purple-200 hover:shadow-xl transition">
                <Phone className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <p className="text-2xl font-bold">+91 90350 00499</p>
              </a>
              <a href="mailto:help@aas-ai.tech" className="p-10 bg-white rounded-3xl border border-purple-200 hover:shadow-xl transition">
                <Mail className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <p className="text-xl font-bold">help@aas-ai.tech</p>
              </a>
              <div
                className="p-10 bg-white rounded-3xl border border-purple-200 cursor-pointer hover:shadow-xl transition"
                onClick={() => setMapOpen(true)}
              >
                <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <p className="text-lg">Bengaluru, India</p>
              </div>
            </div>
            <button onClick={() => setConsultOpen(true)} className="px-20 py-7 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-purple-600/60 transition">
              <MessageCircle className="inline w-8 h-8 mr-4" />
              Book Free Consultation
            </button>
          </motion.div>
        </section>

        {/* FOOTER (unchanged) */}
        <footer className="py-16 text-center bg-white border-t border-purple-200">
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bleeding Edge Technology. Cutting-Edge Results.
          </p>
          <p className="text-purple-600 text-xl mt-4 font-semibold">We are the Future.</p>
          <p className="text-gray-600 mt-8">© 2025 Anagha Agile Systems Pvt Ltd</p>
        </footer>

        {/* VIDEO MODAL (video paths fixed) */}
        <AnimatePresence>
          {videoOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              onClick={() => setVideoOpen(false)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}>
                <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{videos[currentVideo].title}</h3>
                  <button onClick={() => setVideoOpen(false)}><X className="w-8 h-8" /></button>
                </div>
                <div className="aspect-video bg-black">
                  <video key={videos[currentVideo].src} src={videos[currentVideo].src} controls autoPlay className="w-full h-full" />
                </div>
                <div className="p-6 bg-gray-100">
                  <div className="flex gap-4 overflow-x-auto">
                    {videos.map((vid, i) => (
                      <button key={i} onClick={() => setCurrentVideo(i)} className={`flex-shrink-0 w-48 rounded-lg overflow-hidden border-4 ${i === currentVideo ? 'border-purple-600' : 'border-gray-300'}`}>
                        <video src={vid.src} className="w-full h-28 object-cover" />
                        <p className="text-xs p-2 bg-white text-center font-medium">{vid.title}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONSULTATION FORM POPUP (alert replaced with state update) */}
        <AnimatePresence>
          {consultOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              onClick={() => setConsultOpen(false)}>
              <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
                className="bg-white rounded-3xl max-w-2xl w-full p-10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Book Free Consultation
                  </h3>
                  <button onClick={() => setConsultOpen(false)} className="text-gray-500 hover:text-gray-800">
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border border-purple-200 focus:border-purple-600 focus:outline-none transition"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border border-purple-200 focus:border-purple-600 focus:outline-none transition"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border border-purple-200 focus:border-purple-600 focus:outline-none transition"
                  />
                  <textarea
                    placeholder="Your Message (Optional)"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border border-purple-200 focus:border-purple-600 focus:outline-none transition resize-none"
                  />
                  <button type="submit" className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-purple-600/50 transition flex items-center justify-center gap-3">
                    <Send className="w-6 h-6" />
                    Send Request
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submission Message Modal */}
        <AnimatePresence>
          {submitMessage && (
            <SubmissionMessage
              message={submitMessage}
              onClose={() => setSubmitMessage(null)}
            />
          )}
        </AnimatePresence>

        {/* BLOG POPUP */}
        <AnimatePresence>
          {showBlog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              onClick={() => setShowBlog(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-purple-200 overflow-y-auto max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  Adv AI Strategy Architecture Blog
                </h2>
                <div dangerouslySetInnerHTML={{ __html: blogContent }} />
                <button
                  onClick={() => setShowBlog(false)}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-purple-500/40 transition"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GOOGLE MAP POPUP */}
        <AnimatePresence>
          {mapOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              onClick={() => setMapOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-2xl border border-purple-200 overflow-hidden max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  Our Location in Bengaluru, India
                </h2>
                <p className="text-gray-700 mb-4">
                  Click below to view our location on Google Maps.
                </p>
                <button
                  onClick={() => window.open('https://maps.app.goo.gl/t5uEtWezHGUrqVxq8', '_blank')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-purple-500/40 transition"
                >
                  Open Google Maps
                </button>
                <button
                  onClick={() => setMapOpen(false)}
                  className="mt-4 ml-4 px-6 py-3 border-2 border-purple-600 text-purple-700 rounded-full hover:bg-purple-50 transition"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}