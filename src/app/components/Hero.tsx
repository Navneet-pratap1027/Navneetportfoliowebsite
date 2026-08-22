import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MapPin, Linkedin, Github, Mail, ChevronDown, Download, Briefcase } from "lucide-react";

const roles = [
  "MERN Stack Developer",
  "React Developer",
  "Backend Developer",
  "AI / ML Enthusiast",
];

// Floating background symbols
const CODE_SYMBOLS = [
  { text: "{ }", x: 8, y: 15, size: 18, delay: 0 },
  { text: "</>", x: 88, y: 20, size: 16, delay: 1.2 },
  { text: "01", x: 15, y: 75, size: 13, delay: 2 },
  { text: "npm", x: 82, y: 70, size: 12, delay: 0.7 },
  { text: "React", x: 5, y: 45, size: 11, delay: 1.8 },
  { text: "Node", x: 90, y: 48, size: 11, delay: 0.3 },
  { text: "[ ]", x: 50, y: 8, size: 14, delay: 1.5 },
  { text: "=>", x: 72, y: 85, size: 15, delay: 2.4 },
  { text: "API", x: 25, y: 88, size: 12, delay: 0.9 },
  { text: "git", x: 60, y: 90, size: 11, delay: 1.1 },
];

export function Hero({ heroImage: _heroImage }: { heroImage: string }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayedText(currentRole.slice(0, displayedText.length + 1)), 75);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => setDisplayedText(currentRole.slice(0, displayedText.length - 1)), 38);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="hero-bg grid-bg min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* ── Floating Code Symbols ── */}
      {CODE_SYMBOLS.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.07, 0.04, 0.07] }}
          transition={{ delay: s.delay, duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: s.size,
            fontFamily: "JetBrains Mono, monospace",
            color: "#06b6d4",
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          {s.text}
        </motion.div>
      ))}

      {/* ── Glow Orbs ── */}
      <div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-6 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-6 py-32 flex flex-col items-center w-full text-center">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400" style={{ animation: "pulse 2s infinite" }} />
            Available for Opportunities
          </div>
        </motion.div>

        {/* Hi, I'm */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400"
          style={{ fontSize: "1.2rem", marginBottom: "4px" }}
        >
          Hi, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontSize: "clamp(3rem, 9vw, 6rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: "12px",
            background: "linear-gradient(135deg, #ffffff 40%, #06b6d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Navneet Pratap
        </motion.h1>

        {/* Full Stack Developer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            fontWeight: 600,
            color: "#94a3b8",
            marginBottom: "6px",
          }}
        >
          Full Stack Developer
        </motion.p>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center justify-center gap-2 mb-6 h-10"
        >
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              minWidth: "260px",
              textAlign: "center",
            }}
          >
            {displayedText}
          </span>
          <span className="text-cyan-400" style={{ fontSize: "1.2rem", animation: "blink 1s step-end infinite" }}>|</span>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex items-center gap-2 text-slate-500 justify-center mb-8"
        >
          <MapPin className="w-4 h-4 text-cyan-500" />
          <span className="text-sm">Gorakhpur, Uttar Pradesh, India</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-slate-400 text-base mb-10 max-w-xl leading-relaxed mx-auto"
        >
          Aspiring full-stack developer building responsive, production-ready applications with the MERN stack.
          Exploring Python & Machine Learning to craft intelligent, real-world solutions.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.88 }}
          className="flex flex-wrap gap-4 justify-center mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToAbout}
            className="glow-btn px-8 py-3 rounded-full text-white flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            VIEW MY WORK
          </motion.button>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300"
            style={{
              border: "1px solid rgba(6,182,212,0.4)",
              color: "#06b6d4",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(6,182,212,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(6,182,212,0.2)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            <Download className="w-4 h-4" />
            DOWNLOAD RESUME
          </motion.a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex gap-3 justify-center mb-12"
        >
          {[
            { icon: Linkedin, href: "https://www.linkedin.com/in/navneet-pratap-961519300", label: "LinkedIn", color: "#0ea5e9" },
            { icon: Github, href: "https://github.com/Navneet-pratap1027", label: "GitHub", color: "#94a3b8" },
            { icon: Mail, href: "mailto:pratap102718@gmail.com", label: "Email", color: "#8b5cf6" },
          ].map(({ icon: Icon, href, label, color }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.92 }}
              className="w-11 h-11 rounded-full glass-card flex items-center justify-center transition-colors"
              style={{ transitionDelay: `${i * 0.05}s` }}
              aria-label={label}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}50`)}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "")}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ background: "none", border: "none" }}
      >
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#334155",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-cyan-500" />
        </motion.div>
      </motion.button>
    </section>
  );
}
