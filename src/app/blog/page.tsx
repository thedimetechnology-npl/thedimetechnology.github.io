import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogBrowser from "@/components/BlogBrowser";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Work & Case Studies | The Dime Technology",
  description:
    "Project write-ups, case studies and engineering notes from The Dime Technology — software development, DevOps, mobile apps and AI projects.",
  keywords:
    "tech portfolio, software development case studies, project write-ups, DevOps, mobile apps, AI, The Dime Technology",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Work & Case Studies | The Dime Technology",
    description:
      "Project write-ups, case studies and engineering notes from The Dime Technology.",
    type: "website",
    url: "https://thedimetechnology.com.np/blog",
    locale: "en_US",
    siteName: "The Dime Technology",
    images: ["/assets/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work & Case Studies | The Dime Technology",
    description:
      "Project write-ups, case studies and engineering notes from The Dime Technology.",
    images: ["/assets/og.png"],
  },
};

const BASE_URL = "https://thedimetechnology.com.np";

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
          item: `${BASE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Work",
          item: `${BASE_URL}/blog`,
        },
      ],
    },
    {
      "@type": "Blog",
      name: "The Dime Technology Work",
      description:
        "Project write-ups, case studies and engineering notes from The Dime Technology.",
      url: `${BASE_URL}/blog`,
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        datePublished: p.date,
        url: `${BASE_URL}/blog/${p.slug}`,
      })),
    },
  ],
};

const cards = posts.map(
  ({ slug, title, excerpt, date, readTime, category, tags, url, image }) => ({
    slug,
    title,
    excerpt,
    date,
    readTime,
    category,
    tags,
    url,
    image,
  })
);

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-36 pb-24 bg-[#0a0a0f] min-h-screen">
        <div className="w-full px-6">
          <div className="mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
            >
              Work
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Insights & <span className="gradient-text">Case Studies</span>
            </h1>
            <p className="text-[#9898b0] text-lg max-w-2xl">
              Project write-ups, engineering notes and lessons from building software, DevOps
              pipelines and mobile products for clients around the world.
            </p>
          </div>

          <BlogBrowser posts={cards} />
        </div>
      </main>
      <Footer />
    </>
  );
}
