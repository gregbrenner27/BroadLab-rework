import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CEOQuote from "@/components/sections/CEOQuote";
import Team from "@/components/sections/Team";

export const metadata = {
  title: "Team | Broadlab",
  description:
    "Meet the team behind Broadlab — a seasoned group of media, technology, and data specialists united by a passion for Addressable TV.",
};

export default function TeamPage() {
  return (
    <main className="bg-[#eef1f5] min-h-screen">
      <Navbar />
      <div className="pt-20">
        <CEOQuote />
        <Team />
      </div>
      <Footer />
    </main>
  );
}
