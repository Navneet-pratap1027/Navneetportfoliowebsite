import "../../src/styles/portfolio.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { ProblemSolving } from "./components/ProblemSolving";
import { Education } from "./components/Education";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

const heroImage =
  "https://images.unsplash.com/photo-1759884248009-92c5e957708e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjaWVuY2UlMjBzdHVkZW50JTIwY29kaW5nJTIwbGFwdG9wfGVufDF8fHx8MTc3MjEyNjQzMHww&ixlib=rb-4.1.0&q=80&w=1080";

const aboutImage =
  "https://images.unsplash.com/photo-1770170389700-eb0f9b910ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBBSSUyMGRhdGElMjBzY2llbmNlJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcyMTk2MjA0fDA&ixlib=rb-4.1.0&q=80&w=1080";

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: "#020617", color: "#f1f5f9" }}>
      <Navbar />
      <Hero heroImage={heroImage} />
      <About aboutImage={aboutImage} />
      <Skills />
      <ProblemSolving />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}