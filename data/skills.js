import {
  siHtml5, siJavascript, siReact, siNextdotjs, siNodedotjs, siExpress, siMongodb,
  siMysql, siSupabase, siPython, siNumpy, siPandas, siScikitlearn, siGit, siGithub,
  siCss,
} from "simple-icons";

// Skill order drives the carousel order. `icon` is a simple-icons entry (path + brand colour);
// entries without an `icon` fall back to a monogram tile (`mono`) in the UI.
export const categories = ["All", "Frontend", "Backend", "Database", "AI/ML", "Tools"];

export const skills = [
  { id: "html", name: "HTML", sub: "Markup Language", category: "Frontend", icon: siHtml5 },
  { id: "css", name: "CSS", sub: "Styling", category: "Frontend", icon: siCss, color: "1572B6" },
  { id: "js", name: "JavaScript", sub: "Programming", category: "Frontend", icon: siJavascript },
  { id: "react", name: "React", sub: "Frontend Library", category: "Frontend", icon: siReact, color: "2F9FD0" },
  { id: "next", name: "Next.js", sub: "React Framework", category: "Frontend", icon: siNextdotjs },
  { id: "node", name: "Node.js", sub: "Runtime", category: "Backend", icon: siNodedotjs },
  { id: "express", name: "Express.js", sub: "Web Framework", category: "Backend", icon: siExpress },
  { id: "rest", name: "REST APIs", sub: "API Design", category: "Backend", mono: "API", color: "4338F5" },
  { id: "mongo", name: "MongoDB", sub: "Database", category: "Database", icon: siMongodb },
  { id: "mysql", name: "MySQL", sub: "Relational DB", category: "Database", icon: siMysql },
  { id: "supabase", name: "Supabase", sub: "Backend as a Service", category: "Database", icon: siSupabase },
  { id: "python", name: "Python", sub: "Programming", category: "AI/ML", icon: siPython },
  { id: "numpy", name: "NumPy", sub: "Numerical Computing", category: "AI/ML", icon: siNumpy, color: "4DABCF" },
  { id: "pandas", name: "Pandas", sub: "Data Analysis", category: "AI/ML", icon: siPandas, color: "5B3FD1" },
  { id: "sklearn", name: "scikit-learn", sub: "Machine Learning", category: "AI/ML", icon: siScikitlearn },
  { id: "matplotlib", name: "Matplotlib", sub: "Visualization", category: "AI/ML", mono: "Mp", color: "11557C" },
  { id: "seaborn", name: "Seaborn", sub: "Statistical Plots", category: "AI/ML", mono: "Sb", color: "4C8FA8" },
  { id: "git", name: "Git", sub: "Version Control", category: "Tools", icon: siGit },
  { id: "github", name: "GitHub", sub: "Code Hosting", category: "Tools", icon: siGithub },
  { id: "vscode", name: "VS Code", sub: "Code Editor", category: "Tools", mono: "VS", color: "2F80ED" },
];
