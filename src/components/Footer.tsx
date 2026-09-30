"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="bg-[#0a0a0f] border-t border-white/5 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="" className="w-8 h-8" />
                <span className="gradient-text">The Dime</span> Technology
              </Link>
              <p className="text-[#9898b0] text-sm leading-relaxed mt-4">
                Your Freelance Tech Partner dedicated to driving business transformation through
                innovative technology solutions.
              </p>
              <div className="flex gap-2.5 mt-5">
                <a
                  href="https://www.linkedin.com/in/shahidalam-nepal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white/5 rounded-full text-xs font-medium text-[#9898b0] hover:border-[#065cc2] hover:text-white hover:bg-[#065cc2]/10 transition-all"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/azhashmi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white/5 rounded-full text-xs font-medium text-[#9898b0] hover:border-[#065cc2] hover:text-white hover:bg-[#065cc2]/10 transition-all"
                >
                  GitHub
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4">Quick Links</h4>
              {[
                { label: "About", href: "/#about" },
                { label: "Services", href: "/#services" },
                { label: "Process", href: "/#process" },
                { label: "Team", href: "/#team" },
                { label: "Blog", href: "/blog" },
                { label: "Career", href: "/career" },
                { label: "Contact", href: "/#contact" },
              ].map((link) =>
                link.href.startsWith("http") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#9898b0] text-sm mb-2.5 hover:text-[#2b7de0] transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-[#9898b0] text-sm mb-2.5 hover:text-[#2b7de0] transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4">Legal</h4>
              <Link
                href="/privacy"
                className="block text-[#9898b0] text-sm mb-2.5 hover:text-[#2b7de0] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-[#9898b0] text-sm mb-2.5 hover:text-[#2b7de0] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 text-center">
            <p className="text-[#5a5a72] text-xs">
              © 2026 The Dime Technology. Made with in Nepal
            </p>
          </div>
        </div>
      </footer>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full text-white border-none cursor-pointer shadow-lg shadow-[#065cc2]/30 transition-all hover:-translate-y-1 z-50 flex items-center justify-center text-lg"
          style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
        >
          ↑
        </button>
      )}
    </>
  );
}
