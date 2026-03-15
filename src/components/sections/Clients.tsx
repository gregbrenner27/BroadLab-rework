"use client";

// ── Placeholder data — replace with real logos when available ─────────────────

const row1 = [
  { name: "Initiative",   category: "Media Agency"  },
  { name: "Sky Media",    category: "Broadcast"     },
  { name: "Unilever",     category: "Advertiser"    },
  { name: "Mindshare",    category: "Media Agency"  },
  { name: "Channel 4",    category: "Broadcast"     },
  { name: "L'Oréal",      category: "Advertiser"    },
  { name: "OMD UK",       category: "Media Agency"  },
  { name: "ITV",          category: "Broadcast"     },
];

const row2 = [
  { name: "Vodafone",     category: "Advertiser"    },
  { name: "Havas Media",  category: "Media Agency"  },
  { name: "Now TV",       category: "Streaming"     },
  { name: "P&G",          category: "Advertiser"    },
  { name: "Zenith",       category: "Media Agency"  },
  { name: "ITVX",         category: "Streaming"     },
  { name: "Samsung",      category: "Advertiser"    },
  { name: "Wavemaker",    category: "Media Agency"  },
];

// ── Logo card ─────────────────────────────────────────────────────────────────

function LogoCard({ name, category }: { name: string; category: string }) {
  return (
    <div className="flex-shrink-0 w-44 h-[72px] bg-white rounded-2xl border border-[#e4eaf0] flex items-center gap-3 px-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      {/* Mock logo mark */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#eef4f8] to-[#d4e6f0] flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-bold text-[#4d7a96]">{name.charAt(0)}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold text-[#0f1923] truncate">{name}</p>
        <p className="text-[9px] text-[#8a9bad] uppercase tracking-wider">{category}</p>
      </div>
    </div>
  );
}

// ── Marquee row ───────────────────────────────────────────────────────────────

function MarqueeRow({ items, reverse = false }: { items: typeof row1; reverse?: boolean }) {
  // Duplicate items for seamless infinite loop
  const doubled = [...items, ...items];
  return (
    <div className="flex gap-4" style={{ animation: `${reverse ? "marqueeRight" : "marqueeLeft"} 32s linear infinite`, width: "max-content" }}>
      {doubled.map((item, i) => (
        <LogoCard key={`${item.name}-${i}`} name={item.name} category={item.category} />
      ))}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Clients() {
  return (
    <section className="section-padding border-t border-[#d0dce8] bg-[#f5f7fa]">
      <div className="container-main">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#0f1923] leading-tight">
            Trusted by leading{" "}
            <span className="gradient-text">agencies & brands</span>
          </h2>
          <p className="text-[#4a6070] mt-4 max-w-lg mx-auto text-[15px]">
            We work with some of the UK&apos;s most ambitious advertisers and
            media agencies. Client logos will be displayed here.
          </p>
        </div>

      </div>

      {/* Carousel — full-bleed so edge fades reach the screen edges */}
      <div className="relative overflow-hidden py-2">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f5f7fa] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f5f7fa] to-transparent z-10 pointer-events-none" />

        <div className="flex flex-col gap-4">
          {/* Row 1 — scrolls left */}
          <div className="overflow-hidden">
            <MarqueeRow items={row1} reverse={false} />
          </div>
          {/* Row 2 — scrolls right */}
          <div className="overflow-hidden">
            <MarqueeRow items={row2} reverse={true} />
          </div>
        </div>
      </div>

      {/* Publisher note */}
      <div className="container-main mt-10">
        <div className="p-5 rounded-2xl border border-[#d0dce8] bg-white text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <p className="text-[#4a6070] text-sm">
            <span className="text-[#4d7a96] font-semibold">Publisher Partners:</span>{" "}
            Broadlab works with premium UK broadcast and streaming publishers to deliver
            addressable inventory across 18M+ households. Publisher logos to be added.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
