"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 18,  suffix: "M+", label: "UK Households",      sub: "Premium addressable inventory" },
  { value: 60,  suffix: "+",  label: "Publisher Partners",  sub: "Broadcast & streaming" },
  { value: 320, suffix: "+",  label: "Campaigns Delivered", sub: "Across all funnel stages" },
  { value: 45,  suffix: "+",  label: "Brand Clients",       sub: "Agencies & direct advertisers" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({
  value, suffix, label, sub, animate, index,
}: {
  value: number; suffix: string; label: string; sub: string; animate: boolean; index: number;
}) {
  const count = useCountUp(value, 2000, animate);
  return (
    <div
      className="flex flex-col items-center text-center px-6 py-4"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.65s ease, transform 0.65s ease`,
        transitionDelay: animate ? `${index * 0.12}s` : "0s",
      }}
    >
      <span className="text-[clamp(2.5rem,5vw,4rem)] font-bold gradient-text leading-none mb-3 tabular-nums">
        {animate ? count : 0}{suffix}
      </span>
      <span className="text-[#0f1923] font-medium text-sm mb-1">{label}</span>
      <span className="text-[#8a9bad] text-xs">{sub}</span>
    </div>
  );
}

export default function ValueProp() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const [textVisible,  setTextVisible]  = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const textObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTextVisible(true);  textObserver.disconnect(); } },
      { threshold: 0.15 }
    );
    const statsObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); statsObserver.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) textObserver.observe(sectionRef.current);
    if (statsRef.current)   statsObserver.observe(statsRef.current);
    return () => { textObserver.disconnect(); statsObserver.disconnect(); };
  }, []);

  return (
    <section id="about" className="section-padding bg-[#f5f7fa]" ref={sectionRef}>
      <div className="container-main">

        {/* Headline */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#0f1923] leading-tight mb-5"
            style={{
              opacity:    textVisible ? 1 : 0,
              transform:  textVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.75s ease 0s, transform 0.75s ease 0s",
            }}
          >
            We simplify the complex world of{" "}
            <span className="gradient-text">Addressable TV</span>
          </h2>

          {/* Body copy — staggered 0.18s after headline */}
          <p
            className="text-[#4a6070] text-lg leading-relaxed"
            style={{
              opacity:    textVisible ? 1 : 0,
              transform:  textVisible ? "translateY(0)" : "translateY(22px)",
              transition: "opacity 0.75s ease 0.18s, transform 0.75s ease 0.18s",
            }}
          >
            One platform for brands and agencies to plan, activate, and measure
            Addressable TV across 18M+ UK households.
          </p>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="relative">
          <div className="h-px bg-gradient-to-r from-transparent via-[#d0dce8] to-transparent mb-2" />

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="relative">
                {i > 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#d0dce8]" />
                )}
                <StatItem {...stat} animate={statsVisible} index={i} />
              </div>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#d0dce8] to-transparent mt-2" />

          <p
            className="text-center text-[#8a9bad] text-xs mt-4 italic"
            style={{
              opacity:    statsVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.6s",
            }}
          >
            *Figures are placeholders — to be updated with verified data
          </p>
        </div>

      </div>
    </section>
  );
}
