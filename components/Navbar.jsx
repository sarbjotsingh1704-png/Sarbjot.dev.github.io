"use client";

import { useEffect, useState } from "react";
import { Code, Download, Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  // Highlight the link of the section currently in view.
  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Primary"
        className="mx-auto max-w-6xl rounded-2xl border border-white/80 bg-white/75 px-4 py-2.5 shadow-card backdrop-blur-md sm:px-6"
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white shadow-soft">
              <Code className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-navy">{site.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href ? "page" : undefined}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    active === l.href ? "bg-brand-soft text-brand" : "text-muted hover:text-navy"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.resumePath}
              download
              className="hidden items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark sm:inline-flex"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-navy md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="mt-3 border-t border-line pt-3 md:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                      active === l.href ? "bg-brand-soft text-brand" : "text-navy"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={site.resumePath}
              download
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
