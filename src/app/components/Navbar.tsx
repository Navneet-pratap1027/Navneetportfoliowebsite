import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X, Code2 } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Problem Solving", href: "#problem-solving" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#020617]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollTo("#home")}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span
            style={{
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            NP.dev
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            const isHovered = hoveredLink === link.label;
            return (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className="nav-link text-sm transition-colors duration-200 relative pb-1"
                style={{
                  color: isActive ? "#06b6d4" : "#94a3b8",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0 0 4px 0",
                }}
              >
                {link.label}
                {/* Hover / active underline */}
                <motion.span
                  layoutId="nav-underline"
                  initial={false}
                  animate={{
                    scaleX: isActive || isHovered ? 1 : 0,
                    opacity: isActive ? 1 : isHovered ? 0.6 : 0,
                  }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    height: "2px",
                    borderRadius: "2px",
                    background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
                    transformOrigin: "center",
                    display: "block",
                  }}
                />
              </button>
            );
          })}
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo("#contact")}
            style={{
              padding: "7px 18px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.15))",
              border: "1px solid rgba(6,182,212,0.35)",
              color: "#06b6d4",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-cyan-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#020617]/95 backdrop-blur-xl border-t border-cyan-500/20"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`text-left text-sm transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-cyan-400"
                    : "text-slate-400"
                }`}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="text-left text-sm transition-colors text-slate-400"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Hire Me
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
