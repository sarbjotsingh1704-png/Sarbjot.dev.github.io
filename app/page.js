import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import SkillsCarousel from "@/components/SkillsCarousel";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getPortrait } from "@/lib/portrait";

export default function Home() {
  const portraitSrc = getPortrait();

  return (
    <>
      <Navbar />
      <main>
        <Hero portraitSrc={portraitSrc} />
        <Projects />
        <SkillsCarousel />
        <About portraitSrc={portraitSrc} />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
