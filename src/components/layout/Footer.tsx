import Image from "next/image";

const footerLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Services", href: "#services" },
  { label: "Insights", href: "#insights" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Legitimate Interest", href: "/legitimate-interest" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0f1923]">
      <div className="container-main py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Broadlab"
              width={48}
              height={48}
              className="h-10 w-auto mb-1"
            />
            <p className="text-white/60 text-sm mt-4 leading-relaxed max-w-xs">
              Powering the next generation of Outcome-Driven Addressable TV.
              Simplifying the complex. Maximising outcomes.
            </p>
            <a
              href="https://www.linkedin.com/company/broadlabtv/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-white/50 hover:text-white transition-colors duration-200"
              aria-label="Broadlab LinkedIn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-5">
              Office
            </p>
            <address className="not-italic text-sm text-white/70 leading-relaxed">
              Unit 5, 2nd Floor
              <br />
              The Market Exchange
              <br />
              12 Macklin Street
              <br />
              London WC2B 5NF
              <br />
              United Kingdom
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Broadlab. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
