import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseList from "@/components/CourseList";
import type { AdminCourse } from "@/lib/admin-types";

export const metadata: Metadata = {
  title: "Courses | The Dime Technology",
  description:
    "Training courses from The Dime Technology — web development, mobile apps, DevOps and UI/UX design courses taught by practicing engineers.",
  keywords:
    "tech courses, web development course, flutter course, DevOps course, UI/UX course, The Dime Technology",
  alternates: {
    canonical: "/course",
  },
  openGraph: {
    title: "Courses | The Dime Technology",
    description:
      "Training courses in web development, mobile apps, DevOps and UI/UX design.",
    type: "website",
    url: "https://thedimetechnology.com.np/course",
    locale: "en_US",
    siteName: "The Dime Technology",
    images: ["/assets/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Courses | The Dime Technology",
    description:
      "Training courses in web development, mobile apps, DevOps and UI/UX design.",
    images: ["/assets/og.png"],
  },
};

async function loadCourses(): Promise<AdminCourse[]> {
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "data", "admin", "courses.json"),
      "utf8"
    );
    const items = JSON.parse(raw) as AdminCourse[];
    return items.filter((i) => i.active !== false);
  } catch {
    return [];
  }
}

export default async function CoursePage() {
  const courses = await loadCourses();

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
            name: "Courses",
            item: "https://thedimetechnology.com.np/course",
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Courses — The Dime Technology",
        url: "https://thedimetechnology.com.np/course",
        itemListElement: courses.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Course",
            name: c.title,
            description: c.description,
            provider: {
              "@type": "Organization",
              name: "The Dime Technology",
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
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
            >
              Courses
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Learn & <span className="gradient-text">Level Up</span>
            </h1>
            <p className="text-[#9898b0] text-lg max-w-2xl">
              Practical, project-based courses taught by the engineers who build real
              products for clients worldwide. Pick a course and start learning.
            </p>
          </div>

          <CourseList initial={courses} />
        </div>
      </main>
      <Footer />
    </>
  );
}
