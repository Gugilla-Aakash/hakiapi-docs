"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function MotionWrapper({
  children,
  delay = 0,
  className = "",
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.25,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom smooth curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
