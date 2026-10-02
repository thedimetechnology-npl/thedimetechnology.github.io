import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollLink from "@/components/ScrollLink";
import { posts, getPost } from "@/data/posts";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found | The Dime Technology" };

  return {
    title: `${post.title} | The Dime Technology Blog`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: ["/assets/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/assets/og.png"],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = posts.findIndex((p) => p.slug === post.slug);
  const previous = index > 0 ? posts[index - 1] : undefined;
  const next = index < posts.length - 1 ? posts[index + 1] : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "The Dime Technology" },
    publisher: { "@type": "Organization", name: "The Dime Technology" },
    mainEntityOfPage: `/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-36 pb-24 bg-[#0a0a0f] min-h-screen">
        <article className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-block text-sm text-[#9898b0] hover:text-[#2b7de0] transition-colors mb-8"
          >
            ← Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: "rgba(6, 92, 194, 0.12)", color: "#2b7de0" }}
            >
              {post.category}
            </span>
            <time dateTime={post.date} className="text-xs text-[#5a5a72]">
              {formatDate(post.date)}
            </time>
            <span className="text-xs text-[#5a5a72]">• {post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-[#9898b0]"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-lg text-[#c8c8d8] leading-relaxed mb-10 pb-10 border-b border-white/5">
            {post.excerpt}
          </p>

          {post.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h2 className="text-xl font-bold mb-4">{section.heading}</h2>
              {section.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-[#9898b0] leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <div className="flex items-center gap-4 p-6 bg-[#1a1a2e] border border-white/5 rounded-2xl mt-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" className="w-12 h-12 rounded-xl" />
            <div>
              <strong className="block text-sm">The Dime Technology</strong>
              <span className="text-xs text-[#5a5a72]">
                Freelance tech partner for software, mobile and cloud projects
              </span>
            </div>
            <ScrollLink
              section="contact"
              className="ml-auto hidden sm:inline-block text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
            >
              Start a Project
            </ScrollLink>
          </div>

          <nav className="flex justify-between gap-4 mt-10 pt-8 border-t border-white/5">
            {previous ? (
              <Link
                href={`/blog/${previous.slug}`}
                className="group text-left max-w-[45%]"
              >
                <span className="block text-xs text-[#5a5a72] mb-1">← Previous</span>
                <span className="text-sm font-medium group-hover:text-[#2b7de0] transition-colors">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="group text-right max-w-[45%]">
                <span className="block text-xs text-[#5a5a72] mb-1">Next →</span>
                <span className="text-sm font-medium group-hover:text-[#2b7de0] transition-colors">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
