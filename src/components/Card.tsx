import React from "react";
import { motion } from "framer-motion";

const cls = (...s: (string | undefined)[]) => s.filter(Boolean).join(" ");

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Card({ children, onClick, className }: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      whileHover={onClick ? { y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
      className={cls(
        "p-4 rounded-2xl border bg-white shadow-sm",
        onClick ? "cursor-pointer" : undefined,
        className
      )}
    >
      {children}
    </motion.div>
  );
}
