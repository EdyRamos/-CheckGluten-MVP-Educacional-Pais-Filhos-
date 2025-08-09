import React from "react";
import { motion } from "framer-motion";

const cls = (...s: (string | undefined)[]) => s.filter(Boolean).join(" ");

type Variant = "primary" | "secondary" | "danger";

interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Btn({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className,
  type = "button",
}: BtnProps) {
  const base =
    "px-4 py-2 rounded-2xl font-medium transition border select-none disabled:opacity-50";
  const styles: Record<Variant, string> = {
    primary: "bg-blue-600 text-white border-blue-600 hover:bg-blue-700",
    secondary: "bg-white text-gray-800 border-gray-300 hover:bg-gray-50",
    danger: "bg-red-600 text-white border-red-600 hover:bg-red-700",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cls(base, styles[variant], className)}
    >
      {children}
    </motion.button>
  );
}
