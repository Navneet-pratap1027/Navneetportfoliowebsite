import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, X, CheckCircle2 } from "lucide-react";

interface Project {
  emoji: string;
  title: string;
  tag: string;
  tagColor: string;
  tagBorder: string;
  tagText: string;
  topBorder: string;
  description: string;
  stack: string[];
  link: string;
  githubLink?: string;
  problem?: string;
  solution?: string;
  highlights?: string[];
}

const projects: Project[] = [
  {
    emoji: "🎓",
    title: "StudyNotion",
    tag: "Ed-Tech Platform",
    tagColor: "rgba(6,182,212,0.18)",
    tagBorder: "rgba(6,182,212,0.4)",
    tagText: "#06b6d4",
    topBorder: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
    description:
      "Full-stack Ed-Tech platform bridging instructors and students with OTP auth, course CRUD, rating system, and Razorpay payment integration.",
    stack: ["React", "Node.js", "MongoDB", "Cloudinary", "Razorpay"],
    link: "https://study-notion-frontend-kappa-seven.vercel.app/",
    problem: "Students and educators lacked an affordable, self-hosted platform for creating and selling courses without relying on large incumbents.",
    solution: "Built a full MERN-stack Ed-Tech SaaS with role-based auth (student/instructor), media hosting via Cloudinary, and Razorpay for payments.",
    highlights: ["OTP-based email auth", "Course CRUD & rating system", "Razorpay payment integration", "Cloudinary media uploads", "Responsive dashboard"],
  },
  {
    emoji: "🎬",
    title: "MetaTube",
    tag: "Backend Engineering",
    tagColor: "rgba(139,92,246,0.18)",
    tagBorder: "rgba(139,92,246,0.4)",
    tagText: "#a78bfa",
    topBorder: "linear-gradient(90deg, #8b5cf6, #ec4899)",
    description:
      "YouTube-inspired backend with JWT authentication, video uploads via Multer, channel subscriptions, and personalized playlist management.",
    stack: ["Node.js", "Express", "MongoDB", "JWT", "Multer", "Cloudinary"],
    link: "https://github.com/Navneet-pratap1027/Backend_Project",
    githubLink: "https://github.com/Navneet-pratap1027/Backend_Project",
    problem: "Understanding how large-scale video platforms manage auth, media, and real-time interactions at the backend layer.",
    solution: "Built a production-grade REST API backend covering the full YouTube domain — channels, videos, subscriptions, playlists, and tweets.",
    highlights: ["JWT access + refresh token auth", "Video & thumbnail upload via Multer", "Cloudinary CDN integration", "Channel subscription system", "Aggregation pipelines for feed"],
  },
  {
    emoji: "🏨",
    title: "HotelHub",
    tag: "Full-Stack App",
    tagColor: "rgba(20,184,166,0.18)",
    tagBorder: "rgba(20,184,166,0.4)",
    tagText: "#2dd4bf",
    topBorder: "linear-gradient(90deg, #14b8a6, #06b6d4)",
    description:
      "Hotel booking platform with map-based property discovery, host listing management, and a streamlined booking flow using geolocation APIs.",
    stack: ["React", "Node.js", "MongoDB", "Maps API", "Express"],
    link: "https://hotel-hub-platform.vercel.app/",
    problem: "Travelers need a simple way to discover and book nearby hotels with map-based discovery rather than list-only interfaces.",
    solution: "Created a full-stack booking app with geolocation-powered map discovery, host-side listing CRUD, and an end-to-end booking flow.",
    highlights: ["Map-based property discovery", "Host listing management", "Geolocation APIs integration", "Booking flow with date selection", "Responsive across all devices"],
  },
  {
    emoji: "🧾",
    title: "InvoicerPro",
    tag: "AI SaaS Platform",
    tagColor: "rgba(99,102,241,0.18)",
    tagBorder: "rgba(99,102,241,0.4)",
    tagText: "#818cf8",
    topBorder: "linear-gradient(90deg, #6366f1, #a855f7)",
    description:
      "Production-ready AI-powered SaaS invoicing platform with PDF generation, email delivery, revenue dashboard, and Google Gemini AI assistant. JWT Auth, Google OAuth, CI/CD via GitHub Actions, Dockerized, Render + Vercel deployed.",
    stack: ["React", "Node.js", "MongoDB", "Express", "Docker", "Google Gemini"],
    link: "https://invoicer-pro-nine.vercel.app",
    githubLink: "https://github.com/Navneet-pratap1027/Invoicer_Pro",
    problem: "Freelancers and small businesses waste hours creating invoices manually and lack AI-powered insights into their revenue.",
    solution: "Shipped a full SaaS product with AI-generated invoice drafts, PDF export, Nodemailer delivery, and a revenue analytics dashboard.",
    highlights: ["JWT Auth + Google OAuth", "AI invoice drafts via Google Gemini", "PDF generation & email delivery", "Revenue dashboard & analytics", "CI/CD via GitHub Actions, Dockerized"],
  },
  {
    emoji: "🤖",
    title: "BuildNext AI",
    tag: "AI Career Tool",
    tagColor: "rgba(245,158,11,0.18)",
    tagBorder: "rgba(245,158,11,0.4)",
    tagText: "#fbbf24",
    topBorder: "linear-gradient(90deg, #f59e0b, #ef4444)",
    description:
      "AI-powered platform that analyzes GitHub portfolios, detects skill gaps, calculates portfolio health metrics, and generates AI-driven career recommendations using Google Gemini.",
    stack: ["React.js", "Node.js", "Express.js", "Google Gemini API", "GitHub REST API"],
    link: "https://buildnext-ai.vercel.app",
    githubLink: "https://github.com/Navneet-pratap1027/Buildnext-ai",
    problem: "Developers struggle to objectively evaluate their own GitHub portfolios and understand what skills to build for career growth.",
    solution: "Built an AI tool that ingests a GitHub username, scores the portfolio across multiple dimensions, and surfaces personalized career recommendations.",
    highlights: ["GitHub REST API portfolio analysis", "Portfolio health score (0–100)", "Skill gap detection & roadmap", "AI career recommendations via Gemini", "Real-time streaming responses"],
  },
  {
    emoji: "📋",
    title: "EvidenceLens",
    tag: "AI / Full Stack",
    tagColor: "rgba(34,197,94,0.18)",
    tagBorder: "rgba(34,197,94,0.4)",
    tagText: "#4ade80",
    topBorder: "linear-gradient(90deg, #22c55e, #16a34a)",
    description:
      "AI-powered legal evidence analysis tool using RAG pipelines, OCR, and Whisper transcription to extract structured insights from documents, images, and audio files.",
    stack: ["Python", "FastAPI", "RAG", "OCR", "Whisper", "LangChain"],
    link: "#",
    problem: "Legal teams spend enormous time manually reviewing evidence — documents, audio recordings, and images — looking for key facts and patterns.",
    solution: "Built a RAG-based AI system that processes multi-modal legal evidence using OCR, Whisper audio transcription, and LLM-powered structured extraction.",
    highlights: ["RAG pipeline for document Q&A", "Whisper audio transcription", "OCR for scanned documents", "Structured insight extraction", "FastAPI REST backend"],
  },
  {
    emoji: "🩺",
    title: "Disease Detection",
    tag: "Machine Learning",
    tagColor: "rgba(239,68,68,0.18)",
    tagBorder: "rgba(239,68,68,0.4)",
    tagText: "#f87171",
    topBorder: "linear-gradient(90deg, #ef4444, #f97316)",
    description:
      "Deep learning model using MobileNetV2 transfer learning to detect diseases from medical images with high accuracy. Built with TensorFlow/Keras and served via OpenCV.",
    stack: ["Python", "TensorFlow", "Keras", "MobileNetV2", "OpenCV"],
    link: "#",
    problem: "Early disease detection from medical imagery requires expensive specialists; an accessible ML model can serve as a first-pass screening tool.",
    solution: "Fine-tuned MobileNetV2 with transfer learning on labeled medical image datasets, achieving high classification accuracy with a lightweight inference pipeline.",
    highlights: ["MobileNetV2 transfer learning", "TensorFlow/Keras training pipeline", "OpenCV image preprocessing", "High classification accuracy", "Lightweight for edge deployment"],
  },
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(2,6,23,0.85)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 32 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "640px",
          background: "#0d1117",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: "3px", background: project.topBorder }} />

        {/* Header */}
        <div style={{ padding: "28px 28px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span style={{ fontSize: "2rem" }}>{project.emoji}</span>
              <h3 style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 800 }}>{project.title}</h3>
            </div>
            <span
              style={{
                fontSize: "10px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px",
                background: project.tagColor, border: `1px solid ${project.tagBorder}`, color: project.tagText,
              }}
            >
              {project.tag}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px", padding: "8px", color: "#64748b", cursor: "pointer", flexShrink: 0,
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px 28px" }}>
          {project.problem && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>The Problem</p>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.7 }}>{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>The Solution</p>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.7 }}>{project.solution}</p>
            </div>
          )}

          {project.highlights && (
            <div style={{ marginBottom: "24px" }}>
              <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>Key Features</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {project.highlights.map(h => (
                  <div key={h} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: project.tagText }} />
                    <span style={{ color: "#94a3b8", fontSize: "0.83rem" }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stack */}
          <div style={{ marginBottom: "24px" }}>
            <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(t => (
                <span
                  key={t}
                  style={{
                    fontSize: "10px", padding: "3px 9px", borderRadius: "6px",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#94a3b8", fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 flex-wrap">
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                style={{
                  padding: "10px 20px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  color: "#fff", fontSize: "0.85rem", fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                style={{
                  padding: "10px 20px", borderRadius: "10px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                  color: "#94a3b8", fontSize: "0.85rem", fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function About({ aboutImage }: { aboutImage?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="about" className="section-darker py-24 relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 text-sm tracking-widest uppercase mb-3">
            Who Am I
          </p>
          <h2
            className="section-title"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            About Me
          </h2>
        </motion.div>

        {/* Bio Row */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-20">
          {/* Code Editor Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-3 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,212,255,0.18) 0%, transparent 70%)",
                }}
              />

              {/* Editor card */}
              <div
                className="relative w-80 h-80 rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, #0d1117 0%, #0f1e2a 50%, #0a1628 100%)",
                  border: "2px solid rgba(0,212,255,0.45)",
                  boxShadow:
                    "0 0 30px rgba(0,212,255,0.28), 0 0 70px rgba(0,153,187,0.14), inset 0 0 40px rgba(0,212,255,0.04)",
                }}
              >
                {/* Title Bar */}
                <div
                  style={{
                    background: "rgba(0,0,0,0.75)",
                    borderBottom: "1px solid rgba(0,212,255,0.18)",
                    padding: "9px 13px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", flexShrink: 0 }} />
                  <span style={{ fontSize: "9px", color: "#3d6478", marginLeft: "8px", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.04em" }}>
                    ~/mern-app/server.js
                  </span>
                  <span style={{ marginLeft: "auto", fontSize: "8px", color: "#1f6b54", fontFamily: "JetBrains Mono, monospace" }}>
                    ● JS
                  </span>
                </div>

                {/* Code Body */}
                <div style={{ display: "flex", height: "calc(100% - 52px)" }}>
                  {/* Line Numbers */}
                  <div
                    style={{
                      width: "26px",
                      padding: "10px 0",
                      textAlign: "right",
                      paddingRight: "5px",
                      borderRight: "1px solid rgba(0,212,255,0.07)",
                      background: "rgba(0,0,0,0.22)",
                      flexShrink: 0,
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((n) => (
                      <div key={n} style={{ fontSize: "7.5px", color: "#1e3a4a", lineHeight: "1.68", fontFamily: "JetBrains Mono, monospace" }}>
                        {n}
                      </div>
                    ))}
                  </div>

                  {/* Syntax-highlighted Code */}
                  <div
                    style={{
                      flex: 1,
                      padding: "10px 10px",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "8.8px",
                      lineHeight: "1.68",
                      overflow: "hidden",
                    }}
                  >
                    <div><span style={{ color: "#c678dd" }}>const</span> <span style={{ color: "#61afef" }}>express</span> <span style={{ color: "#abb2bf" }}>=</span> <span style={{ color: "#56b6c2" }}>require</span>(<span style={{ color: "#98c379" }}>'express'</span>);</div>
                    <div><span style={{ color: "#c678dd" }}>const</span> <span style={{ color: "#61afef" }}>mongoose</span> <span style={{ color: "#abb2bf" }}>=</span> <span style={{ color: "#56b6c2" }}>require</span>(<span style={{ color: "#98c379" }}>'mongoose'</span>);</div>
                    <div style={{ lineHeight: "1.1" }}>&nbsp;</div>
                    <div><span style={{ color: "#5c6370" }}>// MongoDB Schema</span></div>
                    <div><span style={{ color: "#c678dd" }}>const</span> <span style={{ color: "#e5c07b" }}>UserSchema</span> <span style={{ color: "#abb2bf" }}>= {`{`}</span></div>
                    <div style={{ paddingLeft: "12px" }}><span style={{ color: "#61afef" }}>name</span>: <span style={{ color: "#e5c07b" }}>String</span>,</div>
                    <div style={{ paddingLeft: "12px" }}><span style={{ color: "#61afef" }}>skills</span>: [<span style={{ color: "#e5c07b" }}>String</span>],</div>
                    <div><span style={{ color: "#abb2bf" }}>{`};`}</span></div>
                    <div style={{ lineHeight: "1.1" }}>&nbsp;</div>
                    <div><span style={{ color: "#5c6370" }}>// React Component</span></div>
                    <div><span style={{ color: "#c678dd" }}>function</span> <span style={{ color: "#e5c07b" }}>App</span>() <span style={{ color: "#abb2bf" }}>{`{`}</span></div>
                    <div style={{ paddingLeft: "12px" }}><span style={{ color: "#c678dd" }}>return</span> &lt;<span style={{ color: "#e06c75" }}>Dashboard</span> /&gt;;</div>
                    <div><span style={{ color: "#abb2bf" }}>{`}`}</span><span className="code-cursor">▋</span></div>
                  </div>
                </div>

                {/* Status Bar */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(90deg, #00D4FF 0%, #0099BB 55%, #0066AA 100%)",
                    padding: "3px 12px",
                    fontSize: "8px",
                    color: "rgba(255,255,255,0.92)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    letterSpacing: "0.05em",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  <span>⬡ MERN Stack Developer</span>
                  <span>Node · MongoDB · React</span>
                </div>

                {/* Corner glow */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at top right, rgba(0,212,255,0.08), transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Decorative offset border */}
              <div
                className="absolute -bottom-5 -right-5 w-full h-full rounded-2xl -z-10"
                style={{ border: "2px solid rgba(0,153,187,0.2)" }}
              />
              {/* Accent corner chip */}
              <div
                className="absolute -top-5 -left-5 w-20 h-20 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(0,212,255,0.15), transparent)",
                  border: "1px solid rgba(0,212,255,0.22)",
                }}
              />

              {/* Floating MERN badges */}
              <div
                className="absolute -right-4 top-8 px-2 py-1 rounded-md"
                style={{
                  background: "rgba(0,212,255,0.12)",
                  border: "1px solid rgba(0,212,255,0.35)",
                  fontSize: "8px",
                  color: "#00D4FF",
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 600,
                }}
              >
                React
              </div>
              <div
                className="absolute -left-4 bottom-14 px-2 py-1 rounded-md"
                style={{
                  background: "rgba(52,211,153,0.12)",
                  border: "1px solid rgba(52,211,153,0.35)",
                  fontSize: "8px",
                  color: "#34d399",
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 600,
                }}
              >
                MongoDB
              </div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #ffffff, #94a3b8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "1.25rem",
              }}
            >
              Full-Stack Developer &amp; Problem Solver
            </h3>
            <p className="text-slate-400 leading-relaxed">
              I am a passionate{" "}
              <span className="text-cyan-400">MERN Stack Developer</span> who
              loves building real-world, full-stack applications. With hands-on
              experience in{" "}
              <span className="text-cyan-400">
                React, Node.js, MongoDB, and Express
              </span>
              , I focus on writing clean, scalable code and delivering seamless
              user experiences. I'm driven by turning ideas into functional
              products.
            </p>
          </motion.div>
        </div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Projects Heading */}
          <div className="mb-10">
            <h3
              style={{
                fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                fontWeight: 800,
                color: "#fff",
                display: "inline-block",
                position: "relative",
                paddingBottom: "10px",
              }}
            >
              Featured Projects
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "50%",
                  height: "3px",
                  borderRadius: "2px",
                  background: "linear-gradient(90deg, #06b6d4, transparent)",
                }}
              />
            </h3>
            <p style={{ color: "#475569", fontSize: "0.82rem", marginTop: "12px" }}>
              Click any card to explore the project in detail.
            </p>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                onClick={() => setSelectedProject(project)}
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(6,182,212,0.12)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  padding: "0",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  cursor: "pointer",
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 50px rgba(6,182,212,0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(6,182,212,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(6,182,212,0.12)";
                }}
              >
                {/* Gradient Top Border */}
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "3px",
                    background: project.topBorder,
                    borderRadius: "16px 16px 0 0",
                  }}
                />

                {/* Card Body */}
                <div style={{ padding: "24px 22px 20px" }}>
                  {/* Title & Tag Row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h4
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1.3,
                      }}
                    >
                      {project.emoji} {project.title}
                    </h4>
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: "10px",
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: "999px",
                        background: project.tagColor,
                        border: `1px solid ${project.tagBorder}`,
                        color: project.tagText,
                        whiteSpace: "nowrap",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {project.tag}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className="text-slate-400 leading-relaxed mb-5"
                    style={{ fontSize: "0.82rem" }}
                  >
                    {project.description}
                  </p>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: "10px",
                          fontWeight: 500,
                          padding: "3px 9px",
                          borderRadius: "6px",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#94a3b8",
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", background: "rgba(6,182,212,0.1)", marginBottom: "16px" }} />

                  {/* Footer Links */}
                  <div className="flex items-center gap-3">
                    {project.link && project.link !== "#" ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
                        style={{ fontSize: "0.82rem", fontWeight: 600 }}
                      >
                        View Project
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span
                        className="flex items-center gap-1.5"
                        style={{ fontSize: "0.82rem", fontWeight: 600, color: "#475569" }}
                      >
                        Click to explore
                      </span>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1.5 transition-colors"
                        style={{ fontSize: "0.82rem", fontWeight: 600, color: "#64748b", textDecoration: "none" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#64748b"; }}
                      >
                        <Github className="w-3.5 h-3.5" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
