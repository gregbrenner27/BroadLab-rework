"use client";

import { useEffect, useRef, useState } from "react";

// ── Shared types ──────────────────────────────────────────────────────────────

type Tab = "Campaigns" | "Audiences" | "Analytics" | "Reporting";

// ── Campaigns data ────────────────────────────────────────────────────────────

const campaignKpis = [
  { label: "Total Reach",      value: "14.2M", delta: "+12%"  },
  { label: "HH Targeted",      value: "3.8M",  delta: "+8%"   },
  { label: "Active Campaigns", value: "12",    delta: "3 new" },
  { label: "Avg. ROAS",        value: "3.4×",  delta: "+0.4"  },
];

const campaigns = [
  { name: "Sky Sports – Q1 Reach",  status: "Live",       score: 92, spend: "£48,200" },
  { name: "ITV Hub – Brand Lift",   status: "Optimising", score: 78, spend: "£31,500" },
  { name: "Channel 4 – Retarget",   status: "Complete",   score: 85, spend: "£22,800" },
];

const statusStyle: Record<string, string> = {
  Live:       "bg-[#dcfce7] text-[#16a34a]",
  Optimising: "bg-[#fef9c3] text-[#ca8a04]",
  Complete:   "bg-[#f1f5f9] text-[#64748b]",
};

const chartPts: [number, number][] = [
  [0, 74], [45, 66], [90, 57], [135, 48], [180, 38], [220, 26], [265, 15], [310, 7],
];

function smoothPath(pts: [number, number][], close = false) {
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const mx = (px + cx) / 2;
    d += ` C ${mx},${py} ${mx},${cy} ${cx},${cy}`;
  }
  if (close) {
    const last = pts[pts.length - 1];
    d += ` L ${last[0]},88 L 0,88 Z`;
  }
  return d;
}

// ── Audiences data ────────────────────────────────────────────────────────────

const audienceKpis = [
  { label: "Total Segments", value: "48",   delta: "5 new"  },
  { label: "ID Match Rate",  value: "87%",  delta: "+3%"    },
  { label: "Avg. Size",      value: "2.1M", delta: "per seg"},
  { label: "Data Sources",   value: "12",   delta: "active" },
];

const segments = [
  { name: "Sports Enthusiasts",  size: 4.2, households: "4.2M HH", status: "Active"   },
  { name: "Auto Intenders",      size: 2.8, households: "2.8M HH", status: "Active"   },
  { name: "Premium Shoppers",    size: 3.1, households: "3.1M HH", status: "Active"   },
  { name: "Home Movers",         size: 1.9, households: "1.9M HH", status: "Building" },
];
const maxSeg = 4.2;

const segStatusStyle: Record<string, string> = {
  Active:   "bg-[#dcfce7] text-[#16a34a]",
  Building: "bg-[#e0f2fe] text-[#0284c7]",
};

// ── Analytics data ────────────────────────────────────────────────────────────

const analyticsKpis = [
  { label: "Avg. VCR",    value: "94%",  delta: "+2%"  },
  { label: "Brand Lift",  value: "+18%", delta: "vs ctrl" },
  { label: "CTR",         value: "0.42%",delta: "+0.1%" },
  { label: "Completion",  value: "91%",  delta: "top Q" },
];

const channels = [
  { name: "Sky",    vcr: 96, lift: 22 },
  { name: "ITV",    vcr: 93, lift: 18 },
  { name: "C4",     vcr: 91, lift: 15 },
  { name: "C5",     vcr: 89, lift: 14 },
  { name: "BVOD",   vcr: 97, lift: 24 },
];

// ── Reporting data ────────────────────────────────────────────────────────────

const reportingKpis = [
  { label: "Reports",       value: "24",  delta: "this Q"   },
  { label: "Last Export",   value: "Today", delta: "09:41"  },
  { label: "Data Lag",      value: "<1hr", delta: "live"    },
  { label: "Attribution",   value: "Full", delta: "funnel"  },
];

const reports = [
  { name: "Q1 Campaign Summary",     type: "Campaign",  updated: "Today",     icon: "📊" },
  { name: "Audience Insights Report",type: "Audiences", updated: "Yesterday", icon: "👥" },
  { name: "Full-Funnel Attribution", type: "Analytics", updated: "2 days ago",icon: "🔗" },
  { name: "Brand Lift Study",        type: "Research",  updated: "Mar 10",    icon: "📈" },
];

// ── Tab content panels ────────────────────────────────────────────────────────

function CampaignsPanel() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {campaignKpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-2.5 border border-[#e4eaf0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <p className="text-[9px] text-[#8a9bad] uppercase tracking-wide mb-1.5">{kpi.label}</p>
            <p className="text-[15px] font-bold text-[#0f1923] leading-none mb-1">{kpi.value}</p>
            <span className="text-[9px] text-[#22c55e] font-semibold">{kpi.delta}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-3.5 border border-[#e4eaf0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold text-[#0f1923]">Campaign Reach</p>
          <span className="text-[9px] text-[#8a9bad] bg-[#f1f5f9] px-2 py-0.5 rounded">Jan → Mar 2025</span>
        </div>
        {/* No circles — avoids oval distortion from non-uniform SVG scaling */}
        <svg viewBox="0 0 310 80" className="w-full h-[72px]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#4d7a96" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#4d7a96" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[20, 40, 60].map((y) => (
            <line key={y} x1="0" y1={y} x2="310" y2={y} stroke="#eef1f5" strokeWidth="1" />
          ))}
          <path d={smoothPath(chartPts, true)} fill="url(#areaFill)" />
          <path d={smoothPath(chartPts)} fill="none" stroke="#4d7a96" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* X-axis labels — rendered in HTML so they stay crisp */}
        <div className="flex justify-between mt-1.5 px-0.5">
          {["Jan", "Feb", "Mar"].map((m) => (
            <span key={m} className="text-[9px] text-[#b0bec8]">{m}</span>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#e4eaf0] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-[1fr_76px_52px_72px] gap-2 px-3 py-2 bg-[#f8fafc] border-b border-[#e4eaf0]">
          {["Campaign", "Status", "Score", "Spend"].map((h) => (
            <span key={h} className="text-[9px] text-[#8a9bad] uppercase tracking-wider font-semibold">{h}</span>
          ))}
        </div>
        {campaigns.map((c, i) => (
          <div key={c.name} className={`grid grid-cols-[1fr_76px_52px_72px] gap-2 px-3 py-2.5 items-center ${i < campaigns.length - 1 ? "border-b border-[#f1f5f9]" : ""}`}>
            <span className="text-[11px] text-[#0f1923] font-medium truncate">{c.name}</span>
            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full w-fit ${statusStyle[c.status]}`}>{c.status}</span>
            <span className="text-[11px] text-[#4a6070]">{c.score}/100</span>
            <span className="text-[11px] text-[#0f1923] font-medium">{c.spend}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AudiencesPanel() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {audienceKpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-2.5 border border-[#e4eaf0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <p className="text-[9px] text-[#8a9bad] uppercase tracking-wide mb-1.5">{kpi.label}</p>
            <p className="text-[15px] font-bold text-[#0f1923] leading-none mb-1">{kpi.value}</p>
            <span className="text-[9px] text-[#22c55e] font-semibold">{kpi.delta}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-3.5 border border-[#e4eaf0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold text-[#0f1923]">Audience Segments</p>
          <span className="text-[9px] text-[#8a9bad] bg-[#f1f5f9] px-2 py-0.5 rounded">by household size</span>
        </div>
        <div className="space-y-2.5">
          {segments.map((seg) => (
            <div key={seg.name} className="flex items-center gap-2">
              <span className="text-[10px] text-[#4a6070] w-28 truncate flex-shrink-0">{seg.name}</span>
              <div className="flex-1 bg-[#f1f5f9] rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4d7a96] to-[#6bbdd8]"
                  style={{ width: `${(seg.size / maxSeg) * 100}%`, transition: "width 1s ease" }}
                />
              </div>
              <span className="text-[10px] text-[#0f1923] font-semibold w-10 text-right flex-shrink-0">{seg.households}</span>
              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${segStatusStyle[seg.status]}`}>{seg.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl p-3 border border-[#e4eaf0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <p className="text-[10px] text-[#8a9bad] mb-2">Data sources powering your audiences</p>
        <div className="flex flex-wrap gap-1.5">
          {["1st Party CRM", "Household ID Graph", "Purchase Intent", "Search Signals", "Affinity Data", "Demographic", "Geo Targeting", "SVOD Behaviour"].map((tag) => (
            <span key={tag} className="text-[9px] px-2 py-1 rounded-full bg-[#eef4f8] text-[#4d7a96] font-medium border border-[#d0dce8]">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {analyticsKpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-2.5 border border-[#e4eaf0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <p className="text-[9px] text-[#8a9bad] uppercase tracking-wide mb-1.5">{kpi.label}</p>
            <p className="text-[15px] font-bold text-[#0f1923] leading-none mb-1">{kpi.value}</p>
            <span className="text-[9px] text-[#22c55e] font-semibold">{kpi.delta}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-3.5 border border-[#e4eaf0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold text-[#0f1923]">Performance by Channel</p>
          <span className="text-[9px] text-[#8a9bad] bg-[#f1f5f9] px-2 py-0.5 rounded">VCR %</span>
        </div>
        <div className="flex items-end justify-between gap-2 h-[72px]">
          {channels.map((ch) => (
            <div key={ch.name} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-[#4d7a96] font-bold">{ch.vcr}%</span>
              <div className="w-full rounded-t-md bg-gradient-to-t from-[#4d7a96] to-[#6bbdd8]" style={{ height: `${(ch.vcr / 100) * 52}px` }} />
              <span className="text-[9px] text-[#8a9bad]">{ch.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#e4eaf0] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-[1fr_60px_60px_60px] gap-2 px-3 py-2 bg-[#f8fafc] border-b border-[#e4eaf0]">
          {["Channel", "VCR", "Lift", "CTR"].map((h) => (
            <span key={h} className="text-[9px] text-[#8a9bad] uppercase tracking-wider font-semibold">{h}</span>
          ))}
        </div>
        {channels.map((ch, i) => (
          <div key={ch.name} className={`grid grid-cols-[1fr_60px_60px_60px] gap-2 px-3 py-2 items-center ${i < channels.length - 1 ? "border-b border-[#f1f5f9]" : ""}`}>
            <span className="text-[11px] text-[#0f1923] font-medium">{ch.name}</span>
            <span className="text-[11px] text-[#4a6070]">{ch.vcr}%</span>
            <span className="text-[11px] text-[#22c55e] font-semibold">+{ch.lift}%</span>
            <span className="text-[11px] text-[#4a6070]">0.4%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportingPanel() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {reportingKpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-2.5 border border-[#e4eaf0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <p className="text-[9px] text-[#8a9bad] uppercase tracking-wide mb-1.5">{kpi.label}</p>
            <p className="text-[15px] font-bold text-[#0f1923] leading-none mb-1">{kpi.value}</p>
            <span className="text-[9px] text-[#22c55e] font-semibold">{kpi.delta}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-3.5 border border-[#e4eaf0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold text-[#0f1923]">Available Reports</p>
          <button className="text-[9px] text-[#4d7a96] font-semibold bg-[#eef4f8] px-2 py-0.5 rounded border border-[#d0dce8] hover:bg-[#d0dce8] transition-colors">+ New Report</button>
        </div>
        <div className="space-y-2">
          {reports.map((r, i) => (
            <div key={r.name} className={`flex items-center gap-3 py-2 ${i < reports.length - 1 ? "border-b border-[#f1f5f9]" : ""}`}>
              <span className="text-base flex-shrink-0">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-[#0f1923] font-medium truncate">{r.name}</p>
                <p className="text-[9px] text-[#8a9bad]">{r.type} · Updated {r.updated}</p>
              </div>
              <button className="text-[9px] text-[#4d7a96] font-semibold bg-[#eef4f8] px-2 py-1 rounded border border-[#d0dce8] flex-shrink-0 hover:bg-[#d0dce8] transition-colors">
                Export
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#eef4f8] rounded-xl p-3 border border-[#d0dce8] flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-[#4d7a96] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs">↗</span>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#0f1923]">Automated weekly digest</p>
          <p className="text-[9px] text-[#4a6070]">Sent every Monday at 08:00 · 3 recipients</p>
        </div>
        <span className="ml-auto text-[9px] text-[#22c55e] font-semibold bg-[#dcfce7] px-2 py-0.5 rounded-full">Active</span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const TABS: Tab[] = ["Campaigns", "Audiences", "Analytics", "Reporting"];

export default function Platform() {
  const dashRef   = useRef<HTMLDivElement>(null);
  const [visible, setVisible]   = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Campaigns");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (dashRef.current) observer.observe(dashRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="platform" className="section-padding border-t border-[#d0dce8]">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: copy ── */}
          <div>
            <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#0f1923] leading-tight mb-6">
              Addressable TV is a{" "}
              <span className="gradient-text">full funnel</span>{" "}
              advertising medium
            </h2>
            <p className="text-[#4a6070] leading-relaxed mb-5">
              Broadlab&apos;s platform gives agencies and advertisers a single
              command centre for Addressable TV — inventory sourcing, audience
              targeting, real-time optimisation, and holistic reporting, all in
              one place.
            </p>
            <p className="text-[#4a6070] leading-relaxed mb-8">
              No stitching together vendors. No black-box reporting. Just one
              clean dashboard that shows exactly what&apos;s working.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4d7a96] hover:bg-[#6bbdd8] text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_24px_rgba(77,122,150,0.35)]"
            >
              Request a Demo →
            </a>
          </div>

          {/* ── Right: browser-framed dashboard mockup ── */}
          <div
            ref={dashRef}
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 0.85s ease, transform 0.85s ease",
            }}
          >
            <div className="rounded-2xl overflow-hidden border border-[#d0dce8] shadow-[0_28px_72px_rgba(77,122,150,0.16),0_4px_16px_rgba(0,0,0,0.06)]">

              {/* Browser chrome */}
              <div className="bg-[#eef1f5] px-4 py-3 flex items-center gap-3 border-b border-[#d0dce8]">
                <div className="flex gap-1.5 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 bg-white/80 rounded-md px-3 py-1 text-[11px] text-[#8a9bad] font-mono border border-[#d0dce8] truncate">
                  app.broadlab.tv/{activeTab.toLowerCase()}
                </div>
              </div>

              {/* Dashboard body */}
              <div className="bg-[#f8fafc] p-4 space-y-3">

                {/* Interactive tabs */}
                <div className="flex items-center gap-1 border-b border-[#e4eaf0] pb-2.5">
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
                        tab === activeTab
                          ? "bg-[#4d7a96] text-white shadow-sm"
                          : "text-[#8a9bad] hover:text-[#4a6070] hover:bg-white/80"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                  <div className="ml-auto">
                    <span className="text-[10px] text-[#8a9bad] bg-white border border-[#e4eaf0] rounded px-2 py-1">Q1 2025 ▾</span>
                  </div>
                </div>

                {/* Tab content — animated swap */}
                <div
                  key={activeTab}
                  style={{ animation: "tabFadeIn 0.25s ease both" }}
                >
                  {activeTab === "Campaigns"  && <CampaignsPanel />}
                  {activeTab === "Audiences"  && <AudiencesPanel />}
                  {activeTab === "Analytics"  && <AnalyticsPanel />}
                  {activeTab === "Reporting"  && <ReportingPanel />}
                </div>

              </div>
            </div>

            <p className="text-center text-[10px] text-[#aab8c4] mt-2.5 italic">
              Illustrative platform preview — data is representative only
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
