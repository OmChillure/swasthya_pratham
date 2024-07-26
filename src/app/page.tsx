
import { About } from "@/components/About";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[90vh] max-w-screen pt-9 overflow-hidden justify-center items-center  bg-background">
      <Hero/>
      <About/>
      <HowItWorks/>
      <Testimonials/>
      <Footer />
    </div>
  );
}
