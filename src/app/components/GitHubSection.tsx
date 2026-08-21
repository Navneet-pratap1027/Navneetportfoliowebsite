import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Github, ExternalLink, GitBranch, Star, GitCommit } from "lucide-react";

// Generate a deterministic-looking contribution grid (52 weeks × 7 days)
function generateGrid() {
  const cells: number[] = [];
  for (let i = 0; i < 52 * 7; i++) {
    const seed = Math.abs(Math.sin(i * 3.7 + 1.2) * Math.cos(i * 0.9 + 0.4));
    const weighted = seed < 0.35 ? 0 : seed < 0.55 ? 1 : seed < 0.72 ? 2 : seed < 0.87 ? 3 : 4;
    cells.push(weighted);
  }
  return cells;
}

const grid = generateGrid();

const levelColors = [
  "rgba(255,255,255,0.04)",  // 0 — empty
  "rgba(6,182,212,0.2)",     // 1 — low
  "rgba(6,182,212,0.4)",     // 2 — medium
  "rgba(6,182,212,0.65)",    // 3 — high
  "#06b6d4",                 // 4 — max
];

const stats = [
  { icon: GitBranch, label: "Repositories", value: "10+", color: "#06b6d4" },
  { icon: GitCommit, label: "Commits", value: "200+", color: "#8b5cf6" },
  { icon: Star, label: "Projects Built", value: "07+", color: "#f59e0b" },
  { icon: Github, label: "GitHub", value: "@Navneet", color: "#22c55e" },
];

export function GitHubSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="github" className="section-dark py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #06b6d4, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 text-sm tracking-widest uppercase mb-3">Open Source</p>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "0.04em",
            }}
          >
            CODE. BUILD. LEARN. REPEAT.
          </h2>
          <p style={{ color: "#475569", fontSize: "0.875rem", marginTop: "12px" }}>
            Building in public — every commit a lesson, every project a step forward.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                padding: "20px",
                textAlign: "center",
                transition: "border-color 0.3s, transform 0.3s",
              }}
              whileHover={{ y: -4 }}
            >
              <div
                style={{
                  width: 40, height: 40, borderRadius: "10px", margin: "0 auto 10px",
                  background: `${stat.color}12`,
                  border: `1px solid ${stat.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <stat.icon style={{ width: 18, height: 18, color: stat.color }} />
              </div>
              <p style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 800, marginBottom: "2px" }}>{stat.value}</p>
              <p style={{ color: "#475569", fontSize: "11px" }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contribution Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "20px",
            padding: "28px 32px",
            marginBottom: "28px",
            overflow: "hidden",
          }}
        >
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <p style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 600 }}>
              Contribution Activity
            </p>
            <div className="flex items-center gap-2">
              <span style={{ color: "#334155", fontSize: "10px" }}>Less</span>
              {levelColors.map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "2px", background: c }} />
              ))}
              <span style={{ color: "#334155", fontSize: "10px" }}>More</span>
            </div>
          </div>

          {/* Grid — 52 columns × 7 rows */}
          <div style={{ overflowX: "auto", paddingBottom: "4px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(52, 1fr)`,
                gridTemplateRows: `repeat(7, 1fr)`,
                gap: "3px",
                minWidth: "660px",
              }}
            >
              {grid.map((level, idx) => {
                const week = Math.floor(idx / 7);
                const day = idx % 7;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.35 + (week * 0.01 + day * 0.005), duration: 0.2 }}
                    style={{
                      gridColumn: week + 1,
                      gridRow: day + 1,
                      width: "100%",
                      aspectRatio: "1",
                      borderRadius: "2px",
                      background: levelColors[level],
                      transition: "background 0.2s",
                      cursor: "default",
                    }}
                    title={level > 0 ? `${level} contribution${level > 1 ? "s" : ""}` : "No contributions"}
                    whileHover={{ scale: 1.6 }}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center"
        >
          <a
            href="https://github.com/Navneet-pratap1027"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-all"
            style={{
              padding: "12px 28px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#94a3b8",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(6,182,212,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(6,182,212,0.35)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#06b6d4";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8";
            }}
          >
            <Github className="w-4 h-4" />
            VIEW GITHUB PROFILE
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
