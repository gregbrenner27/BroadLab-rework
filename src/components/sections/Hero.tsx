"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Entrance animation for headline
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
  }, []);

  // Parallax — video scrolls at 30% of page speed, creating depth
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video — oversized vertically so parallax never reveals edges */}
      <video
        ref={videoRef}
        className="absolute w-full object-cover will-change-transform"
        style={{ height: "120%", top: "-10%" }}
        src="/videos/background-video.webm"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-[#080d12]/75" />
      {/* Subtle top vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(77,122,150,0.15)_0%,transparent_70%)]" />
      {/* Bottom fade — very subtle bleed into the light section below */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(245,247,250,0.55) 0%, rgba(245,247,250,0.18) 40%, transparent 100%)",
        }}
      />

      <div className="container-main relative z-10 text-center pt-16 pb-16">
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[1.08] tracking-tight text-[#e8edf2] max-w-4xl mx-auto mb-6"
        >
          Powering the Next Generation of{" "}
          <span className="gradient-text">Outcome-Driven</span> Addressable TV
        </h1>

        {/* Subheadline */}
        <p
          className="text-[clamp(1rem,1.8vw,1.25rem)] text-[#8a9bad] max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ animation: "fadeUp 0.8s ease 0.25s both" }}
        >
          Addressable TV combines the scale &amp; impact of Linear TV with the
          targeting, optimisation &amp; measurement of Digital.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: "fadeUp 0.8s ease 0.4s both" }}
        >
          <a
            href="/platform"
            className="px-8 py-3.5 rounded-full bg-[#4d7a96] hover:bg-[#6bbdd8] text-white font-medium transition-all duration-200 hover:shadow-[0_0_30px_rgba(77,122,150,0.4)]"
          >
            Explore the Platform
          </a>
          <a
            href="/services"
            className="px-8 py-3.5 rounded-full border border-white/50 hover:border-white bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-200"
          >
            Our Services
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
