import { useState } from "react";
import { langPair } from "../lib/lang.js";
import { explodedViewLabels } from "../data/whufflBuild.js";

const ASSET = (name) => `/assets/whuffl/page-05-build/product/other/${name}`;

const STATES = ["size-validation", "three-view", "collar-size"];

function GivenCondition({ label, variable, value }) {
  return (
    <div className="given-condition-item">
      <span className="given-condition-item__bullet">•</span>
      <span className="given-condition-item__label">{label}</span>
      <span className="given-condition-item__leader" />
      <span className="given-condition-item__value"><span className="formula-accent">{variable}</span>{" = "}<em>{value}</em></span>
    </div>
  );
}

function SizeValidation() {
  return (
    <div className="hardware-state hardware-state--size">
      <h3 className="hardware-state__cn-title">硬件尺寸推导</h3>
      <div className="hardware-state__body">
        <h4 className="hardware-state__en-title">Core Module Size Validation</h4>
        <div className="hardware-state__main-grid">
          <div className="formula-content">
            <div className="formula-section">
              <div className="formula-section__title">Resolvable Size Of The Light Guide Area</div>
              <div className="formula-line"><span className="formula-accent">S<sub>min</sub></span>{" = D × θ"}<sub>color</sub>{" = 1.5 × 0.00145 = "}<span className="formula-result">2.2 mm</span></div>
            </div>
            <div className="formula-section">
              <div className="formula-section__title">Dome Diameter</div>
              <div className="formula-line"><span className="formula-accent">Ø<sub>circle</sub></span>{" = S"}<sub>min</sub>{" × k = 2.2 × 4.1 = "}<span className="formula-result">9 mm</span></div>
            </div>
            <div className="formula-section formula-section--dimensions">
              <div className="formula-line"><span className="formula-accent">L</span>{" = (Ø"}<sub>circle</sub>{" ÷ 16%) = 9 ÷ 0.16 ≈ "}<span className="formula-result">55 mm</span></div>
              <div className="formula-line formula-line--multiline"><div><span className="formula-accent">W</span>{" = (Ø"}<sub>circle</sub>{" + structural margins × 2)"}</div><div className="formula-indent">{"= 9 + 10.5 × 2 = "}<span className="formula-result">30 mm</span></div></div>
              <div className="formula-line formula-line--multiline"><div><span className="formula-accent">T</span>{" = Shell + Silicone + Components"}</div><div className="formula-indent">+ Battery + Sealant</div><div className="formula-indent">{"= 4 + 1 + 3.5 + 5 + 1.2 = "}<span className="formula-result">15 mm</span></div></div>
            </div>
          </div>
          <div className="hardware-state__visual"><img src={ASSET("size validation.png")} alt="Light guide area and module cross section" /></div>
        </div>
        <div className="given-conditions">
          <div className="given-conditions__title">Given Conditions</div>
          <div className="given-conditions__row"><span className="given-conditions__bullet">•</span><span>Design reference viewing distance</span><span className="given-conditions__leader" /><span><span className="formula-accent">D</span>{" = 1.5 m "}<em>(maximum leash length)</em></span></div>
          <div className="given-conditions__row"><span className="given-conditions__bullet">•</span><span>Minimum visual angle for color recognition</span><span className="given-conditions__leader" /><span><span className="formula-accent">θ<sub>color</sub></span>{" = 5 arcmin = 0.00145 rad"}</span></div>
          <div className="given-conditions__row"><span className="given-conditions__bullet">•</span><span>FOS (compensation for motion artifacts and fur occlusion)</span><span className="given-conditions__leader" /><span><span className="formula-accent">k</span>{" = 4.1"}</span></div>
        </div>
      </div>
    </div>
  );
}

function ThreeView() {
  return <div className="hardware-state hardware-state--three-view"><h3 className="hardware-state__cn-title">三视图</h3><div className="three-view-image"><img src={ASSET("three view.png")} alt="Whuffl collar three-view drawing" /></div></div>;
}

function CollarSize() {
  return (
    <div className="hardware-state hardware-state--collar">
      <h3 className="hardware-state__cn-title">硬件尺寸推导</h3>
      <div className="collar-size-layout">
        <h4 className="hardware-state__en-title">Buckle And Collar Size Estimation</h4>
        <div className="collar-size-layout__middle">
          <div className="collar-size-layout__formula formula-content"><div className="formula-section"><div className="formula-section__title">Data Derivation</div>
            <div className="formula-line"><span className="formula-accent">T<sub>base</sub></span>{" = min(T"}<sub>f</sub>{", T"}<sub>m</sub>{") = "}<span className="formula-result">14 mm</span></div>
            <div className="formula-line"><span className="formula-accent">k</span>{" = T"}<sub>base</sub>{" ÷ T"}<sub>a</sub>{" = "}<span className="formula-result">1.27</span></div>
            <div className="formula-line"><span className="formula-accent">P</span>{" = T"}<sub>f</sub>{" × 0.7 ≈ "}<span className="formula-result">10 mm</span></div>
            <div className="formula-line formula-line--spaced"><span className="formula-accent">W</span>{" = T"}<sub>a</sub>{" × k ≈ "}<span className="formula-result">14 mm</span>{" ≤ T"}<sub>f</sub>{" ≤ F"}</div>
            <div className="formula-line"><span className="formula-accent">L'</span>{" = W + 2 × P = "}<span className="formula-result">34 mm</span>{" ≤ L"}</div>
            <div className="formula-line"><span className="formula-accent">D</span>{" = F"}<sub>a</sub>{" × k ≈ "}<span className="formula-result">10 mm</span>{" ≤ D' ≤ F"}</div>
            <div className="formula-line"><span className="formula-accent">H</span>{" = t"}<sub>strap</sub>{" + 2t"}<sub>wall</sub>{" + δ ≈ "}<span className="formula-result">8 mm</span></div>
          </div></div>
          <div className="collar-size-layout__visual hardware-state__visual hardware-state__visual--collar"><img src={ASSET("collar size.png")} alt="Collar sizing by dog size" /></div>
        </div>
        <div className="given-conditions given-conditions--collar"><div className="given-conditions__title">Given Conditions</div><div className="given-conditions__columns">
          <div><GivenCondition label="Maximum total length" variable="L" value="51mm" /><GivenCondition label="Maximum buckle depth" variable="D'" value="19mm" /><GivenCondition label={<>Female thumb grip point</>} variable={<>T<sub>f</sub></>} value="14mm" /><GivenCondition label="Male thumb grip point" variable={<>T<sub>m</sub></>} value="18mm" /></div>
          <div><GivenCondition label="Index finger push point" variable="F" value="16mm" /><GivenCondition label="Thumb grip point" variable={<>T<sub>a</sub></>} value="11mm" /><GivenCondition label="Index finger push point" variable={<>F<sub>a</sub></>} value="8mm" /></div>
        </div></div>
      </div>
    </div>
  );
}

const DETAIL = { "size-validation": SizeValidation, "three-view": ThreeView, "collar-size": CollarSize };

export default function BuildHardware({ lang = "en" }) {
  const [active, setActive] = useState(STATES[0]);
  const Detail = DETAIL[active];

  return (
    <div className="hardware-layout">
      <div className="hardware-detail-card">
        <div className="hardware-detail-transition" key={active}><Detail /></div>
        <div className="hardware-slider" aria-label="Hardware view selector">
          {STATES.map((state, index) => <button key={state} className={state === active ? "active" : ""} type="button" onClick={() => setActive(state)} aria-label={`Show hardware view ${index + 1}`} aria-current={state === active} />)}
        </div>
      </div>
      <div className="exploded-view-stage">
        <img className="exploded-view-image" src="/assets/whuffl/page-05-build/product/exploded-view/collar-exploded-view.png" alt="Whuffl collar exploded view" />
        <div className="exploded-label-layer" aria-hidden="true">
          {explodedViewLabels.map((label) => (
            <div
              className={`exploded-label exploded-label--${label.side}`.trim()}
              key={label.key}
              style={{
                ...(label.side === "right" ? { left: `${label.xPercent}%` } : {}),
                top: `${label.yPercent}%`,
              }}
            >
              <div className="exploded-label-copy">
                <div className="exploded-label-title">{langPair(label.title, lang)}</div>
                {label.sub ? <div className="exploded-label-sub">{langPair(label.sub, lang)}</div> : null}
              </div>
            </div>
          ))}
        </div>
        {[
          { state: "size-validation", label: "View core module sizing", x: "32.2%", y: "21.8%" },
          { state: "three-view", label: "View collar three-view", x: "56.2%", y: "51.8%" },
          { state: "collar-size", label: "View buckle and collar sizing", x: "69.8%", y: "82.7%" },
        ].map((hotspot) => <button key={hotspot.state} type="button" className={`hotspot ${active === hotspot.state ? "active" : ""}`} style={{ left: hotspot.x, top: hotspot.y }} onClick={() => setActive(hotspot.state)} aria-label={hotspot.label} aria-pressed={active === hotspot.state} />)}
      </div>
      <div className="exploded-mobile-list" aria-label={lang === "zh" ? "项圈部件清单" : "Collar component list"}>
        {explodedViewLabels.map((label) => <div className="exploded-mobile-item" key={label.key}><strong>{langPair(label.title, lang)}</strong>{label.sub ? <span>{langPair(label.sub, lang)}</span> : null}</div>)}
      </div>
    </div>
  );
}
