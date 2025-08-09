import React from "react";

const cls = (...s: (string | undefined)[]) => s.filter(Boolean).join(" ");

type Variant = "success" | "danger";

interface AlertProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export default function Alert({ children, variant = "success", className }: AlertProps) {
  const styles: Record<Variant, string> = {
    success: "bg-green-50 text-green-700 border border-green-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <div className={cls("p-3 rounded-xl text-sm", styles[variant], className)}>
      {children}
    </div>
  );
}
