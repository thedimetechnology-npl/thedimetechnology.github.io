import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Comparison from "@/components/Comparison";
import Services from "@/components/Services";

import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Clients />
      <About />
      <Comparison />
      <Services />
      <Process />
      <TechStack />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
