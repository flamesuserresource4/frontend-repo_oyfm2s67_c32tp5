import { ExternalLink, Bot, Code, Sparkles, Palette } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "NeoChat AI",
    tagline: "Conversational assistant with on‑page actions",
    icon: Bot,
    gradient: "from-violet-600 to-fuchsia-600",
    description:
      "A privacy‑friendly chat agent that can summarize pages, extract tasks, and generate study notes in one click.",
    tech: ["FastAPI", "React", "Embeddings", "IndexedDB"],
    href: "#",
  },
  {
    title: "Design System Forge",
    tagline: "Token‑driven UI kit generator",
    icon: Palette,
    gradient: "from-cyan-500 to-blue-600",
    description:
      "Turn a color palette and a few rules into a complete component library with docs and live playground.",
    tech: ["Figma API", "Framer Motion", "Tailwind"],
    href: "#",
  },
  {
    title: "AutoBuild",
    tagline: "Prompt → Full‑stack scaffold",
    icon: Code,
    gradient: "from-emerald-500 to-teal-600",
    description:
      "Describe an idea and get a deploy‑ready repo: routes, schema, auth stubs, and test seeds included.",
    tech: ["FastAPI", "MongoDB", "Vite", "Docker"],
    href: "#",
  },
  {
    title: "Study Sparks",
    tagline: "AI flashcards & spaced repetition",
    icon: Sparkles,
    gradient: "from-amber-500 to-rose-500",
    description:
      "Paste notes or a link—get smart flashcards, quizzes, and a daily plan tuned to your progress.",
    tech: ["LLMs", "Vector DB", "React"],
    href: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 bg-gradient-to-b from-black to-[#0a0413] text-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Signature Projects</h2>
          <p className="mt-4 text-white/70">
            A collection of playful experiments and serious builds that blend design, engineering, and AI.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((p, i) => (
            <Card key={p.title} project={p} index={i} />)
          )}
        </div>
      </div>
    </section>
  );
}

function Card({ project, index }) {
  const Icon = project.icon;
  return (
    <motion.a
      href={project.href}
      onClick={(e) => e.preventDefault()}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-white/20 transition"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className={`absolute -top-12 -right-12 h-36 w-36 rounded-full bg-gradient-to-br ${project.gradient} opacity-20 blur-2xl`} />
      <div className="relative z-10">
        <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${project.gradient} p-3 text-white shadow-lg shadow-black/30`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-white/70">{project.tagline}</p>
        <p className="mt-3 text-sm text-white/70 leading-relaxed">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-[11px] rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-white/70">{t}</span>
          ))}
        </div>
        <div className="mt-5 inline-flex items-center gap-2 text-sm text-fuchsia-300 group-hover:text-white transition">
          <span>Preview soon</span>
          <ExternalLink className="h-4 w-4" />
        </div>
      </div>
    </motion.a>
  );
}
