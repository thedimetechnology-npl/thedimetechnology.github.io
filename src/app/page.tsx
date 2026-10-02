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
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
        email: "info@thedimetechnology.com.np",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: "The Dime Technology",
      publisher: { "@id": `${BASE_URL}/#organization` },
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
      name: "Shahid Alam",
      jobTitle: "Founder & CEO",
      url: "https://www.linkedin.com/in/shahidalam-nepal/",
      image: `${BASE_URL}/assets/team/shahid.jpg`,
      worksFor: { "@id": `${BASE_URL}/#organization` },
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
      <Contact />
      <Footer />
    </>
  );
}
