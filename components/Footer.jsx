import { Code, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./BrandIcons";
import { navLinks, site } from "@/data/site";
import { socialLinks } from "@/data/socialLinks";

const socials = [
  { ...socialLinks.github, Icon: GithubIcon },
  { ...socialLinks.linkedin, Icon: LinkedinIcon },
  { ...socialLinks.email, Icon: Mail },
  { ...socialLinks.x, Icon: XIcon },
];

export default function Footer() {
  return (
    <footer className="px-3 pb-4 pt-8 sm:px-5">
      <div className="mx-auto max-w-6xl rounded-[28px] bg-navy px-6 py-8 text-white shadow-card sm:px-10">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1.2fr_auto]">
          <div>
            <a href="#home" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand">
                <Code className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold">{site.name}</span>
            </a>
            <p className="mt-3 text-sm text-white/70">{site.tagline}</p>
            <p className="mt-1 text-xs text-white/50">{site.footerLine}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-bold">Quick Links</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:justify-self-end">
            <h2 className="text-sm font-bold">Let&apos;s Connect</h2>
            <ul className="mt-3 flex gap-3">
              {socials.map(({ label, href, Icon }) => {
                const isMailLink = href.startsWith("mailto:");

                return (
                  <li key={label}>
                    <a
                      href={href}
                      target={isMailLink ? undefined : "_blank"}
                      rel={isMailLink ? undefined : "noopener noreferrer"}
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 transition hover:border-white/50 hover:text-white"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Designed and built by {site.owner}.</p>
        </div>
      </div>
    </footer>
  );
}
