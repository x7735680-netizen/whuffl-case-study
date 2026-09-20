import { useEffect, useState } from "react";

export default function useCountUp(value, { enabled = false, delay = 900, duration = 720 } = {}) {
  const target = Number(value);
  const [displayValue, setDisplayValue] = useState(target);

  useEffect(() => {
    if (!enabled || !Number.isFinite(target)) {
      setDisplayValue(target);
      return undefined;
    }

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplayValue(target);
      return undefined;
    }

    setDisplayValue(0);
    let frame = 0;
    let timer = 0;
    const start = () => {
      const startedAt = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(target * eased));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    };

    timer = window.setTimeout(start, delay);
    return () => {
      window.clearTimeout(timer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled, target, delay, duration]);

  return displayValue;
}
