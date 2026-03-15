import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Services from "@/components/sections/Services";

export const metadata = {
  title: "Services | Broadlab",
  description:
    "The four pillars of Broadlab's Addressable TV platform — Maximum Reach, Campaign Optimisation, Customised Audiences, and Holistic Reporting.",
};

export default function ServicesPage() {
  return (
    <main className="bg-[#f5f7fa] min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Services />
      </div>
      <Footer />
    </main>
  );
}
