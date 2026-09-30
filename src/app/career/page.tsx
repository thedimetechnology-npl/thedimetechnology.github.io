import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerList from "@/components/CareerList";
import type { AdminCareer } from "@/lib/admin-types";

export const metadata: Metadata = {
  title: "Careers | The Dime Technology",
  description:
    "Open positions at The Dime Technology — join our remote-friendly team building web, mobile and cloud products for clients worldwide.",
  keywords:
    "careers, jobs, hiring, software developer jobs Nepal, remote tech jobs, The Dime Technology",
  openGraph: {
    title: "Careers | The Dime Technology",
    description: "Open positions at The Dime Technology — web, mobile and cloud roles.",
    type: "website",
  },
};

async function loadCareers(): Promise<AdminCareer[]> {
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "data", "admin", "careers.json"),
      "utf8"
    );
    const items = JSON.parse(raw) as AdminCareer[];
    return items.filter((i) => i.active !== false);
  } catch {
    return [];
  }
}

export default async function CareerPage() {
  const careers = await loadCareers();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Open Positions — The Dime Technology",
    url: "/career",
    itemListElement: careers.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "JobPosting",
        title: c.title,
        description: c.description,
        employmentType: c.type.toUpperCase().replace(/-/g, "_"),
        hiringOrganization: {
          "@type": "Organization",
          name: "The Dime Technology",
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: c.location,
          },
        },
        employmentUnit: c.experience || undefined,
      },
    })),
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
          <div className="mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
            >
              Careers
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-[#9898b0] text-lg max-w-2xl">
              We&apos;re a remote-friendly tech team building web, mobile and cloud products
              for clients around the world. Find your next role and grow with us.
            </p>
          </div>

          <CareerList initial={careers} />
        </div>
      </main>
      <Footer />
    </>
  );
}
