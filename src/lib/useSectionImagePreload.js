import { useEffect, useRef, useState } from "react";

const DEFAULT_ROOT_MARGIN = "1500px 0px";

/**
 * Starts every image in a section as one cache-warming batch before the
 * section reaches the viewport. Images opt in with data-preload-src.
 */
export default function useSectionImagePreload({ rootMargin = DEFAULT_ROOT_MARGIN } = {}) {
  const sectionRef = useRef(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return undefined;

    let loaded = false;
    const setImageSources = () => {
      section.querySelectorAll("img[data-preload-src]").forEach((image) => {
        const src = image.getAttribute("data-preload-src");
        if (!src) return;
        image.src = src;
        image.removeAttribute("data-preload-src");
        image.loading = "eager";
      });
    };
    const loadImages = () => {
      if (loaded) return;
      loaded = true;
      setImageSources();
      setHasLoaded(true);
    };

    const mutations = "MutationObserver" in window
      ? new MutationObserver(() => {
        if (loaded) setImageSources();
      })
      : null;
    mutations?.observe(section, { subtree: true, attributes: true, attributeFilter: ["data-preload-src"] });

    if (!("IntersectionObserver" in window)) {
      loadImages();
      return () => mutations?.disconnect();
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      loadImages();
      observer.disconnect();
    }, { rootMargin, threshold: 0 });

    observer.observe(section);
    return () => {
      observer.disconnect();
      mutations?.disconnect();
    };
  }, [rootMargin]);

  return [sectionRef, hasLoaded];
}
