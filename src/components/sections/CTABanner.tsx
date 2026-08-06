import Button from "@/components/ui/Button";

interface CTABannerProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTABanner({
  heading = "Not sure what your system needs?",
  description = "Our certified technicians will diagnose the issue and recommend the best solution for your home.",
  buttonText = "Schedule a Consultation",
  buttonHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="bg-navy">
      <div className="container-site py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="max-w-[560px]">
            <h2 className="text-[clamp(24px,2.8vw,36px)] font-[800] text-white leading-tight mb-2">
              {heading}
            </h2>
            <p className="text-[17px] text-white/65 leading-relaxed">
              {description}
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            href={buttonHref}
            showArrow
            className="shrink-0"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
