import { useState } from "react";
import { langPair } from "../../lib/lang.js";

export default function PricingFeasibilityCard({ data }) {
  const [active, setActive] = useState(null);
  const ranges = [
    { ...data.persona[0], id: "p1", label: { en: "P1 Reflective Guide", zh: "P1 反思型引导者" } },
    { ...data.persona[1], id: "p2", label: { en: "P2 Mindful Improver", zh: "P2 觉察型提升者" } },
    { ...data.persona[2], id: "p3", label: { en: "P3 Practical Walker", zh: "P3 实用型遛狗者" } },
  ];
  const rangeStyle = (low, high, opp) => ({ "--range-start": `${(low / 1500) * 100}%`, "--range-end": `${(high / 1500) * 100}%`, "--opp": `${(opp / 1500) * 100}%` });
  return (
    <article className="pricing-feasibility-card">
      <header className="pricing-feasibility-head">
        <div>
          <p className="pricing-feasibility-kicker">{langPair({ en: "Pricing Feasibility", zh: "定价可行性" })}</p>
          <h3>{langPair({ en: "Overall", zh: "整体" })}</h3>
        </div>
        <span className="pricing-feasibility-n">N=300</span>
      </header>
      <div className="price-summary pricing-overall-stats">
        <span className="price-summary-item opp">OPP <strong>¥{data.hardware.opp}</strong></span>
        <span className="price-summary-item rpr">RPR <strong>¥{data.hardware.rprLow}–{data.hardware.rprHigh}</strong></span>
      </div>
      <p className="pricing-feasibility-note">{langPair({ en: "¥699 sits almost exactly at the overall OPP.", zh: "¥699 基本落在整体 OPP。" })}</p>
      <div className="pricing-persona-ranges">
        <p className="pricing-persona-title">{langPair({ en: "Persona ranges", zh: "Persona 区间" })}</p>
        {ranges.map((item) => (
          <div key={item.id} className={`pricing-persona-range ${active && active !== item.id ? "is-muted" : ""}`} onMouseEnter={() => setActive(item.id)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(item.id)} onBlur={() => setActive(null)} tabIndex="0">
            <div className="pricing-persona-meta"><span>{langPair(item.label)}</span><strong>OPP ¥{item.opp}</strong></div>
            <div className="pricing-range-visual" style={rangeStyle(item.rprLow, item.rprHigh, item.opp)}><span className="pricing-range-bar" /><span className="pricing-range-dot" /></div>
            <div className="pricing-range-values"><span>¥{item.rprLow}</span><span>¥{item.rprHigh}</span></div>
          </div>
        ))}
      </div>
    </article>
  );
}
