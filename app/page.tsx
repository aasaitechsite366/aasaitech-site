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
              <Cpu className="w-10 h-10 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AAS-AI.tech
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
        <section id="services" className="py-24 px-6">
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

              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} className="hidden lg:block">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-16 text-center shadow-2xl border border-purple-200">
                  <Cpu className="w-32 h-32 mx-auto text-purple-600 mb-8" />
                  <h3 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AAISA</h3>
                  <p className="text-2xl mt-4 text-purple-600 font-semibold">Adv AI Strategy Architecture</p>
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
                  <div className="flex text-yellow-500 mb-6">5 stars</div>
                  <p className="text-xl italic mb-8 leading-relaxed text-gray-700">"{t.quote}"</p>
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
              <div className="p-10 bg-white rounded-3xl border border-purple-200">
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
          <p className="text-purple-600 text-xl mt-4 font-semibold">We're the Future.</p>
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
      </div>
    </>
  );
}