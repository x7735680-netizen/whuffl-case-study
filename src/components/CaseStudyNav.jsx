import { useEffect } from "react";
import LanguageToggle from "./LanguageToggle.jsx";
import { project } from "../content/whuffl.js";

const CHAPTERS = [
  { id: "why-context",   label: "WHY" },
  { id: "ch-decide",     label: "DECIDE" },
  { id: "ch-build",      label: "BUILD" },
  { id: "ch-experience", label: "EXPERIENCE" },
  { id: "ch-viability",  label: "VIABILITY" },
];

export default function CaseStudyNav({ lang, onLangChange, activeChapter }) {
  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      document.documentElement.style.setProperty("--scroll-progress", progress.toString());
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleJump = (event, id) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="case-header">
      <div className="case-nav-inner">
        <a
          className="case-nav-brand"
          href="#hero"
          onClick={(e) => handleJump(e, "hero")}
        >
          <img src="/assets/whuffl/common/logo-white.png" alt="Whuffl logo" />
          <span>WHUFFL</span>
        </a>
        <nav className="case-nav-links" aria-label="Case study chapters">
          {CHAPTERS.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`case-nav-link ${
                (i === 0 && activeChapter >= 1 && activeChapter <= 2) ||
                (i > 0 && activeChapter === i + 2)
                  ? "is-active"
                  : ""
              }`.trim()}
              onClick={(e) => handleJump(e, c.id)}
            >
              <span className="case-nav-link-num">0{i + 1}</span>
              <span className="case-nav-link-label">{c.label}</span>
            </a>
          ))}
        </nav>
      <div className="case-nav-right">
          <LanguageToggle lang={lang} onChange={onLangChange} />
        </div>
      </div>
      <div className="case-progress" aria-hidden="true">
        <span className="case-progress-value" />
      </div>
    </header>
  );
}
