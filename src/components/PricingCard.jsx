import { langPair } from "../lib/lang.js";
import useRevealOnce from "../lib/useRevealOnce.js";
import useCountUp from "../lib/useCountUp.js";

export default function PricingCard({ scenario, topLabel, delay = 0, reveal = false }) {
  const [ref, hasEntered] = useRevealOnce();
  const hardware = useCountUp(scenario.hardware, { enabled: reveal && hasEntered });
  const subscription = useCountUp(scenario.sub, { enabled: reveal && hasEntered });
  const top2 = useCountUp(scenario.top2, { enabled: reveal && hasEntered });

  return (
    <article
      ref={reveal ? ref : undefined}
      style={reveal ? { "--reveal-delay": `${delay}ms` } : undefined}
      className={`${reveal ? "reveal-card" : ""} ${reveal && hasEntered ? "is-revealed" : ""} pricing-card ${scenario.accent ? "is-accent" : ""}`.trim()}
    >
      <header className="pricing-card-head">
        <span className="pricing-card-id">{scenario.id}</span>
        <span className="pricing-card-label">{langPair(scenario.label)}</span>
      </header>
      <div className="pricing-card-prices">
        <p className="pricing-card-hw">
          <span className="pricing-card-num">¥{hardware}</span>
          <span className="pricing-card-unit">
            {langPair({ en: "hardware", zh: "硬件" })}
          </span>
        </p>
        <p className="pricing-card-sub">
          <span className="pricing-card-num">¥{subscription}</span>
          <span className="pricing-card-unit">
            {langPair({ en: "/ month", zh: "/ 月" })}
          </span>
        </p>
      </div>
      <p className="pricing-card-top">
        <span className="pricing-card-top-label">{langPair(topLabel ?? { en: "Top 2 box", zh: "Top 2 选择率" })}</span>
        <span className="pricing-card-top-value">{top2}%</span>
      </p>
    </article>
  );
}
