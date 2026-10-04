import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://thedimetechnology.com.np"),
  title: "The Dime Technology | Your Freelance Tech Partner",
  description:
    "Your Freelance Tech Partner. From concept to completion, we turn ideas into production-ready web, mobile and cloud projects with an elite engineering team.",
  keywords: "freelance tech partner, software development, web development, mobile apps, IT services Nepal, hire developers",
  openGraph: {
    title: "The Dime Technology | Your Freelance Tech Partner",
    description:
      "Your Freelance Tech Partner. From concept to completion, we turn ideas into production-ready web, mobile and cloud projects with an elite engineering team.",
    type: "website",
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
