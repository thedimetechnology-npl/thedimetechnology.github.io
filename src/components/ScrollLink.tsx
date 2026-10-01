"use client";

import { useRouter } from "next/navigation";

type ScrollLinkProps = {
  section: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export default function ScrollLink({ section, children, className, style, onClick }: ScrollLinkProps) {
  const router = useRouter();

  const handleClick = () => {
    onClick?.();
    const scroll = () => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (window.location.pathname === "/") {
      scroll();
    } else {
      router.push("/");
      setTimeout(scroll, 350);
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className} style={style}>
      {children}
    </button>
  );
}
