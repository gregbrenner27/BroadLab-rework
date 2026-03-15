import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ValueProp from "@/components/sections/ValueProp";
import Insights from "@/components/sections/Insights";
import Clients from "@/components/sections/Clients";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="bg-[#eef1f5] min-h-screen">
      <Navbar />
      <Hero />
      <ValueProp />
      <Insights />
      <Clients />
      <Contact />
      <Footer />
    </main>
  );
}
