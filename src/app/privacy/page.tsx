import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, discloses, and protects information when you visit our website or use our online services.`,
};

const LAST_UPDATED = "September 17, 2026";

type Section = {
  heading: string;
  paragraphs?: string[];
  bullets?: { label?: string; text: string }[];
};

const sections: Section[] = [
  {
    heading: "Introduction",
    paragraphs: [
      `${SITE_NAME} (“we,” “our,” or “us”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and protect information when you visit our website or use our online services.`,
    ],
  },
  {
    heading: "Information We Collect",
    bullets: [
      {
        label: "Contact Information",
        text: "We may collect your name, email address, phone number, service address, and other information you provide when requesting an HVAC estimate, scheduling service, submitting a contact form, or communicating with us.",
      },
      {
        label: "Service Information",
        text: "We may collect information about your heating and cooling equipment, requested services, property, appointment details, and service history.",
      },
      {
        label: "Payment Information",
        text: "If you make a payment through our Site or a third-party payment provider, payment information may be collected and processed as necessary to complete the transaction.",
      },
      {
        label: "Usage & Device Data",
        text: "We may automatically collect information such as your IP address, browser type, device type, pages visited, referring website, and the date and time of your visit.",
      },
      {
        label: "Cookies & Analytics",
        text: "We may use cookies and similar technologies to operate the Site, remember preferences, understand website traffic, improve user experience, and measure the effectiveness of advertising and marketing campaigns.",
      },
    ],
  },
  {
    heading: "How We Use Your Information",
    paragraphs: ["We may use information collected through the Site to:"],
    bullets: [
      { text: "Provide HVAC estimates, repairs, maintenance, installations, and other requested services." },
      { text: "Schedule and manage appointments." },
      { text: "Respond to questions and customer service requests." },
      { text: "Process payments and transactions." },
      { text: "Communicate with you regarding appointments, estimates, projects, and services." },
      { text: "Improve our website, services, and customer experience." },
      { text: "Analyze website traffic and marketing performance." },
      { text: "Send promotional communications where permitted by law and subject to applicable consent requirements." },
      { text: "Maintain security, prevent fraud, and comply with applicable legal requirements." },
    ],
  },
  {
    heading: "How We Share Your Information",
    paragraphs: [
      "We do not sell or rent your personal information.",
      "We may disclose information to service providers that assist us with website hosting, online scheduling, customer management, payment processing, communications, analytics, advertising, and other business operations.",
      "We may also disclose information when required by law, to protect our legal rights, or in connection with a business transaction.",
    ],
  },
  {
    heading: "Cookies & Tracking Technologies",
    paragraphs: [
      "Our Site may use cookies, analytics tools, advertising technologies, and similar tracking technologies to understand how visitors use the Site and to improve our services and marketing.",
      "Depending on applicable law, you may have choices regarding certain cookies or the use of your information for advertising purposes.",
    ],
  },
  {
    heading: "Data Security",
    paragraphs: [
      "We use reasonable administrative, technical, and organizational safeguards designed to protect personal information from unauthorized access, loss, misuse, alteration, or disclosure.",
      "However, no internet transmission or electronic storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    heading: "Your Privacy Rights",
    paragraphs: [
      "Depending on where you reside and applicable law, you may have rights regarding your personal information, including the right to request access to, correction of, or deletion of certain personal information.",
      `You may submit privacy-related requests by contacting ${SITE_NAME}.`,
    ],
  },
  {
    heading: "Third-Party Services",
    paragraphs: [
      "Our Site may contain links to or integrations with third-party services, including scheduling platforms, payment processors, financing providers, rebate programs, manufacturers, analytics providers, or other websites.",
      `Their privacy practices are governed by their respective privacy policies, and ${SITE_NAME} is not responsible for their privacy practices.`,
    ],
  },
  {
    heading: "Children's Privacy",
    paragraphs: [
      "Our Site and HVAC services are not directed toward children under 13, and we do not knowingly collect personal information from children under 13 through the Site.",
    ],
  },
  {
    heading: "Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy periodically. Changes will be posted on this page along with an updated effective date.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-site py-14 md:py-20">
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">Privacy Policy</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-[clamp(32px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.08] mb-4">
              Privacy Policy
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
                {section.paragraphs?.map((p, i) => (
                  <p
                    key={i}
                    className="text-[15px] sm:text-[16px] text-text-dark leading-relaxed mb-4 last:mb-0"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 space-y-3">
                    {section.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="text-[15px] sm:text-[16px] text-text-dark leading-relaxed pl-6 relative"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[.6em] w-2 h-2 rounded-full bg-orange"
                        />
                        {b.label ? (
                          <>
                            <span className="font-[700]">{b.label}:</span> {b.text}
                          </>
                        ) : (
                          b.text
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
