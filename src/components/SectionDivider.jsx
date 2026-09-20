export default function SectionDivider({ label }) {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="section-divider-mark">//</span>
      <span className="section-divider-label">{label}</span>
    </div>
  );
}
