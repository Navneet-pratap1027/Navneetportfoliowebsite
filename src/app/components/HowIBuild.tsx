import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "UNDERSTAND",
    desc: "Break down the problem, study requirements, and ask the right questions before writing a single line of code.",
    icon: "🔍",
    color: "#06b6d4",
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Plan the system architecture, database schema, API contracts, and user flow — on paper before in the editor.",
    icon: "📐",
    color: "#3b82f6",
  },
  {
    num: "03",
    title: "DEVELOP",
    desc: "Build frontend, backend, and APIs with clean, scalable code. Component-first on the client, service-layer on the server.",
    icon: "⚙️",
    color: "#8b5cf6",
  },
  {
    num: "04",
    title: "TEST",
    desc: "Debug edge cases, validate API responses, test auth flows, and stress-test any payments or uploads.",
    icon: "🧪",
    color: "#f59e0b",
  },
  {
    num: "05",
    title: "DEPLOY",
    desc: "Ship to production via CI/CD, monitor logs, fix post-deploy issues, and continuously iterate.",
    icon: "🚀",
    color: "#22c55e",
  },
];

export function HowIBuild() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-i-build" className="section-darker py-24 relative overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-cyan-500 text-sm tracking-widest uppercase mb-3">My Process</p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            How I Build
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "rgba(255,255,255,0.06)", transform: "translateX(-50%)" }}
          />
          {/* Animated progress line */}
          <motion.div
            className="absolute left-1/2 top-0 w-px hidden md:block origin-top"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
            style={{
              height: "100%",
              background: "linear-gradient(180deg, #06b6d4, #3b82f6, #8b5cf6, #f59e0b, #22c55e)",
              transform: "translateX(-50%)",
            }}
          />

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.18 }}
                className="relative flex items-center mb-16 last:mb-0"
                style={{ justifyContent: isLeft ? "flex-start" : "flex-end" }}
              >
                {/* Card */}
                <div
                  style={{
                    width: "calc(50% - 48px)",
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid rgba(255,255,255,0.08)`,
                    borderRadius: "16px",
                    padding: "24px",
                    position: "relative",
                    transition: "border-color 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${step.color}40`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Top border accent */}
                  <div
                    style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                      background: `linear-gradient(90deg, ${step.color}, transparent)`,
                      borderRadius: "16px 16px 0 0",
                    }}
                  />
                  <div className="flex items-start gap-4">
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: "12px", flexShrink: 0,
                        background: `${step.color}12`,
                        border: `1px solid ${step.color}30`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "20px",
                      }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          style={{
                            fontSize: "10px", fontFamily: "JetBrains Mono, monospace",
                            color: step.color, fontWeight: 700, letterSpacing: "0.1em",
                          }}
                        >
                          {step.num}
                        </span>
                        <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.05em" }}>
                          {step.title}
                        </h3>
                      </div>
                      <p style={{ color: "#64748b", fontSize: "0.83rem", lineHeight: 1.7 }}>{step.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div
                  className="absolute left-1/2 hidden md:flex items-center justify-center"
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: `${step.color}18`,
                    border: `2px solid ${step.color}`,
                    boxShadow: `0 0 16px ${step.color}40`,
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    fontSize: "14px",
                  }}
                >
                  <span>{step.icon}</span>
                </div>

                {/* Mobile: always full width */}
                <style>{`
                  @media (max-width: 767px) {
                    .how-i-build-card { width: 100% !important; }
                  }
                `}</style>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
