"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SCROLL_TOP_EVENT = "merseyside:scroll-top";

export function triggerSmoothScrollTop(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SCROLL_TOP_EVENT));
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      autoRaf: true,
      anchors: true,
      autoToggle: true,
      respectReducedMotion: true,
    });

    const handleScrollTop = () => {
      lenis.scrollTo(0, { duration: 1.15 });
    };

    window.addEventListener(SCROLL_TOP_EVENT, handleScrollTop);

    return () => {
      window.removeEventListener(SCROLL_TOP_EVENT, handleScrollTop);
      lenis.destroy();
    };
  }, []);

  return null;
}
