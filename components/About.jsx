import { BookOpen, BrainCircuit, Code, Download, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import PortraitFrame from "./PortraitFrame";
import { site } from "@/data/site";

const highlights = [
  {
    title: "Full-Stack Development",
    text: "Building modern, responsive and scalable web applications.",
    Icon: Code,
    tone: "bg-brand text-white",
  },
  {
    title: "AI & Machine Learning",
    text: "Exploring data, models and intelligent solutions to solve real problems.",
    Icon: BrainCircuit,
    tone: "bg-[#5b6df6] text-white",
  },
  {
    title: "Continuous Learning",
    text: "Always learning new technologies and improving my skills.",
    Icon: BookOpen,
    tone: "bg-emerald-500 text-white",
  },
];

export default function About({ portraitSrc }) {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr_1.1fr]">
        <div>
          <SectionHeading id="about-title" eyebrow="About Me" title="A bit about me" />
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted">
            I&apos;m Sarbjot Singh, a BCA student and a passionate Full-Stack Developer with a keen interest in Artificial
            Intelligence and Machine Learning. I enjoy building web applications, exploring new technologies, and turning
            ideas into real projects.
          </p>
          <a
            href={site.resumePath}
            download
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Resume
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[320px]">
          <div className="absolute inset-0 rounded-full border border-brand/20 bg-white/40" aria-hidden="true" />
          <div className="absolute inset-[5%] rounded-full border border-dashed border-brand/25" aria-hidden="true" />
          <PortraitFrame src="/img/about.png" className="absolute inset-[9%] shadow-card ring-4 ring-white" />
          <Send className="absolute -top-2 right-6 h-7 w-7 -rotate-6 text-brand/70" aria-hidden="true" />
          <p
            className="absolute -right-3 top-[18%] grid h-20 w-20 place-items-center rounded-full border border-line bg-white text-center font-hand text-sm leading-4 text-brand shadow-soft"
            aria-hidden="true"
          >
            Code
            <br />
            Create
            <br />
            Learn
            <br />
            Repeat
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {highlights.map(({ title, text, Icon, tone }) => (
            <li key={title} className="card flex items-center gap-4 p-4">
              <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${tone}`}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-navy">{title}</h3>
                <p className="mt-0.5 text-sm leading-snug text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
