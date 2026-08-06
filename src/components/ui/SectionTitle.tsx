interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <h2
      className={`text-[clamp(30px,3.2vw,44px)] font-[800] tracking-[-.02em] text-navy leading-[1.15] ${className}`}
    >
      {children}
    </h2>
  );
}
