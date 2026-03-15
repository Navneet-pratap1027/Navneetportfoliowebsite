import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Information Technology",
    institution: "Rajkiya Engineering College Azamgarh",
    period: "November 2022 – December 2026",
    location: "Azamgarh, Uttar Pradesh",
    status: "Ongoing",
    description:
      "Pursuing B.Tech in Information Technology with focus on software development, data structures, algorithms, and modern web technologies.",
    courses: [
      "Data Structures & Algorithms",
      "Web Technologies",
      "Database Management",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
    icon: GraduationCap,
    color: "#06b6d4",
  },
];

export function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-darker py-24 relative overflow-hidden">
      {/* Top line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, #3b82f6, transparent)",
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
            Academic Journey
          </p>
          <h2
            className="section-title"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Education
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
            style={{
              background:
                "linear-gradient(180deg, #06b6d4, #3b82f6, transparent)",
            }}
          />

          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.2 }}
              className="relative md:pl-24 mb-12"
            >
              {/* Timeline Dot */}
              <div
                className="absolute left-4 top-8 w-8 h-8 rounded-full hidden md:flex items-center justify-center z-10"
                style={{
                  background: `linear-gradient(135deg, ${edu.color}, #3b82f6)`,
                  boxShadow: `0 0 20px ${edu.color}50`,
                }}
              >
                <edu.icon className="w-4 h-4 text-white" />
              </div>

              {/* Card */}
              <div
                className="cert-card glass-card rounded-2xl p-8 relative"
                style={{ borderColor: `${edu.color}30` }}
              >
                {/* Top gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${edu.color}, #3b82f6, #8b5cf6)`,
                  }}
                />

                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    {/* Badge */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          background: `${edu.color}15`,
                          border: `1px solid ${edu.color}40`,
                          color: edu.color,
                        }}
                      >
                        {edu.status}
                      </span>
                      <span
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          background: "rgba(139,92,246,0.15)",
                          border: "1px solid rgba(139,92,246,0.4)",
                          color: "#a78bfa",
                        }}
                      >
                        {edu.field}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: edu.color,
                        marginBottom: "1rem",
                      }}
                    >
                      {edu.institution}
                    </h4>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-cyan-500" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-cyan-500" />
                        {edu.location}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {edu.description}
                    </p>

                    {/* Courses */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-cyan-500" />
                        <span
                          className="text-slate-300 text-sm"
                          style={{ fontWeight: 600 }}
                        >
                          Key Subjects
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course) => (
                          <span
                            key={course}
                            className="tag px-3 py-1 rounded-lg text-xs"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* GPA Visual */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-32 h-32 rounded-2xl flex flex-col items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${edu.color}10, #3b82f610)`,
                        border: `2px solid ${edu.color}30`,
                      }}
                    >
                      <edu.icon
                        className="w-10 h-10 mb-2"
                        style={{ color: edu.color }}
                      />
                      <span
                        className="text-xs text-center"
                        style={{ color: "#94a3b8" }}
                      >
                        B.Tech IT
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: edu.color, fontWeight: 600 }}
                      >
                        2022–2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
