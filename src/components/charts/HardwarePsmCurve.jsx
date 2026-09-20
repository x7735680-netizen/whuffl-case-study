import { useMemo, useState } from "react";
import { langPair } from "../../lib/lang.js";
import { psmColors, psmSeries } from "../../content/whuffl.js";

const plot = { left: 72, top: 24, width: 610, height: 300 };
const curves = [
  { id: "tooCheap", label: { en: "Too cheap", zh: "太便宜" } },
  { id: "cheap", label: { en: "Cheap", zh: "便宜" } },
  { id: "expensive", label: { en: "Expensive", zh: "贵" } },
  { id: "tooExpensive", label: { en: "Too expensive", zh: "太贵" } },
];
const toPoint = ([x, y]) => [plot.left + (x / 4000) * plot.width, plot.top + ((100 - y) / 100) * plot.height];

function monotonePath(points) {
  const p = points.map(toPoint);
  if (p.length < 2) return "";
  const slopes = p.slice(1).map(([x1, y1], i) => (y1 - p[i][1]) / (x1 - p[i][0] || 1));
  const tangents = p.map((_, i) => {
    if (i === 0) return slopes[0];
    if (i === slopes.length) return slopes[slopes.length - 1];
    if (slopes[i - 1] * slopes[i] <= 0) return 0;
    return (slopes[i - 1] + slopes[i]) / 2;
  });
  let d = `M ${p[0][0]} ${p[0][1]}`;
  p.slice(1).forEach(([x1, y1], i) => {
    const [x0, y0] = p[i];
    const dx = (x1 - x0) / 3;
    d += ` C ${x0 + dx} ${y0 + tangents[i] * dx}, ${x1 - dx} ${y1 - tangents[i + 1] * dx}, ${x1} ${y1}`;
  });
  return d;
}

export default function HardwarePsmCurve() {
  const [active, setActive] = useState(null);
  const paths = useMemo(() => curves.map((curve) => ({ ...curve, d: monotonePath(psmSeries[curve.id]) })), []);
  const yTicks = [0, 20, 40, 60, 80, 100];
  const xTicks = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000];
  return (
    <div className="hardware-psm-curve">
      <div className="hardware-psm-heading">{langPair({ en: "Hardware PSM Curve", zh: "硬件 PSM 价格敏感度曲线" })}</div>
      <div className="psm-chart-wrap">
      <svg className="hardware-psm-svg" viewBox="0 0 900 430" role="img" aria-label={langPair({ en: "Hardware PSM cumulative percentage curves", zh: "硬件 PSM 累计比例曲线" })}>
        <line className="psm-axis" x1={plot.left} y1={plot.top} x2={plot.left} y2={plot.top + plot.height} />
        <line className="psm-axis" x1={plot.left} y1={plot.top + plot.height} x2={plot.left + plot.width} y2={plot.top + plot.height} />
        <text className="psm-axis-title psm-axis-title-y" x="18" y="186" transform="rotate(-90 18 186)">{langPair({ en: "Cumulative Percentage (%)", zh: "累计比例（%）" })}</text>
        <text className="psm-axis-title" x="310" y="394">{langPair({ en: "Hardware Price (RMB)", zh: "硬件价格（人民币）" })}</text>
        {yTicks.map((tick) => <text key={tick} className="psm-tick psm-y-tick" x={plot.left - 14} y={plot.top + ((100 - tick) / 100) * plot.height + 5}>{tick === 0 ? "0" : `${tick}%`}</text>)}
        {xTicks.map((tick) => <text key={tick} className="psm-tick" x={plot.left + (tick / 4000) * plot.width} y={plot.top + plot.height + 30} textAnchor="middle">{tick}</text>)}
        {paths.map((curve) => <path key={curve.id} d={curve.d} className="psm-curve-line" style={{ stroke: psmColors[curve.id], opacity: active && active !== curve.id ? 0.2 : 1 }} />)}
        <g className="psm-legend" transform="translate(750 190)">
          {paths.map((curve, index) => <g key={curve.id} className="psm-legend-item" onMouseEnter={() => setActive(curve.id)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(curve.id)} onBlur={() => setActive(null)} tabIndex="0"><text x="0" y={index * 42} style={{ opacity: active && active !== curve.id ? 0.28 : 1 }}>{langPair(curve.label)}</text><line x1="0" x2="105" y1={index * 42 + 10} y2={index * 42 + 10} style={{ stroke: psmColors[curve.id], opacity: active && active !== curve.id ? 0.22 : 1 }} /></g>)}
          <text className="psm-n" x="0" y="178">N=300</text>
        </g>
      </svg>
      </div>
    </div>
  );
}
