import { useEffect, useRef, useState } from "react";
import PricingCard from "./PricingCard.jsx";
import RevealTextGroup from "./RevealTextGroup.jsx";
import CaseStudyFooter from "./CaseStudyFooter.jsx";
import { langPair } from "../lib/lang.js";
import { psmPurchaseIntent, viabilityCopy } from "../content/whuffl.js";

const STEP_SWITCHES = [0.34, 0.67];

export default function ViabilitySection() {
  return (
    <section className="viability-section" aria-label={langPair({ en: "Viability strategy", zh: "商业可行性策略" })}>
      <MonadicConceptTesting />
      <GTMRoadmap />
      <ViabilityClosing />
    </section>
  );
}

function MonadicConceptTesting() {
  return (
    <section className="monadic-section" aria-labelledby="monadic-title">
      <RevealTextGroup as="header" className="monadic-header">
        <h2 id="monadic-title" className="reveal-text-group__title">{langPair(viabilityCopy.monadic.title)}</h2>
        <p className="reveal-text-group__subtitle">{langPair(viabilityCopy.monadic.subtitle)}</p>
      </RevealTextGroup>

      <div className="monadic-cards reveal-card-grid">
        {psmPurchaseIntent.scenarios.map((scenario, index) => {
          const isRecommended = scenario.id === "C";
          return (
            <div key={scenario.id} className={`monadic-card ${isRecommended ? "monadic-card--recommended" : ""}`.trim()}>
              {isRecommended ? <div className="subscription-callout">{langPair(viabilityCopy.monadic.callout)}</div> : null}
              <PricingCard scenario={scenario} delay={index * 90} reveal />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function GTMRoadmap() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return undefined;

    let frame = 0;
    const updateStep = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const nextStep = progress < STEP_SWITCHES[0] ? 0 : progress < STEP_SWITCHES[1] ? 1 : 2;
      setActiveStep((current) => (current === nextStep ? current : nextStep));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateStep);
    };

    updateStep();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="gtm-scroll-section" aria-labelledby="gtm-title">
      <div className="gtm-sticky-stage">
        <h2 id="gtm-title" className="gtm-title">{langPair(viabilityCopy.gtm.title)}</h2>
        <div className="gtm-content-frame">
          {viabilityCopy.gtm.steps.map((step, index) => (
            <article
              key={step.index}
              className={`gtm-step ${activeStep === index ? "is-active" : ""}`.trim()}
              aria-hidden={activeStep !== index}
            >
              <p className="gtm-index">{step.index}</p>
              <div className={`gtm-icon gtm-icon--${String(index + 1).padStart(2, "0")}`}>
                <img src={step.icon} alt="" />
              </div>
              <div className="gtm-copy">
                <h3>{langPair(step.title)}</h3>
                <p className="gtm-description">{langPair(step.body)}</p>
              </div>
            </article>
          ))}
        </div>
        <PersonaProportionStrip />
      </div>
    </section>
  );
}

function PersonaProportionStrip() {
  return (
    <section className="persona-strip" aria-label={langPair({ en: "Comprehensive persona proportion", zh: "用户画像综合占比" })}>
      {viabilityCopy.personas.map((persona) => (
        <article key={persona.id} className={`persona-item persona-item--${persona.id}`}>
          <div className="persona-copy">
            <h3 className="persona-title">{langPair(persona.title)}</h3>
            <p className="persona-description">{langPair(persona.description)}</p>
            <span className="persona-label">{langPair({ en: "Comprehensive Proportion", zh: "综合占比" })}</span>
          </div>
          <strong className="persona-percentage">{persona.percentage}</strong>
        </article>
      ))}
    </section>
  );
}

function ViabilityClosing() {
  return (
    <>
      <section className="viability-ending-main" aria-label={langPair({ en: "Closing statement", zh: "结语" })}>
        <RevealTextGroup className="viability-ending-content reveal-text-group--self">
          <img className="viability-closing-logo reveal-text-group__title" src="/assets/whuffl/common/logo-white.png" alt="Whuffl" />
          <p className="viability-closing-copy reveal-text-group__subtitle">{langPair(viabilityCopy.closing)}</p>
        </RevealTextGroup>
      </section>
      <CaseStudyFooter />
    </>
  );
}
