"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TechIcon from "./TechIcon";
import SectionHeading from "./SectionHeading";
import { categories, skills } from "@/data/skills";

const AUTO_MS = 2600;
const rad = (deg) => (deg * Math.PI) / 180;

// Shortest signed distance of item i from the active item on a ring of n items.
function ringOffset(i, active, n) {
  let d = (i - active) % n;
  if (d < 0) d += n;
  if (d > n / 2) d -= n;
  return d;
}

// Everything that depends on the container width: how many cards show per side, how big they are.
function getMetrics(width) {
  const range = width < 480 ? 1 : width < 720 ? 2 : width < 960 ? 3 : 4;
  const card = width < 480 ? 112 : width < 720 ? 120 : 136;
  const maxAngle = range === 1 ? 40 : 56;
  const step = maxAngle / range;
  const push = 22; // extra gap so the enlarged centre card never overlaps its neighbours
  const edge = width / 2 - card * 0.32 - push - 10;
  const rx = edge / Math.sin(rad(maxAngle));
  return { range, card, step, rx, push, height: width < 480 ? 270 : 330 };
}

function cardPose(d, m) {
  const clamped = Math.max(-(m.range + 1), Math.min(m.range + 1, d));
  const theta = clamped * m.step;
  const side = Math.sign(clamped);
  const abs = Math.abs(clamped);
  return {
    x: m.rx * Math.sin(rad(theta)) + side * m.push,
    y: -(1 - Math.cos(rad(theta))) * 34,
    z: -(1 - Math.cos(rad(theta))) * m.rx * 0.55,
    rotateY: -theta * 0.55,
    scale: abs === 0 ? 1.28 : Math.max(0.6, 0.94 - 0.08 * (abs - 1)),
    opacity: abs > m.range ? 0 : abs === 0 ? 1 : Math.max(0.55, 1 - 0.12 * abs),
  };
}

function SkillCard({ skill, active }) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-2xl border bg-white px-2 text-center ${
        active
          ? "border-brand/50 shadow-[0_22px_44px_-12px_rgba(67,56,245,0.45)]"
          : "border-line shadow-[0_12px_26px_-14px_rgba(67,56,245,0.35)]"
      }`}
    >
      <TechIcon skill={skill} className={active ? "h-12 w-12" : "h-10 w-10"} />
      <span className={`mt-1 font-bold text-navy ${active ? "text-base" : "text-sm"}`}>{skill.name}</span>
      <span className="text-[11px] leading-tight text-muted">{skill.sub}</span>
      {active && <span className="mt-1 h-0.5 w-6 rounded bg-brand" aria-hidden="true" />}
    </div>
  );
}

export default function SkillsCarousel() {
  const reduced = useReducedMotion();
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [width, setWidth] = useState(1100);
  const stageRef = useRef(null);
  const swipe = useRef(null);

  const items = useMemo(
    () => (category === "All" ? skills : skills.filter((s) => s.category === category)),
    [category]
  );
  const n = items.length;
  const metrics = useMemo(() => getMetrics(width), [width]);

  const go = useCallback((dir) => setActive((a) => (a + dir + n) % n), [n]);

  // Track container width for responsive geometry.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [reduced]);

  // Only animate while the section is on screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Auto-rotate. Re-runs after any manual change so people always get a full interval.
  useEffect(() => {
    if (reduced || paused || !inView || n < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), AUTO_MS);
    return () => clearInterval(id);
  }, [reduced, paused, inView, n, active]);

  const pickCategory = (c) => {
    setCategory(c);
    setActive(0);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const onPointerDown = (e) => {
    swipe.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (swipe.current == null) return;
    const dx = e.clientX - swipe.current;
    swipe.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const current = items[active] ?? items[0];

  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="panel p-5 sm:p-8">
        <SectionHeading
          id="skills-title"
          eyebrow="My Skills"
          title="Technologies"
          accent="I Work With"
          description="A selection of technologies and tools I use to build web applications and work with data."
        >
          <p className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy shadow-soft">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            {skills.length} Technologies
          </p>
        </SectionHeading>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter technologies by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => pickCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                category === c ? "bg-brand text-white shadow-soft" : "text-muted hover:bg-white hover:text-navy"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {reduced ? (
          // Non-animated fallback: a plain, responsive grid with the same filters.
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((s) => (
              <li key={s.id} className="h-36">
                <SkillCard skill={s} active={false} />
              </li>
            ))}
          </ul>
        ) : (
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Technologies carousel. Use left and right arrow keys to change technology."
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="relative mt-6 rounded-3xl"
          >
            <div
              ref={stageRef}
              className="relative mx-auto w-full select-none overflow-hidden px-0 [touch-action:pan-y]"
              style={{ height: metrics.height, perspective: 1200 }}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (swipe.current = null)}
            >
              {/* orbit rings and platform glow */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[96%] -translate-x-1/2 -translate-y-[44%] rounded-[50%] border border-brand/15"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[74%] -translate-x-1/2 -translate-y-[40%] rounded-[50%] border border-dashed border-brand/15"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-[8%] left-1/2 h-8 w-56 -translate-x-1/2 rounded-[50%] bg-brand/25 blur-xl"
                aria-hidden="true"
              />

              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                {items.map((skill, i) => {
                  const d = ringOffset(i, active, n);
                  const pose = cardPose(d, metrics);
                  const isActive = d === 0;
                  return (
                    <motion.button
                      key={skill.id}
                      type="button"
                      tabIndex={-1}
                      aria-label={isActive ? `${skill.name}, selected` : `Show ${skill.name}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => !isActive && setActive(i)}
                      initial={false}
                      animate={pose}
                      transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.9 }}
                      className="absolute left-1/2 top-1/2 cursor-pointer"
                      style={{
                        width: metrics.card,
                        height: metrics.card * 1.18,
                        marginLeft: -metrics.card / 2,
                        marginTop: -(metrics.card * 1.18) / 2,
                        zIndex: 100 - Math.abs(d) * 10,
                        pointerEvents: Math.abs(d) > metrics.range ? "none" : "auto",
                      }}
                    >
                      <SkillCard skill={skill} active={isActive} />
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous technology"
              className="absolute left-0 top-1/2 z-[200] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-brand shadow-card transition hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next technology"
              className="absolute right-0 top-1/2 z-[200] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-brand shadow-card transition hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <p className="sr-only" aria-live="polite">
              {current ? `${current.name}, ${current.sub}. ${active + 1} of ${n}.` : ""}
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Choose technology">
              {items.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${s.name}`}
                  aria-current={i === active ? "true" : undefined}
                  className="group grid h-5 place-items-center px-0.5"
                >
                  <span
                    className={`block h-2 rounded-full transition-all ${
                      i === active ? "w-5 bg-brand" : "w-2 bg-brand/25 group-hover:bg-brand/50"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
