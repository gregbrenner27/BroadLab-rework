"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to form service (e.g. Resend, Formspree, or custom API route)
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding border-t border-[#d0dce8]">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <span className="tag mb-6 inline-flex">Get in Touch</span>
            <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#0f1923] leading-tight mb-6">
              Want to know more?
            </h2>
            <p className="text-[#4a6070] leading-relaxed mb-8">
              Contact us today to learn more about how Broadlab&apos;s
              comprehensive Addressable TV advertising solution can help your
              business achieve better outcomes.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-[#d0dce8] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4d7a96"
                    strokeWidth="1.5"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#0f1923] text-sm font-medium">Office</p>
                  <p className="text-[#4a6070] text-sm leading-relaxed">
                    Unit 5, 2nd Floor, The Market Exchange
                    <br />
                    12 Macklin Street, London WC2B 5NF
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-[#d0dce8] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-[#4d7a96]"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#0f1923] text-sm font-medium">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/company/broadlabtv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4d7a96] hover:text-[#6bbdd8] text-sm transition-colors duration-200"
                  >
                    linkedin.com/company/broadlabtv
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white border border-[#d0dce8] rounded-card p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[#4d7a96]/10 border border-[#4d7a96]/25 flex items-center justify-center mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4d7a96"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-[#0f1923] font-semibold text-lg mb-2">
                  Message Received
                </h3>
                <p className="text-[#4a6070] text-sm">
                  Thank you for reaching out. We&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#4a6070] mb-1.5 uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-[#f5f7fa] border border-[#d0dce8] rounded-lg px-4 py-3 text-sm text-[#0f1923] placeholder-[#8a9bad] focus:outline-none focus:border-[#4d7a96] transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#4a6070] mb-1.5 uppercase tracking-wide">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="w-full bg-[#f5f7fa] border border-[#d0dce8] rounded-lg px-4 py-3 text-sm text-[#0f1923] placeholder-[#8a9bad] focus:outline-none focus:border-[#4d7a96] transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#4a6070] mb-1.5 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full bg-[#f5f7fa] border border-[#d0dce8] rounded-lg px-4 py-3 text-sm text-[#0f1923] placeholder-[#8a9bad] focus:outline-none focus:border-[#4d7a96] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#4a6070] mb-1.5 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your campaign goals..."
                    className="w-full bg-[#f5f7fa] border border-[#d0dce8] rounded-lg px-4 py-3 text-sm text-[#0f1923] placeholder-[#8a9bad] focus:outline-none focus:border-[#4d7a96] transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#4d7a96] hover:bg-[#6bbdd8] text-white font-medium transition-all duration-200 hover:shadow-[0_0_30px_rgba(77,122,150,0.25)]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
