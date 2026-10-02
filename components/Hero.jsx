"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code, Mail, Send, Sparkle } from "lucide-react";
import PortraitFrame from "./PortraitFrame";
import TechIcon from "./TechIcon";
import { GithubIcon, LinkedinIcon, XIcon } from "./BrandIcons";
import { skills } from "@/data/skills";
import { site } from "@/data/site";
import { socialLinks } from "@/data/socialLinks";

const byId = (id) => skills.find((s) => s.id === id);

const parent = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const child = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function FloatCard({ children, className, delay = 0, amp = 8, label }) {
  return (
    <motion.div
      className={`absolute grid place-items-center rounded-2xl border border-line bg-white shadow-card ${className}`}
      animate={{ y: [0, -amp, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      role="img"
      aria-label={label}
    >
      {children}
    </motion.div>
  );
}

const socials = [
  { ...socialLinks.github, Icon: GithubIcon },
  { ...socialLinks.linkedin, Icon: LinkedinIcon },
  { ...socialLinks.email, Icon: Mail },
  { ...socialLinks.x, Icon: XIcon },
];

export default function Hero({ portraitSrc }) {
  return (
    <section id="home" className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 lg:pt-14" aria-labelledby="hero-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <motion.div variants={parent} initial="hidden" animate="show">
          <motion.p
            variants={child}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-medium text-muted shadow-soft"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for opportunities
          </motion.p>

          <motion.p variants={child} className="mt-6 flex items-center gap-2 text-2xl font-semibold text-brand sm:text-3xl">
            Hey, I&apos;m
            <Sparkle className="h-4 w-4 fill-brand" aria-hidden="true" />
          </motion.p>
          <motion.h1
            id="hero-title"
            variants={child}
            className="mt-1 text-5xl font-extrabold tracking-tight text-navy sm:text-6xl"
          >
            Sarbjot <span className="text-brand">Singh</span>
          </motion.h1>
          <motion.p variants={child} className="mt-4 text-xl font-bold text-navy sm:text-2xl">
            {site.role}
          </motion.p>
          <motion.p variants={child} className="mt-3 max-w-md text-base leading-relaxed text-muted">
            I build modern web applications and intelligent solutions that solve real-world problems.
          </motion.p>

          <motion.div variants={child} className="mt-7 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark"
            >
              View My Work
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-navy shadow-soft transition-colors hover:border-brand/40"
            >
              About Me
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.ul variants={child} className="mt-6 flex gap-3" aria-label="Social links">
            {socials.map(({ label, href, Icon }) => {
              const isMailLink = href.startsWith("mailto:");

              return (
                <li key={label}>
                  <a
                    href={href}
                    target={isMailLink ? undefined : "_blank"}
                    rel={isMailLink ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy shadow-soft transition hover:-translate-y-0.5 hover:text-brand"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* Portrait composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto aspect-square w-full max-w-[460px]"
        >
          {/* decorative rings and dots */}
          <div className="absolute inset-[6%] rounded-full border border-brand/15" aria-hidden="true" />
          <div className="absolute inset-[14%] rounded-full border border-brand/10" aria-hidden="true" />
          <span className="absolute left-[18%] top-[14%] h-4 w-4 rounded-full border-2 border-brand/30" aria-hidden="true" />
          <span className="absolute bottom-[10%] left-[4%] h-6 w-6 rounded-full border-[3px] border-brand/70" aria-hidden="true" />
          <span className="absolute left-[2%] top-[34%] h-2 w-2 rounded-full bg-brand/30" aria-hidden="true" />
          <div
            className="absolute right-0 top-[44%] h-24 w-8 opacity-60 [background-image:radial-gradient(circle,#a9a3ff_1.5px,transparent_1.5px)] [background-size:9px_9px]"
            aria-hidden="true"
          />

          <PortraitFrame
            src="/img/hero.png"
            alt="Hero artwork"
            className="absolute inset-[14%] shadow-card ring-8 ring-white/70"
          />

          <FloatCard label="Code" className="left-[40%] top-[3%] h-16 w-16" delay={0.2}>
            <Code className="h-7 w-7 text-brand" aria-hidden="true" />
          </FloatCard>
          <FloatCard label="React" className="left-[8%] top-[26%] h-[72px] w-[72px]" delay={0.9}>
            <TechIcon skill={byId("react")} className="h-9 w-9" />
          </FloatCard>
          <FloatCard label="Python" className="bottom-[8%] left-[20%] h-[72px] w-[72px]" delay={0.5} amp={10}>
            <TechIcon skill={byId("python")} className="h-9 w-9" />
          </FloatCard>
          <FloatCard label="MongoDB" className="right-[8%] top-[17%] h-[72px] w-[72px]" delay={1.2}>
            <TechIcon skill={byId("mongo")} className="h-9 w-9" />
          </FloatCard>
          <FloatCard label="MongoDB" className="bottom-[16%] right-[16%] h-16 w-16" delay={0.7}>
            <TechIcon skill={byId("mongo")} className="h-8 w-8" />
          </FloatCard>

          <p className="absolute -top-1 right-0 w-40 -rotate-6 text-right font-hand text-xl leading-5 text-brand" aria-hidden="true">
            {site.tagline.replace(".", "")}
          </p>
          <Send className="absolute right-[-2%] top-[56%] h-8 w-8 -rotate-12 text-brand/60" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
