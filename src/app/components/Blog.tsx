import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import {
  Search, ExternalLink, Github, Clock,
  ArrowRight, X, ChevronLeft, Star, BookOpen,
  Info, CheckCircle, AlertTriangle,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; id: string; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "callout"; variant: "info" | "success" | "warning"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

interface TocItem { id: string; title: string }

interface Article {
  id: number;
  featured?: boolean;
  tag: string;
  tagColor: string;
  topBorder: string;
  coverGradient: string;
  coverIcon: string;
  coverCode: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  tags: string[];
  github: string;
  liveLink?: string;
  toc: TocItem[];
  content: ContentBlock[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const articles: Article[] = [
  {
    id: 1,
    featured: true,
    tag: "Full Stack",
    tagColor: "#06b6d4",
    topBorder: "linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)",
    coverGradient: "linear-gradient(135deg, #0c1929 0%, #0f2844 60%, #0a1628 100%)",
    coverIcon: "🎓",
    coverCode: `const course = await Course.create({
  title, description, price,
  thumbnail: cloudinaryUrl,
  instructor: req.user._id,
});`,
    title: "How I Built StudyNotion — Architecture Decisions & Lessons Learned",
    excerpt: "A deep dive into the technical choices behind a full-stack Ed-Tech platform — from database schema design to Razorpay integration, OTP authentication, and cloud deployment strategy.",
    readTime: "8 min read",
    date: "Coming Soon",
    tags: ["MERN", "React", "Node.js", "Architecture"],
    github: "https://github.com/Navneet-pratap1027",
    liveLink: "https://study-notion-frontend-kappa-seven.vercel.app/",
    toc: [
      { id: "overview", title: "Project Overview" },
      { id: "architecture", title: "Architecture Decisions" },
      { id: "auth", title: "OTP Authentication" },
      { id: "payments", title: "Razorpay Integration" },
      { id: "lessons", title: "Lessons Learned" },
    ],
    content: [
      { type: "paragraph", text: "StudyNotion started as a desire to move beyond tutorial CRUD apps and tackle real complexity — multi-role users, payment flows, course management, and cloud media uploads at scale." },
      { type: "heading", id: "architecture", text: "Architecture Decisions" },
      { type: "paragraph", text: "I went with a controller-service-route pattern rather than fat controllers. This kept business logic isolated and testable, and prevented route files from becoming unmaintainable as features grew." },
      { type: "code", language: "javascript", code: `const createCourse = asyncHandler(async (req, res) => {
  const thumbnail = await uploadToCloudinary(req.file);
  const course = await CourseService.create({
    ...req.body,
    thumbnail: thumbnail.secure_url,
    instructor: req.user._id,
  });
  res.status(201).json({ success: true, data: course });
});` },
      { type: "heading", id: "auth", text: "OTP Authentication Flow" },
      { type: "callout", variant: "info", text: "Key insight: Store OTPs as bcrypt hashes, not plaintext. Even temporary tokens sitting in your DB for 10 minutes should be hashed." },
      { type: "heading", id: "payments", text: "Razorpay Integration" },
      { type: "paragraph", text: "Server-side order creation → client-side checkout → webhook-based enrollment confirmation. The HMAC signature verification step was critical to prevent payment tampering." },
      { type: "heading", id: "lessons", text: "Lessons Learned" },
      { type: "list", items: [
        "Validate on both client and server — client validation is UX, server validation is security",
        "Mongoose populate() causes N+1 queries — learn aggregation pipelines early",
        "Environment variables in Vercel need to be configured per deployment environment",
        "Always test payment webhooks locally using ngrok or similar tunnels",
      ]},
      { type: "quote", text: "The best way to understand architecture is to build something real, break it, and trace exactly why it broke." },
    ],
  },
  {
    id: 2,
    tag: "Backend",
    tagColor: "#8b5cf6",
    topBorder: "linear-gradient(90deg, #8b5cf6, #ec4899)",
    coverGradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
    coverIcon: "🔐",
    coverCode: `const token = jwt.sign(
  { _id: user._id, role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);`,
    title: "Why I Chose JWT Over Sessions for MetaTube Authentication",
    excerpt: "Breaking down the stateless vs stateful auth debate with real code — why JWTs made more sense for a distributed video backend designed to scale.",
    readTime: "6 min read",
    date: "Coming Soon",
    tags: ["Backend", "JWT", "Node.js", "Security"],
    github: "https://github.com/Navneet-pratap1027/Backend_Project",
    toc: [
      { id: "problem", title: "The Problem" },
      { id: "comparison", title: "Sessions vs JWT" },
      { id: "implementation", title: "Implementation" },
      { id: "refresh", title: "Refresh Token Strategy" },
    ],
    content: [
      { type: "paragraph", text: "When building MetaTube's auth system, I spent time deciding between session-based and token-based auth. Here's the full reasoning behind the choice." },
      { type: "heading", id: "comparison", text: "Sessions vs JWT — The Core Tradeoff" },
      { type: "paragraph", text: "Sessions require server-side storage and sticky sessions in distributed environments. JWTs are stateless — any server can verify without a DB lookup. For a horizontally scalable backend, JWT was the clear choice." },
      { type: "callout", variant: "warning", text: "JWT doesn't mean skipping the database entirely. Refresh token rotation still requires persisting records to support revocation." },
      { type: "heading", id: "implementation", text: "Implementation" },
      { type: "code", language: "javascript", code: `const verifyJWT = asyncHandler(async (req, _, next) => {
  const token = req.cookies?.accessToken
    || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new ApiError(401, "Unauthorized");
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.user = await User.findById(decoded?._id).select("-password");
  next();
});` },
      { type: "heading", id: "refresh", text: "Refresh Token Strategy" },
      { type: "list", items: [
        "Access tokens expire in 1 day (short-lived for security)",
        "Refresh tokens expire in 10 days, stored in httpOnly cookies",
        "Token rotation invalidates old refresh tokens on each use",
        "Logout endpoint clears both tokens and removes the DB record",
      ]},
    ],
  },
  {
    id: 3,
    tag: "Problem Solving",
    tagColor: "#f59e0b",
    topBorder: "linear-gradient(90deg, #f59e0b, #ef4444)",
    coverGradient: "linear-gradient(135deg, #1a0f00 0%, #2d1800 60%, #1a0a00 100%)",
    coverIcon: "🧠",
    coverCode: `void inorder(TreeNode* root) {
  if (!root) return;
  inorder(root->left);
  cout << root->val;
  inorder(root->right);
}`,
    title: "My DSA Journey with C++ — Week by Week Progress",
    excerpt: "An honest log of grinding arrays, recursion, trees, and graphs — what clicked, what didn't, and patterns I keep returning to on LeetCode and GFG.",
    readTime: "5 min read",
    date: "Coming Soon",
    tags: ["DSA", "C++", "Algorithms", "Problem Solving"],
    github: "https://github.com/Navneet-pratap1027/CPP-Journey-DSA",
    toc: [
      { id: "why", title: "Why C++ for DSA?" },
      { id: "phase1", title: "Phase 1: Arrays" },
      { id: "phase2", title: "Phase 2: Trees" },
      { id: "patterns", title: "Patterns That Clicked" },
    ],
    content: [
      { type: "paragraph", text: "Starting DSA felt overwhelming — every resource recommends a different path. I committed to C++ for its STL, raw speed, and because it forces you to actually think about memory." },
      { type: "heading", id: "why", text: "Why C++ for DSA?" },
      { type: "list", items: [
        "STL provides production-grade data structures out of the box",
        "Faster than Python for time-constrained competitive problems",
        "Forces you to understand pointers and memory layout",
        "Most interview-ready reference solutions online use C++",
      ]},
      { type: "heading", id: "phase1", text: "Phase 1: Arrays & Strings" },
      { type: "callout", variant: "success", text: "Two-pointer and sliding window patterns solve roughly 40% of array problems. Master these first before anything else." },
      { type: "heading", id: "phase2", text: "Phase 2: Recursion & Trees" },
      { type: "code", language: "cpp", code: `int height(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(height(root->left), height(root->right));
}` },
      { type: "heading", id: "patterns", text: "Patterns That Clicked" },
      { type: "quote", text: "Don't memorize solutions. Recognize patterns. Every hard problem is a combination of simpler patterns you've already seen." },
    ],
  },
  {
    id: 4,
    tag: "Architecture",
    tagColor: "#22c55e",
    topBorder: "linear-gradient(90deg, #22c55e, #06b6d4)",
    coverGradient: "linear-gradient(135deg, #001a0f 0%, #002d1a 60%, #001a0f 100%)",
    coverIcon: "🏗️",
    coverCode: `router.use('/hotels',
  authMiddleware,
  rateLimit({ max: 100 }),
  hotelRoutes
);`,
    title: "Designing a Scalable MERN Backend — Lessons from HotelHub",
    excerpt: "How I structured routes, controllers, and middleware for a hotel booking platform with geolocation, map integrations, and host management flows.",
    readTime: "7 min read",
    date: "Coming Soon",
    tags: ["MERN", "Architecture", "MongoDB", "System Design"],
    github: "https://github.com/Navneet-pratap1027",
    liveLink: "https://hotel-hub-platform.vercel.app/",
    toc: [
      { id: "structure", title: "Project Structure" },
      { id: "middleware", title: "Middleware Strategy" },
      { id: "geo", title: "Geolocation Queries" },
      { id: "lessons", title: "What I'd Do Differently" },
    ],
    content: [
      { type: "paragraph", text: "HotelHub forced me to think about data modeling differently. Geolocation queries, nested listing management, and multi-image uploads required careful upfront schema planning." },
      { type: "heading", id: "structure", text: "Project Structure" },
      { type: "code", language: "text", code: `src/
├── config/       # DB, cloudinary
├── controllers/  # Thin route handlers
├── middleware/   # Auth, rate limit, errors
├── models/       # Mongoose schemas
├── routes/       # Express routers
├── services/     # Business logic layer
└── utils/        # asyncHandler, ApiError` },
      { type: "heading", id: "middleware", text: "Middleware Strategy" },
      { type: "callout", variant: "info", text: "A consistent error-handling middleware saved hours of debugging. Every async route wraps with asyncHandler — no scattered try/catch blocks." },
      { type: "heading", id: "geo", text: "Geolocation Queries" },
      { type: "paragraph", text: "MongoDB's 2dsphere index enables efficient proximity queries. Finding hotels within a radius uses $geoWithin — far faster than client-side distance calculation." },
      { type: "heading", id: "lessons", text: "What I'd Do Differently" },
      { type: "list", items: [
        "Add Redis caching for popular location queries from day one",
        "Use cursor-based pagination instead of offset for large datasets",
        "Add API versioning (/v1/) before first users touch the endpoints",
        "Use BullMQ for email and notification delivery from the start",
      ]},
    ],
  },
  {
    id: 5,
    tag: "DevOps",
    tagColor: "#3b82f6",
    topBorder: "linear-gradient(90deg, #3b82f6, #06b6d4)",
    coverGradient: "linear-gradient(135deg, #001429 0%, #001f3f 60%, #000d24 100%)",
    coverIcon: "🐳",
    coverCode: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "server.js"]`,
    title: "Debugging My Docker Deployment — CI/CD with GitHub Actions",
    excerpt: "A real debugging story: tracing why the InvoicerPro container crashed in production and how GitHub Actions finally got the pipeline right.",
    readTime: "6 min read",
    date: "Coming Soon",
    tags: ["DevOps", "Docker", "CI/CD", "GitHub Actions"],
    github: "https://github.com/Navneet-pratap1027/Invoicer_Pro",
    liveLink: "https://invoicer-pro-nine.vercel.app",
    toc: [
      { id: "crash", title: "The Crash" },
      { id: "debug", title: "Debugging Process" },
      { id: "pipeline", title: "GitHub Actions Pipeline" },
      { id: "takeaways", title: "Key Takeaways" },
    ],
    content: [
      { type: "paragraph", text: "The InvoicerPro container worked perfectly locally. In production on Render it crashed within 30 seconds. This is the story of 4 hours of debugging and what I learned from it." },
      { type: "heading", id: "crash", text: "The Crash" },
      { type: "callout", variant: "warning", text: "Error: 'Cannot find module' in production despite the module existing locally. A classic Docker build-context misconfiguration." },
      { type: "heading", id: "debug", text: "Debugging Process" },
      { type: "list", items: [
        "docker logs showed a module resolution error, not a runtime crash",
        ".dockerignore was accidentally excluding src/utils along with node_modules",
        "Fixed by being explicit — list what to exclude rather than broad glob patterns",
        "Added a health-check endpoint to detect future startup failures faster",
      ]},
      { type: "heading", id: "pipeline", text: "GitHub Actions Pipeline" },
      { type: "code", language: "yaml", code: `name: Deploy InvoicerPro
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: docker build -t invoicerpro .
      - run: docker run invoicerpro npm test
      - run: curl -X POST \${{ secrets.RENDER_DEPLOY_HOOK }}` },
      { type: "quote", text: "Docker doesn't lie. If it works locally but not in production, the difference is always in the environment — not the code." },
    ],
  },
  {
    id: 6,
    tag: "AI",
    tagColor: "#a855f7",
    topBorder: "linear-gradient(90deg, #a855f7, #ec4899)",
    coverGradient: "linear-gradient(135deg, #1a0020 0%, #2d0038 60%, #1a0020 100%)",
    coverIcon: "🤖",
    coverCode: `const analysis = await model
  .generateContent(prompt);
const gaps = parseSkillGaps(
  analysis.response.text()
);`,
    title: "Building BuildNext AI — GitHub Portfolio Analyzer with Gemini",
    excerpt: "How I used the Google Gemini API and GitHub REST API to build an AI career tool that scores portfolios, detects skill gaps, and generates roadmaps.",
    readTime: "9 min read",
    date: "Coming Soon",
    tags: ["AI", "Google Gemini", "React", "Node.js"],
    github: "https://github.com/Navneet-pratap1027/Buildnext-ai",
    liveLink: "https://buildnext-ai.vercel.app",
    toc: [
      { id: "concept", title: "The Concept" },
      { id: "github-api", title: "GitHub API" },
      { id: "gemini", title: "Gemini Prompting" },
      { id: "scoring", title: "Scoring Logic" },
    ],
    content: [
      { type: "paragraph", text: "BuildNext AI came from a personal frustration — I wanted objective feedback on my GitHub portfolio but couldn't get it without paying a career coach. So I built the tool myself." },
      { type: "heading", id: "github-api", text: "GitHub API Integration" },
      { type: "paragraph", text: "The GitHub REST API provides repo metadata, commit frequency, language breakdown, and contributor stats. The challenge was aggregating this into a meaningful portfolio health signal." },
      { type: "code", language: "javascript", code: `const analyzePortfolio = async (username) => {
  const { data: repos } = await octokit.repos.listForUser({
    username, sort: 'updated', per_page: 30
  });
  return repos.map(r => ({
    name: r.name, language: r.language,
    stars: r.stargazers_count, fork: r.fork,
    daysSinceUpdate: daysSince(r.updated_at),
  }));
};` },
      { type: "heading", id: "gemini", text: "Gemini AI Prompting" },
      { type: "callout", variant: "success", text: "Structured output prompting — asking Gemini to respond in JSON with specific fields — made parsing reliable and the UI completely predictable." },
      { type: "heading", id: "scoring", text: "Portfolio Scoring Logic" },
      { type: "list", items: [
        "Diversity score: variety of languages and project types",
        "Activity score: commit frequency over the last 90 days",
        "Quality score: README presence, descriptions, star count",
        "Skill coverage: match against target job description keywords",
      ]},
      { type: "quote", text: "The best developer tools solve problems their creators actually have. Dog-fooding your own tool is the most honest QA you can do." },
    ],
  },
];

const ALL_TAGS = ["All", "MERN", "React", "Node.js", "Backend", "Architecture", "AI", "DSA", "DevOps", "Docker", "JWT", "C++", "Full Stack", "Google Gemini", "System Design"];

const TOPIC_TAGS = ["AI", "MERN", "React", "Node.js", "FastAPI", "Backend", "Architecture", "Debugging", "System Design", "DSA", "DevOps", "Machine Learning", "Docker", "JWT", "CI/CD", "MongoDB", "C++", "Google Gemini"];

// ─── ArticleCoverArt ──────────────────────────────────────────────────────────

function ArticleCoverArt({ article, height }: { article: Article; height: number }) {
  return (
    <div style={{ height, background: article.coverGradient, position: "relative", overflow: "hidden", flexShrink: 0 }}>
      <pre
        style={{
          position: "absolute", inset: 0, padding: "16px",
          fontFamily: "JetBrains Mono, monospace", fontSize: "8.5px",
          color: "rgba(255,255,255,0.055)", overflow: "hidden",
          whiteSpace: "pre", lineHeight: 1.85, margin: 0,
        }}
      >
        {article.coverCode}
      </pre>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "40px", filter: "drop-shadow(0 0 24px rgba(255,255,255,0.35))", position: "relative", zIndex: 1 }}>
          {article.coverIcon}
        </span>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to top, rgba(15,23,42,0.97), transparent)" }} />
    </div>
  );
}

// ─── RenderBlock ──────────────────────────────────────────────────────────────

function RenderBlock({ block }: { block: ContentBlock }) {
  if (block.type === "paragraph") {
    return <p style={{ color: "#94a3b8", lineHeight: 1.85, marginBottom: "1.1rem", fontSize: "0.92rem" }}>{block.text}</p>;
  }
  if (block.type === "heading") {
    return (
      <h3 id={block.id} style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.7rem", marginTop: "1.8rem", scrollMarginTop: "80px" }}>
        {block.text}
      </h3>
    );
  }
  if (block.type === "code") {
    return (
      <div style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden", marginBottom: "1.25rem" }}>
        <div style={{ padding: "7px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ marginLeft: "8px", fontSize: "10px", color: "#475569", fontFamily: "JetBrains Mono, monospace" }}>{block.language}</span>
        </div>
        <pre style={{ padding: "16px", fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "#e2e8f0", overflowX: "auto", lineHeight: 1.7, margin: 0 }}>
          <code>{block.code}</code>
        </pre>
      </div>
    );
  }
  if (block.type === "callout") {
    const cfg = {
      info:    { bg: "rgba(6,182,212,0.07)",  border: "rgba(6,182,212,0.28)",  color: "#06b6d4", Icon: Info },
      success: { bg: "rgba(34,197,94,0.07)",  border: "rgba(34,197,94,0.28)",  color: "#22c55e", Icon: CheckCircle },
      warning: { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.28)", color: "#f59e0b", Icon: AlertTriangle },
    }[block.variant];
    return (
      <div style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderLeft: `3px solid ${cfg.color}`, borderRadius: "8px", padding: "13px 16px", marginBottom: "1.25rem", display: "flex", gap: "10px" }}>
        <cfg.Icon style={{ color: cfg.color, width: 15, height: 15, flexShrink: 0, marginTop: 2 }} />
        <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>{block.text}</p>
      </div>
    );
  }
  if (block.type === "list") {
    return (
      <ul style={{ marginBottom: "1.25rem", paddingLeft: 0, listStyle: "none" }}>
        {block.items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: "10px", color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "5px" }}>
            <span style={{ color: "#06b6d4", flexShrink: 0, marginTop: "2px" }}>▸</span>
            {item}
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote style={{ borderLeft: "3px solid rgba(139,92,246,0.55)", paddingLeft: "20px", marginBottom: "1.25rem", color: "#cbd5e1", fontStyle: "italic", fontSize: "0.96rem", lineHeight: 1.75 }}>
        "{block.text}"
      </blockquote>
    );
  }
  return null;
}

// ─── ArticleReader ────────────────────────────────────────────────────────────

function ArticleReader({
  article, articles, onClose, onNavigate,
}: {
  article: Article; articles: Article[];
  onClose: () => void; onNavigate: (a: Article) => void;
}) {
  const idx = articles.findIndex(a => a.id === article.id);
  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "#070B17", overflowY: "auto" }}
    >
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(7,11,23,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "13px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={onClose} className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm">
          <ChevronLeft className="w-4 h-4" /> Back to Journal
        </button>
        <div className="flex items-center gap-3">
          {article.github && (
            <a href={article.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors text-sm">
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          )}
          {article.liveLink && (
            <a href={article.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4", textDecoration: "none" }}>
              Live Demo <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          )}
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero cover */}
      <div style={{ height: 260, position: "relative", overflow: "hidden", background: article.coverGradient }}>
        <pre style={{ position: "absolute", inset: 0, padding: "40px", fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "rgba(255,255,255,0.045)", overflow: "hidden", whiteSpace: "pre", lineHeight: 1.9, margin: 0 }}>
          {article.coverCode}
        </pre>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "64px", filter: "drop-shadow(0 0 32px rgba(255,255,255,0.4))" }}>{article.coverIcon}</span>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "65%", background: "linear-gradient(to top, #070B17, transparent)" }} />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6" style={{ paddingBottom: "80px" }}>
        {/* Article header */}
        <div style={{ maxWidth: 720, marginBottom: "40px" }}>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px", background: `${article.tagColor}18`, border: `1px solid ${article.tagColor}45`, color: article.tagColor }}>
              {article.tag}
            </span>
            <span className="flex items-center gap-1 text-slate-500 text-xs"><Clock className="w-3 h-3" /> {article.readTime}</span>
            <span className="text-slate-600 text-xs">{article.date}</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)", fontWeight: 800, color: "#fff", lineHeight: 1.25, marginBottom: "16px" }}>
            {article.title}
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.925rem", lineHeight: 1.75, marginBottom: "20px" }}>{article.excerpt}</p>
          <div className="flex items-center gap-3">
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${article.tagColor}, #8b5cf6)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>NP</div>
            <div>
              <p style={{ color: "#e2e8f0", fontSize: "0.85rem", fontWeight: 600 }}>Navneet Pratap</p>
              <p style={{ color: "#475569", fontSize: "11px" }}>MERN Stack Developer · B.Tech IT, REC Azamgarh</p>
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Article body */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map(t => (
                <span key={t} style={{ fontSize: "10px", fontWeight: 500, padding: "3px 10px", borderRadius: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontFamily: "JetBrains Mono, monospace" }}>{t}</span>
              ))}
            </div>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "28px" }} />
            {article.content.map((block, i) => <RenderBlock key={i} block={block} />)}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "36px 0" }} />
            {/* Prev / Next */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <button onClick={() => onNavigate(prev)} className="text-left p-4 rounded-xl transition-all" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                  <p style={{ color: "#475569", fontSize: "10px", marginBottom: "4px" }}>← Previous</p>
                  <p style={{ color: "#cbd5e1", fontSize: "0.83rem", fontWeight: 600 }}>{prev.title}</p>
                </button>
              ) : <div />}
              {next && (
                <button onClick={() => onNavigate(next)} className="text-right p-4 rounded-xl transition-all" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                  <p style={{ color: "#475569", fontSize: "10px", marginBottom: "4px" }}>Next →</p>
                  <p style={{ color: "#cbd5e1", fontSize: "0.83rem", fontWeight: 600 }}>{next.title}</p>
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ width: "256px", flexShrink: 0 }}>
            <div style={{ position: "sticky", top: "72px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* TOC */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "18px" }}>
                <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "12px" }}>Contents</p>
                {article.toc.map(item => (
                  <a key={item.id} href={`#${item.id}`} style={{ display: "block", color: "#475569", fontSize: "12px", padding: "5px 0 5px 10px", textDecoration: "none", borderLeft: "2px solid transparent", marginLeft: "-10px", transition: "color 0.2s, border-color 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#06b6d4"; (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = "#06b6d4"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#475569"; (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = "transparent"; }}>
                    {item.title}
                  </a>
                ))}
              </div>
              {/* Author */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "18px" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${article.tagColor}, #8b5cf6)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>NP</div>
                  <div>
                    <p style={{ color: "#fff", fontSize: "0.83rem", fontWeight: 700 }}>Navneet Pratap</p>
                    <p style={{ color: "#475569", fontSize: "10px" }}>MERN Stack Developer</p>
                  </div>
                </div>
                <p style={{ color: "#475569", fontSize: "11px", lineHeight: 1.65, marginBottom: "14px" }}>
                  B.Tech IT student at REC Azamgarh building production-ready full-stack applications.
                </p>
                <a href="https://www.linkedin.com/in/navneet-pratap-961519300" target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px", borderRadius: "8px", background: `${article.tagColor}12`, border: `1px solid ${article.tagColor}30`, color: article.tagColor, fontSize: "11px", fontWeight: 600, textDecoration: "none" }}>
                  Connect on LinkedIn <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              {/* More articles */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "18px" }}>
                <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "12px" }}>More Articles</p>
                {articles.filter(a => a.id !== article.id).slice(0, 3).map(a => (
                  <button key={a.id} onClick={() => onNavigate(a)} className="w-full text-left mb-3 flex items-start gap-2 group">
                    <span style={{ fontSize: "15px", flexShrink: 0, marginTop: "1px" }}>{a.coverIcon}</span>
                    <p style={{ color: "#475569", fontSize: "11px", lineHeight: 1.5, transition: "color 0.2s" }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = "#94a3b8")}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = "#475569")}>
                      {a.title}
                    </p>
                  </button>
                ))}
              </div>
              {/* Tags */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "18px" }}>
                <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "12px" }}>Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map(t => (
                    <span key={t} style={{ fontSize: "10px", padding: "3px 8px", borderRadius: "5px", background: `${article.tagColor}10`, border: `1px solid ${article.tagColor}28`, color: article.tagColor, fontFamily: "JetBrains Mono, monospace" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: "56px", padding: "36px 40px", borderRadius: "20px", background: "rgba(6,182,212,0.03)", border: "1px solid rgba(6,182,212,0.13)", textAlign: "center" }}>
          <div style={{ fontSize: "22px", marginBottom: "10px" }}>✍️</div>
          <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", marginBottom: "6px" }}>Enjoyed this article?</h3>
          <p style={{ color: "#475569", fontSize: "0.85rem", marginBottom: "22px" }}>View the complete project on GitHub, explore more journals, or hire me for your next build.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {article.github && (
              <a href={article.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ padding: "9px 18px", borderRadius: "9px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontSize: "0.83rem", fontWeight: 600, textDecoration: "none" }}>
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
            <button onClick={onClose} className="flex items-center gap-2" style={{ padding: "9px 18px", borderRadius: "9px", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4", fontSize: "0.83rem", fontWeight: 600, cursor: "pointer" }}>
              <BookOpen className="w-4 h-4" /> More Articles
            </button>
            <a href="#contact" onClick={e => { e.preventDefault(); onClose(); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300); }} style={{ padding: "9px 20px", borderRadius: "9px", background: "linear-gradient(135deg, #06b6d4, #3b82f6)", color: "#fff", fontSize: "0.83rem", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
              Hire Me <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Blog Section ─────────────────────────────────────────────────────────────

export function Blog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const featured = articles.find(a => a.featured)!;
  const gridArticles = articles.filter(a => !a.featured);

  const isFiltered = search !== "" || activeTag !== "All";
  const filteredGrid = gridArticles.filter(a => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === "All" || a.tags.includes(activeTag);
    return matchSearch && matchTag;
  });
  const filteredAll = articles.filter(a => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === "All" || a.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  const displayGrid = isFiltered ? filteredAll : gridArticles;
  const showFeatured = !isFiltered;

  return (
    <>
      <AnimatePresence>
        {selectedArticle && (
          <ArticleReader
            key={selectedArticle.id}
            article={selectedArticle}
            articles={articles}
            onClose={() => setSelectedArticle(null)}
            onNavigate={setSelectedArticle}
          />
        )}
      </AnimatePresence>

      <section id="blog" className="section-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute -top-48 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />

        <div className="max-w-7xl mx-auto px-6" ref={ref}>

          {/* ── Section Header ── */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
            <div>
              <p className="text-cyan-500 text-sm tracking-widest uppercase mb-3">Writings</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>Engineering Journal</h2>
              <p style={{ color: "#475569", fontSize: "0.875rem", maxWidth: "520px", lineHeight: 1.75 }}>
                Documenting real engineering decisions, debugging stories, architecture choices, and lessons learned while building production-ready software.
              </p>
            </div>
            {/* Search */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#475569", width: 14, height: 14 }} />
              <input
                type="text" placeholder="Search articles..." value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: "34px", paddingRight: "16px", paddingTop: "10px", paddingBottom: "10px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: "13px", outline: "none", width: "220px", fontFamily: "inherit" }}
                onFocus={e => (e.target.style.borderColor = "rgba(6,182,212,0.4)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
          </motion.div>

          {/* ── Tag Filters ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.08 }} className="flex flex-wrap gap-2 mb-12">
            {ALL_TAGS.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag)}
                style={{ fontSize: "11px", fontWeight: 600, padding: "5px 14px", borderRadius: "999px", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit", ...(activeTag === tag ? { background: "rgba(6,182,212,0.16)", border: "1px solid rgba(6,182,212,0.48)", color: "#06b6d4" } : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "#64748b" }) }}>
                {tag}
              </button>
            ))}
          </motion.div>

          {/* ── Featured Article ── */}
          {showFeatured && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.12 }} className="mb-10">
              <div
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(6,182,212,0.18)", transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s" }}
                onClick={() => setSelectedArticle(featured)}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "rgba(6,182,212,0.4)"; d.style.transform = "translateY(-4px)"; d.style.boxShadow = "0 24px 60px rgba(6,182,212,0.1)"; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "rgba(6,182,212,0.18)"; d.style.transform = "translateY(0)"; d.style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: featured.topBorder, borderRadius: "16px 16px 0 0" }} />
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-80 flex-shrink-0">
                    <ArticleCoverArt article={featured} height={240} />
                  </div>
                  <div style={{ padding: "28px 28px 24px", flex: 1 }}>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span style={{ fontSize: "10px", fontWeight: 700, padding: "3px 11px", borderRadius: "999px", background: `${featured.tagColor}20`, border: `1px solid ${featured.tagColor}50`, color: featured.tagColor }}>{featured.tag}</span>
                      <span className="flex items-center gap-1" style={{ fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", background: "rgba(245,158,11,0.14)", border: "1px solid rgba(245,158,11,0.38)", color: "#f59e0b" }}>
                        <Star style={{ width: 9, height: 9 }} /> Featured
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 text-xs ml-auto"><Clock style={{ width: 11, height: 11 }} /> {featured.readTime}</span>
                    </div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: "10px" }}>{featured.title}</h3>
                    <p style={{ color: "#64748b", fontSize: "0.87rem", lineHeight: 1.75, marginBottom: "18px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{featured.excerpt}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {featured.tags.map(t => (
                        <span key={t} style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "5px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#475569", fontFamily: "JetBrains Mono, monospace" }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "18px" }} />
                    <div className="flex flex-wrap items-center gap-5">
                      {featured.github && (
                        <a href={featured.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-1.5 transition-colors" style={{ color: "#475569", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}
                          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8")}
                          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#475569")}>
                          <Github style={{ width: 13, height: 13 }} /> GitHub ↗
                        </a>
                      )}
                      {featured.liveLink && (
                        <a href={featured.liveLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-1.5 transition-colors" style={{ color: "#475569", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}
                          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8")}
                          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#475569")}>
                          <ExternalLink style={{ width: 13, height: 13 }} /> Live Demo ↗
                        </a>
                      )}
                      <button className="flex items-center gap-2 ml-auto transition-all" style={{ padding: "8px 18px", borderRadius: "9px", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.35)", color: "#06b6d4", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(6,182,212,0.2)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(6,182,212,0.1)"; }}>
                        Read Article <ArrowRight style={{ width: 13, height: 13 }} />
                      </button>
                      <span style={{ color: "#334155", fontSize: "11px", fontFamily: "JetBrains Mono, monospace" }}>{featured.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Article Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {displayGrid.length > 0 ? displayGrid.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.18 + i * 0.09 }}
                onClick={() => setSelectedArticle(article)}
                style={{ position: "relative", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", overflow: "hidden", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s" }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = `${article.tagColor}40`; d.style.transform = "translateY(-6px)"; d.style.boxShadow = `0 20px 50px ${article.tagColor}12`; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "rgba(255,255,255,0.08)"; d.style.transform = "translateY(0)"; d.style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: article.topBorder, borderRadius: "20px 20px 0 0" }} />
                <ArticleCoverArt article={article} height={152} />
                <div style={{ padding: "18px 18px 16px" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontSize: "10px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px", background: `${article.tagColor}18`, border: `1px solid ${article.tagColor}40`, color: article.tagColor }}>{article.tag}</span>
                    <span className="flex items-center gap-1 text-slate-600" style={{ fontSize: "10px" }}><Clock style={{ width: 10, height: 10 }} /> {article.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: "7px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{article.title}</h3>
                  <p style={{ fontSize: "0.78rem", color: "#475569", lineHeight: 1.65, marginBottom: "10px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{article.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags.slice(0, 3).map(t => (
                      <span key={t} style={{ fontSize: "9px", padding: "2px 7px", borderRadius: "4px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#334155", fontFamily: "JetBrains Mono, monospace" }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "12px" }} />
                  <div className="flex items-center justify-between">
                    <span style={{ color: "#334155", fontSize: "10px", fontFamily: "JetBrains Mono, monospace" }}>{article.date}</span>
                    <span className="flex items-center gap-1" style={{ color: "#06b6d4", fontSize: "11px", fontWeight: 600 }}>
                      View Article <ArrowRight style={{ width: 11, height: 11 }} />
                    </span>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center py-16">
                <p style={{ color: "#334155", fontSize: "0.875rem" }}>No articles match your search.</p>
              </div>
            )}
          </div>

          {/* ── Topic Tags Cloud ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 }}
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "26px 30px", marginBottom: "28px" }}>
            <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "14px" }}>Topics Covered</p>
            <div className="flex flex-wrap gap-2">
              {TOPIC_TAGS.map(t => (
                <motion.button key={t} whileHover={{ scale: 1.08, y: -2 }}
                  onClick={() => setActiveTag(ALL_TAGS.includes(t) ? t : "All")}
                  style={{ fontSize: "11px", fontWeight: 500, padding: "5px 12px", borderRadius: "7px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#475569", cursor: "pointer", fontFamily: "JetBrains Mono, monospace" }}>
                  #{t}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── Writing Philosophy ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.42 }}
            style={{ position: "relative", background: "rgba(6,182,212,0.03)", border: "1px solid rgba(6,182,212,0.13)", borderRadius: "20px", padding: "32px 36px", marginBottom: "28px", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.07), transparent)", pointerEvents: "none" }} />
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div style={{ width: 50, height: 50, borderRadius: "14px", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.24)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>🏗️</div>
              <div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem", marginBottom: "7px" }}>Built in Public</h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.8, maxWidth: "580px" }}>
                  Every article documents real engineering decisions, implementation challenges, debugging sessions, and lessons learned while building production-ready software. No fluff — just the actual work.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Footer CTA ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "40px", textAlign: "center" }}>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", marginBottom: "7px" }}>Enjoyed these articles?</h3>
            <p style={{ color: "#475569", fontSize: "0.875rem", marginBottom: "22px" }}>View the complete projects on GitHub, explore more engineering journals, or hire me for your next build.</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="https://github.com/Navneet-pratap1027" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ padding: "10px 20px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                <Github style={{ width: 16, height: 16 }} /> GitHub Repos
              </a>
              <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center gap-2" style={{ padding: "10px 24px", borderRadius: "10px", background: "linear-gradient(135deg, #06b6d4, #3b82f6)", color: "#fff", fontSize: "0.85rem", fontWeight: 700, textDecoration: "none", cursor: "pointer" }}>
                Hire Me <ArrowRight style={{ width: 15, height: 15 }} />
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
