import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MapPin, Linkedin, Github, ChevronDown, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const roles = [
  "MERN Stack Developer",
  "Frontend Developer",
  "Python & ML Enthusiast",
  "Software Developer",
];

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: Math.random() * 10 + 8,
}));

export function Hero({ heroImage }: { heroImage: string }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, 80);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      }, 40);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
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
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "-10px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Glow Orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16 w-full">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Available for Opportunities</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-slate-400 text-lg mb-2">Hello, I'm</p>
            <h1
              className="mb-4"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                background: "linear-gradient(135deg, #ffffff 30%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Navneet Pratap
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2 justify-center lg:justify-start mb-6 h-10"
          >
            <span className="text-slate-300" style={{ fontSize: "1.3rem" }}>
              I'm a{" "}
            </span>
            <span
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {displayedText}
            </span>
            <span
              className="text-cyan-400"
              style={{
                fontSize: "1.4rem",
                fontWeight: 400,
                animation: "blink 1s step-end infinite",
              }}
            >
              |
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-2 text-slate-400 justify-center lg:justify-start mb-8"
          >
            <MapPin className="w-4 h-4 text-cyan-500" />
            <span className="text-sm">Gorakhpur, Uttar Pradesh, India</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-slate-400 text-base mb-10 max-w-xl leading-relaxed mx-auto lg:mx-0"
          >
            Aspiring developer building responsive, user-friendly websites with HTML, CSS, JavaScript & React.
            Exploring Python & Machine Learning to create intelligent solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/navneet-pratap-961519300"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn px-8 py-3 rounded-full text-white flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn Profile
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3 rounded-full text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300"
              style={{ cursor: "pointer", display: "inline-block", textDecoration: "none" }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex gap-4 justify-center lg:justify-start"
          >
            {[
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/navneet-pratap-961519300",
                label: "LinkedIn",
              },
              { icon: Github, href: "#", label: "GitHub" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-shrink-0 flex flex-col items-center gap-6"
        >
          <div className="relative floating-badge">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",
                transform: "scale(1.1)",
              }}
            />
            {/* Avatar ring */}
            <div className="avatar-ring pulse-glow">
              <div className="w-64 h-64 rounded-full overflow-hidden bg-slate-800 relative">
                <ImageWithFallback
                  src={heroImage}
                  alt="Navneet Pratap"
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(6,182,212,0.1) 0%, transparent 100%)",
                  }}
                />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-4 -right-4 glass-card px-3 py-1.5 rounded-full text-xs text-cyan-400 border border-cyan-500/30"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              🚀 MERN Stack
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 glass-card px-3 py-1.5 rounded-full text-xs text-purple-400 border border-purple-500/30"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              🤖 ML Learner
            </motion.div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-4">
            {[
              { value: "3+", label: "Projects" },
              { value: "2", label: "Certifications" },
              { value: "5+", label: "Skills" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-gradient-cyan"
                  style={{ fontSize: "1.5rem", fontWeight: 800 }}
                >
                  {stat.value}
                </div>
                <div className="text-slate-500 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 text-cyan-400 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
      >
        <span className="text-xs text-slate-500">Scroll Down</span>
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
}