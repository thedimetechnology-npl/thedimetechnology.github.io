import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Comparison from "@/components/Comparison";
import Services from "@/components/Services";

import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const BASE_URL = "https://thedimetechnology.com.np";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "The Dime Technology",
      url: `${BASE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/assets/logo.png`,
        width: 140,
        height: 140,
      },
      description:
        "Your Freelance Tech Partner. From concept to completion, we turn ideas into production-ready web, mobile and cloud projects with an elite engineering team.",
      sameAs: [
        "https://www.facebook.com/thedimetechnology/",
        "https://www.linkedin.com/in/shahidalam-nepal/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+977 9801024024",
        email: "info@thedimetechnology.com.np",
      },
      founder: { "@id": `${BASE_URL}/#person` },
      areaServed: [{ "@type": "Country", name: "Nepal" }, "Worldwide"],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: "The Dime Technology",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#professionalservice`,
      name: "The Dime Technology",
      url: `${BASE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/assets/logo.png`,
        width: 140,
        height: 140,
      },
      image: `${BASE_URL}/assets/og.png`,
      description:
        "The Dime Technology is a freelance tech team based in Lalitpur, Nepal, serving clients worldwide. From concept to completion, we turn ideas into production-ready web, mobile and cloud projects with an elite engineering team.",
      slogan: "Your Freelance Tech Partner",
      telephone: "+977 9801024024",
      email: "info@thedimetechnology.com.np",
      priceRange: "££",
      currenciesAccepted: "GBP",
      availableLanguage: "English",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Imadol",
        addressLocality: "Lalitpur",
        addressRegion: "Bagmati Province",
        addressCountry: "NP",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 27.6588,
        longitude: 85.3247,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
      areaServed: [{ "@type": "Country", name: "Nepal" }, "Worldwide"],
      sameAs: [
        "https://www.facebook.com/thedimetechnology/",
        "https://www.linkedin.com/in/shahidalam-nepal/",
      ],
      makesOffer: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.desc,
        },
        url: `${BASE_URL}/product`,
      })),
      knowsAbout: services.map((s) => s.title),
    },
    {
      "@type": "Service",
      name: "Web, Mobile and Cloud Development",
      serviceType: "Custom software development",
      description:
        "End-to-end design, development and deployment of web, mobile and cloud projects — from concept to completion.",
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: "Worldwide",
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Shahid Alam",
      jobTitle: "Founder & CEO",
      url: "https://www.linkedin.com/in/shahidalam-nepal/",
      image: `${BASE_URL}/assets/team/shahid.jpg`,
      worksFor: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <Clients />
      <About />
      <Comparison />
      <Services />
      <Process />
      <TechStack />
      <Team />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
