interface SectionLabelProps {
  children: string;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span
      className="inline-block text-[13px] font-[700] tracking-[.13em] uppercase text-orange"
    >
      {children}
    </span>
  );
}
