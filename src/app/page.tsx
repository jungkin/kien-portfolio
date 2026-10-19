import Hero from "@/components/hero/Hero";
import ProjectsSection from "@/components/projects/ProjectsSection";
import CADLabSection from "@/components/cad/CADLabSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import SkillsSection from "@/components/skills/SkillsSection";
import AboutSection from "@/components/about/AboutSection";
import LibrarySection from "@/components/library/LibrarySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <CADLabSection />
      <ExperienceSection />
      <SkillsSection />
      <AboutSection />
      <LibrarySection />
      <Footer />
    </>
  );
}
