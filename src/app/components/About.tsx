import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
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
  },
];

export function About({ aboutImage }: { aboutImage?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(6,182,212,0.12)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  padding: "0",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  cursor: "default",
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
                    top: 0,
                    left: 0,
                    right: 0,
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
                  <div
                    style={{
                      height: "1px",
                      background: "rgba(6,182,212,0.1)",
                      marginBottom: "16px",
                    }}
                  />

                  {/* View Project Link */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
                    style={{ fontSize: "0.82rem", fontWeight: 600 }}
                  >
                    View Project
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}