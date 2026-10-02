import { CalendarDays, FolderOpen, Quote, Star } from "lucide-react";
import { quote, site, stats } from "@/data/site";

const icons = { folder: FolderOpen, calendar: CalendarDays, star: Star };

export default function Stats() {
  return (
    <section aria-label="Quote and highlights" className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="grid items-center gap-6 rounded-[28px] border border-white/80 bg-gradient-to-r from-[#e3ecff] via-[#e6e4ff] to-[#dcd8ff] p-5 shadow-card lg:grid-cols-[1.3fr_2fr] lg:p-6">
        <figure className="flex items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand text-white shadow-soft">
            <Quote className="h-6 w-6 fill-white" aria-hidden="true" />
          </span>
          <div>
            <blockquote className="text-sm italic leading-relaxed text-navy sm:text-base">“{quote.text}”</blockquote>
            <figcaption className="mt-2 text-sm">
              <span className="block font-bold text-navy">{site.owner}</span>
              <span className="text-muted">{site.role}</span>
            </figcaption>
          </div>
        </figure>

        <ul className="grid grid-cols-3 divide-x divide-brand/15">
          {stats.map((s) => {
            const Icon = icons[s.icon] ?? Star;
            return (
              <li key={s.id} className="flex flex-col items-center px-2 text-center sm:px-4">
                <span className="mb-2 grid h-9 w-9 place-items-center rounded-full bg-white text-brand shadow-soft">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-2xl font-extrabold text-navy sm:text-3xl">
                  {s.value}
                  {s.suffix}
                </span>
                <span className="mt-0.5 text-xs text-muted sm:text-sm">{s.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
