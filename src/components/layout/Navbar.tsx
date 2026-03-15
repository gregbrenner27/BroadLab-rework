"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home",     href: "/",          section: null      },
  { label: "Platform", href: "/platform",  section: null      },
  { label: "Services", href: "/services",  section: null      },
  { label: "Insights", href: "/#insights", section: "insights"},
  { label: "Team",     href: "/team",      section: null      },
  { label: "Contact",  href: "/#contact",  section: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(navLinks.find((l) => l.href === pathname)?.label ?? "");
      return;
    }
    setActiveSection("Home");
    const sectionIds = ["platform", "insights", "team", "contact"];
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const match = navLinks.find((l) => l.section === id);
            if (match) setActiveSection(match.label);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    const onScroll = () => { if (window.scrollY < 200) setActiveSection("Home"); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const isActive = (label: string) => activeSection === label;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#4D7A96] border-b border-white/20 shadow-[0_2px_20px_rgba(0,0,0,0.2)]">
      <div className="container-main flex items-center justify-between h-16 md:h-20">

        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/images/full.logo.png"
            alt="Broadlab"
            width={220}
            height={52}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.label)
                  ? "text-white font-semibold underline underline-offset-4"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/#contact"
            className="px-5 py-2 rounded-full bg-[#4d7a96] hover:bg-[#6bbdd8] text-white text-sm font-medium transition-colors duration-200 border-2 border-white"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-80" : "max-h-0"}`}>
        <nav className="bg-[#4D7A96] border-t border-white/20 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.label)
                  ? "text-white font-semibold underline underline-offset-4"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-2.5 rounded-full bg-[#4d7a96] text-white text-sm font-medium text-center"
          >
            Get in Touch
          </a>
        </nav>
      </div>
    </header>
  );
}
