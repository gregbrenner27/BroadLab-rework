import Image from "next/image";

const team = [
  {
    name: "Jakob Nielsen",
    title: "CEO & Founder",
    bio: "Jakob founded Broadlab with a vision to make Addressable TV accessible and measurable for every brand. With deep expertise in digital media and AdTech, he leads the company's strategic direction and technology vision.",
    image: "/images/team/jakob.jpeg",
    linkedin: "https://www.linkedin.com/company/broadlabtv/",
  },
  {
    name: "Chris Buck",
    title: "Head of Operations",
    bio: "Chris oversees Broadlab's day-to-day operations, ensuring seamless campaign delivery and platform performance. His background in media operations brings rigour and efficiency to every client engagement.",
    image: "/images/team/chris-buck.jpeg",
    linkedin: "https://www.linkedin.com/in/chris-buck-a5879071/",
  },
  {
    name: "Timothy Whiterow",
    title: "Senior Product Manager",
    bio: "Timothy drives the development of Broadlab's core platform, translating client needs and market insights into innovative product features. He champions the user experience across all touchpoints.",
    image: "/images/team/timothy-whiterow.jpeg",
    linkedin: "https://www.linkedin.com/in/timothy-whiterow-085265171/",
  },
  {
    name: "Jana Eisenstein",
    title: "Chief Partnership Officer",
    bio: "Jana leads Broadlab's publisher and technology partnerships, building the premium inventory ecosystem that powers our platform. Her extensive network spans broadcast, streaming, and digital media.",
    image: "/images/team/jana-eisenstein.jpeg",
    linkedin: "https://www.linkedin.com/in/jana-eisenstein/",
  },
  {
    name: "Paul Cooper",
    title: "Partner Advisor",
    bio: "Paul brings decades of media industry experience to Broadlab as a strategic advisor. His counsel shapes Broadlab's commercial strategy and helps navigate the evolving TV advertising landscape.",
    image: "/images/team/paul-cooper.png",
    linkedin: "https://www.linkedin.com/in/paulcoopermediacom/",
  },
  {
    name: "Your Name",
    title: "Placeholder Role",
    bio: "Broadlab is growing. This position is reserved for the next member of our team as we continue to expand our capabilities and reach.",
    image: null,
    linkedin: null,
    placeholder: true,
  },
];

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Team() {
  return (
    <section id="team" className="section-padding border-t border-[#d0dce8]">
      <div className="container-main">
        <div className="text-center mb-14">
          <span className="tag mb-4 inline-flex">Our Team</span>
          <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#0f1923] leading-tight">
            The people behind{" "}
            <span className="gradient-text">Broadlab</span>
          </h2>
          <p className="text-[#4a6070] mt-4 max-w-xl mx-auto">
            A seasoned team of media, technology, and data specialists united by
            a passion for making Addressable TV work harder for brands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className={`relative bg-white border rounded-card overflow-hidden group transition-all duration-300 hover:shadow-[0_4px_40px_rgba(77,122,150,0.12)] shadow-[0_2px_12px_rgba(0,0,0,0.05)] ${
                member.placeholder
                  ? "border-dashed border-[#d0dce8] opacity-50"
                  : "border-[#d0dce8] hover:border-[#4d7a96]"
              }`}
            >
              {/* Image */}
              <div className="relative h-64 w-full bg-[#eef1f5]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#d0dce8] flex items-center justify-center">
                      <span className="text-3xl text-[#d0dce8]">?</span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-0" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[#0f1923] font-semibold">
                      {member.name}
                    </h3>
                    <p className="text-[#4d7a96] text-sm">{member.title}</p>
                  </div>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8a9bad] hover:text-[#4d7a96] transition-colors duration-200 mt-0.5"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                </div>
                <p className="text-[#4a6070] text-sm leading-relaxed">
                  {member.bio}
                </p>
                {member.placeholder && (
                  <p className="text-xs text-[#8a9bad] mt-3 italic">
                    * Placeholder — to be updated
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
