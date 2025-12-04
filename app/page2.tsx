'use client'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, ArrowUp, Award, BarChart3, Brain, CheckCircle,
  ChevronRight, Clock, Cloud, Cpu, Database, Github, Globe, Layers,
  Linkedin, Lock, Mail, MapPin, Menu, Network, Package, Phone,
  Rocket, Send, Shield, Sparkles, Target, TrendingUp, Twitter,
  Users, X, Youtube, Zap
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

// --- Custom CSS Variables & Font Setup (Simulated for single file execution) ---
// Note: These styles should ideally live in globals.css, but are included here
// for robustness in a single-file environment.
const CustomStyles = () => (
  <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', sans-serif; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #0a192f; }
        ::-webkit-scrollbar-thumb { background: #1f3a5f; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #64ffda; }

        /* Custom Colors (Matching globals.css) */
        .bg-aas-navy { background-color: #0a192f; }
        .text-aas-navy { color: #0a192f; }
        .bg-aas-navy-light { background-color: #112240; }
        .text-aas-electric { color: #00d4ff; }
        .text-aas-cyan { color: #64ffda; }
        .text-aas-emerald { color: #10b981; }
        .text-aas-gray { color: #ccd6f6; }

        /* Neomorphism Classes (Matching globals.css) */
        .neomorphic-card {
            background-color: #112240;
            box-shadow: 
                8px 8px 15px rgba(0, 0, 0, 0.6),
                -8px -8px 15px rgba(255, 255, 255, 0.08);
        }
        .neomorphic-light {
            background-color: #0a192f;
            box-shadow: 
                inset 2px 2px 4px rgba(0, 0, 0, 0.6),
                inset -2px -2px 4px rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .neomorphic-button {
            background-color: #0a192f;
            box-shadow: 
                4px 4px 8px rgba(0, 0, 0, 0.4),
                -4px -4px 8px rgba(255, 255, 255, 0.05);
        }
        .glow-3d {
            box-shadow: 
                0 0 10px rgba(100, 255, 218, 0.4),
                0 0 20px rgba(0, 212, 255, 0.2);
        }

        /* Utility Classes */
        .container-max { @apply max-w-7xl mx-auto px-6 lg:px-8; }
        .section-container { @apply py-20 md:py-32; }
        .gradient-text { 
            background: linear-gradient(45deg, #00d4ff, #64ffda); 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent;
        }
        .grid-pattern {
            background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 40px 40px;
        }
    `}</style>
)


// --- 1. Utility Components ---

const SectionHeading = ({ title, highlight, subtitle, icon: Icon, id }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    className="text-center mb-16 pt-16 -mt-16" // pt/mt for anchor offset
  >
    <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-aas-cyan/30 mb-4 group neomorphic-light hover:shadow-lg hover:shadow-aas-electric/20 transition-all duration-300">
      <Icon size={20} className="text-aas-cyan mr-2 group-hover:scale-110 transition-transform" />
      <span className="text-sm font-medium gradient-text">{title}</span>
    </div>
    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
      {subtitle} <span className="gradient-text">{highlight}</span>
    </h2>
  </motion.div>
)

const FloatingIcons = () => {
  const icons = [
    { Icon: Cpu, color: 'text-aas-electric/5', size: 40, left: '5%', top: '10%', animation: 'animate-[spin_10s_linear_infinite]' },
    { Icon: Cloud, color: 'text-aas-cyan/5', size: 50, left: '90%', top: '15%', animation: 'animate-[pulse_4s_ease-in-out_infinite]' },
    { Icon: Database, color: 'text-aas-emerald/5', size: 35, left: '8%', top: '70%', animation: 'animate-[wiggle_8s_ease-in-out_infinite]' },
    { Icon: Network, color: 'text-purple-400/5', size: 45, left: '85%', top: '60%', animation: 'animate-[pulse_5s_ease-out_infinite]' },
  ]

  // Custom keyframes for wiggle animation (Tailwind JIT needs to see the full class)
  // In a full Next.js project, this would be in the config or globals.css
  return (
    <div className="fixed inset-0 pointer-events-none z-[-100] overflow-hidden">
      {icons.map(({ Icon, color, size, left, top, animation }, index) => (
        <div
          key={index}
          className={`absolute ${color} ${animation}`}
          style={{
            left,
            top,
            zIndex: -100,
            '--tw-animate-spin': 'spin',
            '--tw-animate-pulse': 'pulse',
            '@keyframes wiggle': { '0%, 100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } }
          }}
        >
          <Icon size={size} />
        </div>
      ))}
    </div>
  )
}


// --- 2. Structural Components (Header, Navbar, Footer) ---

// const Header = () => {
//   return (
//     <header className="py-3 border-b border-white/10 hidden xl:block bg-aas-navy/50 backdrop-blur-sm">
//       <div className="container-max">
//         <div className="flex items-center justify-between">
//           {/* Company Info - HORIZONTAL */}
//           <div className="flex items-center space-x-6">
//             <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-aas-electric/5 to-aas-cyan/5 border border-white/10 hover:border-aas-electric/50 transition-all duration-300 cursor-pointer group">
//               <div className="w-2 h-2 bg-aas-emerald rounded-full animate-pulse group-hover:scale-150 transition-transform" />
//               <span className="text-sm font-medium gradient-text group-hover:brightness-125 transition-all">
//                 ANAGHA AGILE SYSTEMS PRIVATE LIMITED
//               </span>
//             </div>

//             {/* Quick Stats - HORIZONTAL */}
//             <div className="flex items-center space-x-6">
//               {[
//                 { icon: Target, label: '15+ Years Excellence', color: 'text-aas-cyan' },
//                 { icon: Globe, label: 'Global Presence', color: 'text-aas-electric' },
//                 { icon: Zap, label: 'AI Powered', color: 'text-aas-emerald' },
//               ].map((item, index) => {
//                 const Icon = item.icon
//                 return (
//                   <div key={index} className="flex items-center space-x-1 cursor-default">
//                     <Icon size={14} className={`${item.color}`} />
//                     <span className="text-xs text-aas-gray">
//                       {item.label}
//                     </span>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>

//           {/* Contact Info - HORIZONTAL */}
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-aas-electric/10 hover:to-aas-cyan/10 hover:border-aas-electric/30 transition-all duration-300 group cursor-pointer">
//               <Users className="text-aas-cyan group-hover:scale-110 transition-transform" size={14} />
//               <span className="text-xs text-aas-gray group-hover:text-white transition-colors">
//                 24/7 Support
//               </span>
//             </div>
//             <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs px-4 py-2 rounded-lg bg-gradient-to-r from-aas-electric/20 to-aas-cyan/20 border border-aas-electric/30 hover:from-aas-electric/40 hover:to-aas-cyan/40 hover:border-aas-electric hover:scale-105 transition-all duration-300 text-white group font-medium">
//               <span className="group-hover:text-aas-cyan transition-colors">Get Quote</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

const Header = () => {
  return (
    <header className="py-3 border-b border-white/10 hidden xl:block bg-aas-navy/50 backdrop-blur-sm">
      <div className="container-max">
        <div className="flex items-center justify-between">
          {/* Company Info - HORIZONTAL */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-aas-electric/5 to-aas-cyan/5 border border-white/10 hover:border-aas-electric/50 transition-all duration-300 cursor-pointer group">
              <div className="w-2 h-2 bg-aas-emerald rounded-full animate-pulse group-hover:scale-150 transition-transform" />
              <span className="text-sm font-medium gradient-text group-hover:brightness-125 transition-all">
                ANAGHA AGILE SYSTEMS PRIVATE LIMITED
              </span>
            </div>

            {/* Quick Stats - HORIZONTAL */}
            <div className="flex items-center space-x-6">
              {[
                { icon: Target, label: '15+ Years Excellence', color: 'text-aas-cyan' },
                { icon: Globe, label: 'Global Presence', color: 'text-aas-electric' },
                { icon: Zap, label: 'AI Accelerated', color: 'text-aas-emerald' }, // Zap is now correctly imported
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-1.5 group/stat cursor-pointer">
                  <item.icon className={`w-4 h-4 ${item.color} group-hover/stat:scale-110 transition-transform`} />
                  <span className="text-xs text-aas-gray group-hover/stat:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info - HORIZONTAL */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-aas-electric/10 hover:to-aas-cyan/10 hover:border-aas-electric/30 transition-all duration-300 group cursor-pointer">
              <Users className="text-aas-cyan group-hover:scale-110 transition-transform" size={14} />
              <span className="text-xs text-aas-gray group-hover:text-white transition-colors">
                24/7 Support
              </span>
            </div>
            <button className="text-xs px-4 py-2 rounded-lg bg-gradient-to-r from-aas-electric/20 to-aas-cyan/20 border border-aas-electric/30 hover:from-aas-electric/40 hover:to-aas-cyan/40 hover:border-aas-electric hover:scale-105 transition-all duration-300 text-white group font-medium">
              <span className="group-hover:text-aas-cyan transition-colors">Get Quote</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

const Navbar = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  const navigation = [
    { name: 'Home', href: '#home', icon: Sparkles, sectionId: 'home' },
    { name: 'Mission', href: '#mission', icon: Target, sectionId: 'mission' },
    { name: 'AAISA Advantage', href: '#differentiator', icon: Brain, sectionId: 'differentiator' },
    { name: 'Capabilities', href: '#capabilities', icon: Cpu, sectionId: 'capabilities' },
    { name: 'Contact', href: '#contact', icon: Mail, sectionId: 'contact' },
  ]

  const scrollToSection = (id) => {
    document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-aas-navy/90 backdrop-blur-md shadow-lg border-b border-white/10 py-3' : 'py-5'
          }`}
      >
        <div className="container-max">
          <div className="flex items-center justify-between">
            {/* Logo / Brand Name */}
            <a href="#home" className="text-2xl font-display font-bold group" onClick={() => scrollToSection('#home')}>
              <span className="gradient-text transition-colors">AAS</span>
              <span className="text-white group-hover:text-aas-gray transition-colors">.AI</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium text-aas-gray hover:text-aas-cyan transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-aas-cyan transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <button
                onClick={() => scrollToSection('#contact')}
                className="px-6 py-2 bg-gradient-to-r from-aas-electric to-aas-cyan text-aas-navy font-display font-bold rounded-lg hover:shadow-lg hover:shadow-aas-electric/30 transition-all duration-300 ml-4"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 neomorphic-button rounded-xl hover:shadow-lg hover:shadow-aas-electric/20 transition-all"
              >
                <Menu size={24} className="text-aas-cyan" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-30 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-full max-w-sm h-full bg-aas-navy z-40 p-8 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <a href="#home" className="text-3xl font-display font-bold gradient-text">AAS.AI</a>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 neomorphic-button rounded-xl hover:shadow-lg hover:shadow-aas-electric/20 transition-all"
                >
                  <X size={24} className="text-aas-electric" />
                </button>
              </div>

              <div className="space-y-4">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="block px-4 py-3 rounded-lg text-lg font-medium text-aas-gray hover:bg-aas-navy-light hover:text-white transition-colors flex items-center space-x-4 group neomorphic-light"
                    >
                      <Icon size={20} className="text-aas-cyan group-hover:scale-105 transition-transform" />
                      <span>{item.name}</span>
                    </a>
                  )
                })}
              </div>

              {/* Mobile CTA Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#contact')}
                className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-aas-electric to-aas-cyan text-aas-navy font-display font-bold rounded-xl hover:shadow-lg hover:shadow-aas-electric/30 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ChevronRight size={16} />
              </motion.button>

              {/* Mobile contact info */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-aas-gray mb-3">Ready to transform your business?</p>
                <p className="text-sm text-aas-cyan mb-1">help@aas-ai.tech</p>
                <p className="text-sm text-aas-gray">(+91) 90350 00499</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#mission' },
        { label: 'Careers', href: '#' },
        { label: 'Team', href: '#' },
        { label: 'Case Studies', href: '#' },
        { label: 'Blog', href: '#' },
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'AI Strategy Consulting', href: '#capabilities' },
        { label: 'IoT Solutions', href: '#capabilities' },
        { label: 'Enterprise IT', href: '#capabilities' },
        { label: 'FinTech AI', href: '#capabilities' },
        { label: 'Bootcamps & Workshops', href: '#capabilities' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'White Papers', href: '#' },
        { label: 'Research Papers', href: '#' },
        { label: 'Webinars', href: '#' },
      ]
    },
  ]

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  const contactInfo = [
    'help@aas-ai.tech',
    '(+91) 90350 00499',
    'Bangalore, India',
  ]

  return (
    <footer className="bg-aas-navy-light pt-20 border-t border-white/10 relative">
      <div className="container-max">
        <div className="pb-10 border-b border-white/10">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            {/* Company Logo and Info */}
            <div className="w-full lg:w-1/4">
              <a href="#home" className="text-3xl font-display font-bold group mb-4 block">
                <span className="gradient-text">AAS</span>
                <span className="text-white group-hover:text-aas-gray transition-colors">.AI</span>
              </a>
              <p className="text-sm text-aas-gray mb-6">
                The architect of your digital future. We transform complexity into streamlined, AI-powered growth.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-label={link.label}
                      className="w-10 h-10 neomorphic-button rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-aas-cyan/20 transition-all duration-300 group"
                    >
                      <Icon size={20} className="text-aas-cyan group-hover:text-aas-electric transition-colors" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full lg:w-2/4">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h5 className="font-display font-semibold text-lg mb-4 text-white">{section.title}</h5>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={() => document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })}
                          className="text-sm text-aas-gray hover:text-aas-cyan transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="w-full lg:w-1/4">
              <h5 className="font-display font-semibold text-lg mb-4 text-white">Contact</h5>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-sm text-aas-gray">
                  <Mail size={16} className="text-aas-cyan flex-shrink-0 mt-1" />
                  <span>{contactInfo[0]}</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-aas-gray">
                  <Phone size={16} className="text-aas-cyan flex-shrink-0 mt-1" />
                  <span>{contactInfo[1]}</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-aas-gray">
                  <MapPin size={16} className="text-aas-cyan flex-shrink-0 mt-1" />
                  <span>{contactInfo[2]}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright and Back to Top */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-xs text-aas-gray">
            © {new Date().getFullYear()} Anagha Agile Systems Private Limited. All rights reserved.
          </p>

          {/* Back to top */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-10 h-10 neomorphic-button rounded-xl flex items-center justify-center glow-3d flex-shrink-0 mt-4 md:mt-0"
          >
            <ArrowUp className="text-aas-cyan" size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

// --- 3. Core Section Components ---

const Hero = () => {
  const [hovered, setHovered] = useState(false)

  const stats = [
    { value: '99%', label: 'Client Retention', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { value: '15+', label: 'Years Experience', icon: Award, color: 'from-blue-500 to-cyan-500' },
    { value: '50+', label: 'Fortune Clients', icon: Users, color: 'from-purple-500 to-pink-500' },
    { value: '24/7', label: 'Support', icon: Clock, color: 'from-orange-500 to-yellow-500' },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-aas-navy via-aas-navy to-black/50 -z-20" />

      <div className="container-max relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column - Text Content */}
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-6 leading-tight text-white text-shadow">
                The Architect of <span className="gradient-text">Digital DNA</span>
              </h1>
              <p className="text-lg md:text-xl text-aas-gray max-w-2xl mb-10">
                Over 15 years of Fortune-grade partnership, transforming global enterprises with proprietary AI and IoT frameworks.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.button
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-aas-electric to-aas-cyan text-aas-navy font-display font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-aas-electric/30 transition-all flex items-center justify-center glow-3d"
                >
                  <span>Start Your Transformation</span>
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: hovered ? 5 : 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <ArrowRight className="ml-3" size={24} />
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-display font-bold gradient-text">{stat.value}</div>
                      <div className="text-xs text-aas-gray">{stat.label}</div>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Right Column - Visual/Trust Content */}
          <div className="w-full lg:w-2/5">
            {/* 3D Visual Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-64 lg:h-96 bg-aas-navy-light rounded-2xl neomorphic-card flex items-center justify-center border border-aas-electric/20 p-6 relative overflow-hidden"
            >
              <Sparkles size={64} className="text-aas-electric/30 animate-pulse" />
              <p className="absolute bottom-4 right-4 text-xs text-aas-gray/50">AI Core Visualization</p>
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 bg-aas-navy-light border border-white/10 rounded-xl p-6 hover:border-aas-electric/30 hover:shadow-lg hover:shadow-aas-electric/20 transition-all duration-300 group"
            >
              <h3 className="font-display font-semibold text-lg mb-4 gradient-text group-hover:brightness-125 transition-all">Trusted By Global Leaders</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Fortune 500', count: '50+' },
                  { label: 'Startups', count: '200+' },
                  { label: 'Enterprises', count: '100+' },
                ].map((item, index) => (
                  <div key={index} className="text-center group/item">
                    <div className="text-xl font-display font-bold gradient-text mb-1 group-hover/item:brightness-125 transition-all">
                      {item.count}
                    </div>
                    <div className="text-xs text-aas-gray group-hover/item:text-white transition-colors">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Mission = () => {
  const missionPoints = [
    {
      icon: Target,
      title: 'Strategic Vision',
      description: 'Architecting future-proof digital DNA for global enterprises.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      title: 'Global Leadership',
      description: 'Propel businesses beyond digital adoption to worldwide dominance.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'AI Innovation',
      description: 'Proprietary AAISA framework for intelligent transformation.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Client Success',
      description: '15+ years of Fortune-grade partnership excellence.',
      gradient: 'from-orange-500 to-yellow-500'
    }
  ]

  return (
    <section id="mission" className="section-container relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-aas-navy via-aas-navy/95 to-aas-navy -z-10" />

      <div className="container-max">
        <SectionHeading
          id="mission"
          title="Our Core Mission"
          subtitle="Engineering Tomorrow's"
          highlight="Digital Enterprise"
          icon={Target}
        />

        {/* Mission Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missionPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-6 hover:border-aas-electric/30 transition-all neomorphic-card"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${point.gradient} flex items-center justify-center mb-4`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-3">{point.title}</h3>
                <p className="text-sm text-aas-gray">{point.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const Differentiator = () => {
  const differentiators = [
    {
      id: 1,
      title: 'Greenfield & Brownfield Mastery',
      icon: Layers,
      description: 'Innovate within legacy systems or build anew with equal expertise.',
      features: ['Legacy Integration', 'New System Development', 'Risk Minimization'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 2,
      title: 'Innovation via Design Thinking',
      icon: Rocket,
      description: 'Human-centered AI modeling for powerful, aligned solutions.',
      features: ['User Research', 'Prototyping', 'Iterative Design'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 3,
      title: 'Accelerated Time-to-Value',
      icon: Clock,
      description: 'Compressed development cycles with AI-powered testing.',
      features: ['Rapid Prototyping', 'Automated QA', 'Fast Deployment'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 4,
      title: 'Turnkey Solution Ownership',
      icon: Package,
      description: 'End-to-end responsibility from strategy to managed services.',
      features: ['Managed Services', 'Full Deployment', 'Compliance'],
      color: 'from-orange-500 to-yellow-500',
    },
  ]

  const factorHighlights = [
    {
      title: 'Customer Experience',
      desc: 'Real-time personalized engagement',
      metric: '80%',
      sub: 'Higher Retention',
    },
    {
      title: 'Distribution Channels',
      desc: 'Lean sales force effectiveness',
      metric: '50%',
      sub: 'Cost Reduction',
    },
    {
      title: 'Prospecting Strategy',
      desc: 'Use-case prioritization',
      metric: '60%',
      sub: 'Higher Conversion',
    },
  ]

  const [activeDiff, setActiveDiff] = useState(differentiators[0])

  return (
    <section className="section-container relative">
      <div className="container-max">
        <SectionHeading
          id="differentiator"
          title="The AAISA Advantage"
          subtitle="Why We Are The Best"
          highlight="Differentiator"
          icon={Brain}
        />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side: Differentiator Tabs */}
          <div className="w-full lg:w-1/3 space-y-4">
            {differentiators.map((diff) => {
              const Icon = diff.icon
              const isActive = diff.id === activeDiff.id
              return (
                <motion.div
                  key={diff.id}
                  onClick={() => setActiveDiff(diff)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 neomorphic-card ${isActive ? 'border border-aas-cyan shadow-lg shadow-aas-cyan/20 scale-[1.02]' : 'border border-white/10 hover:border-aas-electric/30'
                    }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${diff.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className={`font-display font-semibold text-lg mb-1 ${isActive ? 'gradient-text' : 'text-white'}`}>{diff.title}</h3>
                      <p className="text-sm text-aas-gray">{diff.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right Side: Detailed View and Metrics */}
          <motion.div
            key={activeDiff.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-2/3 bg-aas-navy-light neomorphic-card rounded-xl p-8 border border-aas-electric/20"
          >
            <h3 className="text-3xl font-display font-bold gradient-text mb-4">{activeDiff.title}</h3>
            <p className="text-lg text-aas-gray mb-6">{activeDiff.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="space-y-4">
                <h4 className="flex items-center text-white font-semibold mb-2">
                  <CheckCircle size={18} className="text-aas-emerald mr-2" /> Key Features:
                </h4>
                <ul className="space-y-2 text-aas-gray text-sm list-disc pl-5">
                  {activeDiff.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center bg-aas-navy neomorphic-light rounded-lg p-6">
                <div className="text-center">
                  <TrendingUp size={48} className="text-aas-electric mx-auto mb-3" />
                  <p className="text-aas-gray text-sm">Focused on maximizing</p>
                  <p className="text-xl font-display font-bold gradient-text">Business Impact</p>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-display font-bold text-white border-b border-white/10 pb-3 mb-6">Our Impact Across Business Factors</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {factorHighlights.map((factor, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-display font-bold gradient-text mb-2">
                    {factor.metric}
                  </div>
                  <h4 className="font-display font-semibold text-lg mb-2">{factor.title}</h4>
                  <p className="text-sm text-aas-gray mb-1">{factor.desc}</p>
                  <p className="text-xs text-aas-emerald">{factor.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Capabilities = () => {
  const [activeTab, setActiveTab] = useState(0)

  const capabilities = [
    {
      id: 0,
      title: 'AI Strategy & IoT Solutions',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      description: 'Bridge the gap between AI technology prerequisites and existing manual processes.',
      features: [
        'Deep Learning Implementation',
        'IoT Process Integration',
        'Predictive Analytics',
        'Risk Mitigation',
      ],
      benefit: 'Accelerated ROI with expert guidance',
      stats: { guidance: 95, risk: 90, cost: 75, time: 85 }
    },
    {
      id: 1,
      title: 'FinTech AI Consulting',
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500',
      description: 'Modernize financial operations with intelligent automation and predictive analytics.',
      features: [
        'Fraud Detection Systems',
        'Automated Trading',
        'Risk Assessment',
        'Customer Personalization',
      ],
      benefit: 'Enhanced security & customer experience',
      stats: { guidance: 90, risk: 85, cost: 80, time: 90 }
    },
    {
      id: 2,
      title: 'Cloud & Enterprise IT',
      icon: Cloud,
      color: 'from-blue-500 to-cyan-500',
      description: 'Optimize infrastructure for scalable AI deployment and enterprise digital transformation.',
      features: [
        'Cloud Migration (AWS/Azure/GCP)',
        'DevSecOps Implementation',
        'Data Warehouse Solutions',
        'API Integration & Management',
      ],
      benefit: 'Maximum reliability and efficiency',
      stats: { guidance: 98, risk: 70, cost: 85, time: 80 }
    },
  ]

  const activeCap = capabilities[activeTab]

  const features = [
    { icon: Cpu, title: 'AI/ML Engineering', desc: 'Building, training, and deploying large-scale custom models.' },
    { icon: Network, title: 'Edge Computing', desc: 'Real-time data processing on IoT devices for immediate insights.' },
    { icon: Shield, title: 'Cybersecurity', desc: 'Implementing Zero-Trust architectures and advanced threat intelligence.' },
    { icon: Lock, title: 'Blockchain', desc: 'Developing transparent, immutable ledger solutions for supply chain and finance.' },
  ]

  return (
    <section className="section-container relative">
      <div className="absolute inset-0 grid-pattern opacity-10 -z-10" />

      <div className="container-max">
        <SectionHeading
          id="capabilities"
          title="Our Core Offerings"
          subtitle="Propelling Business"
          highlight="Capabilities"
          icon={Cpu}
        />

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center mb-12 neomorphic-card rounded-xl p-3 max-w-4xl mx-auto border border-white/10"
        >
          {capabilities.map((cap, index) => (
            <button
              key={cap.id}
              onClick={() => setActiveTab(index)}
              className={`flex-1 min-w-[200px] text-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === index
                ? 'bg-gradient-to-r from-aas-electric to-aas-cyan text-aas-navy shadow-lg shadow-aas-electric/30 neomorphic-button'
                : 'text-aas-gray hover:text-white hover:bg-white/5'
                }`}
            >
              {cap.title}
            </button>
          ))}
        </motion.div>

        {/* Active Tab Content */}
        <motion.div
          key={activeCap.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-aas-navy-light rounded-xl p-8 lg:p-12 neomorphic-card border border-aas-cyan/20 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Summary & Benefit */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-white/10 lg:pr-6 pb-6 lg:pb-0">
              <h3 className="text-3xl font-display font-bold gradient-text mb-4">{activeCap.title}</h3>
              <p className="text-aas-gray mb-6">{activeCap.description}</p>
              <div className="bg-aas-navy neomorphic-light rounded-lg p-4">
                <p className="text-sm font-semibold text-aas-cyan mb-1">Key Value:</p>
                <p className="text-white font-medium">{activeCap.benefit}</p>
              </div>
            </div>

            {/* Features List */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-white/10 lg:px-6 pb-6 lg:pb-0">
              <h4 className="text-lg font-semibold text-white mb-4">Implementation Focus:</h4>
              <ul className="space-y-3 text-sm">
                {activeCap.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight size={18} className="text-aas-electric flex-shrink-0 mt-0.5 mr-2" />
                    <span className="text-aas-gray">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Visualization */}
            <div className="lg:col-span-1 lg:pl-6">
              <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics:</h4>
              {Object.entries(activeCap.stats).map(([key, value], index) => (
                <div key={key} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm capitalize">{key} %</span>
                    <span className="text-sm font-bold gradient-text">{value}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1.5, delay: 0.2 + index * 0.1 }}
                      className="h-2 rounded-full bg-gradient-to-r from-aas-electric to-aas-cyan"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-center font-display text-2xl font-bold text-white mb-8">Next-Gen Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl neomorphic-light border border-white/10 hover:border-aas-electric/30 hover:shadow-lg hover:shadow-aas-electric/20 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-aas-navy-light neomorphic-button group-hover:bg-aas-electric/10 transition-colors">
                    <Icon className="text-aas-electric group-hover:scale-110 transition-transform" size={28} />
                  </div>
                  <h4 className="font-display font-semibold text-lg mb-2">{item.title}</h4>
                  <p className="text-xs text-aas-gray">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full mb-6 neomorphic-light">
            <span className="text-sm font-medium gradient-text">Ready to Transform?</span>
          </div>

          <h3 className="font-display text-3xl font-bold mb-6 text-shadow">
            Let&apos;s Build Your <span className="gradient-text">Digital Future</span>
          </h3>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 rounded-xl font-display font-bold text-lg glow-3d"
            style={{
              background: 'linear-gradient(45deg, #00d4ff, #64ffda)',
              color: '#0a192f',
            }}
          >
            <span className="flex items-center">
              Start Your Transformation Journey
              <ChevronRight className="ml-3" size={24} />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState(null) // 'success', 'error', 'submitting'

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData)
      // In a real app, this would be a fetch() call
      setStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
    }, 1500)
  }

  const contactDetails = [
    { icon: MapPin, label: 'Bangalore, India', value: 'Global Headquarters' },
    { icon: Phone, label: '(+91) 90350 00499', value: 'Call/WhatsApp' },
    { icon: Mail, label: 'help@aas-ai.tech', value: 'General Inquiries' },
    { icon: Clock, label: 'Mon - Fri, 9am - 6pm IST', value: 'Support Hours' },
  ]

  return (
    <section id="contact" className="section-container relative">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20 -z-10" />

      <div className="container-max">
        <SectionHeading
          id="contact"
          title="Connect With Us"
          subtitle="Start Your Digital"
          highlight="Transformation"
          icon={Send}
        />
        <div className="flex flex-col md:flex-row gap-12 items-start bg-aas-navy-light rounded-xl neomorphic-card p-6 lg:p-12 border border-aas-electric/20">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/3 space-y-8"
          >
            <h3 className="text-2xl font-display font-bold text-white border-b border-white/10 pb-3">Contact Details</h3>
            {contactDetails.map((detail, index) => {
              const Icon = detail.icon
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-aas-navy neomorphic-button flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-aas-cyan" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{detail.label}</p>
                    <p className="text-sm text-aas-gray">{detail.value}</p>
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-2/3"
          >
            <h3 className="text-2xl font-display font-bold gradient-text mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg neomorphic-light focus:border-aas-electric focus:outline-none transition-all duration-300 hover:shadow-inner hover:shadow-aas-electric/10"
                  placeholder="Your Full Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg neomorphic-light focus:border-aas-electric focus:outline-none transition-all duration-300 hover:shadow-inner hover:shadow-aas-electric/10"
                  placeholder="Your Work Email"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg neomorphic-light focus:border-aas-electric focus:outline-none transition-all duration-300 hover:shadow-inner hover:shadow-aas-electric/10"
                  placeholder="Your Company (Optional)"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg neomorphic-light focus:border-aas-electric focus:outline-none transition-all duration-300 hover:shadow-inner hover:shadow-aas-electric/10 resize-none"
                  placeholder="Tell us about your digital transformation needs..."
                  required
                />
              </div>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-aas-emerald font-semibold text-center py-2 bg-aas-emerald/10 rounded-lg"
                >
                  Message sent successfully! We will get back to you shortly.
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'submitting'}
                className="w-full px-8 py-4 bg-gradient-to-r from-aas-electric to-aas-cyan text-aas-navy font-display font-bold rounded-xl hover:shadow-2xl hover:shadow-aas-electric/30 transition-all flex items-center justify-center glow-3d group disabled:opacity-50"
              >
                <span className="mr-2 group-hover:translate-x-1 transition-transform">
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </span>
                <Send className="group-hover:translate-x-2 transition-transform" size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// --- 4. Main App Component ---

const App = () => {
  // Scroll progress and Navbar state logic from layout.tsx and Navbar.tsx
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0
    setScrollProgress(scrollPercent)
    setIsScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    // Set up scroll listeners
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <>
      {/* 0. Custom Styles/Head Content */}
      <CustomStyles />
      <title>ANAGHA AGILE SYSTEMS | AI & IoT Digital Transformation</title>

      {/* 1. Header (Top Bar) */}
      <Header />

      {/* 2. Navbar */}
      <Navbar isScrolled={isScrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="bg-aas-navy text-white relative overflow-x-hidden min-h-screen pt-[80px] lg:pt-[120px]">
        {/* Fixed Background Elements */}
        <div className="fixed inset-0 bg-aas-navy -z-20" />
        <FloatingIcons />

        {/* Scroll progress indicator (from layout.tsx) */}
        <div className="fixed top-0 left-0 right-0 h-1 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-aas-electric to-aas-cyan"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Content Sections */}
        <Hero />
        <Mission />
        <Differentiator />
        <Capabilities />
        <Contact />

        {/* 3. Footer */}
        <Footer />
      </main>
    </>
  )
}

export default App