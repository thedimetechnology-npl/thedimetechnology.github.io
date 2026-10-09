import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingWizard from "@/components/BookingWizard";

export const metadata: Metadata = {
  title: "Book a Consultation | The Dime Technology",
  description:
    "Book a free 30-minute consultation with The Dime Technology — discuss your project, get solution recommendations, timeline and budget guidance from our experts.",
  keywords:
    "book a consultation, free tech consultation, hire software developers, custom software development company, IT consulting, The Dime Technology",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Book a Consultation | The Dime Technology",
    description:
      "Book a free 30-minute consultation — discuss your project with our software, web, mobile and AI experts.",
    type: "website",
    url: "https://thedimetechnology.com.np/book",
    locale: "en_US",
    siteName: "The Dime Technology",
    images: ["/assets/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Consultation | The Dime Technology",
    description:
      "Book a free 30-minute consultation — discuss your project with our software, web, mobile and AI experts.",
    images: ["/assets/og.png"],
  },
};

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
          name: "Book a Consultation",
          item: "https://thedimetechnology.com.np/book",
        },
      ],
    },
    {
      "@type": "Service",
      serviceType: "IT Consulting",
      name: "Free 30-Minute Consultation",
      url: "https://thedimetechnology.com.np/book",
      description:
        "Free 30-minute consultation to discuss your project requirements, technology stack, timeline and budget.",
      provider: {
        "@type": "Organization",
        name: "The Dime Technology",
        url: "https://thedimetechnology.com.np",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-36 pb-24 bg-[#0a0a0f] min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
            >
              Book a Free Consultation
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Let&apos;s Build <span className="gradient-text">Something Amazing.</span>
            </h1>
            <p className="text-[#9898b0] text-lg max-w-2xl mx-auto">
              Book a free consultation with our experts to discuss your project, business goals
              and technical requirements. We&apos;ll recommend the best solution, timeline,
              technology stack and development strategy for your business.
            </p>
          </div>

          <BookingWizard />
        </div>
      </main>
      <Footer />
    </>
  );
}
