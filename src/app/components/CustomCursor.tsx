import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Touch devices — skip
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.11;
      ringY += (mouseY - ringY) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const expand = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width = "52px";
      ringRef.current.style.height = "52px";
      ringRef.current.style.borderColor = "rgba(6,182,212,0.7)";
      ringRef.current.style.opacity = "0.65";
    };
    const shrink = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width = "32px";
      ringRef.current.style.height = "32px";
      ringRef.current.style.borderColor = "rgba(6,182,212,0.45)";
      ringRef.current.style.opacity = "0.35";
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(loop);

    const attach = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea").forEach(el => {
        el.addEventListener("mouseenter", expand);
        el.addEventListener("mouseleave", shrink);
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: "50%",
          background: "#06b6d4",
          pointerEvents: "none",
          zIndex: 10001,
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(6,182,212,0.45)",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: 0.35,
          transition: "width 0.22s ease, height 0.22s ease, opacity 0.22s ease, border-color 0.22s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
