import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-block text-center";

  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-to-r from-accent-gold to-accent-orange text-background hover:shadow-gold-glow",
    secondary:
      "bg-card border border-accent-gold/50 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold",
    outline:
      "bg-transparent border border-border text-text-primary hover:border-accent-gold hover:text-accent-gold",
  };

  const disabledStyles = "opacity-60 cursor-not-allowed pointer-events-none";
  const combinedClassName = `${baseStyles} ${variants[variant]} ${className} ${
    disabled ? disabledStyles : ""
  }`;

  if (href) {
    if (disabled) return <span className={combinedClassName}>{children}</span>;

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
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
