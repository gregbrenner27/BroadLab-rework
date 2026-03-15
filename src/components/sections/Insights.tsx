"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const CHART_W = 560;
const CHART_H = 220;
const PAD = { top: 24, right: 24, bottom: 36, left: 44 };

const datasets = [
  {
    id: "market",
    stat: "£2.31B",
    label: "UK CTV ad market projected value in 2026 — up from £1.17B in 2021 (IAB UK Compass)",
    chartTitle: "UK CTV Advertising Market",
    chartSub: "Total CTV ad spend, £ Billions — IAB UK / eMarketer",
    unit: "£bn",
    source: "IAB UK Compass; eMarketer (2025). 2022–2024 interpolated from BVOD growth indices (AA/WARC).",
    points: [
      { year: "2021", value: 1.17 },
      { year: "2022", value: 1.31, estimated: true },
      { year: "2023", value: 1.50, estimated: true },
      { year: "2024", value: 1.75, estimated: true },
      { year: "2025", value: 2.0 },
      { year: "2026", value: 2.31, projected: true },
    ],
  },
  {
    id: "bvod",
    stat: "+15%",
    label: "BVOD revenues grew 15% in 2025, surpassing £1 billion for the first time (Ofcom Media Nations)",
    chartTitle: "BVOD Year-on-Year Growth",
    chartSub: "Annual % growth in broadcaster VOD ad revenue — AA/WARC, Ofcom",
    unit: "%",
    source: "AA/WARC; Ofcom Media Nations 2025; Statista. 2026 forecast from AA/WARC.",
    points: [
      { year: "2021", value: 19 },
      { year: "2022", value: 12 },
      { year: "2023", value: 15.9 },
      { year: "2024", value: 14 },
      { year: "2025", value: 15 },
      { year: "2026", value: 11.5, projected: true },
    ],
  },
  {
    id: "streaming",
    stat: "30%",
    label: "of UK adults reached weekly by ad-funded SVOD in 2025 — up from 11% in 2024 (IPA / Marketing Week)",
    chartTitle: "Ad-Funded SVOD Weekly Reach",
    chartSub: "% of UK adults reached weekly — IPA / Marketing Week",
    unit: "%",
    source: "IPA (2025) via Marketing Week. 2022–2023 estimated from adoption trajectory; 2026 projected.",
    points: [
      { year: "2022", value: 4, estimated: true },
      { year: "2023", value: 7, estimated: true },
      { year: "2024", value: 11 },
      { year: "2025", value: 30 },
      { year: "2026", value: 38, projected: true },
    ],
  },
];

type Point = { year: string; value: number; projected?: boolean; estimated?: boolean };
type PlottedPoint = Point & { x: number; y: number };

function getPlottedPoints(points: Point[]): PlottedPoint[] {
  const w = CHART_W - PAD.left - PAD.right;
  const h = CHART_H - PAD.top - PAD.bottom;
  const maxV = Math.max(...points.map((p) => p.value)) * 1.15;
  return points.map((p, i) => ({
    ...p,
    x: PAD.left + (i / (points.length - 1)) * w,
    y: PAD.top + h - (p.value / maxV) * h,
  }));
}

function buildPath(pts: PlottedPoint[]) {
  return pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const cpX = (prev.x + p.x) / 2;
      return `C ${cpX} ${prev.y} ${cpX} ${p.y} ${p.x} ${p.y}`;
    })
    .join(" ");
}

function buildAreaPath(pts: PlottedPoint[]) {
  const linePath = buildPath(pts);
  const bottom = CHART_H - PAD.bottom;
  return `${linePath} L ${pts[pts.length - 1].x} ${bottom} L ${pts[0].x} ${bottom} Z`;
}

export default function Insights() {
  const [activeId, setActiveId] = useState("market");
  const [tooltip, setTooltip] = useState<{ x: number; y: number; point: PlottedPoint } | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prevIdRef = useRef("market");

  const active = datasets.find((d) => d.id === activeId)!;
  const plottedPoints = getPlottedPoints(active.points);
  const linePath = buildPath(plottedPoints);
  const areaPath = buildAreaPath(plottedPoints);

  // Draw-in animation on first scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setDrawn(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Animate path draw using stroke-dasharray
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !drawn) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)";
    requestAnimationFrame(() => { path.style.strokeDashoffset = "0"; });
  }, [drawn, activeId]);

  const handleSelectDataset = useCallback((id: string) => {
    if (id === activeId) return;
    prevIdRef.current = activeId;
    setTransitioning(true);
    setTimeout(() => {
      setActiveId(id);
      setTransitioning(false);
    }, 250);
  }, [activeId]);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = CHART_W / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;

    let closest = plottedPoints[0];
    let minDist = Math.abs(mouseX - plottedPoints[0].x);
    for (const p of plottedPoints) {
      const dist = Math.abs(mouseX - p.x);
      if (dist < minDist) { minDist = dist; closest = p; }
    }

    if (minDist < 40) {
      setTooltip({ x: closest.x, y: closest.y, point: closest });
    } else {
      setTooltip(null);
    }
  }, [plottedPoints]);

  const formatVal = (v: number) => {
    if (active.unit === "%") return `${v}%`;
    if (active.unit === "£bn") return `£${v}B`;
    return `${v}${active.unit}`;
  };

  // Y-axis labels
  const maxV = Math.max(...active.points.map((p) => p.value)) * 1.15;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    value: (maxV * t),
    y: PAD.top + (CHART_H - PAD.top - PAD.bottom) * (1 - t),
  }));

  return (
    <section id="insights" className="section-padding border-t border-[#d0dce8]" ref={sectionRef}>
      <div className="container-main">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#0f1923] leading-tight max-w-xl">
            Ad-Supported Models Lead the{" "}
            <span className="gradient-text">Future of CTV</span>
          </h2>
          <p className="text-[#4a6070] leading-relaxed mt-4 max-w-xl">
            The huge growth in ad-supported CTV leads to improved inventory
            availability, more extensive reach, and deeper targeting —
            resulting in even better outcomes for brands.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 items-start">
          {/* Left: clickable stat cards */}
          <div className="flex flex-col gap-3">
            <p className="text-xs text-[#8a9bad] uppercase tracking-widest mb-1">
              Select a metric to explore
            </p>
            {datasets.map((ds) => (
              <button
                key={ds.id}
                onClick={() => handleSelectDataset(ds.id)}
                className={`text-left p-5 rounded-card border transition-all duration-300 group cursor-pointer ${
                  activeId === ds.id
                    ? "border-[#4d7a96] bg-white shadow-[0_0_24px_rgba(77,122,150,0.1)]"
                    : "border-[#d0dce8] bg-[#f5f7fa] hover:border-[#4d7a96]/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-2xl font-bold transition-colors duration-300 ${
                      activeId === ds.id ? "gradient-text" : "text-[#8a9bad]"
                    }`}
                  >
                    {ds.stat}
                  </span>
                  {activeId === ds.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6bbdd8] animate-pulse" />
                  )}
                </div>
                <p
                  className={`text-sm leading-relaxed mt-2 transition-colors duration-300 ${
                    activeId === ds.id ? "text-[#4a6070]" : "text-[#8a9bad]"
                  }`}
                >
                  {ds.label}
                </p>
              </button>
            ))}
            <p className="text-[#8a9bad] text-xs mt-2 italic">
              * Projected &nbsp;· &nbsp;~ Estimated from growth indices
            </p>
          </div>

          {/* Right: SVG line chart */}
          <div
            className={`bg-white border border-[#d0dce8] rounded-card p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-opacity duration-250 ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Chart header */}
            <div className="mb-5">
              <p className="text-[#0f1923] font-semibold">{active.chartTitle}</p>
              <p className="text-[#4a6070] text-xs mt-0.5">{active.chartSub}</p>
            </div>

            {/* SVG Chart */}
            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              className="w-full h-auto overflow-visible"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Grid lines */}
              {yTicks.map((tick) => (
                <g key={tick.y}>
                  <line
                    x1={PAD.left}
                    y1={tick.y}
                    x2={CHART_W - PAD.right}
                    y2={tick.y}
                    stroke="#d0dce8"
                    strokeWidth="1"
                  />
                  <text
                    x={PAD.left - 6}
                    y={tick.y + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="#8a9bad"
                  >
                    {active.unit === "%" ? `${Math.round(tick.value)}%` : `£${tick.value.toFixed(1)}B`}
                  </text>
                </g>
              ))}

              {/* X-axis labels */}
              {plottedPoints.map((p) => (
                <text
                  key={p.year}
                  x={p.x}
                  y={CHART_H - PAD.bottom + 18}
                  textAnchor="middle"
                  fontSize="10"
                  fill={p.projected ? "#8a9bad" : "#4a6070"}
                >
                  {p.year}{p.projected ? "*" : ""}
                </text>
              ))}

              {/* Area fill */}
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4d7a96" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#4d7a96" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#areaGradient)" />

              {/* Projected segment dashed */}
              {plottedPoints.length >= 2 && (
                <path
                  d={buildPath(plottedPoints.slice(-2))}
                  fill="none"
                  stroke="#4d7a96"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                  opacity="0.5"
                />
              )}

              {/* Main line — animated draw */}
              <path
                ref={pathRef}
                d={linePath}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3a5f75" />
                  <stop offset="100%" stopColor="#6bbdd8" />
                </linearGradient>
              </defs>

              {/* Data point dots */}
              {drawn && plottedPoints.map((p) => (
                <g key={p.year}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="5"
                    fill={p.projected || p.estimated ? "#f5f7fa" : "#4d7a96"}
                    stroke={p.projected ? "#6bbdd8" : p.estimated ? "#8a9bad" : "#6bbdd8"}
                    strokeWidth="1.5"
                    strokeDasharray={p.estimated ? "2 2" : undefined}
                    className="cursor-pointer"
                    opacity={tooltip?.point.year === p.year ? 1 : 0.7}
                  />
                </g>
              ))}

              {/* Tooltip */}
              {tooltip && (
                <g>
                  <line
                    x1={tooltip.x}
                    y1={PAD.top}
                    x2={tooltip.x}
                    y2={CHART_H - PAD.bottom}
                    stroke="#4d7a96"
                    strokeWidth="1"
                    strokeDasharray="3 2"
                    opacity="0.6"
                  />
                  <rect
                    x={tooltip.x - 38}
                    y={tooltip.y - 36}
                    width="76"
                    height="28"
                    rx="5"
                    fill="#ffffff"
                    stroke="#d0dce8"
                    strokeWidth="1"
                  />
                  <text
                    x={tooltip.x}
                    y={tooltip.y - 17}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="#0f1923"
                  >
                    {formatVal(tooltip.point.value)}
                  </text>
                  <text
                    x={tooltip.x}
                    y={tooltip.y - 7}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#4a6070"
                  >
                    {tooltip.point.year}
                    {tooltip.point.projected ? " (proj.)" : tooltip.point.estimated ? " (est.)" : ""}
                  </text>
                </g>
              )}
            </svg>
            <p className="text-[#8a9bad] text-xs mt-3 leading-relaxed">
              {active.source}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
