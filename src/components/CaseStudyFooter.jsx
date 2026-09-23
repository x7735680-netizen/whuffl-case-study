import { langPair } from "../lib/lang.js";
import { project } from "../content/whuffl.js";

export default function CaseStudyFooter() {
  return (
    <footer className="viability-ending-footer case-footer">
      <div className="case-footer-meta">
        <p className="case-footer-mark">
          <span className="case-footer-mark-rule" aria-hidden="true" />
          <span className="case-footer-recruitment-note">Shared For Recruitment Purposes Only</span>
          <span className="case-footer-mark-rule" aria-hidden="true" />
          <span className="case-footer-mark-end">— END —</span>
        </p>
        <div className="case-footer-support">
          <p className="case-footer-note">{langPair(project.footerNote)}</p>
          <a href="#hero" className="case-footer-back" onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("hero");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}>
            ↑ {langPair({ en: "Back to top", zh: "回到顶部" })}
          </a>
        </div>
      </div>
    </footer>
  );
}
