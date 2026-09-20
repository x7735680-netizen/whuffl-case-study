import { useState } from "react";
import { langPair } from "../../lib/lang.js";
import useRevealOnce from "../../lib/useRevealOnce.js";
import { fullyLoadedPieData, fullyLoadedPieFootnote } from "../../content/whuffl.js";

function arcPath(cx, cy, radius, startAngle, endAngle) {
  const start = [cx + radius * Math.cos(startAngle), cy + radius * Math.sin(startAngle)];
  const end = [cx + radius * Math.cos(endAngle), cy + radius * Math.sin(endAngle)];
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${start[0]} ${start[1]} A ${radius} ${radius} 0 ${largeArc} 1 ${end[0]} ${end[1]} Z`;
}

export default function FullyLoadedCost() {
  const [active, setActive] = useState(null);
  const [rootRef, hasEntered] = useRevealOnce();
  let cursor = -Math.PI / 2;
  const activeItem = fullyLoadedPieData.find((item) => item.key === active);

  return (
    <div ref={rootRef} className={`chart-flc ${hasEntered ? "is-revealed" : ""}`.trim()}>
      <div className="chart-flc-pie-layout">
        <div className="chart-flc-pie-wrap">
          <div className="chart-flc-pie-reveal">
            <svg className="chart-flc-pie" viewBox="0 0 260 260" role="img" aria-label={langPair({ en: "Fully loaded cost composition", zh: "全负荷成本构成" })}>
              {fullyLoadedPieData.map((item) => {
                const start = cursor;
                const end = cursor + (item.percent / 100) * Math.PI * 2;
                cursor = end;
                return (
                  <path
                    key={item.key}
                    d={arcPath(130, 130, 104, start, end)}
                    fill={item.color}
                    className={`chart-flc-slice ${active && active !== item.key ? "is-muted" : ""}`.trim()}
                    onMouseEnter={() => setActive(item.key)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(item.key)}
                    onBlur={() => setActive(null)}
                    tabIndex="0"
                    aria-label={`${langPair(item.label)} ${item.percent}% ${item.priceRange}`}
                  />
                );
              })}
            </svg>
          </div>
          {activeItem ? (
            <div className="chart-flc-tooltip" role="status">
              <strong>{langPair(activeItem.label)}</strong>
              <span>{langPair({ en: "Share", zh: "占比" })}：{activeItem.percent}%</span>
              <span>{langPair({ en: "Price range", zh: "价格区间" })}：{activeItem.priceRange}</span>
            </div>
          ) : null}
        </div>
        <ul className="chart-flc-legend">
          {fullyLoadedPieData.map((item) => (
            <li key={item.key}>
              <span className="chart-flc-swatch" style={{ background: item.color }} aria-hidden="true" />
              <span className="chart-flc-legend-copy">
                <span className="chart-flc-legend-label">{langPair(item.label)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="chart-flc-note">{langPair({ en: "Fully Loaded Cost Breakdown", zh: "全负荷成本构成" })} · {langPair({ en: "RMB / unit", zh: "元 / 台" })} · ¥248.47</p>
      <p className="chart-flc-footnote">{langPair(fullyLoadedPieFootnote)}</p>
    </div>
  );
}
