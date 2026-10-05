import type { Metadata, Viewport } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thedimetechnology.com.np"),
  title: "The Dime Technology | Your Freelance Tech Partner",
  description:
    "Your Freelance Tech Partner. From concept to completion, we turn ideas into production-ready web, mobile and cloud projects with an elite engineering team.",
  keywords: "freelance tech partner, software development, web development, mobile apps, IT services Nepal, hire developers",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
