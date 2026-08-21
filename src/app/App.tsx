import "../../src/styles/portfolio.css";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import profilePhoto from "../imports/WhatsApp_Image_2026-06-27_at_2.17.27_PM__1_.jpeg";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { ProblemSolving } from "./components/ProblemSolving";
import { Education } from "./components/Education";
import { Certifications } from "./components/Certifications";
import { Blog } from "./components/Blog";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
import { HowIBuild } from "./components/HowIBuild";
import { GitHubSection } from "./components/GitHubSection";
import { ResumeCTA } from "./components/ResumeCTA";

const heroImage = profilePhoto;

const aboutImage =
  "https://images.unsplash.com/photo-1770170389700-eb0f9b910ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBBSSUyMGRhdGElMjBzY2llbmNlJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcyMTk2MjA0fDA&ixlib=rb-4.1.0&q=80&w=1080";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen" style={{ background: "#020617", color: "#f1f5f9" }}>
          <Navbar />
          <Hero heroImage={heroImage} />
          <About aboutImage={aboutImage} />
          <HowIBuild />
          <Skills />
          <ProblemSolving />
          <Education />
          <Certifications />
          <GitHubSection />
          <Blog />
          <ResumeCTA />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}
