import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductInquiry from "@/components/ProductInquiry";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Products | The Dime Technology",
  description:
    "Select from The Dime Technology's product list — development, code review, project management and support services.",
  keywords:
    "tech services, software development services, code review, DevOps, project management, The Dime Technology",
  alternates: {
    canonical: "/product",
  },
  openGraph: {
    title: "Products | The Dime Technology",
    description:
      "Pick the services you need, enter your email and send an inquiry directly to our team.",
    type: "website",
    url: "https://thedimetechnology.com.np/product",
    locale: "en_US",
    siteName: "The Dime Technology",
    images: ["/assets/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | The Dime Technology",
    description:
      "Pick the services you need, enter your email and send an inquiry directly to our team.",
    images: ["/assets/og.png"],
  },
};

export default function ProductPage() {
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
            name: "Products",
            item: "https://thedimetechnology.com.np/product",
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Products — The Dime Technology",
        url: "https://thedimetechnology.com.np/product",
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.desc,
            provider: {
              "@type": "Organization",
              name: "The Dime Technology",
              url: "https://thedimetechnology.com.np",
            },
          },
        })),
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
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
            >
              Products
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Select a Product, <span className="gradient-text">Send an Inquiry</span>
            </h1>
            <p className="text-[#9898b0] text-lg max-w-2xl">
              Pick what you need from our product list, enter your email, and your
              inquiry lands straight in our inbox — we&apos;ll get back to you with
              the next steps.
            </p>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight mb-6">
            Choose Your <span className="gradient-text">Services</span>
          </h2>

          <ProductInquiry />
        </div>
      </main>
      <Footer />
    </>
  );
}
