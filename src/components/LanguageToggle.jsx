export default function LanguageToggle({ lang, onChange }) {
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={`lang-toggle-btn ${lang === "en" ? "is-active" : ""}`.trim()}
        aria-pressed={lang === "en"}
        onClick={() => onChange("en")}
      >
        EN
      </button>
      <span className="lang-toggle-sep" aria-hidden="true">/</span>
      <button
        type="button"
        className={`lang-toggle-btn ${lang === "zh" ? "is-active" : ""}`.trim()}
        aria-pressed={lang === "zh"}
        onClick={() => onChange("zh")}
      >
        中文
      </button>
    </div>
  );
}
