import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Calendar,
  Wrench,
  ArrowRight,
  Phone,
  CalendarCheck,
} from "lucide-react";
import { projects } from "@/content/projects";
import { getProject, getRelated, formatDate } from "@/lib/content-helpers";
import {
  SITE_NAME,
  PHONE,
  PHONE_HREF,
  BOOKING_URL,
} from "@/lib/constants";
import { RenderMarkdown } from "@/lib/render-md";
import { imageForInstallationType, tintForInstallationType } from "@/lib/project-image";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.techprohvac.com";

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Project not found" };
  }
  const title = `${project.installationType} Installation in ${project.city}, CA`;
  const canonical = `/blog/${project.slug}`;
  return {
    title,
    description: project.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: project.metaDescription,
      type: "article",
      url: canonical,
      publishedTime: project.completionDate,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description: project.metaDescription,
    },
  };
}

// Pre-render everything at build time — these pages are fully static.
export const dynamic = "force-static";

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  const related = getRelated(project);
  const title = `${project.installationType} Installation in ${project.city}, CA`;
  const citySlug = project.city.toLowerCase().replace(/\s+/g, "-");

  // Article schema — gives Google rich results and helps rank the post for
  // the installation-type × city query combo.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: project.metaDescription,
    datePublished: project.completionDate,
    dateModified: project.completionDate,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/Techpro_logo.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${project.slug}`,
    about: {
      "@type": "Service",
      name: `${project.installationType} Installation`,
      areaServed: { "@type": "City", name: project.city },
      provider: { "@type": "LocalBusiness", name: SITE_NAME },
    },
  };

  // Breadcrumb schema so Google shows the trail in search results.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Projects & Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${SITE_URL}/blog/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* HERO */}
      <section className="bg-navy text-white">
        <div className="container-site py-12 md:py-16">
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-white/80 transition-colors">
              Projects
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">{title}</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center h-[28px] px-3 rounded-full bg-orange/15 border border-orange/30 text-[11.5px] font-[800] text-orange tracking-[.1em] uppercase mb-5">
              {project.installationType}
            </span>
            <h1 className="text-[clamp(28px,4.4vw,48px)] font-[800] tracking-[-.02em] leading-[1.1] mb-5">
              {title}
            </h1>
            <div className="flex flex-wrap gap-5 text-[14px] text-white/70">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange" />
                {project.city}, CA {project.zip}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange" />
                Completed {formatDate(project.completionDate)}
              </span>
              {project.equipment && (
                <span className="inline-flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-orange" />
                  {project.equipment.brand.charAt(0) +
                    project.equipment.brand.slice(1).toLowerCase()}{" "}
                  · {project.equipment.capacity}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BODY + SIDEBAR */}
      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
            {/* Article */}
            <article className="bg-white rounded-[20px] border border-border-light p-6 sm:p-8 lg:p-10">
              <RenderMarkdown md={project.body} />

              {/* Internal link row — helps SEO + discovery */}
              <div className="mt-10 pt-6 border-t border-border-lighter flex flex-wrap gap-3">
                <Link
                  href={`/service-areas/${citySlug}`}
                  className="inline-flex items-center gap-2 h-[40px] px-4 rounded-full bg-light-bg border border-border-light text-[13.5px] font-[700] text-navy hover:border-orange/40 hover:text-orange transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  More projects in {project.city}
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 h-[40px] px-4 rounded-full bg-light-bg border border-border-light text-[13.5px] font-[700] text-navy hover:border-orange/40 hover:text-orange transition-colors"
                >
                  Our services
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 h-[40px] px-4 rounded-full bg-light-bg border border-border-light text-[13.5px] font-[700] text-navy hover:border-orange/40 hover:text-orange transition-colors"
                >
                  All projects
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 space-y-5">
              {/* Equipment detail */}
              {project.allEquipment.length > 0 && (
                <div className="bg-white rounded-[20px] border border-border-light p-6 sm:p-7">
                  <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-3">
                    Equipment Installed
                  </p>
                  <ul className="space-y-3.5">
                    {project.allEquipment.map((e, i) => (
                      <li key={i} className="text-[14px] leading-relaxed">
                        <p className="font-[700] text-navy">
                          {e.brand.charAt(0) + e.brand.slice(1).toLowerCase()}{" "}
                          {e.capacity && `· ${e.capacity}`}
                        </p>
                        {e.model && (
                          <p className="text-[13px] text-text-muted font-mono mt-0.5">
                            {e.model}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA card */}
              <div className="bg-navy rounded-[20px] p-6 sm:p-7 text-white">
                <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-3">
                  Free Estimate
                </p>
                <h3 className="text-[20px] sm:text-[22px] font-[800] leading-[1.2] tracking-tight mb-3">
                  Thinking about a similar install?
                </h3>
                <p className="text-[14px] text-white/70 leading-relaxed mb-5">
                  Get a free estimate from our team. We serve every ZIP in San
                  Mateo County and respond fast.
                </p>
                <div className="space-y-3">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-[48px] bg-orange hover:bg-orange-hover text-white font-[700] text-[14.5px] rounded-full transition-colors shadow-[0_8px_24px_-10px_rgba(241,90,41,0.6)]"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Schedule Online
                  </a>
                  <a
                    href={PHONE_HREF}
                    className="flex items-center justify-center gap-2 h-[48px] bg-white/10 hover:bg-white/15 border border-white/20 text-white font-[700] text-[14.5px] rounded-full transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {PHONE}
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* Related projects */}
          {related.length > 0 && (
            <div className="mt-14 lg:mt-20">
              <h2 className="text-[22px] sm:text-[28px] font-[800] text-navy tracking-tight mb-6">
                Similar projects
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group bg-white rounded-[20px] border border-border-light overflow-hidden flex flex-col hover:border-orange/40 hover:shadow-[0_18px_40px_-18px_rgba(10,19,41,0.18)] transition-all duration-300"
                  >
                    <div className={`relative aspect-[4/3] ${tintForInstallationType(p.installationType)} overflow-hidden`}>
                      <Image
                        src={imageForInstallationType(p.installationType)}
                        alt={`${p.installationType} installation in ${p.city}, CA`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 inline-flex items-center h-[24px] px-2.5 rounded-full bg-white/95 backdrop-blur text-[11px] font-[800] text-orange tracking-[.08em] uppercase shadow-sm">
                        {p.installationType}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[16px] sm:text-[17px] font-[800] text-navy leading-[1.3] tracking-tight group-hover:text-orange transition-colors">
                        {p.installationType} Installation in {p.city}
                      </h3>
                      <p className="text-[12.5px] text-text-muted mt-2">
                        {formatDate(p.completionDate)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
