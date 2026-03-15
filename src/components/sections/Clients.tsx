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
    <div className="flex-shrink-0 w-44 h-[72px] bg-[#1a2f3d] rounded-2xl border border-[#2d4f65] flex items-center gap-3 px-4 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
      {/* Mock logo mark */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4d7a96] to-[#6bbdd8] flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-bold text-white">{name.charAt(0)}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold text-white truncate">{name}</p>
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
    <section className="section-padding bg-[#0f1923]">
      <div className="container-main">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white leading-tight">
            Trusted by leading{" "}
            <span className="gradient-text">agencies & brands</span>
          </h2>
          <p className="text-[#8a9bad] mt-4 max-w-lg mx-auto text-[15px]">
            We work with some of the UK&apos;s most ambitious advertisers and
            media agencies. Client logos will be displayed here.
          </p>
        </div>

      </div>

      {/* Carousel — full-bleed so edge fades reach the screen edges */}
      <div className="relative overflow-hidden py-2">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0f1923] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0f1923] to-transparent z-10 pointer-events-none" />

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
        <div className="p-5 rounded-2xl border border-[#2d4f65] bg-[#1a2f3d] text-center shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
          <p className="text-[#8a9bad] text-sm">
            <span className="text-[#6bbdd8] font-semibold">Publisher Partners:</span>{" "}
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
