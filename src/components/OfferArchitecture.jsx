import { useEffect, useRef, useState } from "react";
import { langPair } from "../lib/lang.js";
import useRevealOnce from "../lib/useRevealOnce.js";

const TARGET_MARGIN = 43.8;

export default function OfferArchitecture() {
  const [sectionRef, hasEntered] = useRevealOnce();
  const gridRef = useRef(null);
  const imageWrapRef = useRef(null);
  const valueRef = useRef(null);
  const polylineRef = useRef(null);
  const [points, setPoints] = useState("0,0 0,0 0,0");
  const [dotPoint, setDotPoint] = useState({ x: 0, y: 0 });
  const [lineLength, setLineLength] = useState(0);
  const [count, setCount] = useState(0);
  const [lineReady, setLineReady] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    const imageWrap = imageWrapRef.current;
    const value = valueRef.current;
    if (!grid || !imageWrap || !value) return undefined;

    const updateGeometry = () => {
      const gridRect = grid.getBoundingClientRect();
      const imageRect = imageWrap.getBoundingClientRect();
      const valueRect = value.getBoundingClientRect();
      if (!gridRect.width || !gridRect.height) return;

      const anchorX = imageRect.left - gridRect.left + imageRect.width * 0.78;
      const anchorY = imageRect.top - gridRect.top + imageRect.height * 0.58;
      const dotX = valueRect.left - gridRect.left - 24;
      const dotY = valueRect.top - gridRect.top + valueRect.height / 2;
      const elbowX = Math.max(anchorX + 42, dotX - 36);
      setPoints(`${anchorX},${anchorY} ${elbowX},${anchorY} ${elbowX},${dotY} ${dotX},${dotY}`);
      setDotPoint({ x: dotX, y: dotY });

      requestAnimationFrame(() => {
        const length = polylineRef.current?.getTotalLength?.() ?? 0;
        setLineLength(length);
        setLineReady(Boolean(length));
      });
    };

    updateGeometry();
    const observer = new ResizeObserver(updateGeometry);
    observer.observe(grid);
    observer.observe(imageWrap);
    observer.observe(value);
    window.addEventListener("resize", updateGeometry);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateGeometry);
    };
  }, []);

  useEffect(() => {
    if (!hasEntered || !lineReady) return undefined;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setCount(TARGET_MARGIN);
      return undefined;
    }

    let frame = 0;
    let start = 0;
    const delay = window.setTimeout(() => {
      const tick = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min(1, (timestamp - start) / 2200);
        const eased = 1 - ((1 - progress) ** 3);
        setCount(Number((TARGET_MARGIN * eased).toFixed(1)));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }, 640);

    return () => {
      window.clearTimeout(delay);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [hasEntered, lineReady]);

  const visible = hasEntered && lineReady;

  return (
    <section ref={sectionRef} className={`offer-architecture ${visible ? "is-visible" : ""}`.trim()}>
      <h2>{langPair({ en: "Offer Architecture", zh: "产品报价架构" })}</h2>
      <div ref={gridRef} className="offer-architecture-grid">
        <div className="offer-cost-visual">
          <div className="offer-copy">
            <div className="offer-price"><span>{langPair({ en: "Base Hardware", zh: "基础硬件" })}</span><strong>¥699</strong></div>
            <h3>{langPair({ en: "A Proven, Sustainable Business Model", zh: "经验证的可持续商业模型" })}</h3>
            <p>{langPair({ en: "Market-aligned pricing supported by a sustainable margin structure.", zh: "价格贴近市场接受区间，并保留可持续利润空间。" })}</p>
          </div>
          <div ref={imageWrapRef} className="offer-architecture-image-wrap">
            <img data-preload-src="/assets/whuffl/page-08-viability/offer architecture.png" alt={langPair({ en: "Offer architecture cost structure", zh: "产品报价成本结构" })} />
          </div>
        </div>

        <div className="offer-margin gross-margin-block">
          <strong ref={valueRef} className="gross-margin-value">{count.toFixed(1)}<span>%</span></strong>
          <h3>{langPair({ en: "Fully Loaded Gross Margin", zh: "全负荷毛利率" })}</h3>
          <p>{langPair({ en: "At a 43.8% fully loaded gross margin, ¥699 supports sustainable growth across hardware and digital services.", zh: "43.8% 全负荷毛利率，使 ¥699 在硬件与数字服务间仍保有可持续增长空间。" })}</p>
        </div>

        <svg className="offer-leader-overlay" aria-hidden="true">
          <polyline
            ref={polylineRef}
            className="offer-margin-leader"
            points={points}
            style={{ strokeDasharray: lineLength, strokeDashoffset: visible ? 0 : lineLength }}
          />
          <circle className="offer-margin-leader-dot" cx={dotPoint.x} cy={dotPoint.y} r="7" />
        </svg>
      </div>
    </section>
  );
}
