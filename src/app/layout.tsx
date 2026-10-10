import type { Metadata, Viewport } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import Tracker from "@/components/Tracker";

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thedimetechnology.com.np"),
  title: "The Dime Technology | Your Freelance Tech Partner",
  description:
    "Your Freelance Tech Partner. From concept to completion, we turn ideas into production-ready web, mobile and cloud projects with an elite engineering team.",
  keywords:
    "custom software development company, web development company, mobile app development company, AI development company, Odoo development company, IT outsourcing company, hire dedicated developers, freelance tech partner, IT services Nepal",
  applicationName: "The Dime Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  themeColor: "#0a0a0f",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/assets/logo.png",
  },
  openGraph: {
    title: "The Dime Technology | Your Freelance Tech Partner",
    description:
      "Your Freelance Tech Partner. From concept to completion, we turn ideas into production-ready web, mobile and cloud projects with an elite engineering team.",
    type: "website",
    url: "https://thedimetechnology.com.np/",
    locale: "en_US",
    siteName: "The Dime Technology",
    images: [
      {
        url: "/assets/og.png",
        width: 1200,
        height: 630,
        alt: "The Dime Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dime Technology | Your Freelance Tech Partner",
    description:
      "Your Freelance Tech Partner. From concept to completion, we turn ideas into production-ready web, mobile and cloud projects with an elite engineering team.",
    images: ["/assets/og.png"],
  },
  other: {
    "geo.region": "NP-03",
    "geo.placename": "Lalitpur",
    "geo.position": "27.6588;85.3247",
    ICBM: "27.6588, 85.3247",
  },
};

const criticalCss = `
  html, body { background: #0a0a0f; }
  body { color: #f0f0f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; }
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; }
`;

const cssRetry = `
  (function () {
    function check() {
      try {
        var sheets = document.styleSheets, ok = false;
        for (var i = 0; i < sheets.length; i++) {
          if (sheets[i].href && sheets[i].href.indexOf('_next/static') !== -1) { ok = true; break; }
        }
        if (ok) return;
        if (sessionStorage.getItem('__cssRetry')) return;
        sessionStorage.setItem('__cssRetry', '1');
        var u = new URL(location.href);
        u.searchParams.set('_', Date.now());
        location.replace(u.toString());
      } catch (e) {}
    }
    if (document.readyState === 'complete') check();
    else window.addEventListener('load', check);
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
      <script dangerouslySetInnerHTML={{ __html: cssRetry }} />
      <body className="antialiased">
        {children}
        <WhatsAppButton />
        <Tracker />
      </body>
    </html>
  );
}
