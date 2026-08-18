"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise into view once, respecting reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Stagger a set of children as they scroll in. */
export function RevealGroup({
  children,
  className,
  step = 0.08,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : step } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? {} : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Animated number that counts up when scrolled into view. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.4,
  separator = false,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  separator?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  const fixed = val.toFixed(decimals);
  const text = separator
    ? Number(fixed).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : fixed;

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

export { motion };
