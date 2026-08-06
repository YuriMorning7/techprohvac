import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  showArrow?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-orange text-white hover:bg-orange-hover border border-transparent",
  secondary:
    "bg-transparent text-navy border-[1.5px] border-navy hover:bg-navy hover:text-white",
  outline:
    "bg-transparent text-white border-[1.5px] border-white/35 hover:border-white/60",
  ghost:
    "bg-transparent text-navy hover:bg-light-bg border border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-[38px] px-4 text-[13.5px]",
  md: "h-[46px] px-6 text-[14.5px]",
  lg: "h-[56px] px-8 text-[15.5px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  onClick,
  showArrow = false,
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-[700] rounded-[--radius-button] transition-all duration-200 cursor-pointer whitespace-nowrap";

  const classes = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className="w-4 h-4" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
