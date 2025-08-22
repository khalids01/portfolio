"use client";
import { motion } from "motion/react";

export function AnimatedName({ name }: { name: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-lg font-semibold tracking-tight text-transparent md:text-xl"
      style={{ WebkitTextFillColor: "transparent" }}
    >
      {name}
    </motion.span>
  );
}
