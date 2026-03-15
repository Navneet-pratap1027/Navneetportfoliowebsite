import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Award, ExternalLink, CheckCircle2, Star } from "lucide-react";

const certifications = [
  {
    title: "Front-End Developer Capstone",
    issuer: "Meta / Coursera",
    description:
      "Comprehensive capstone project demonstrating proficiency in front-end development using React, including building a full responsive web application with modern UI/UX principles.",
    skills: ["React.js", "JavaScript", "HTML/CSS", "UI/UX", "Responsive Design"],
    icon: "🎯",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
  },
  {
    title: "Full Stack Web Development",
    issuer: "Online Certification",
    description:
      "Mastered the complete MERN stack (MongoDB, Express.js, React, Node.js) covering both frontend and backend development, RESTful APIs, and database management.",
    skills: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs"],
    icon: "🚀",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
  },
];

export function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="section-dark py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #8b5cf6, transparent)",
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #8b5cf6, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 text-sm tracking-widest uppercase mb-3">
            Credentials
          </p>
          <h2
            className="section-title"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Certifications
          </h2>
        </motion.div>

        {/* Cert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="cert-card glass-card rounded-2xl p-8 relative overflow-hidden group"
            >
              {/* Top gradient border */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: cert.gradient }}
              />

              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top left, ${cert.color}08, transparent 70%)`,
                }}
              />

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{
                    background: `${cert.color}15`,
                    border: `1px solid ${cert.color}30`,
                  }}
                >
                  {cert.icon}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, si) => (
                    <Star
                      key={si}
                      className="w-3 h-3"
                      style={{ color: cert.color }}
                      fill={cert.color}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: cert.color }}
                />
                <span
                  className="text-xs"
                  style={{ color: cert.color, fontWeight: 600 }}
                >
                  {cert.issuer}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.75rem",
                  lineHeight: 1.3,
                }}
              >
                {cert.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {cert.description}
              </p>

              {/* Skills */}
              <div className="mb-6">
                <p
                  className="text-slate-400 text-xs mb-3"
                  style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
                >
                  Skills Covered
                </p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        background: `${cert.color}12`,
                        border: `1px solid ${cert.color}30`,
                        color: cert.color,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div
                className="pt-4 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" style={{ color: cert.color }} />
                  <span className="text-slate-500 text-xs">
                    Verified Certificate
                  </span>
                </div>
                <motion.button
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-1 text-xs"
                  style={{ color: cert.color }}
                >
                  View <ExternalLink className="w-3 h-3" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "2", label: "Certifications", color: "#06b6d4" },
            { value: "5+", label: "Technologies", color: "#3b82f6" },
            { value: "3+", label: "Projects Built", color: "#8b5cf6" },
            { value: "100%", label: "Dedication", color: "#f59e0b" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {stat.value}
              </div>
              <div className="text-slate-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
