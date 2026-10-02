// Central place for site-wide copy and numbers. Edit here, not in components.

export const site = {
  name: "Sarbjot.dev",
  owner: "Sarbjot Singh",
  role: "Full-Stack Developer & AI/ML Enthusiast",
  tagline: "Turning ideas into real applications.",
  footerLine: "Full-Stack Development | AI/ML | Continuous Learning",
  resumePath: "/resume.pdf",
  // Set to your deployed URL when you have one (used for metadata).
  url: "https://sarbjot.dev",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// Configurable stats. Only put numbers here that you can stand behind.
export const stats = [
  { id: "projects", icon: "folder", value: 10, suffix: "+", label: "Projects Completed" },
  { id: "learning", icon: "calendar", value: 2, suffix: "+", label: "Years of Learning" },
  { id: "passion", icon: "star", value: 100, suffix: "%", label: "Passion for Tech" },
];

export const quote = {
  text: "Building modern web applications and intelligent solutions, one project at a time.",
};

// Contact form: connect a form service or API route here.
// Example: "https://formspree.io/f/your-id" or "/api/contact".
// While this is empty the form validates but does NOT send anything.
export const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "";
