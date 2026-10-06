import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { locations, coreServices, type LocationPage } from "@/data/locations";

type Params = { slug: string };

export const dynamic = "force-static";

export function generateStaticParams(): Params[] {
  return locations.map((l) => ({ slug: l.slug }));
}

function getLocation(slug: string): LocationPage | undefined {
  return locations.find((l) => l.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return { title: "Location Not Found | The Dime Technology" };

  const description = `Looking for a ${loc.title}? The Dime Technology delivers custom software development, web and mobile app development, AI development and Odoo ERP solutions for businesses in ${loc.name}.`;
  const url = `https://thedimetechnology.com.np/locations/${loc.slug}`;

  return {
    title: `${loc.title} | The Dime Technology`,
    description,
    keywords: loc.keywords.join(", "),
    alternates: {
      canonical: `/locations/${loc.slug}`,
    },
    openGraph: {
      title: `${loc.title} | The Dime Technology`,
      description,
      type: "website",
      url,
      locale: "en_US",
      siteName: "The Dime Technology",
      images: ["/assets/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${loc.title} | The Dime Technology`,
      description,
      images: ["/assets/og.png"],
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const highlight = loc.title.endsWith(loc.name)
    ? loc.name
    : loc.title.slice(loc.title.lastIndexOf(" ") + 1);
  const h1Prefix = loc.title.slice(0, loc.title.length - highlight.length);
  const url = `https://thedimetechnology.com.np/locations/${loc.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://thedimetechnology.com.np/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Worldwide",
            item: "https://thedimetechnology.com.np/locations",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: loc.title,
            item: url,
          },
        ],
      },
      {
        "@type": "Service",
        serviceType: loc.title,
        name: loc.title,
        url,
        description: loc.intro,
        provider: {
          "@type": "Organization",
          name: "The Dime Technology",
          url: "https://thedimetechnology.com.np",
        },
        areaServed: {
          "@type": "Country",
          name: loc.name,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-36 pb-24 bg-[#0a0a0f] min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            href="/locations"
            className="inline-block text-sm text-[#9898b0] hover:text-[#2b7de0] transition-colors mb-8"
          >
            ← All locations
          </Link>
          <div className="mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
            >
              {loc.region}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {h1Prefix}
              <span className="gradient-text">{highlight}</span>
            </h1>
            <p className="text-[#9898b0] text-lg max-w-3xl">{loc.intro}</p>
          </div>

          <section className="mb-14">
            <h2 className="text-2xl font-extrabold tracking-tight mb-6">
              Our Services in <span className="gradient-text">{loc.name}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreServices.map((s) => (
                <div
                  key={s.title}
                  className="bg-[#1a1a2e] border border-white/5 rounded-xl p-5 hover:border-[#065cc2]/30 transition-all"
                >
                  <h3 className="font-bold mb-2">{s.title}</h3>
                  <p className="text-[#9898b0] text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-extrabold tracking-tight mb-6">
              Why Choose <span className="gradient-text">The Dime Technology</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  t: "Offshore Development Team",
                  d: `A dedicated development team aligned to ${loc.name} time zones, with clear English communication and daily stand-ups.`,
                },
                {
                  t: "Fixed & Flexible Pricing",
                  d: "Hire software developers on dedicated, hourly or project-based contracts — no hidden agency markups.",
                },
                {
                  t: "Full Lifecycle Delivery",
                  d: "From discovery and architecture to deployment, DevOps and 24/7 support — one partner for the whole build.",
                },
                {
                  t: "Proven Tech Stack",
                  d: "React, Next.js, Node.js, Flutter, Laravel, Python, PostgreSQL and cloud-native infrastructure.",
                },
                {
                  t: "Quality Engineering",
                  d: "Code reviews, automated testing and CI/CD pipelines on every engagement for reliable, scalable releases.",
                },
                {
                  t: "Fast Onboarding",
                  d: "Start with a pilot sprint within days and scale your team up or down as priorities change.",
                },
              ].map((b) => (
                <div
                  key={b.t}
                  className="bg-[#1a1a2e] border border-white/5 rounded-xl p-5"
                >
                  <h3 className="font-bold mb-2">{b.t}</h3>
                  <p className="text-[#9898b0] text-sm leading-relaxed">{b.d}</p>
                </div>
              ))}
            </div>
          </section>

          {loc.cities && loc.cities.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-extrabold tracking-tight mb-6">
                Top Cities We Serve in <span className="gradient-text">{loc.name}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {loc.cities.map((c) => (
                  <div
                    key={c.name}
                    className="bg-[#1a1a2e] border border-white/5 rounded-xl p-5"
                  >
                    <h3 className="font-bold mb-2 capitalize">{c.keyword}</h3>
                    <p className="text-[#9898b0] text-sm leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="text-center bg-[#111118] border border-white/5 rounded-2xl p-10">
            <h2 className="text-2xl font-extrabold tracking-tight mb-3">
              Start Your Project in <span className="gradient-text">{loc.name}</span>
            </h2>
            <p className="text-[#9898b0] mb-6 max-w-2xl mx-auto">
              Tell us about your idea and get a free estimate from our software development
              team — typically within 24 hours.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/product" className="btn-primary">
                Get a Quote
              </Link>
              <Link
                href="/#contact"
                className="px-7 py-2.5 rounded-full text-sm font-semibold border border-white/10 text-white hover:border-[#065cc2] hover:bg-[#065cc2]/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
