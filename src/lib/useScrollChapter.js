import { useEffect, useState } from "react";

/**
 * useScrollChapter — IntersectionObserver that reports the index of the
 * topmost section above 30% of the viewport. Returns -1 when no section
 * is yet active.
 */
export default function useScrollChapter(sectionIds, options = {}) {
  const threshold = options.threshold ?? 0.3;
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionIds.length) return undefined;
    if (!("IntersectionObserver" in window)) {
      setActive(0);
      return undefined;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        if (visible.size > 0) {
          // pick the section with the highest visible ratio
          let best = -1;
          let bestRatio = -1;
          for (const [id, ratio] of visible) {
            const idx = sectionIds.indexOf(id);
            if (idx >= 0 && ratio > bestRatio) {
              best = idx;
              bestRatio = ratio;
            }
          }
          if (best >= 0) setActive(best);
        }
      },
      { threshold: [0, threshold, 0.6, 0.9] }
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sectionIds, threshold]);

  return active;
}
