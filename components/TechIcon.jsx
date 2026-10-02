// Renders a skill's brand logo, or a monogram tile when no logo is available.
export default function TechIcon({ skill, className = "h-10 w-10" }) {
  const color = `#${skill.color || skill.icon?.hex || "4338F5"}`;
  if (skill.icon) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
        <path d={skill.icon.path} fill={color} />
      </svg>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`${className} grid place-items-center rounded-xl text-[0.8em] font-extrabold tracking-tight text-white`}
      style={{ backgroundColor: color, fontSize: "0.9rem" }}
    >
      {skill.mono}
    </span>
  );
}
