import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogBrowser from "@/components/BlogBrowser";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog | The Dime Technology",
  description:
    "Insights, case studies and project write-ups from The Dime Technology — software development, DevOps, mobile apps and AI engineering.",
  keywords: "tech blog, software development case studies, DevOps, mobile apps, AI, The Dime Technology",
  openGraph: {
    title: "Blog | The Dime Technology",
    description:
      "Insights, case studies and project write-ups from The Dime Technology.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "The Dime Technology Blog",
  description:
    "Insights, case studies and project write-ups from The Dime Technology.",
  url: "/blog",
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    datePublished: p.date,
    url: `/blog/${p.slug}`,
  })),
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
              Blog
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
