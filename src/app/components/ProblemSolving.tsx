import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const codingProfiles = [
  {
    emoji: "🟡",
    platform: "LeetCode",
    username: "navneetpratap_2710",
    link: "https://leetcode.com/u/navneetpratap_2710/",
    accentColor: "#FFA116",
    bgColor: "rgba(255,161,22,0.08)",
  },
  {
    emoji: "🟢",
    platform: "GeeksforGeeks",
    username: "navneetpratap2710",
    link: "https://www.geeksforgeeks.org/profile/navneetpratap2710",
    accentColor: "#2F8D46",
    bgColor: "rgba(47,141,70,0.08)",
  },
];

export function ProblemSolving() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="problem-solving"
      className="section-dark py-24 relative overflow-hidden"
    >
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
            Sharpening the Craft
          </p>
          <h2
            className="section-title"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Problem Solving
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT — DSA Journey Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(6,182,212,0.18)",
              borderRadius: "18px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Top gradient border */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
                borderRadius: "18px 18px 0 0",
              }}
            />

            <div style={{ padding: "32px 28px 28px" }}>
              {/* Header Row */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                    background: "rgba(6,182,212,0.1)",
                    border: "1px solid rgba(6,182,212,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    flexShrink: 0,
                  }}
                >
                  💻
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      DSA with C++
                    </h3>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: "999px",
                        background: "rgba(34,197,94,0.15)",
                        border: "1px solid rgba(34,197,94,0.4)",
                        color: "#4ade80",
                        letterSpacing: "0.03em",
                      }}
                    >
                      In Progress
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#475569",
                      marginTop: "3px",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    github.com/Navneet-pratap1027
                  </p>
                </div>
              </div>

              {/* Description */}
              <p
                className="text-slate-400 leading-relaxed mb-8"
                style={{ fontSize: "0.88rem" }}
              >
                Actively solving Data Structures &amp; Algorithms problems using
                C++, building strong foundations in{" "}
                <span className="text-cyan-400">
                  arrays, recursion, trees, graphs
                </span>{" "}
                and{" "}
                <span className="text-cyan-400">dynamic programming</span>.
              </p>

              {/* Topic Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Arrays", "Recursion", "Trees", "Graphs", "DP", "Sorting", "Hashing"].map(
                  (topic) => (
                    <span
                      key={topic}
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        padding: "3px 10px",
                        borderRadius: "6px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#94a3b8",
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {topic}
                    </span>
                  )
                )}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(6,182,212,0.1)",
                  marginBottom: "20px",
                }}
              />

              {/* GitHub Button */}
              <a
                href="https://github.com/Navneet-pratap1027/CPP-Journey-DSA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-all"
                style={{
                  background: "rgba(6,182,212,0.1)",
                  border: "1px solid rgba(6,182,212,0.35)",
                  color: "#06b6d4",
                  borderRadius: "8px",
                  padding: "9px 18px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(6,182,212,0.18)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(6,182,212,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(6,182,212,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(6,182,212,0.35)";
                }}
              >
                <Github className="w-4 h-4" />
                View DSA Repo →
              </a>
            </div>
          </motion.div>

          {/* RIGHT — Coding Profiles Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(6,182,212,0.18)",
              borderRadius: "18px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Top gradient border */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #FFA116, #2F8D46)",
                borderRadius: "18px 18px 0 0",
              }}
            />

            <div style={{ padding: "32px 28px 28px" }}>
              {/* Heading */}
              <div className="mb-8">
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "4px",
                  }}
                >
                  Coding Profiles
                </h3>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#475569",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  Consistent practice across platforms
                </p>
              </div>

              {/* Profile Rows */}
              <div className="flex flex-col gap-5">
                {codingProfiles.map((profile, i) => (
                  <motion.div
                    key={profile.platform}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      background: profile.bgColor,
                      borderRadius: "12px",
                      padding: "16px 18px",
                      borderLeft: `3px solid ${profile.accentColor}`,
                      border: `1px solid rgba(255,255,255,0.06)`,
                      borderLeftWidth: "3px",
                      borderLeftColor: profile.accentColor,
                      borderLeftStyle: "solid",
                    }}
                  >
                    {/* Emoji avatar */}
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "10px",
                        background: `${profile.accentColor}18`,
                        border: `1px solid ${profile.accentColor}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        flexShrink: 0,
                      }}
                    >
                      {profile.emoji}
                    </div>

                    {/* Platform info */}
                    <div className="flex-1 min-w-0">
                      <p
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          color: "#fff",
                          marginBottom: "2px",
                        }}
                      >
                        {profile.platform}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          fontFamily: "JetBrains Mono, monospace",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        @{profile.username}
                      </p>
                    </div>

                    {/* Visit button */}
                    <a
                      href={profile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 transition-colors text-cyan-400 hover:text-cyan-300"
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        textDecoration: "none",
                        flexShrink: 0,
                        padding: "6px 12px",
                        borderRadius: "7px",
                        background: "rgba(6,182,212,0.08)",
                        border: "1px solid rgba(6,182,212,0.25)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      View Profile
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Bottom motivational note */}
              <div
                style={{
                  marginTop: "28px",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  background: "rgba(6,182,212,0.04)",
                  border: "1px solid rgba(6,182,212,0.12)",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    color: "#475569",
                    fontFamily: "JetBrains Mono, monospace",
                    lineHeight: 1.6,
                  }}
                >
                  <span className="text-cyan-500">▸</span> Solving problems
                  daily to strengthen logical thinking and interview readiness.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
