import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions governing your use of the ${SITE_NAME} website and services.`,
};

const LAST_UPDATED = "September 17, 2026";

type Section = {
  heading: string;
  paragraphs: string[];
};

const sections: Section[] = [
  {
    heading: "Introduction",
    paragraphs: [
      `These Terms & Conditions (“Terms”) govern your use of the ${SITE_NAME} website (“Site”). By using the Site, you agree to these Terms. If you do not agree, please do not use the Site.`,
    ],
  },
  {
    heading: "Use of the Site",
    paragraphs: [
      "You agree to use the Site only for lawful purposes and not in any manner that could damage, disable, interfere with, or impair the Site or another person's use of it.",
      "Information provided through the Site, including service descriptions, pricing information, estimates, rebates, financing information, and availability, is provided for general informational purposes and may be subject to change.",
    ],
  },
  {
    heading: "Online Scheduling & Service Requests",
    paragraphs: [
      "Submitting an appointment request or scheduling through the Site does not guarantee service availability or constitute acceptance of a project, estimate, or contract.",
      "Appointments may be subject to confirmation, rescheduling, cancellation, service-area restrictions, and other applicable service conditions.",
    ],
  },
  {
    heading: "Estimates & Pricing",
    paragraphs: [
      "Any pricing displayed on the Site is for informational purposes unless expressly stated otherwise. Final pricing may depend on equipment selection, site conditions, labor requirements, permits, materials, and other project-specific factors.",
      "Formal estimates, proposals, and service agreements may be subject to separate terms and conditions.",
    ],
  },
  {
    heading: "Rebates & Incentives",
    paragraphs: [
      `Information regarding rebates, tax credits, financing programs, or other incentives is provided for informational purposes. Eligibility, funding, program requirements, and incentive amounts are determined by the applicable program administrator or government agency and are not guaranteed by ${SITE_NAME}.`,
    ],
  },
  {
    heading: "Intellectual Property",
    paragraphs: [
      `All content on the Site, including text, graphics, logos, photographs, images, and other materials, is owned by or licensed to ${SITE_NAME} and is protected by applicable intellectual property laws.`,
      "Content may not be reproduced, distributed, or used without prior written permission.",
    ],
  },
  {
    heading: "Limitation of Liability",
    paragraphs: [
      `To the fullest extent permitted by applicable law, ${SITE_NAME} shall not be liable for indirect, incidental, special, or consequential damages arising from or related to the use of, or inability to use, the Site.`,
    ],
  },
  {
    heading: "Third-Party Services & Links",
    paragraphs: [
      `The Site may contain links to or integrations with third-party websites, scheduling platforms, financing providers, rebate programs, manufacturers, or other services. ${SITE_NAME} is not responsible for the content, availability, privacy practices, or operation of third-party services.`,
    ],
  },
  {
    heading: "Changes to These Terms",
    paragraphs: [
      "We may update these Terms periodically. Changes will be posted on this page with an updated effective date.",
    ],
  },
  {
    heading: "Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of the State of California, without regard to its conflict-of-law principles.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-site py-14 md:py-20">
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">Terms &amp; Conditions</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-[clamp(32px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.08] mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-[15px] text-white/60">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>
      </section>

      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <div className="max-w-3xl mx-auto bg-white rounded-[18px] border border-border-light p-6 sm:p-10 lg:p-12">
            {sections.map((section) => (
              <div key={section.heading} className="mb-8 last:mb-0">
                <h2 className="text-[22px] sm:text-[24px] font-[800] text-navy leading-tight tracking-tight mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-[15px] sm:text-[16px] text-text-dark leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
