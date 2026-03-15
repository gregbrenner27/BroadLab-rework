"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 18,
    suffix: "M+",
    label: "UK Households",
    sub: "Premium addressable inventory",
  },
  {
    value: 60,
    suffix: "+",
    label: "Publisher Partners",
    sub: "Premium broadcast & streaming",
  },
  {
    value: 320,
    suffix: "+",
    label: "Campaigns Delivered",
    sub: "Across all funnel stages",
  },
  {
    value: 45,
    suffix: "+",
    label: "Brand Clients",
    sub: "Agencies & direct advertisers",
  },
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

function StatCard({
  value,
  suffix,
  label,
  sub,
  animate,
}: {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  animate: boolean;
}) {
  const count = useCountUp(value, 2000, animate);

  return (
    <div className="relative bg-white border border-[#d0dce8] rounded-card p-8 text-center group hover:border-[#4d7a96] transition-colors duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      <div className="absolute inset-0 rounded-card bg-[radial-gradient(ellipse_at_top,rgba(77,122,150,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <p className="text-[clamp(2rem,4vw,3rem)] font-bold gradient-text mb-2">
        {animate ? count : 0}
        {suffix}
      </p>
      <p className="text-[#0f1923] font-semibold mb-1">{label}</p>
      <p className="text-[#4a6070] text-sm">{sub}</p>
      <p className="text-[#8a9bad] text-xs mt-3 italic">*Placeholder figure</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-[#f5f7fa]" ref={ref}>
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="tag mb-4 inline-flex">By the Numbers</span>
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[#0f1923]">
            Scale that delivers results
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
