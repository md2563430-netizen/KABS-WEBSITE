import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; // ✅ ADD THIS
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false, // ✅ ADD THIS
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-block text-center";

  const variants = {
    primary:
      "bg-gradient-to-r from-accent-gold to-accent-orange text-background hover:shadow-gold-glow",
    secondary:
      "bg-card border border-accent-gold/50 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold",
    outline:
      "bg-transparent border border-border text-text-primary hover:border-accent-gold hover:text-accent-gold",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className} ${
    disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
  }`;

  // ✅ Link mode: if disabled, render span so it can't navigate
  if (href) {
    if (disabled) {
      return <span className={combinedClassName}>{children}</span>;
    }
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled} // ✅ ADD THIS
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
