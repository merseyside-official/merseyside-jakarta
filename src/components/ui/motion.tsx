"use client";

import React from "react";
import { motion, MotionConfig, useScroll, useSpring } from "framer-motion";
import SmoothScroll from "@/components/ui/smooth-scroll";

export const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

export function MotionShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {children}
    </MotionConfig>
  );
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-[60] pointer-events-none will-change-transform"
    />
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 14,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some", margin: "0px 0px -24px 0px" }}
      transition={{ duration: 0.72, delay, ease: EDITORIAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const BAR_PROFILES = [
  { max: "100%", dur: 0.55, delay: 0 },
  { max: "65%", dur: 0.45, delay: 0.12 },
  { max: "90%", dur: 0.62, delay: 0.05 },
  { max: "50%", dur: 0.5, delay: 0.18 },
];

export function EqualizerBars({
  active = false,
  barClassName = "bg-[#FF2222]",
}: {
  active?: boolean;
  barClassName?: string;
}) {
  return (
    <span className="inline-flex items-end gap-[2px] h-3.5 shrink-0" aria-hidden="true">
      {BAR_PROFILES.map((bar, idx) => (
        <motion.span
          key={idx}
          className={`w-[2.5px] rounded-full ${barClassName}`}
          animate={
            active
              ? { height: ["22%", bar.max, "30%", "85%", "22%"] }
              : { height: idx % 2 === 0 ? "32%" : "22%" }
          }
          transition={
            active
              ? {
                  duration: bar.dur,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: bar.delay,
                }
              : { duration: 0.25 }
          }
        />
      ))}
    </span>
  );
}
