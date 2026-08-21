import { useEffect } from "react";
import { motion } from "motion/react";

const FIRST = "NAVNEET".split("");
const LAST = "PRATAP".split("");

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2700);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#000000",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow behind letters */}
      <div
        style={{
          position: "absolute",
          width: "500px", height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(30px)",
        }}
      />

      {/* NAVNEET */}
      <div style={{ display: "flex", gap: "3px", lineHeight: 1 }}>
        {FIRST.map((l, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(3rem, 9vw, 6.5rem)",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "0.04em",
              display: "block",
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>

      {/* PRATAP */}
      <div style={{ display: "flex", gap: "3px", lineHeight: 1, marginBottom: "56px" }}>
        {LAST.map((l, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.8 + i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(3rem, 9vw, 6.5rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.04em",
              display: "block",
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>

      {/* Progress bar container */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1.5, duration: 0.3 }}
        style={{
          width: "200px", height: "2px",
          background: "rgba(255,255,255,0.07)",
          borderRadius: "999px",
          overflow: "hidden",
          transformOrigin: "left",
        }}
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ delay: 1.6, duration: 0.95, ease: "easeInOut" }}
          style={{
            height: "100%", width: "100%",
            background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
            borderRadius: "999px",
          }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.7, duration: 0.5 }}
        style={{
          color: "#ffffff",
          fontSize: "10px",
          fontFamily: "JetBrains Mono, monospace",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          marginTop: "16px",
        }}
      >
        Full Stack Developer
      </motion.p>
    </motion.div>
  );
}
