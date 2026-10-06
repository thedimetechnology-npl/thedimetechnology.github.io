import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { locations, otherMarkets, coreServices } from "@/data/locations";

export const metadata: Metadata = {
  title: "Software Development Company Worldwide | The Dime Technology",
  description:
    "The Dime Technology is a software development company serving clients in the USA, UK, UAE, Canada, Australia, India, Nepal and 40+ countries with custom software, web, mobile, AI and Odoo/ERP development.",
  keywords:
    "software development company worldwide, IT outsourcing company, custom software development services, offshore development team, hire software developers, web development company, mobile app development company, AI development company, Odoo development company",
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "Software Development Company Worldwide | The Dime Technology",
    description:
      "Custom software, web, mobile, AI and Odoo/ERP development for clients in 40+ countries — USA, UK, UAE, Canada, Australia, India and Nepal.",
    type: "website",
    url: "https://thedimetechnology.com.np/locations",
    locale: "en_US",
    siteName: "The Dime Technology",
    images: ["/assets/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Company Worldwide | The Dime Technology",
    description:
      "Custom software, web, mobile, AI and Odoo/ERP development for clients in 40+ countries — USA, UK, UAE, Canada, Australia, India and Nepal.",
    images: ["/assets/og.png"],
  },
};

const regions = Array.from(new Set(locations.map((l) => l.region)));

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
      ],
    },
    {
      "@type": "ItemList",
      name: "Software Development Company Worldwide — Country Pages",
      url: "https://thedimetechnology.com.np/locations",
      itemListElement: locations.map((l, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: l.title,
        url: `https://thedimetechnology.com.np/locations/${l.slug}`,
      })),
    },
  ],
};

export default function LocationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-36 pb-24 bg-[#0a0a0f] min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
            >
              Worldwide
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Software Development Company <span className="gradient-text">Worldwide</span>
            </h1>
            <p className="text-[#9898b0] text-lg max-w-3xl">
              The Dime Technology is an offshore software development company based in Nepal,
              serving clients in 40+ countries. Explore our country pages for local software
              development, IT outsourcing, web and mobile app development, AI development and
              Odoo ERP services.
            </p>
          </div>

          <div className="space-y-14">
            {regions.map((region) => (
              <section key={region}>
                <h2 className="text-2xl font-extrabold tracking-tight mb-6">
                  Software Development in <span className="gradient-text">{region}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {locations
                    .filter((l) => l.region === region)
                    .map((l) => (
                      <Link
                        key={l.slug}
                        href={`/locations/${l.slug}`}
                        className="group block bg-[#1a1a2e] border border-white/5 rounded-xl p-5 hover:border-[#065cc2]/50 transition-all"
                      >
                        <h3 className="font-bold mb-2 group-hover:text-[#2b7de0] transition-colors">
                          {l.title}
                        </h3>
                        <p className="text-[#9898b0] text-sm leading-relaxed line-clamp-3">
                          {l.intro.slice(0, 130)}…
                        </p>
                      </Link>
                    ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight mb-6">
                Also Serving <span className="gradient-text">These Markets</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherMarkets.map((m) => (
                  <div
                    key={m.region}
                    className="bg-[#1a1a2e] border border-white/5 rounded-xl p-5"
                  >
                    <h3 className="font-bold mb-2">{m.region}</h3>
                    <p className="text-[#9898b0] text-sm leading-relaxed">
                      {m.countries.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight mb-6">
                Our Core <span className="gradient-text">Services</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coreServices.map((s) => (
                  <div
                    key={s.title}
                    className="bg-[#1a1a2e] border border-white/5 rounded-xl p-5"
                  >
                    <h3 className="font-bold mb-2">{s.title}</h3>
                    <p className="text-[#9898b0] text-sm leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-16 text-center">
            <p className="text-[#9898b0] mb-6">
              Ready to start your project with a dedicated development team?
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
