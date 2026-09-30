"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Team", href: "/#team" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 w-full">
      <div
        className={`mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0f]/95 backdrop-blur-xl py-3 border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-[#0a0a0f]/80 backdrop-blur-xl py-3 border-b border-white/5"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="w-8 h-8" />
          <span className="gradient-text">The Dime</span> Technology
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("http") ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#9898b0] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#9898b0] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <Link
          href="/course"
          className="hidden lg:inline-block text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#065cc2]/30"
          style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
        >
          Explore Courses
        </Link>

        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-6 h-0.5 bg-white rounded" />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#0a0a0f]/98 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) =>
            link.href.startsWith("http") ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#9898b0] hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#9898b0] hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
