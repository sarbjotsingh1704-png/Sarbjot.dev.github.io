import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ProjectPreview from "./ProjectPreview";
import { GithubIcon } from "./BrandIcons";

function ActionLink({ href, children, className, disabledHint }) {
  // Links that are not configured yet render as disabled buttons, never as dead links.
  if (!href) {
    return (
      <button
        type="button"
        disabled
        title={disabledHint}
        aria-label={`${children} (link not set yet)`}
        className={`${className} cursor-not-allowed opacity-50`}
      >
        {children}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export default function ProjectCard({ project }) {
  const { title, description, tech, github, demo, preview, image } = project;
  const base =
    "inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition";

  return (
    <article className="card flex h-full flex-col p-3">
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line">
          <Image src={image} alt={`${title} screenshot`} fill sizes="(min-width: 1024px) 360px, 90vw" className="object-cover" />
        </div>
      ) : (
        <ProjectPreview kind={preview} />
      )}

      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
        <h3 className="text-lg font-bold text-navy">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {tech.map((t) => (
            <li key={t} className="rounded-lg bg-mist px-3 py-1.5 text-xs font-semibold text-navy/80">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-3 pt-5">
          <ActionLink
            href={github}
            disabledHint="Add this project's GitHub URL in data/projects.js"
            className={`${base} bg-navy text-white hover:bg-ink`}
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </ActionLink>
          <ActionLink
            href={demo}
            disabledHint="Add this project's live demo URL in data/projects.js"
            className={`${base} bg-brand-soft text-brand hover:bg-lavender`}
          >
            Live Demo
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ActionLink>
        </div>
      </div>
    </article>
  );
}
