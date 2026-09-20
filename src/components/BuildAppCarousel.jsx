import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const APP = (name) => `/assets/whuffl/page-05-build/app/hignfi/${name}`;
const SCREENS = [["01-starting-page.png", "Starting page"], ["02-create-account.png", "Sign in & Log in"], ["03-basic-information.png", "Upload image"], ["04-collar-connect.png", "connect collar"], ["05-custom-emoji.png", "Build on emoji", "personalize"], ["06-homepage.png", "Homepage", "personalize"], ["07-map.png", "Location select", "prepare"], ["08-map-select.png", "Map select", "prepare"], ["09-walking-data-record.png", "Data record", "walk"], ["10-AR-map.png", "Live map", "understand"], ["11-walk-short-report.png", "Pawsloop", "reflect"], ["12-walk-report-detail.png", "Walk report", "reflect"], ["13-dog-avatar.png", "Dog profile"]].map(([file, title, stage]) => ({ file, title, stage }));
const STEPS = [{ id: "personalize", title: "Personalize", body: "Dog profile + custom emoji.", screen: 4 }, { id: "prepare", title: "Prepare", body: "Route and local scent / context planning.", screen: 6 }, { id: "walk", title: "Walk screen-free", body: "Collar provides a glanceable state cue.", screen: 8 }, { id: "understand", title: "Understand", body: "Live map / event interpretation when needed.", screen: 9 }, { id: "reflect", title: "Reflect", body: "Walk report + narrative + long-term baseline.", screen: 10 }];

export default function BuildAppCarousel() {
  const carousel = useRef(null);
  const slides = useRef([]);
  const [activeStep, setActiveStep] = useState("personalize");
  const [centerIndex, setCenterIndex] = useState(4);
  const syncCenter = useCallback(() => {
    const root = carousel.current;
    if (!root) return;
    const center = root.scrollLeft + root.clientWidth / 2;
    const nearest = slides.current.reduce((best, slide, index) => {
      if (!slide) return best;
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity }).index;
    setCenterIndex(nearest);
    if (SCREENS[nearest]?.stage) setActiveStep(SCREENS[nearest].stage);
  }, []);
  const reveal = (index, behavior = "smooth") => {
    const root = carousel.current;
    const slide = slides.current[index];
    if (root && slide) root.scrollTo({ left: slide.offsetLeft - (root.clientWidth - slide.offsetWidth) / 2, behavior });
    setCenterIndex(index);
    if (SCREENS[index]?.stage) setActiveStep(SCREENS[index].stage);
  };
  useLayoutEffect(() => { reveal(4, "auto"); }, []);
  useEffect(() => {
    const root = carousel.current;
    if (!root) return undefined;
    root.addEventListener("scroll", syncCenter, { passive: true });
    syncCenter();
    return () => root.removeEventListener("scroll", syncCenter);
  }, [syncCenter]);
  return <div className="build-app-experience"><div className="app-carousel" ref={carousel} aria-label="Whuffl app screens">{SCREENS.map((screen, index) => <figure className={`app-slide ${Math.abs(index - centerIndex) <= 1 ? "is-near" : ""}`} data-index={index} ref={(node) => { slides.current[index] = node; }} key={screen.file}><img src={APP(screen.file)} alt={screen.title} loading="lazy" /><figcaption>{screen.title}</figcaption></figure>)}</div><ol className="experience-flow" aria-label="Five-step experience flow">{STEPS.map((step) => <li key={step.id} className={activeStep === step.id ? "is-active" : ""}><button type="button" onClick={() => reveal(step.screen)} aria-current={activeStep === step.id ? "step" : undefined}><span className="experience-flow-dot" /><strong>{step.title}</strong><small>{step.body}</small></button></li>)}</ol></div>;
}
