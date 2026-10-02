import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
import { socialLinks } from "@/data/socialLinks";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="panel p-5 sm:p-8">
        <SectionHeading
          id="projects-title"
          eyebrow="Selected Projects"
          title="Featured Projects"
          description="Here are some of my recent projects that showcase my skills in full-stack development and machine learning."
        >
          <a
            href={`${socialLinks.github.href}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-brand/15 bg-brand-soft px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-lavender"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </SectionHeading>

        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
