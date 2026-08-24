"use client";
import { motion } from "motion/react";
import { useUser } from "@skycanvasstudio/sso/react";

export function AnimatedName() {
  const { user } = useUser();
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-xl font-semibold tracking-tight text-transparent md:text-2xl"
      style={{ WebkitTextFillColor: "transparent" }}
    >
      {user?.name}
    </motion.span>
  );
}
