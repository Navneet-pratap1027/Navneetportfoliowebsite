import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ExternalLink, Download, ArrowRight } from "lucide-react";

export function ResumeCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="resume" className="section-darker py-24 relative overflow-hidden" ref={ref}>
      {/* Ambient glows */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-6 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-6 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ position: "relative" }}
        >
          {/* Animated gradient border wrapper */}
          <div
            style={{
              position: "relative",
              borderRadius: "24px",
              padding: "2px",
              background: "linear-gradient(135deg, rgba(6,182,212,0.6), rgba(59,130,246,0.4), rgba(139,92,246,0.5), rgba(6,182,212,0.3))",
              backgroundSize: "300% 300%",
              animation: "gradientShift 4s ease infinite",
            }}
          >
            <style>{`
              @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>

            {/* Inner card */}
            <div
              style={{
                background: "rgba(7,11,23,0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: "22px",
                padding: "56px 48px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Inner glow */}
              <div
                style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "60%", height: "60%",
                  borderRadius: "50%",
                  background: "radial-gradient(ellipse, rgba(6,182,212,0.05), transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div style={{ fontSize: "28px", marginBottom: "16px" }}>📄</div>
                <h2
                  style={{
                    fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                    fontWeight: 800,
                    color: "#fff",
                    marginBottom: "16px",
                    lineHeight: 1.2,
                  }}
                >
                  Let's build something{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    meaningful.
                  </span>
                </h2>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                    maxWidth: "480px",
                    margin: "0 auto 36px",
                  }}
                >
                  Explore my resume and learn more about my technical journey, skills, and the projects I've shipped.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* View Resume */}
                  <motion.a
                    href="https://github.com/Navneet-pratap1027"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2"
                    style={{
                      padding: "12px 28px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                      color: "#fff",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      boxShadow: "0 0 24px rgba(6,182,212,0.3)",
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    VIEW RESUME
                  </motion.a>

                  {/* Download Resume */}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2"
                    style={{
                      padding: "12px 28px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#94a3b8",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(6,182,212,0.4)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#06b6d4";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8";
                    }}
                  >
                    <Download className="w-4 h-4" />
                    DOWNLOAD RESUME
                  </motion.a>

                  {/* Contact shortcut */}
                  <motion.a
                    href="#contact"
                    onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                    whileHover={{ scale: 1.04 }}
                    className="inline-flex items-center gap-1.5"
                    style={{
                      color: "#475569",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    or reach out directly <ArrowRight className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
