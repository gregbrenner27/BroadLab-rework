"use client";

import { useEffect, useRef, useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    phase: "Plan",
    title: "Maximum Reach",
    stat: "18M+",
    statLabel: "UK Households",
    description:
      "Access 18M+ UK households through 60+ premium publisher partnerships — broadcast, BVOD, and streaming — in brand-safe, premium environments only.",
    bullets: [
      "60+ premium publisher partners including Sky, ITV & Channel 4",
      "100% brand-safe inventory across broadcast & BVOD",
      "Nationwide or hyper-local targeting down to postcode level",
    ],
    tags: ["18M+ Households", "60+ Publishers", "Brand Safe"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    number: "02",
    phase: "Target",
    title: "Customised Audiences",
    stat: "87%",
    statLabel: "Household ID Match Rate",
    description:
      "Our proprietary household ID graph layers demographic, affinity, intent and purchase signals to build precise audience segments for unmatched targeting accuracy.",
    bullets: [
      "6 independent data signals fused per household",
      "First-party CRM onboarding with privacy-safe matching",
      "Lookalike modelling to scale high-value segments",
    ],
    tags: ["ID Graph", "1st Party Data", "Household Targeting"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <circle cx="9" cy="8" r="3.5" /><circle cx="17" cy="8" r="3.5" />
        <path d="M3 21c0-3.5 2.7-6 6-6h6c3.3 0 6 2.5 6 6" />
      </svg>
    ),
  },
  {
    number: "03",
    phase: "Activate",
    title: "Campaign Optimisation",
    stat: "Real-time",
    statLabel: "AI/ML Optimisation",
    description:
      "Our AI/ML engine continuously adjusts creative versions, reallocates budgets and refines targeting in real time — so your campaign gets smarter every hour.",
    bullets: [
      "Dynamic creative versioning served at household level",
      "Intelligent budget allocation across publishers and formats",
      "Automated pacing and frequency management",
    ],
    tags: ["AI/ML Powered", "Creative Versioning", "Budget Optimisation"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l4-5 4 3 5-7 4 4" /><path d="M17 8h4v4" />
      </svg>
    ),
  },
  {
    number: "04",
    phase: "Measure",
    title: "Holistic Reporting",
    stat: "Full-funnel",
    statLabel: "Outcome Attribution",
    description:
      "Measurement partnerships deliver full-funnel reporting — from brand lift through to direct response and sales attribution — in one unified, client-ready dashboard.",
    bullets: [
      "Brand lift studies with control vs. exposed methodology",
      "Direct response & sales attribution via clean room matching",
      "Exportable, client-ready reports from a unified dashboard",
    ],
    tags: ["Brand Lift", "Attribution", "Full-Funnel"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <rect x="3" y="14" width="4" height="7" rx="1" />
        <rect x="10" y="9" width="4" height="12" rx="1" />
        <rect x="17" y="4" width="4" height="17" rx="1" />
      </svg>
    ),
  },
];

const TOTAL = steps.length + 1; // intro + 4 services

function scrollToSlide(el: HTMLElement, slide: number) {
  const scrollable = el.offsetHeight - window.innerHeight;
  const target = el.offsetTop + (scrollable * slide) / (TOTAL - 1);
  window.scrollTo({ top: target, behavior: "smooth" });
}

// ── Right-side visuals ────────────────────────────────────────────────────────

function IntroVisual() {
  return (
    <div className="w-full h-full flex flex-col px-8 py-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9bad] mb-6">The journey</p>
      <div className="flex-1 flex flex-col justify-between">
        {steps.map((s, i) => (
          <div key={s.number} className="flex items-stretch gap-5">
            {/* Left: line + node */}
            <div className="flex flex-col items-center w-8 flex-shrink-0">
              {i > 0 && <div className="w-px flex-1 bg-[#e4eaf0] mb-1" />}
              <div className="w-8 h-8 rounded-full bg-[#4d7a96] flex items-center justify-center flex-shrink-0 shadow-[0_0_0_4px_rgba(77,122,150,0.12)]">
                <span className="text-[10px] font-bold text-white">{s.number}</span>
              </div>
              {i < steps.length - 1 && <div className="w-px flex-1 bg-[#e4eaf0] mt-1" />}
            </div>
            {/* Right: content */}
            <div className={`flex-1 flex items-center justify-between py-4 ${i < steps.length - 1 ? "border-b border-[#f1f5f9]" : ""}`}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#4d7a96] mb-1">{s.phase}</p>
                <p className="text-[15px] font-semibold text-[#0f1923]">{s.title}</p>
                <p className="text-[11px] text-[#8a9bad] mt-0.5 leading-snug line-clamp-1">{s.statLabel}</p>
              </div>
              <span className="text-[17px] font-bold gradient-text ml-4 flex-shrink-0">{s.stat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReachVisual() {
  const publishers = ["Sky", "ITV", "Channel 4", "Channel 5", "ITVX", "Now TV", "All 4", "My5", "Dave", "E4"];
  const stats = [
    { value: "60+",   label: "Publishers"  },
    { value: "100%",  label: "Brand Safe"  },
    { value: "BVOD",  label: "& Broadcast" },
  ];
  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-0 p-8">
      {/* TV screen */}
      <div className="relative w-64 h-36 bg-gradient-to-br from-[#1a2f3d] to-[#2d4f65] rounded-2xl flex items-center justify-center border border-[#4d7a96]/30 shadow-[0_8px_40px_rgba(77,122,150,0.25)]">
        <div className="text-center">
          <p className="text-[38px] font-bold text-white leading-none">18M+</p>
          <p className="text-[11px] text-[#6bbdd8] uppercase tracking-widest mt-2">UK Households</p>
        </div>
        {/* Live badge */}
        <div className="absolute top-3 right-4 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
          <span className="text-[9px] text-[#22c55e] font-bold tracking-wider">LIVE</span>
        </div>
      </div>
      {/* TV stand */}
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-12 h-[6px] bg-[#d0dce8] rounded-full" />
        <div className="w-24 h-[4px] bg-[#e4eaf0] rounded-full" />
      </div>

      {/* Publisher chips */}
      <div className="flex flex-wrap justify-center gap-2 w-full">
        {publishers.map((pub) => (
          <span key={pub} className="text-[11px] px-3 py-1.5 rounded-full bg-[#eef4f8] text-[#4d7a96] border border-[#d0dce8] font-semibold">
            {pub}
          </span>
        ))}
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-6 border-t border-[#f1f5f9] pt-5 w-full justify-center">
        {stats.map((s, i) => (
          <div key={s.label} className={`text-center ${i > 0 ? "border-l border-[#e4eaf0] pl-6" : ""}`}>
            <p className="text-base font-bold text-[#0f1923]">{s.value}</p>
            <p className="text-[10px] text-[#8a9bad]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AudiencesVisual() {
  const segments = [
    { label: "Sports Enthusiasts", pct: 100 },
    { label: "Auto Intenders",     pct: 67  },
    { label: "Premium Shoppers",   pct: 74  },
    { label: "Home Movers",        pct: 45  },
  ];
  const signals = ["Demographic", "Affinity", "Intent", "Purchase", "Search", "SVOD"];
  return (
    <div className="w-full h-full flex flex-col justify-between p-8 relative">
      {/* Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9bad] mb-5">Audience Segments</p>
        {/* Segment bars */}
        <div className="space-y-5">
          {segments.map((s) => (
            <div key={s.label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-[12px] text-[#4a6070] font-medium">{s.label}</span>
                <span className="text-[12px] text-[#4d7a96] font-bold">{s.pct}%</span>
              </div>
              <div className="h-3 bg-[#eef4f8] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4d7a96] to-[#6bbdd8]"
                  style={{ width: `${s.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Signal tags */}
      <div className="flex flex-wrap gap-2">
        {signals.map((sig) => (
          <span key={sig} className="text-[11px] px-3 py-1.5 rounded-full bg-[#eef4f8] text-[#4d7a96] border border-[#d0dce8] font-medium">
            {sig}
          </span>
        ))}
      </div>
      <div className="absolute bottom-8 right-8 bg-white border border-[#d0dce8] rounded-xl px-4 py-3 shadow-sm">
        <p className="text-[15px] font-bold gradient-text">87%</p>
        <p className="text-[10px] text-[#8a9bad]">Match Rate</p>
      </div>
    </div>
  );
}

function OptimisationVisual() {
  // A vs B creative cards + mini chart
  const pts: [number,number][] = [[0,58],[40,50],[80,42],[120,35],[160,25],[200,15],[240,8]];
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const mx = (pts[i-1][0] + pts[i][0]) / 2;
    d += ` C ${mx},${pts[i-1][1]} ${mx},${pts[i][1]} ${pts[i][0]},${pts[i][1]}`;
  }
  return (
    <div className="w-full h-full flex flex-col justify-between p-8 relative">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9bad] mb-2">A/B Optimisation</p>
      {/* A/B creative cards */}
      <div className="grid grid-cols-2 gap-4">
        {["Creative A", "Creative B"].map((label, i) => (
          <div key={label} className={`rounded-xl border p-4 ${i === 1 ? "border-[#4d7a96] bg-[#eef4f8]" : "border-[#e4eaf0] bg-white"}`}>
            <div className={`h-24 rounded-lg mb-3 flex items-center justify-center ${i === 1 ? "bg-gradient-to-br from-[#4d7a96]/20 to-[#6bbdd8]/20" : "bg-[#f1f5f9]"}`}>
              <svg width="44" height="32" viewBox="0 0 44 32" fill="none">
                <rect width="44" height="32" rx="3" fill={i === 1 ? "#4d7a96" : "#c5d8e8"} opacity="0.4" />
                <circle cx="14" cy="16" r="6" fill={i === 1 ? "#4d7a96" : "#c5d8e8"} opacity="0.6" />
                <rect x="24" y="10" width="14" height="3" rx="1.5" fill={i === 1 ? "#4d7a96" : "#c5d8e8"} opacity="0.5" />
                <rect x="24" y="16" width="10" height="3" rx="1.5" fill={i === 1 ? "#4d7a96" : "#c5d8e8"} opacity="0.4" />
              </svg>
            </div>
            <p className="text-[11px] font-semibold text-[#4a6070]">{label}</p>
            <p className={`text-[13px] font-bold ${i === 1 ? "text-[#4d7a96]" : "text-[#8a9bad]"}`}>{i === 1 ? "+23% VCR" : "Baseline"}</p>
            {i === 1 && <span className="text-[9px] bg-[#4d7a96] text-white px-2 py-0.5 rounded-full mt-1 inline-block">Winning</span>}
          </div>
        ))}
      </div>
      {/* Performance chart */}
      <div className="bg-white rounded-xl border border-[#e4eaf0] p-4 flex-1 mt-4 flex flex-col">
        <p className="text-[10px] text-[#8a9bad] mb-3 uppercase tracking-wide">Performance over time</p>
        <svg viewBox="0 0 240 66" className="w-full flex-1" preserveAspectRatio="none">
          <defs>
            <linearGradient id="optFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4d7a96" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#4d7a96" stopOpacity="0.01" />
            </linearGradient>
          </defs>
          <path d={d + ` L 240,66 L 0,66 Z`} fill="url(#optFill)" />
          <path d={d} fill="none" stroke="#4d7a96" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute bottom-8 left-8 bg-white border border-[#d0dce8] rounded-xl px-4 py-2.5 shadow-sm">
        <p className="text-[11px] font-bold text-[#22c55e]">↑ Optimising</p>
        <p className="text-[10px] text-[#8a9bad]">Live right now</p>
      </div>
    </div>
  );
}

function ReportingVisual() {
  const kpis = [
    { label: "Brand Lift",  value: "+18%", positive: true  },
    { label: "Avg. ROAS",   value: "3.4×", positive: true  },
    { label: "Avg. VCR",    value: "94%",  positive: true  },
    { label: "Attribution", value: "Full", positive: false },
  ];
  const funnel = [
    { label: "Awareness",     pct: 100, val: "14.2M" },
    { label: "Consideration", pct: 62,  val: "8.8M"  },
    { label: "Intent",        pct: 38,  val: "5.4M"  },
    { label: "Conversion",    pct: 18,  val: "2.6M"  },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-between p-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9bad] mb-4">Campaign Dashboard</p>
      {/* 2×2 KPI cards */}
      <div className="grid grid-cols-2 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="bg-[#f8fafc] rounded-xl p-4 border border-[#e4eaf0]">
            <p className="text-[10px] text-[#8a9bad] uppercase tracking-wide mb-2">{k.label}</p>
            <p className={`text-xl font-bold leading-none ${k.positive ? "text-[#22c55e]" : "gradient-text"}`}>
              {k.value}
            </p>
          </div>
        ))}
      </div>

      {/* Funnel attribution bars */}
      <div className="flex flex-col gap-3 mt-2">
        <p className="text-[10px] text-[#8a9bad] uppercase tracking-widest">Funnel Attribution</p>
        {funnel.map((f) => (
          <div key={f.label} className="flex items-center gap-3">
            <span className="text-[11px] text-[#4a6070] w-[100px] flex-shrink-0">{f.label}</span>
            <div className="flex-1 h-6 bg-[#f1f5f9] rounded-md overflow-hidden">
              <div
                className="h-full rounded-md bg-gradient-to-r from-[#4d7a96] to-[#6bbdd8] flex items-center justify-end pr-2.5"
                style={{ width: `${f.pct}%` }}
              >
                <span className="text-[9px] text-white font-bold">{f.val}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const visuals = [IntroVisual, ReachVisual, AudiencesVisual, OptimisationVisual, ReportingVisual];

// ── Main component ────────────────────────────────────────────────────────────

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrolled   = Math.max(0, -el.getBoundingClientRect().top);
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = scrolled / scrollable;
      setSlide(Math.min(TOTAL - 1, Math.floor(progress * TOTAL)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isIntro = slide === 0;
  const step    = isIntro ? null : steps[slide - 1];
  const Visual  = visuals[slide];

  return (
    <>
      <section
        ref={sectionRef}
        id="services"
        className="relative border-t border-[#d0dce8]"
        style={{ height: `${TOTAL * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[#eef1f5]">
          <div className="container-main w-full">

            {/* 3-column grid: stepper | content | visual */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_460px] gap-6 xl:gap-10 items-center">

              {/* ── Col 1: Left stepper ── */}
              <div className="hidden lg:flex flex-col relative py-2">
                {/* Track */}
                <div className="absolute left-3.5 top-4 bottom-4 w-px bg-[#e4eaf0]" />
                {/* Fill */}
                <div
                  className="absolute left-3.5 top-4 w-px bg-gradient-to-b from-[#4d7a96] to-[#6bbdd8] transition-all duration-500 ease-out"
                  style={{
                    height: slide <= 1
                      ? "0%"
                      : `calc(${((slide - 1) / (steps.length - 1)) * 100}% * ((100% - 32px) / 100))`,
                  }}
                />
                {steps.map((s, i) => {
                  const stepSlide = i + 1;
                  const isCurrent = slide === stepSlide;
                  const isPast    = slide > stepSlide;
                  return (
                    <button
                      key={s.number}
                      onClick={() => sectionRef.current && scrollToSlide(sectionRef.current, stepSlide)}
                      className={`relative flex items-center gap-3 py-5 text-left transition-all duration-300 ${
                        isCurrent ? "opacity-100" : isPast ? "opacity-65 hover:opacity-85" : "opacity-30 hover:opacity-55"
                      }`}
                    >
                      {/* Node */}
                      <div className={`relative z-10 w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#4d7a96] border-[#4d7a96] shadow-[0_0_0_3px_rgba(77,122,150,0.15)]"
                          : isPast
                          ? "bg-[#4d7a96] border-[#4d7a96]"
                          : "bg-white border-[#d0dce8]"
                      }`}>
                        {isPast ? (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 2" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <span className={`text-[9px] font-bold ${isCurrent ? "text-white" : "text-[#aab8c4]"}`}>
                            {s.number}
                          </span>
                        )}
                      </div>
                      {/* Label */}
                      <div>
                        <p className={`text-[9px] font-bold uppercase tracking-[0.15em] leading-none mb-0.5 ${isCurrent ? "text-[#4d7a96]" : "text-[#8a9bad]"}`}>
                          {s.phase}
                        </p>
                        <p className={`text-[11px] font-semibold leading-tight ${isCurrent ? "text-[#0f1923]" : "text-[#4a6070]"}`}>
                          {s.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* ── Col 2: Centre content ── */}
              <div key={slide} style={{ animation: "slideIn 0.38s cubic-bezier(0.22,1,0.36,1) both" }}>
                {isIntro ? (
                  <div>
                    <span className="tag mb-5 inline-flex">Our Services</span>
                    <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-[#0f1923] leading-tight mb-5">
                      How we take a campaign from{" "}
                      <span className="gradient-text">brief to results</span>
                    </h2>
                    <p className="text-[#4a6070] text-[15px] leading-relaxed mb-8">
                      Broadlab&apos;s platform covers every aspect of Addressable TV — from planning
                      and audience targeting through to real-time campaign activation and
                      full-funnel outcome measurement. One platform, four capabilities, zero gaps.
                    </p>
                    <div className="flex flex-col items-start gap-4">
                      <button
                        onClick={() => sectionRef.current && scrollToSlide(sectionRef.current, 1)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4d7a96] hover:bg-[#6bbdd8] text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_24px_rgba(77,122,150,0.35)]"
                      >
                        Explore our services
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M7 2v10M3 8l4 4 4-4" />
                        </svg>
                      </button>
                      <div className="flex items-center gap-2 text-[#8a9bad] text-[12px]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="animate-bounce">
                          <path d="M8 3v10M4 9l4 4 4-4" />
                        </svg>
                        Scroll to explore
                      </div>
                    </div>
                  </div>
                ) : step && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-9 h-9 rounded-full bg-[#4d7a96] flex items-center justify-center text-white flex-shrink-0">
                        {step.icon}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4d7a96]">{step.phase}</span>
                    </div>
                    <p className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold gradient-text leading-none mb-1.5">{step.stat}</p>
                    <p className="text-[10px] text-[#8a9bad] uppercase tracking-[0.15em] mb-5">{step.statLabel}</p>
                    <h3 className="text-[clamp(1.2rem,2vw,1.55rem)] font-bold text-[#0f1923] mb-3">{step.title}</h3>
                    <p className="text-[#4a6070] leading-relaxed mb-6 text-[15px]">{step.description}</p>
                    <ul className="space-y-2.5 mb-7">
                      {step.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-[#4a6070]">
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-[#eef4f8] border border-[#c5d8e8] flex items-center justify-center flex-shrink-0">
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                              <path d="M1.5 4.5l2 2L7.5 2" stroke="#4d7a96" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full text-xs border border-[#d0dce8] text-[#4d7a96] bg-white font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA on last service */}
                    {slide === TOTAL - 1 && (
                      <div className="mt-8 pt-7 border-t border-[#e4eaf0] flex flex-wrap items-center gap-4">
                        <a
                          href="/platform"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4d7a96] hover:bg-[#6bbdd8] text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_24px_rgba(77,122,150,0.35)] whitespace-nowrap"
                        >
                          View the Platform →
                        </a>
                        <span className="text-xs text-[#8a9bad]">See everything in one dashboard</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── Col 3: Right visual ── */}
              <div
                key={`visual-${slide}`}
                className="hidden lg:flex flex-col gap-2"
                style={{ animation: "slideIn 0.42s cubic-bezier(0.22,1,0.36,1) both" }}
              >
                {/* Step number above the card */}
                {!isIntro && step && (
                  <div className="flex items-center gap-3 px-1">
                    <span className="text-[11px] font-bold text-[#4d7a96] uppercase tracking-[0.2em]">{step.number}</span>
                    <div className="flex-1 h-px bg-[#e4eaf0]" />
                    <span className="text-[9px] text-[#8a9bad] uppercase tracking-widest">{step.phase}</span>
                  </div>
                )}
                <div
                  className="rounded-2xl border border-[#e4eaf0] bg-white shadow-[0_4px_32px_rgba(77,122,150,0.08)] overflow-hidden"
                  style={{ height: "480px" }}
                >
                  <Visual />
                </div>
              </div>

            </div>
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e4eaf0]">
            <div
              className="h-full bg-gradient-to-r from-[#4d7a96] to-[#6bbdd8] transition-all duration-300"
              style={{ width: `${(slide / (TOTAL - 1)) * 100}%` }}
            />
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
