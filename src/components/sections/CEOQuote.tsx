import Image from "next/image";

export default function CEOQuote() {
  return (
    <section className="section-padding border-t border-[#d0dce8] bg-[#eef1f5]">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              {/* Decorative frame */}
              <div className="absolute -inset-3 rounded-card border border-[#4d7a96]/20" />
              <div className="absolute -inset-6 rounded-card border border-[#4d7a96]/10" />

              <div className="relative rounded-card overflow-hidden aspect-[4/5]">
                <Image
                  src="/images/team/jakob.jpeg"
                  alt="Jakob Nielsen, CEO & Founder of Broadlab"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#eef1f5]/50 via-transparent to-transparent" />
              </div>

              {/* Name card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm border border-[#d0dce8] rounded-lg px-4 py-3">
                <p className="text-[#0f1923] font-semibold text-sm">
                  Jakob Nielsen
                </p>
                <p className="text-[#4d7a96] text-xs">CEO & Founder, Broadlab</p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="order-1 lg:order-2">
            <span className="tag mb-8 inline-flex">From the Founder</span>

            {/* Large quote mark */}
            <div className="text-[120px] leading-none text-[#4d7a96]/15 font-serif select-none -mb-8">
              &ldquo;
            </div>

            <blockquote className="text-[clamp(1.2rem,2.5vw,1.75rem)] font-medium text-[#0f1923] leading-relaxed mb-8">
              We simplify the complex world of Addressable TV, giving brands and
              agencies a single, optimised solution to maximise outcomes through
              our proprietary, household-based ID graph.
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-[#4d7a96]" />
              <div>
                <p className="text-[#0f1923] font-semibold">Jakob Nielsen</p>
                <p className="text-[#4a6070] text-sm">CEO & Founder, Broadlab</p>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-card border border-[#d0dce8] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <p className="text-[#4a6070] text-sm leading-relaxed">
                Broadlab was founded with a clear mission: to make Addressable
                TV accessible, transparent, and measurable for every brand —
                regardless of size. Our technology brings together the best of
                broadcast and digital into one powerful, unified platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
