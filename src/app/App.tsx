import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── ASSET IMPORTS ───
import logoImg   from "../assets/tecmeraki-logo.png";
import officeImg from "../assets/office.png";
import oilgas1   from "../assets/oilgas-1.png";
import oilgas2 from "../imports/oil&gas_img2.png";
import oilgas4   from "../assets/oilgas-4.png";

// Chemical
import chem1 from "../imports/Chemical_img1.png";
import chem2 from "../imports/Chemical_img2.png";
import chem3 from "../imports/Chemical_img3.png";

// Pharmaceutical
import pharma1 from "../imports/Pharma_img1.png";
import pharma2 from "../imports/Pharma_img2.png";
import pharma3 from "../imports/Pharma_img3.png";

// FMCG
import fmcg1 from "../imports/FMCG_img1.png";
import fmcg2 from "../imports/FMCG_img2.png";
import fmcg3 from "../imports/FMCG_img3.png";

// Food & Bevrage
import food1 from "../imports/Food&Bevrages_img1.png";
import food2 from "../imports/Food&Bevrages_img2.png";
import food3 from "../imports/Food&Bevrages_img3.png";

// Power & Utilities
import power1 from "../imports/Power&Utilities_img1.png";
import power2 from "../imports/Power&Utilities_img2.png";
import power3 from "../imports/Power&Utilities_img3.png";

// CPG
import cpg1 from "../imports/CPG_img1.png";
import cpg2 from "../imports/CPG_img2.png";
import cpg3 from "../imports/CPG_img3.png";

// DCS
import DCS1 from "../imports/DCS_img1.png";
import DCS2 from "../imports/DCS_img2.png";

// IIoT (Fixed line 6 to say IIOt2 and pull from _img2.png)
import IIOt1 from "../imports/IIOT_img1.png";
import IIOt2 from "../imports/IIOT_img2.png";

// Electrical
import Electrical1 from "../imports/Electrical_img1.png";
import Electrical2 from "../imports/Electrical_img2.png";
// AMC
import AMC1 from "../imports/AMC_img1.png";
import AMC2 from "../imports/AMC_img2.png";

// Instrument (Just added the .png extension at the end)
import Instrument1 from "../imports/Instrumentation_img1.png";
import Instrument2 from "../imports/Instrumentation_img1.png";

//Energy
import Energy1 from "../imports/Energymonitoring_img1.png";
import Energy2 from "../imports/Energymonitorin_img2.png";

//Industrial (Fixed the second line to say Industrial2 so it doesn't collide)
import Industrial1 from "../imports/industrialnetwork_img1.png";
import Industrial2 from "../imports/industrialnetwork_img2.png";

/* ─── PLEXUS CANVAS ─── */
export function PlexusCanvas({ color = "0,212,255", alpha = 0.13, count = 55 }: { color?: string; alpha?: number; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = ref.current; 
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    
    const resize = () => { 
      canvas.width = canvas.offsetWidth; 
      canvas.height = canvas.offsetHeight; 
    };
    resize();
    
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, 
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35, 
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.8,
    }));
    
    const THRESH = 165;
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const n of nodes) {
        n.x += n.vx; 
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < THRESH) {
            ctx.beginPath(); 
            ctx.moveTo(nodes[i].x, nodes[i].y); 
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${color},${alpha * (1 - d / THRESH)})`; 
            ctx.lineWidth = 0.7; 
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath(); 
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha * 1.6})`; 
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    
    const ro = new ResizeObserver(resize); 
    ro.observe(canvas);
    
    return () => { 
      cancelAnimationFrame(raf); 
      ro.disconnect(); 
    };
  }, [color, alpha, count]);
  
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none select-none" />;
}

/* ─── SOFT SHAPES ─── */
export function SoftShapes({ variant = "a" }: { variant?: "a" | "b" | "c" }) {
  if (variant === "a") return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute -top-16 -right-20 w-[480px] h-[480px] opacity-30" style={{ background: "linear-gradient(135deg,#fde8d4,#f9c5a3)", clipPath: "polygon(100% 0,100% 80%,20% 0)", filter: "blur(2px)" }} />
      <div className="absolute -bottom-20 -left-16 w-[360px] h-[360px] opacity-20" style={{ background: "linear-gradient(135deg,#f5a885,#fbbf93)", clipPath: "polygon(0 20%,80% 100%,0 100%)", filter: "blur(4px)" }} />
      <div className="absolute top-1/2 -right-20 w-56 h-64 opacity-[0.18] rounded-3xl" style={{ background: "linear-gradient(135deg,#b4c5e8,#9ab1d9)", transform: "translateY(-40%) rotate(-15deg)", filter: "blur(6px)" }} />
    </div>
  );
  if (variant === "b") return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute -bottom-10 -right-10 w-72 h-80 opacity-15 rounded-3xl" style={{ background: "linear-gradient(135deg,#a8c4e8,#8aafd4)", transform: "rotate(12deg)", filter: "blur(8px)" }} />
      <div className="absolute -top-20 -left-10 w-96 h-96 opacity-20" style={{ background: "linear-gradient(135deg,#fde8d4,#fad0b0)", clipPath: "polygon(0 0,70% 0,0 70%)", filter: "blur(3px)" }} />
    </div>
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute -top-10 -right-10 w-[420px] h-[320px] opacity-[0.22]" style={{ background: "linear-gradient(160deg,#fdd6b8,#f5a885)", clipPath: "polygon(30% 0,100% 0,100% 70%)", filter: "blur(3px)" }} />
      <div className="absolute bottom-0 left-1/3 w-80 h-64 opacity-14 rounded-full" style={{ background: "linear-gradient(135deg,#b4c5e8,#7ea8d0)", filter: "blur(16px)" }} />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 opacity-[0.18] rounded-full" style={{ background: "radial-gradient(circle,#fde8d4,transparent)", filter: "blur(12px)" }} />
    </div>
  );
}

/* ─── FADE-IN REVEAL ─── */
export function FadeIn({ children, delay = 0, direction = "up", className = "" }:
  { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const el = ref.current; 
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) { 
        setVisible(true); 
        obs.disconnect(); 
      } 
    }, { threshold: 0.1 });
    obs.observe(el); 
    return () => obs.disconnect();
  }, []);
  
  const init = direction === "up" ? { opacity: 0, y: 40 } : direction === "left" ? { opacity: 0, x: -40 } : direction === "right" ? { opacity: 0, x: 40 } : { opacity: 0 };
  const anim = direction === "up" ? { opacity: 1, y: 0 } : direction === "left" ? { opacity: 1, x: 0 } : direction === "right" ? { opacity: 1, x: 0 } : { opacity: 1 };
  
  return (
    <motion.div ref={ref} initial={init} animate={visible ? anim : init}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── DATA ─── */
const NAV_LINKS = [
  { label: "Home",                  href: "#home" },
  { label: "About",                 href: "#about" },
  { label: "Solutions & Industries",href: "#industries" },
  { label: "Services",              href: "#services" },
  { label: "Contact",               href: "#contact" },
];

const CAROUSEL_SLIDES = [
  { img: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=1600&q=85", tag: "Industrial Automation",  heading: "Powering the Future\nof Smart Manufacturing",   sub: "End-to-end DCS solutions that transform your plant into a connected, efficient, and future-ready operation." },
  { img: "https://images.unsplash.com/photo-1717386255773-1e3037c81788?w=1600&q=85", tag: "IIoT & Industry 4.0",    heading: "Real-Time Intelligence\nfor Your Plant Floor",       sub: "Cloud-connected monitoring, predictive analytics, and mobile dashboards — turning data into decisions." },
  { img: "https://images.unsplash.com/photo-1620203853151-496c7228306c?w=1600&q=85", tag: "Engineering Excellence", heading: "Precision Engineering\nfor Complex Industries",        sub: "From instrumentation to electrical design, we deliver turnkey projects built for reliability and performance." },
  { img: "https://images.unsplash.com/photo-1509390288171-ce2088f7d08e?w=1600&q=85", tag: "Digital Transformation", heading: "Transforming Industries\nAcross Gujarat & Beyond",      sub: "50+ successful projects across chemical, pharma, oil & gas, FMCG, food & beverage, and power sectors." },
];

const SERVICES = [
  {
    id: "dcs",
    label: "DCS, PLC / SCADA",
    images: [DCS1, DCS2], // Matches your exact DCS imports
    points: [
      { title: "Complete Automation", desc: "Boosts production speed instantly." },
      { title: "Minimized Downtime", desc: "Fast fault identification." },
      { title: "Consistent Quality", desc: "Eliminates manual operational errors." },
      { title: "Centralized Control", desc: "One-screen plant management." },
      { title: "Enhanced Safety", desc: "Automatic accident prevention." }
    ]
  },
  {
    id: "energy-monitoring",
    label: "Energy Monitoring",
    images: [Energy1,Energy2], // Matches your exact Energy section imports
    points: [
      { title: "Cost Savings", desc: "Direct utility bill reduction." },
      { title: "Asset Optimization", desc: "Tracks heavy machinery efficiency." },
      { title: "Sustainability Goals", desc: "Eliminates energy wastage." },
      { title: "Penalty Protection", desc: "Avoids electricity board fines." },
      { title: "Predictive Insights", desc: "Forecasts sudden machine failures." }
    ]
  },
  {
    id: "iiot",
    label: "IIoT & Industry 4.0",
    images: [IIOt1, IIOt2], // Matches your exact IIoT imports
    points: [
      { title: "Remote Accessibility", desc: "Live monitoring from anywhere." },
      { title: "Data-Driven Decisions", desc: "Real-time operational analytics." },
      { title: "Smart Alerts", desc: "Prevents sudden breakdowns." },
      { title: "Improved Efficiency", desc: "Maximizes total plant output." },
      { title: "Legacy Upgrades", desc: "Modernizes older machinery easily." }
    ]
  },
  {
    id: "instrumentation",
    label: "Instrumentation Engineering",
    images: [Instrument1, Instrument2], // Matches your exact Instrument imports
    points: [
      { title: "Precision Control", desc: "Perfect process parameter management." },
      { title: "Zero Wastage", desc: "Reduces raw material rejection." },
      { title: "Regulatory Compliance", desc: "Meets industrial safety standards." },
      { title: "Fail-Safe Operations", desc: "Secures high-hazardous lines." },
      { title: "Seamless Integration", desc: "Flawless instrument-to-PLC communication." }
    ]
  },
  {
    id: "electrical",
    label: "Electrical Design",
    images: [Electrical1, Electrical2], // Matches your exact Electrical imports
    points: [
      { title: "Risk-Free Infrastructure", desc: "Eliminates short-circuit hazards." },
      { title: "Optimized Procurement", desc: "Saves over-engineering costs." },
      { title: "Quality Improvement", desc: "Protects sensitive electronic devices." },
      { title: "Future Expandability", desc: "Hassle-free panel scaling." },
      { title: "Clear Documentation", desc: "Easy future troubleshooting." }
    ]
  },
  {
    id: "industrial-networking",
    label: "Industrial Networking",
    images: [Industrial1, Industrial2], // Matches your exact Industrial imports
    points: [
      { title: "Uninterrupted Communication", desc: "Continuous high-speed data flow." },
      { title: "Cyber Security", desc: "Protects critical operational data." },
      { title: "Zero Packet Loss", desc: "Flawless signal transmission." },
      { title: "Easy Scaling", desc: "Simple network expansion." },
      { title: "Rapid Fault Location", desc: "Instantly pinpoints offline nodes." }
    ]
  },
  {
    id: "amc-training",
    label: "AMC & Training",
    images: [AMC1, AMC2], // Matches your exact AMC imports
    points: [
      { title: "Peace of Mind", desc: "Smooth, surprise-free operations." },
      { title: "Extended Equipment Life", desc: "Prevents early hardware wear-and-tear." },
      { title: "Self-Reliant Team", desc: "Independent internal troubleshooting." },
      { title: "Priority Support", desc: "Immediate emergency assistance." },
      { title: "Reduced Errors", desc: "Avoids accidental operational downtime." }
    ]
  }
];

const INDUSTRIES = [
  {
    id: "chemical",  label: "Chemical",
    images: [chem1, chem2, chem3],
    challenges:     ["Complex batch process control", "Strict safety & interlock requirements", "Regulatory compliance & traceability"],
    valueDelivered: ["DCS-based batch automation", "Safety instrumented systems (SIS)", "Real-time process reporting", "Cycle Time Reduction", "Improved Product Consistency", "Enhanced Safety Compliance"],
  },
  {
    id: "pharma",    label: "Pharmaceutical",
    images: [pharma1, pharma2, pharma3],
    challenges:     ["21 CFR Part 11 & GMP compliance", "Manual audit trails & paper records", "Validation & qualification demands"],
    valueDelivered: ["Electronic batch records & audit trails", "DCS migration with e-signatures", "Automated validation documentation", "Regulatory Compliance", "Audit-Ready Operations", "Zero Audit Observations"],
  },
  {
    id: "oilgas",    label: "Oil & Gas",
    images: [oilgas1, oilgas2, oilgas4],
    challenges:     ["Remote site monitoring", "Pipeline integrity & leak detection", "Hazardous area safety requirements"],
    valueDelivered: ["Wellhead & tank farm DCS", "Pipeline monitoring systems", "ATEX-rated control panels", "Enhanced Operational Safety", "Reduced Downtime", "Real-Time Asset Visibility"],
  },
  {
    id: "fmcg",      label: "FMCG",
    images: [fmcg1, fmcg2, fmcg3],
    challenges:     ["Low OEE & high unplanned downtime", "Lack of production visibility", "Manual reporting & slow decision-making"],
    valueDelivered: ["OEE monitoring dashboards", "Digital production tracking systems", "Automated shift & batch reports", "Operational Excellence", "Enhanced Manufacturing Efficiency", "Data-Driven Decision Making"],
  },
  {
    id: "foodbev",   label: "Food & Beverage",
    images: [food1, food2, food3],
    challenges:     ["Recipe consistency & quality control", "Hygiene & CIP/SIP automation", "Traceability & allergen management"],
    valueDelivered: ["Recipe management & batch control", "Automated CIP/SIP sequences", "End-to-end traceability systems", "Consistent Product Quality", "Reduced Waste & Rework", "Improved Compliance & Traceability"],
  },
  {
    id: "power",     label: "Power & Utilities",
    images: [power1, power2, power3],
    challenges:     ["Energy wastage & peak demand costs", "Manual substation operations", "Limited visibility into consumption"],
    valueDelivered: ["Substation automation & DCS", "Multi-point energy monitoring systems", "Load management & demand forecasting", "Optimized Resource Utilization", "Reduced Energy Costs", "Real-Time Consumption Visibility"],
  },
  {
    id: "cpg",       label: "CPG",
    images: [cpg1, cpg2, cpg3],
    challenges:     ["High SKU complexity & changeovers", "Supply chain variability & waste", "Compliance with labeling & safety regulations"],
    valueDelivered: ["Automated packaging & filling lines", "Real-time production tracking", "Quality control & vision systems", "Reduced Changeover Time", "Improved Line Efficiency", "End-to-End Traceability"],
  },
];

/* ─── MAIN APP COMPONENT ─── */
export default function App() {
  const [scrolled,        setScrolled]        = useState(false);
  const [menuOpen,        setMenuOpen]        = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [serviceSlide, setServiceSlide] = useState(0);
  const [activeIndustry,  setActiveIndustry]  = useState(0);
  const [industrySlide, setIndustrySlide] = useState(0);
 const [slide, setSlide] = useState(0);
const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSlide = useCallback((idx: number) => setSlide(idx), []);
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % CAROUSEL_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
useEffect(() => {
     const timer = setInterval(() => {
       if (SERVICES[activeService]?.images?.length > 1) {
         setServiceSlide((prev) => (prev + 1) % SERVICES[activeService].images.length);
     }
    }, 3500);
   return () => clearInterval(timer);
  }, [activeService]);
  useEffect(() => { setIndustrySlide(0); }, [activeIndustry]);

  useEffect(() => {
    const images = INDUSTRIES[activeIndustry]?.images ?? [];
    if (images.length <= 1) return;
    const t = setInterval(() => setIndustrySlide(s => (s + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [activeIndustry]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out your Name, Email, and Message before sending!");
      return;
    }

    const subject = encodeURIComponent(`Project Inquiry - ${formData.name} (${formData.company || 'Individual'})`);
    const body = encodeURIComponent(
      `Hello TecMeraki Systems Team,\n\n` +
      `You have received a new message from your website contact form:\n\n` +
      `• Name: ${formData.name}\n` +
      `• Email: ${formData.email}\n` +
      `• Company: ${formData.company || 'Not Specified'}\n` +
      `• Service Selected: ${formData.service || 'General'}\n\n` +
      `Message Details:\n${formData.message}\n\n` +
      `Regards,\n${formData.name}`
    );

    window.location.href = `mailto:sales@tecmeraki.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 overflow-x-hidden relative" style={{ fontFamily: "'Inter',sans-serif" }}>
      
      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-100 py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href="#home" onClick={(e) => { e.preventDefault(); setMenuOpen(false); handleNavClick("#home"); }}>
            <img src={logoImg} alt="TecMeraki" className="h-12 w-auto transition-all duration-300"
              style={{ filter: (scrolled || menuOpen) ? "none" : "brightness(0) invert(1)" }} />
          </a>
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${scrolled ? "text-gray-700 hover:text-cyan-600" : "text-white/90 hover:text-white"}`}>
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${scrolled ? "text-white" : "border border-white/50 text-white hover:bg-white/10"}`}
            style={scrolled ? { background: "linear-gradient(135deg,#00d4ff,#7c3aed)" } : {}}>
            Get In Touch
          </a>
          <button className="md:hidden p-2 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1.5">
              {[0, 1, 2].map(i => (
                <span key={i} className={`block w-6 h-0.5 transition-all duration-300 ${(scrolled || menuOpen) ? "bg-gray-700" : "bg-white"} ${i === 0 && menuOpen ? "rotate-45 translate-y-2" : ""} ${i === 1 && menuOpen ? "opacity-0" : ""} ${i === 2 && menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              ))}
            </div>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 px-6 py-6 flex flex-col gap-4 shadow-xl">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} 
                onClick={(e) => { e.preventDefault(); setMenuOpen(false); handleNavClick(link.href); }} 
                className="text-base font-semibold text-gray-700 hover:text-cyan-600 transition-colors py-1 border-b border-gray-50 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={(e) => { e.preventDefault(); setMenuOpen(false); handleNavClick("#contact"); }}
              className="mt-2 text-center text-sm font-bold text-white py-3 rounded-xl shadow-md"
              style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)" }}>
              Get In Touch
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO CAROUSEL ── */}
      <section id="home" className="relative w-full h-screen overflow-hidden bg-gray-950 flex flex-col justify-between">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div 
              key={slide} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.8, ease: "easeInOut" }} 
              className="absolute inset-0 w-full h-full"
            >
              <img src={CAROUSEL_SLIDES[slide].img} alt="" className="w-full h-full object-cover pointer-events-none select-none" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(4,9,28,0.85) 0%,rgba(10,20,50,0.6) 50%,rgba(4,9,28,0.75) 100%)" }} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none select-none">
          <PlexusCanvas color="0,210,255" alpha={0.15} count={45} />
        </div>

        {/* Dynamic padding top (pt-36) forces clean safety space beneath navbar logoblock */}
        <div className="relative z-20 flex-1 flex items-center pt-36 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
            <div className="flex flex-col items-start">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-4 md:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {CAROUSEL_SLIDES[slide].tag}
              </div>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5 max-w-4xl break-words sm:whitespace-pre-line"
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
                {CAROUSEL_SLIDES[slide].heading}
              </h1>
              
              <p className="text-sm md:text-lg text-gray-300 max-w-2xl mb-6 md:mb-8 leading-relaxed">
                {CAROUSEL_SLIDES[slide].sub}
              </p>
              
              {/* BUTTONS: Reduced spacing and small text profile size to stop stacking/overlap */}
              

            </div>
          </div>
        </div>

        {/* FIXED STATS FOOTER: Anchored to the bottom absolute layer so it stays visible even on short screens */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-md border-t border-white/10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-row justify-between items-center gap-4">
            {[
              { num: "50+",  label: "Projects Delivered" }, 
              { num: "5+",   label: "Years Experience" }, 
              { num: "100%", label: "Client Satisfaction" }
            ].map(s => (
              <div key={s.label} className="text-left flex-1 min-w-0">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-cyan-400 truncate" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {s.num}
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-white/60 uppercase tracking-wider font-semibold mt-0.5 truncate">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
          {CAROUSEL_SLIDES.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} className={`rounded-full transition-all duration-300 ${i === slide ? "w-3 h-8 bg-cyan-400" : "w-3 h-3 bg-white/40 hover:bg-white/70"}`} />
          ))}
        </div>
        
        <button onClick={() => goToSlide((slide - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/20 border border-white/10 text-white flex items-center justify-center text-lg font-light hover:bg-black/40 transition-colors">‹</button>
        <button onClick={() => goToSlide((slide + 1) % CAROUSEL_SLIDES.length)} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/20 border border-white/10 text-white flex items-center justify-center text-lg font-light hover:bg-black/40 transition-colors">›</button>
      </section>

      {/* ── ABOUT ── */}
    <section id="about" className="py-12 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(100,116,139,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(100,116,139,0.06) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      <SoftShapes variant="a" />
      <PlexusCanvas color="0,180,220" alpha={0.08} count={44} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center mb-12 md:mb-16">
          <FadeIn direction="left">
            <div>
              <div className="text-xs font-bold tracking-widest text-cyan-600 uppercase mb-3">About Us</div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Engineer the Future of <span style={{ color: "#00b8d9" }}>Industry</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-4">
                Founded in 2021 by an industrial automation veteran with over two decades of experience, TecMeraki Systems LLP has established itself as a trusted partner for Industrial Automation and digital transformation across industries. Headquartered in Vadodara, Gujarat, the company began operations with a strong focus on industrial automation, IIoT solutions, and the export of engineered goods, steadily expanding its capabilities to meet the evolving needs of global markets.
              </p>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-4">
                At TecMeraki, we specialize in delivering end‑to‑end automation and control systems, integrating IT and OT networks, and providing precision electrical and instrumentation engineering services. Our expertise extends to smart manufacturing, predictive analytics, plant modernization, and turnkey project execution, ensuring that our clients achieve efficiency, safety, and sustainability in their operations.Our values form the foundation of everything we do. We are committed to excellence by maintaining the highest standards in engineering and execution. We embrace innovation, continuously adopting new technologies to empower industries with scalable solutions. We build trust through transparency and long‑term partnerships, and we uphold sustainability by designing systems that support both operational efficiency and environmental responsibility.
              </p>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                With a blend of technical expertise, visionary thinking, and a passion for soulful innovation, TecMeraki Systems LLP continues to deliver solutions that not only transform businesses but also contribute to a smarter, more sustainable industrial future.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn direction="right" delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-96 md:h-[480px] mt-4 md:mt-0">
              <img src={officeImg} alt="TecMeraki Office" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: "⚙️", title: "Our Mission", desc: "Empower industries with intelligent automation and digital technologies to drive operational excellence, sustainable growth, and competitive advantage." },
            { icon: "🎯", title: "Our Vision",  desc: "Become a trusted global partner for industrial automation and digital transformation by delivering smart, sustainable, and future-ready solutions." },
          ].map((mv, i) => (
            <FadeIn key={mv.title} direction={i === 0 ? "left" : "right"} delay={0.1}>
              <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm text-center hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{mv.icon}</div>
                <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2 md:mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{mv.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{mv.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

      {/* ── INDUSTRIES WE SERVE ── */}
      <section id="industries" className="py-12 md:py-24 bg-white relative overflow-hidden">
        <SoftShapes variant="c" />
        <PlexusCanvas color="0,180,220" alpha={0.07} count={42} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <FadeIn direction="up">
            <div className="text-center mb-10 md:mb-14">
              <div className="text-xs font-bold tracking-widest text-cyan-600 uppercase mb-3">Solutions & Industries</div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Industries <span style={{ color: "#00b8d9" }}>We Serve</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">Select an industry to explore the challenges we solve and the value we deliver.</p>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 pb-6 md:pb-8 mb-6 md:mb-8 border-b border-slate-200">
              {INDUSTRIES.map((ind, i) => (
                <button key={ind.id} onClick={() => setActiveIndustry(i)}
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${activeIndustry === i ? "text-white shadow-md scale-105" : "bg-transparent text-slate-500 hover:text-slate-700"}`}
                  style={activeIndustry === i ? { background: "linear-gradient(135deg,#00d4ff,#7c3aed)" } : { border: "1px solid rgba(100,116,139,0.35)" }}>
                  {ind.label}
                </button>
              ))}
            </div>
          </FadeIn>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndustry}
              initial={{ opacity: 0, y: 24 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-4 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white"
            >
              <div className="relative overflow-hidden h-64 md:h-auto md:col-span-2 min-h-[260px] md:min-h-[420px]">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={`${activeIndustry}-${industrySlide}`}
                    src={INDUSTRIES[activeIndustry].images[industrySlide] as string}
                    alt={INDUSTRIES[activeIndustry].label}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/25 pointer-events-none" />
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <div className="text-[10px] md:text-xs uppercase tracking-widest opacity-70 mb-1">Industry</div>
                  <div className="text-xl md:text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{INDUSTRIES[activeIndustry].label}</div>
                </div>
                {INDUSTRIES[activeIndustry].images.length > 1 && (
                  <div className="absolute bottom-6 right-5 z-10 flex gap-1.5">
                    {INDUSTRIES[activeIndustry].images.map((_, di) => (
                      <button key={di} onClick={() => setIndustrySlide(di)}
                        className={`rounded-full transition-all duration-300 ${di === industrySlide ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`} />
                    ))}
                  </div>
                )}
                {INDUSTRIES[activeIndustry].images.length > 1 && (
                  <>
                   <button onClick={() => setIndustrySlide((s: number) => (s - 1 + INDUSTRIES[activeIndustry].images.length) % INDUSTRIES[activeIndustry].images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 border border-white/20 text-white hover:bg-black/50 transition-all flex items-center justify-center text-base">‹</button>
                    <button onClick={() => setIndustrySlide((s: number) => (s + 1) % INDUSTRIES[activeIndustry].images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 border border-white/20 text-white hover:bg-black/50 transition-all flex items-center justify-center text-base">›</button>
                  </>
                )}
              </div>
              <div className="p-6 flex flex-col md:col-span-1" style={{ backgroundColor: "#fdf6f6" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: "#c9a0a0" }} />
                  <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "#9a6060" }}>Challenges</div>
                </div>
                <ul className="space-y-3 flex-1">
                  {INDUSTRIES[activeIndustry].challenges.map(c => (
                    <li key={c} className="flex items-start gap-2 text-sm" style={{ color: "#4b4b4b" }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "#c9a0a0" }} />
                      <span className="break-words min-w-0 flex-1">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 flex flex-col md:col-span-1 border-t border-gray-100 md:border-t-0" style={{ backgroundColor: "#fdfaf2" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: "#c9aa5a" }} />
                  <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "#8a7030" }}>Value Delivered</div>
                </div>
                <ul className="space-y-3 flex-1">
                  {INDUSTRIES[activeIndustry].valueDelivered.map(v => (
                    <li key={v} className="flex items-start gap-2 text-sm" style={{ color: "#4b3f10" }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "#c9aa5a" }} />
                      <span className="break-words min-w-0 flex-1">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── OUR SERVICES ── */}
      <section id="services" className="py-12 md:py-24 relative overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>
        <SoftShapes variant="b" />
        <PlexusCanvas color="0,180,220" alpha={0.08} count={45} />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <FadeIn direction="up">
            <div className="text-center mb-10 md:mb-14">
              <div className="text-xs font-bold tracking-widest text-cyan-600 uppercase mb-3">Our Services</div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Comprehensive <span style={{ color: "#00b8d9" }}>Automation</span> Solutions
              </h2>
              <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">Select a service area to explore our technical capabilities and solutions.</p>
            </div>
          </FadeIn>

          {/* Interactive Navigation Tabs */}
          <FadeIn direction="up" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 pb-6 md:pb-8 mb-6 md:mb-8 border-b border-slate-200">
              {SERVICES.map((srv, i) => (
                <button 
                  key={srv.id} 
                  onClick={() => { setActiveService(i); setServiceSlide(0); }}
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${activeService === i ? "text-white shadow-md scale-105" : "bg-transparent text-slate-500 hover:text-slate-700"}`}
                  style={activeService === i ? { background: "linear-gradient(135deg,#00b8d9,#7c3aed)" } : { border: "1px solid rgba(100,116,139,0.35)" }}
                >
                  {srv.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Core Interactive Display Board */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeService}
              initial={{ opacity: 0, y: 24 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-4 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white"
            >
              
              {/* LEFT SIDE: Technical Description Column Panel */}
              <div className="p-6 md:p-8 flex flex-col justify-between md:col-span-2 bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: "#00b8d9" }} />
                    <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "#00b8d9" }}>Technical Description</div>
                  </div>
                  
                  <ul className="space-y-4">
                    {SERVICES[activeService].points.map((pt, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#00b8d9" }} />
                        <span className="break-words min-w-0 flex-1">
                          <strong className="text-gray-900 font-semibold">{pt.title}:</strong> {pt.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RIGHT SIDE: Image Presentation / Carousel Panel */}
              <div className="relative overflow-hidden h-64 md:h-auto md:col-span-2 min-h-[260px] md:min-h-[420px]">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={`${activeService}-${serviceSlide}`}
                    src={SERVICES[activeService].images[serviceSlide] as string}
                    alt={SERVICES[activeService].label}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40 pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <div className="text-[10px] md:text-xs uppercase tracking-widest opacity-70 mb-1">Domain Architecture</div>
                  <div className="text-xl md:text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{SERVICES[activeService].label}</div>
                </div>

                {/* Slideshow Controls */}
                {SERVICES[activeService].images.length > 1 && (
                  <div className="absolute bottom-6 right-5 z-10 flex gap-1.5">
                    {SERVICES[activeService].images.map((_, di) => (
                      <button 
                        key={di} 
                        onClick={() => setServiceSlide(di)}
                        className={`rounded-full transition-all duration-300 ${di === serviceSlide ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`} />
                    ))}
                  </div>
                )}
                {SERVICES[activeService].images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setServiceSlide((s: number) => (s - 1 + SERVICES[activeService].images.length) % SERVICES[activeService].images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 border border-white/20 text-white hover:bg-black/50 transition-all flex items-center justify-center text-base"
                    >
                      ‹
                    </button>
                    <button 
                      onClick={() => setServiceSlide((s: number) => (s + 1) % SERVICES[activeService].images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 border border-white/20 text-white hover:bg-black/50 transition-all flex items-center justify-center text-base"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      {/* ── CONTACT ── */}
      <section id="contact" className="py-12 md:py-24 bg-gray-50 relative overflow-hidden">
        <SoftShapes variant="b" />
        <PlexusCanvas color="0,180,220" alpha={0.06} count={35} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <FadeIn direction="left">
              <div>
                <div className="text-xs font-bold tracking-widest text-cyan-600 uppercase mb-3">Contact Us</div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  Let's Build <span style={{ color: "#00b8d9" }}>Smarter</span> Together
                </h2>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">Whether you're planning a new automation project, upgrading an existing system, or exploring Industry 4.0 opportunities, our team is ready to help.</p>
                <div className="flex flex-col gap-5">
                  {[
                    { 
                      icon: "🏢", 
                      label: <a href="https://www.google.com/maps/search/?api=1&query=TecMeraki+Systems+LLP+246+Vihav+Trade+Center+Bhayli+Vadodara+Gujarat" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-600 hover:underline transition-colors duration-200 text-sm md:text-base">TecMeraki Systems LLP</a>, 
                      sub: <a href="https://www.google.com/maps/search/?api=1&query=TecMeraki+Systems+LLP+246+Vihav+Trade+Center+Bhayli+Vadodara+Gujarat" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-600 hover:underline transition-colors duration-200 whitespace-pre-line text-xs md:text-sm text-gray-400">246, Vihav Trade Center, Bhayli,{"\n"}Vadodara, Gujarat, India</a>
                    },
                    { 
                      icon: "📞", 
                      label: (
                        <div className="flex flex-wrap gap-x-2 text-gray-800 text-xs md:text-sm font-semibold">
                          <a href="tel:+919427761069" className="hover:text-cyan-600 hover:underline transition-colors duration-200">+91 94277 61069</a>
                          <span className="text-gray-300">|</span>
                          <a href="tel:+919408203532" className="hover:text-cyan-600 hover:underline transition-colors duration-200">+91 94082 03532</a>
                        </div>
                      ),
                      sub: "" 
                    },
                    { icon: "✉️", label: <a href="mailto:sales@tecmeraki.com" className="hover:text-cyan-600 hover:underline transition-colors duration-200 text-sm md:text-base">sales@tecmeraki.com</a>, sub: "" },
                    { icon: "🕐", label: "Mon - Sat: 09:00 AM - 06:00 PM", sub: "" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-cyan-50 border border-cyan-100">{item.icon}</div>
                      <div className="min-w-0 flex-1">
                        <div className="text-gray-800 text-sm font-semibold break-words">{item.label}</div>
                        {item.sub && <div className="text-gray-400 text-xs md:text-sm break-words">{item.sub}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8 mt-6 md:mt-0">
                <h3 className="font-bold text-gray-900 mb-6 text-base md:text-lg" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Get In Touch</h3>
                <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                  {[{ ph: "Your Name", key: "name", type: "text" }, { ph: "Email Address", key: "email", type: "email" }, { ph: "Company Name", key: "company", type: "text" }].map(f => (
                    <input key={f.key} type={f.type} placeholder={f.ph}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white transition-all"
                      value={(formData as any)[f.key]} onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })} />
                  ))}
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white transition-all cursor-pointer"
                    value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                    <option value="">Select Service</option>
                    {["DCS", "Energy Monitoring", "IIoT Solutions", "Instrumentation", "Electrical Design", "AMC & Training"].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <textarea placeholder="Tell us about your project..." rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white transition-all resize-vertical"
                    value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  <button type="submit" className="w-full py-3.5 rounded-xl text-white font-semibold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
                    style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                    Send Message →
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
            <img src={logoImg} alt="TecMeraki" className="h-12 w-auto brightness-0 invert" />
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }} className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">{link.label}</a>
              ))}
            </div>
          </div>
          <div className="text-center pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm">© 2026 TecMeraki Systems LLP. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}