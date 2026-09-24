import { useEffect, useState } from "react";
import { langPair } from "../lib/lang.js";
import { lightFeedbackStates } from "../data/whufflBuild.js";

export default function LightStateSelector({ lang = "en" }) {
  const [active, setActive] = useState(lightFeedbackStates[0]?.key);
  const activeIndex = lightFeedbackStates.findIndex((state) => state.key === active);
  const current = lightFeedbackStates[activeIndex] ?? lightFeedbackStates[0];

  useEffect(() => {
    const timer = window.setTimeout(() => setActive(lightFeedbackStates[(activeIndex + 1) % lightFeedbackStates.length]?.key), 4500);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="light-state" aria-label="Five-state light language">
      <div hidden aria-hidden="true">
        {[...new Set(lightFeedbackStates.flatMap((state) => [state.productImage, ...state.data.map((item) => item.icon)]))].map((src) => <img data-preload-src={src} alt="" key={src} />)}
      </div>
      <div className="light-feedback-panel">
        <div className="light-main-card">
          <div className="light-feedback-product">
            <img data-preload-src={current.productImage} alt="" aria-hidden="true" className="light-state-img is-active" />
          </div>
          <div className="light-state-copy" key={current.key}>
            <h3 style={{ color: current.color }}>{langPair(current.stateName, lang)}</h3>
            <p className="light-action">{langPair(current.action, lang)}</p>
            <p className="light-description">{langPair(current.desc, lang)}</p>
            <div className="light-feedback-tags">
              {current.tags[lang].map((tag) => <span className="light-feedback-tag" key={tag}>{tag}</span>)}
            </div>
          </div>
          <aside className="light-data-panel" key={`data-${current.key}`} aria-label={`${langPair(current.stateName, lang)} data`}>
            <h3>Data</h3>
            <div className="light-data-list">
              {current.data.map((item) => {
                const value = langPair(item.value, lang);
                const unit = langPair(item.unit, lang);

                return (
                  <div className="light-data-item" key={item.icon}>
                    <span className="light-data-icon"><img data-preload-src={item.icon} alt="" /></span>
                    <span className="light-data-metric">
                      <span>{value}</span>
                      {unit ? <span>{unit}</span> : null}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
      <div className="light-state-tabs" role="tablist" aria-label="Select collar light state">
        {lightFeedbackStates.map((state) => <button key={state.key} type="button" role="tab" aria-selected={state.key === active} className={`light-state-tab ${state.key === active ? "is-active" : ""}`.trim()} onClick={() => setActive(state.key)} aria-label={langPair(state.stateName, lang)}><span style={{ backgroundColor: state.color }} /></button>)}
      </div>
      <p className="owner-message" key={`message-${current.key}`}>“{langPair(current.quote, lang)}”</p>
    </section>
  );
}
