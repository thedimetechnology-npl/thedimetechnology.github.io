"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Rahul Pandita",
    location: "India",
    rating: 5,
    feedback: "It was great working with shahid and team. Nice work. And shahid is very calm person and also help in every situation.",
    image: "/assets/testimonials/india.jpg",
    company: "",
    designation: "Network Security",
  },
  {
    name: "Fareed",
    location: "India",
    rating: 5,
    feedback: "Shahid has given perfect work. I always recommend him.",
    image: "/assets/testimonials/awwaltech.jpg",
    company: "Awwal Tech",
    designation: "CEO",
  },
  {
    name: "Kashif Ahmed",
    location: "India",
    rating: 5,
    feedback: "Nice",
    image: "/assets/testimonials/kaem.jpg",
    company: "Kaem Software",
    designation: "",
  },
  {
    name: "Raul Olivares",
    location: "Chile",
    rating: 5,
    feedback: "Excellent experience with Shahid. Delivered the project on time, met all requirements, and showed a great attitude. Flawless work and smooth communication. 100% recommended, highly recommended!",
    image: "/assets/testimonials/sigasys.jpg",
    company: "Siga Sys Chainway",
    designation: "General Manager",
  },
  {
    name: "Ashok Raj DK",
    location: "India",
    rating: 5,
    feedback: "Shahid Alam and his team was fantastic to work with. Communication was smooth, and their expertise made the process completely stress-free. Highly recommended!",
    image: "/assets/testimonials/mazenet.jpg",
    company: "Mazenet Solution",
    designation: "Sr. Web Development",
  },
  {
    name: "Muhammed Suhel",
    location: "United Arab Emirates",
    rating: 5,
    feedback: "Shahid Alam is a skilled developer with strong professionalism. He delivers quality work on time, communicates clearly, and handles feedback well. Reliable, responsive, and great to work with.",
    image: "/assets/testimonials/Urban Tecky.png",
    company: "Urban Tecky",
    designation: "",
  },
  {
    name: "Michael Vangeyt",
    location: "Cyprus",
    rating: 5,
    feedback: "Shahid delivered the project on time and exactly as expected. Communication was clear, work quality was solid, and everything functioned smoothly. Would work together again.",
    image: "/assets/testimonials/Cyprus.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Abhay Sobti",
    location: "India",
    rating: 5,
    feedback: "As always, Shahid and his team completed the work on time. I am impressed with the willingness of the team to be contacted and engage in discussions with us for issues.",
    image: "/assets/testimonials/sharepro.jpg",
    company: "SharePro Air",
    designation: "",
  },
  {
    name: "Hemanta Koirala",
    location: "United States",
    rating: 5,
    feedback: "Very reliable support and completed the work in the timely manner. Highly recommended.",
    image: "/assets/testimonials/USA.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Mufaddal Zaps",
    location: "United Arab Emirates",
    rating: 5,
    feedback: "Shahid Alam delivered an excellent MSSQL backup and error management solution with great attention to detail. We are very satisfied and look forward to working with him again.",
    image: "/assets/testimonials/atitsolutionz.jpg",
    company: "ATIT Solutionz",
    designation: "",
  },
  {
    name: "Raúl Olivares",
    location: "Chile",
    rating: 5,
    feedback: "We brought Shahid on board to support us in key activities. His work was top-notch—highly committed and always available for questions. He met all agreed deadlines and delivered a great service.",
    image: "/assets/testimonials/sigasys.jpg",
    company: "Siga Sys Chainway",
    designation: "",
  },
  {
    name: "Ed Graves",
    location: "United States",
    rating: 5,
    feedback: "Shahid was great to work with.",
    image: "/assets/testimonials/EnergyImprovements.jpg",
    company: "Energy Improvements",
    designation: "",
  },
  {
    name: "Ashok Raj DK",
    location: "India",
    rating: 5,
    feedback: "I am happy to work again. They have completed my project on time as promised.",
    image: "/assets/testimonials/mazenet.jpg",
    company: "Mazenet Solution",
    designation: "Sr. Web Development",
  },
  {
    name: "Joseph Priyesh",
    location: "United States",
    rating: 5,
    feedback: "I wanted to take a moment to express my heartfelt thanks for all the help and support you've provided and did an amazing job. Once again, thank you both for the excellent work and support.",
    image: "/assets/testimonials/joseph.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Nauryzbek",
    location: "Kazakhstan",
    rating: 5,
    feedback: "Shahid exceeded my expectations with their professionalism and attention to detail. Team of Highly Experienced Professionals! Great Job!!!",
    image: "/assets/testimonials/Kazakhstan.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Atul Gupta",
    location: "India",
    rating: 5,
    feedback: "Very dedicated and great work.",
    image: "/assets/testimonials/atul.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Anandh Prakharan",
    location: "India",
    rating: 5,
    feedback: "Shahid Alam and His team supported really superb. They perfectly done my needs. I recommend him to other clients as well.",
    image: "/assets/testimonials/anandh.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Roman",
    location: "Russia",
    rating: 5,
    feedback: "Thank you and your team very much for the work done! With all my heart !!! as agreed, all tasks were done clearly, a good understanding of the FLUTTER architecture. I recommend you to work with them!!!",
    image: "/assets/testimonials/russia.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Emad",
    location: "Jordan",
    rating: 5,
    feedback: "Shahid exceeded my expectations with their professionalism and attention to detail. I would not hesitate to use their services again in the future.",
    image: "/assets/testimonials/emad.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Ali",
    location: "Saudi Arabia",
    rating: 5,
    feedback: "Shahid and his team exceeded my expectations with their professionalism and attention to detail. I would not hesitate to use their services again in the future. Many Thanks Shahid",
    image: "/assets/testimonials/saudi.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Ken Lyle",
    location: "Costa Rica",
    rating: 5,
    feedback: "Amazing again. These guys understand quicky, and execute really well.",
    image: "/assets/testimonials/ken.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Ken Lyle",
    location: "Costa Rica",
    rating: 5,
    feedback: "To me, these guys show some inexperience, to be honest. But they are hard-working and dedicated, and solve problems. I got great value for dollars, and hope we will continue to grow together.",
    image: "/assets/testimonials/ken.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Ken Lyle",
    location: "Costa Rica",
    rating: 5,
    feedback: "Another great task, with some cutting edge ideas (mostly mine) implemented.",
    image: "/assets/testimonials/ken.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Ken Lyle",
    location: "Costa Rica",
    rating: 5,
    feedback: "The team worked both hard and intelligently on my project, and we met our goals. Recommended, and will look to hire again.",
    image: "/assets/testimonials/ken.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Dnyanda Yande",
    location: "India",
    rating: 5,
    feedback: "We are happy with his work.",
    image: "/assets/testimonials/fourtytwo.jpg",
    company: "Fourty Two Labs",
    designation: "HR",
  },
  {
    name: "Ghassan Alabdulgader",
    location: "Saudi Arabia",
    rating: 5,
    feedback: "Task has been completed, Successful.",
    image: "/assets/testimonials/permitech.jpg",
    company: "Permitech",
    designation: "CEO",
  },
  {
    name: "Stacey Yeong",
    location: "Malaysia",
    rating: 5,
    feedback: "Shahid was patient in understanding my requirements.",
    image: "/assets/testimonials/malaysia.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Alvin",
    location: "Canada",
    rating: 5,
    feedback: "Thanks for the great input.",
    image: "/assets/testimonials/systemcanada.jpg",
    company: "System Canada",
    designation: "CEO",
  },
  {
    name: "Sara Jama",
    location: "United Arab Emirates",
    rating: 5,
    feedback: "Shahid did amazing work, I will definitely hire again.",
    image: "/assets/testimonials/yousuf.jpg",
    company: "Yousuf Motors",
    designation: "Social Media Manager",
  },
  {
    name: "Ashok Raj DK",
    location: "India",
    rating: 5,
    feedback: "I was very impressed with the quality of work that was delivered. I highly recommend Shahid for any project.",
    image: "/assets/testimonials/mazenet.jpg",
    company: "Mazenet Solution",
    designation: "Sr. Web Development",
  },
  {
    name: "Priyesh Joseph",
    location: "United States",
    rating: 5,
    feedback: "Shahid and team Successfully completed the project on time. Those guys are awesome to work with.",
    image: "/assets/testimonials/joseph.jpg",
    company: "",
    designation: "",
  },
  {
    name: "Ashley",
    location: "United States",
    rating: 5,
    feedback: "Very efficient, works at a nice pace and is very willing to work with you.",
    image: "/assets/testimonials/USA.jpg",
    company: "",
    designation: "",
  },
];

export default function Testimonials() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [items, setItems] = useState(testimonials);

  useEffect(() => {
    apiFetch("/api/content/testimonials")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) setItems(data);
      })
      .catch(() => {});
  }, []);

  const doubled = [...items, ...items];

  const CARD = 340;
  const cycle = CARD * items.length;

  const go = (dir: number) => {
    const raw = offset + dir * CARD;
    let norm = raw % cycle;
    if (norm > 0) norm -= cycle;
    if (norm !== raw) {
      setAnimated(false);
      setOffset(norm);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
    } else {
      setOffset(raw);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-[#111118]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
            >
              Testimonials
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">What Our Clients Say</h2>
            <p className="text-[#9898b0] text-lg max-w-xl">
              We value the trust our clients place in us and are proud to have contributed to their
              success.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => go(1)}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#065cc2] hover:bg-[#065cc2]/10 transition-all"
            >
              ←
            </button>
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#065cc2] hover:bg-[#065cc2]/10 transition-all"
            >
              →
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div
            style={{
              transform: `translateX(${offset}px)`,
              transition: animated ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            }}
          >
            <div className="flex gap-5 animate-marquee-slow">
            {doubled.map((t, i) => (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="flex-shrink-0 w-80 bg-[#1a1a2e] border border-white/5 rounded-2xl p-6 transition-all duration-500"
                style={{
                  transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                  boxShadow:
                    hovered === i
                      ? "0 20px 40px rgba(6, 92, 194, 0.12), 0 0 0 1px rgba(6, 92, 194, 0.2)"
                      : "0 4px 16px rgba(0, 0, 0, 0.2)",
                  borderColor:
                    hovered === i ? "rgba(6, 92, 194, 0.25)" : "rgba(255, 255, 255, 0.05)",
                }}
              >
                <div className="text-[#fbbf24] text-sm tracking-widest mb-3">
                  {"★".repeat(t.rating)}
                </div>
                <p className="text-[#9898b0] text-sm leading-relaxed italic mb-5 h-24 overflow-hidden">
                  &ldquo;{t.feedback}&rdquo;
                </p>
                <div className="flex items-center gap-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/5"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <div>
                    <strong className="block text-sm">{t.name}</strong>
                    {t.company ? (
                      <span className="text-xs text-[#5a5a72]">
                        {t.company}
                        {t.designation ? ` - ${t.designation}` : ""}
                      </span>
                    ) : (
                      <span className="text-xs text-[#5a5a72]">{t.location}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
