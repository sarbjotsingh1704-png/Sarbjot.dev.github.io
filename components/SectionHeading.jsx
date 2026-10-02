import { Sparkle } from "lucide-react";

export default function SectionHeading({ eyebrow, title, accent, description, id, children }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-xl">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          {eyebrow}
          <Sparkle className="h-3 w-3 fill-brand" aria-hidden="true" />
        </p>
        <h2 id={id} className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-[2rem]">
          {title}
          {accent ? <span className="text-brand"> {accent}</span> : null}
        </h2>
        {description ? <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
