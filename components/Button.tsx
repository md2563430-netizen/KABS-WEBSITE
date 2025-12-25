import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/**
 * Link-style button (when href is provided)
 */
type LinkButtonProps = CommonProps & {
  href: string;
  disabled?: boolean; // Prevents navigation when true
  onClick?: never;
  type?: never;
};

/**
 * Native button (when href is NOT provided)
 */
type NativeButtonProps = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type ButtonProps = LinkButtonProps | NativeButtonProps;

export default function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;

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

  const isDisabled = "disabled" in props && !!props.disabled;
  const disabledStyles = "opacity-60 cursor-not-allowed pointer-events-none";

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className} ${
    isDisabled ? disabledStyles : ""
  }`;

  // LINK MODE
  if ("href" in props && props.href) {
    // If disabled, render as a <span> so it looks like a button but won't navigate.
    if (props.disabled) {
      return <span className={combinedClassName}>{children}</span>;
    }

    return (
      <Link href={props.href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  // BUTTON MODE
  const { onClick, type = "button", disabled } = props;

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
