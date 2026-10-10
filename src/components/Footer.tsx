"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollLink from "@/components/ScrollLink";

const PMS_API = "https://dimetechnology-pms.info-thedimetechnology.workers.dev/";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [subEmail, setSubEmail] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const [subErr, setSubErr] = useState(false);
  const [subBusy, setSubBusy] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="bg-[#0a0a0f] border-t border-white/5 pt-16 pb-8">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="The Dime Technology" className="w-8 h-8" />
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
                  href="https://www.facebook.com/thedimetechnology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white/5 rounded-full text-xs font-medium text-[#9898b0] hover:border-[#065cc2] hover:text-white hover:bg-[#065cc2]/10 transition-all"
                >
                  Facebook
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold mb-4">Quick Links</h3>
                {[
                  { label: "About", section: "about" },
                  { label: "Services", section: "services" },
                  { label: "Products", href: "/product" },
                  { label: "Explore Courses", href: "/course" },
                  { label: "Process", section: "process" },
                ].map((link) =>
                  link.section ? (
                    <ScrollLink
                      key={link.label}
                      section={link.section}
                      className="block text-[#9898b0] text-sm mb-2.5 hover:text-[#2b7de0] transition-colors"
                    >
                      {link.label}
                    </ScrollLink>
                  ) : link.href?.startsWith("http") ? (
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
                      href={link.href || "/"}
                      className="block text-[#9898b0] text-sm mb-2.5 hover:text-[#2b7de0] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold mb-4">Quick Links</h3>
                {[
                  { label: "Team", section: "team" },
                  { label: "Work", href: "/blog" },
                  { label: "Career", href: "/career" },
                  { label: "Contact", section: "contact" },
                ].map((link) =>
                  link.section ? (
                    <ScrollLink
                      key={link.label}
                      section={link.section}
                      className="block text-[#9898b0] text-sm mb-2.5 hover:text-[#2b7de0] transition-colors"
                    >
                      {link.label}
                    </ScrollLink>
                  ) : link.href?.startsWith("http") ? (
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
                      href={link.href || "/"}
                      className="block text-[#9898b0] text-sm mb-2.5 hover:text-[#2b7de0] transition-colors"
                    >
                      {link.label}
                    </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-4">Legal</h3>
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
              <div className="mt-6">
                <h3 className="text-sm font-bold mb-2">Get updates</h3>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const email = subEmail.trim();
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
                      setSubErr(true);
                      setSubMsg("Please enter a valid email address.");
                      return;
                    }
                    setSubBusy(true);
                    setSubMsg("");
                    try {
                      const r = await fetch(PMS_API, {
                        method: "POST",
                        headers: { "Content-Type": "text/plain;charset=utf-8" },
                        body: JSON.stringify({
                          action: "saveEmail",
                          email,
                          site: location.host,
                          page: location.pathname,
                        }),
                      });
                      const j = await r.json();
                      if (j && j.ok) {
                        setSubErr(false);
                        setSubMsg("Thanks — you are subscribed ✓");
                        setSubEmail("");
                      } else {
                        setSubErr(true);
                        setSubMsg((j && j.error) || "Could not subscribe — please try again.");
                      }
                    } catch {
                      setSubErr(true);
                      setSubMsg("Could not subscribe — please try again.");
                    } finally {
                      setSubBusy(false);
                    }
                  }}
                  className="flex gap-2 max-w-sm"
                >
                  <input
                    type="email"
                    required
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="you@email.com"
                    aria-label="Email address"
                    className="flex-1 min-w-0 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder:text-[#5a5a72] focus:outline-none focus:border-[#065cc2]"
                  />
                  <button
                    type="submit"
                    disabled={subBusy}
                    className="shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold text-white border-none cursor-pointer disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
                  >
                    {subBusy ? "…" : "Join"}
                  </button>
                </form>
                <p className={`text-xs mt-2 ${subErr ? "text-red-400" : "text-[#5a5a72]"}`}>
                  {subMsg || "Product news and offers — unsubscribe anytime."}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 text-center">
            <p className="text-[#5a5a72] text-xs">
              © 2026 The Dime Technology. Made with ❤ in Nepal
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
