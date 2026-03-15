import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

const contactDetails = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "navneet-pratap-961519300",
    href: "https://www.linkedin.com/in/navneet-pratap-961519300",
    color: "#0ea5e9",
    display: "linkedin.com/in/navneet-pratap-961519300",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Gorakhpur, Uttar Pradesh, India",
    href: "#",
    color: "#06b6d4",
    display: "Gorakhpur, UP, India",
  },
  {
    icon: Mail,
    label: "Email",
    value: "navneetpratap@email.com",
    href: "mailto:navneetpratap@email.com",
    color: "#8b5cf6",
    display: "navneetpratap@email.com",
  },
];

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-darker py-24 relative overflow-hidden">
      {/* Top line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, #06b6d4, transparent)",
        }}
      />
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #06b6d4, transparent)",
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
            Get In Touch
          </p>
          <h2
            className="section-title"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Contact Me
          </h2>
          <p className="text-slate-400 mt-6 max-w-lg mx-auto text-sm leading-relaxed">
            I'm always open to discussing new opportunities, interesting projects, or just a friendly chat about tech!
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1"
          >
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "0.5rem",
              }}
            >
              Let's Connect!
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Whether you're looking for a passionate developer to join your team, have a project in mind, or just want to network — feel free to reach out!
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-10">
              {contactDetails.map((contact, i) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${contact.color}15`,
                      border: `1px solid ${contact.color}30`,
                    }}
                  >
                    <contact.icon className="w-5 h-5" style={{ color: contact.color }} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">{contact.label}</p>
                    <p
                      className="text-slate-200 text-sm break-all"
                      style={{ fontWeight: 500 }}
                    >
                      {contact.display}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* LinkedIn CTA */}
            <motion.a
              href="https://www.linkedin.com/in/navneet-pratap-961519300"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="glow-btn px-6 py-3 rounded-xl text-white flex items-center gap-2 w-fit"
            >
              <Linkedin className="w-5 h-5" />
              Connect on LinkedIn
            </motion.a>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1"
          >
            <div
              className="cert-card glass-card rounded-2xl p-8 relative"
            >
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-5 h-5 text-cyan-500" />
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  Send a Message
                </h3>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-cyan-500 mb-4" />
                  <h4
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Message Sent!
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Thanks for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-slate-400 text-xs mb-2 block" style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all duration-300 focus:border-cyan-500/50"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs mb-2 block" style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. john@email.com"
                      className="w-full px-4 py-3 rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs mb-2 block" style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Message
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project or just say hi!"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all duration-300 resize-none"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glow-btn w-full py-3 rounded-xl text-white flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
