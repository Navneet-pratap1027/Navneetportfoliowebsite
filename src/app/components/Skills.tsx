import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const skillCategories = [
  {
    category: "Frontend Development",
    color: "#06b6d4",
    skills: [
      { name: "HTML5 & CSS3", level: 85 },
      { name: "JavaScript (ES6+)", level: 75 },
      { name: "React.js", level: 80 },
      { name: "Responsive Design", level: 82 },
    ],
  },
  {
    category: "Backend & Database",
    color: "#3b82f6",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 62 },
      { name: "MongoDB", level: 75 },
      { name: "Mongoose", level: 70 },
      { name: "REST APIs", level: 72 },
      { name: "JWT Authentication", level: 72 },
      { name: "Cloudinary", level: 68 },
      { name: "Razorpay API", level: 60 },
      { name: "Multer", level: 65 },
    ],
    splitColumns: true,
  },
  {
    category: "Python & ML",
    color: "#8b5cf6",
    skills: [
      { name: "Python", level: 70 },
      { name: "Machine Learning", level: 55 },
      { name: "Data Analysis", level: 60 },
      { name: "NumPy / Pandas", level: 58 },
    ],
  },
  {
    category: "Tools & Others",
    color: "#f59e0b",
    skills: [
      { name: "Git & GitHub", level: 75 },
      { name: "Full-Stack Dev", level: 72 },
      { name: "VS Code", level: 90 },
      { name: "Problem Solving", level: 78 },
    ],
  },
];

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "JavaScript", icon: "🟨" },
  { name: "HTML5", icon: "🌐" },
  { name: "CSS3", icon: "🎨" },
  { name: "Node.js", icon: "🟢" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Python", icon: "🐍" },
  { name: "Git", icon: "🔧" },
  { name: "Express", icon: "⚡" },
  { name: "ML", icon: "🤖" },
];

function SkillBar({
  name,
  level,
  color,
  delay,
  inView,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-300 text-sm">{name}</span>
        <span className="text-xs" style={{ color }}>
          {level}%
        </span>
      </div>
      <div
        className="w-full h-1.5 rounded-full"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
              animation: "shimmer 2s infinite",
              backgroundSize: "200% 100%",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-dark py-24 relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, #06b6d4, transparent)",
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
            What I Know
          </p>
          <h2
            className="section-title"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Skills & Expertise
          </h2>
        </motion.div>

        {/* Tech Stack Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.1, y: -3 }}
              className="tag px-4 py-2 rounded-full text-sm flex items-center gap-2 cursor-default"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <span>{tech.icon}</span>
              {tech.name}
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Bars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + ci * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-1 h-6 rounded-full"
                  style={{ background: cat.color }}
                />
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: cat.color,
                  }}
                >
                  {cat.category}
                </h3>
              </div>
              {(cat as any).splitColumns ? (
                <div className="grid grid-cols-2 gap-x-6">
                  {/* Left column: first 4 */}
                  <div>
                    {cat.skills.slice(0, 4).map((skill, si) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={cat.color}
                        delay={0.4 + ci * 0.1 + si * 0.1}
                        inView={inView}
                      />
                    ))}
                  </div>
                  {/* Right column: remaining */}
                  <div>
                    {cat.skills.slice(4).map((skill, si) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={cat.color}
                        delay={0.4 + ci * 0.1 + (si + 4) * 0.1}
                        inView={inView}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={cat.color}
                    delay={0.4 + ci * 0.1 + si * 0.1}
                    inView={inView}
                  />
                ))
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}