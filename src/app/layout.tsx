import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thedimetechnology.com.np"),
  title: "The Dime Technology | Your Freelance Tech Partner",
  description: "We are a collective of passionate technologists driving business transformation through innovative technology solutions. Hire elite tech talent — shortlist in 5 days.",
  keywords: "freelance tech partner, software development, web development, mobile apps, IT services Nepal, hire developers",
  openGraph: {
    title: "The Dime Technology | Your Freelance Tech Partner",
    description: "Elite AI & Engineering teams. Fully managed, built to last.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
