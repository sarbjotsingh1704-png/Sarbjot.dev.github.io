"use client";

import { MotionConfig } from "framer-motion";

// Makes every Framer Motion animation respect the visitor's prefers-reduced-motion setting.
export default function Providers({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
