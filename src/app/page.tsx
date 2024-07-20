import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[90vh] max-w-screen py-9 overflow-hidden justify-center items-center  bg-background">
      <Hero/>
      <About/>
      <HowItWorks/>
      <Testimonials/>
    </div>
  );
}
