import { motion } from "motion/react";
import { Linkedin, Github, Heart, Code2, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative py-10"
      style={{
        background: "#020617",
        borderTop: "1px solid rgba(6,182,212,0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 700,
                }}
              >
                Navneet Pratap
              </p>
              <p className="text-slate-600 text-xs">MERN Stack Developer</p>
            </div>
          </div>

          {/* Center - Copyright */}
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            Made with{" "}
            <Heart className="w-3.5 h-3.5 text-red-500" fill="currentColor" /> by
            Navneet Pratap © {new Date().getFullYear()}
          </p>

          {/* Right - Links + Back to top */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/navneet-pratap-961519300"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Github className="w-4 h-4" />
            </a>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              }}
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
