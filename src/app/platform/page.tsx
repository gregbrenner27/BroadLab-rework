import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Platform from "@/components/sections/Platform";

export const metadata = {
  title: "Platform | Broadlab",
  description:
    "Broadlab's AI-driven Addressable TV platform — a full funnel advertising solution covering inventory sourcing, audience targeting, campaign activation, optimisation, and holistic reporting.",
};

export default function PlatformPage() {
  return (
    <main className="bg-[#eef1f5] min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Platform />
      </div>
      <Footer />
    </main>
  );
}
