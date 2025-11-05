import { ExternalLink, Github, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech_stack: "",
    repo_url: "",
    live_url: "",
    featured: false,
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API}/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      tech_stack: form.tech_stack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      repo_url: form.repo_url || null,
      live_url: form.live_url || null,
      featured: !!form.featured,
    };
    try {
      await fetch(`${API}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setForm({ title: "", description: "", tech_stack: "", repo_url: "", live_url: "", featured: false });
      fetchProjects();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="projects" className="relative py-24 bg-gradient-to-b from-black to-[#0a0a12] text-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Selected Projects</h2>
          <p className="mt-4 text-white/70">
            Real, working builds—production-ready, with clean UX and pragmatic engineering.
          </p>
        </motion.div>

        {/* Quick add form */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
          <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
            <input
              required
              placeholder="Title"
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            <input
              placeholder="Tech stack (comma separated)"
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              value={form.tech_stack}
              onChange={(e) => setForm((f) => ({ ...f, tech_stack: e.target.value }))}
            />
            <input
              placeholder="Repo URL"
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              value={form.repo_url}
              onChange={(e) => setForm((f) => ({ ...f, repo_url: e.target.value }))}
            />
            <input
              placeholder="Live URL"
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              value={form.live_url}
              onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))}
            />
            <textarea
              required
              placeholder="Short description"
              className="sm:col-span-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
            <label className="inline-flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              />
              Featured
            </label>
            <button
              type="submit"
              className="justify-self-start rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold"
            >
              Add Project
            </button>
          </form>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <p className="text-white/70">Loading projects…</p>
          ) : projects.length === 0 ? (
            <p className="text-white/70">No projects yet. Add one above.</p>
          ) : (
            projects.map((p, i) => <Card key={p.id || i} project={p} index={i} />)
          )}
        </div>
      </div>
    </section>
  );
}

function Card({ project, index }) {
  const repo = project.repo_url;
  const live = project.live_url;
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-white/20 transition"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 opacity-20 blur-2xl" />
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 p-3 text-white shadow-lg shadow-black/30">
          {project.featured ? <Star className="h-6 w-6" /> : <Star className="h-6 w-6 opacity-60" />}
        </div>
        <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>
        <p className="mt-3 text-sm text-white/70 leading-relaxed">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(project.tech_stack || []).map((t, idx) => (
            <span key={`${t}-${idx}`} className="text-[11px] rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-white/70">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-4 text-sm">
          {repo && (
            <a href={repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-indigo-300 hover:text-white">
              <Github className="h-4 w-4" /> Code
            </a>
          )}
          {live && (
            <a href={live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-indigo-300 hover:text-white">
              <ExternalLink className="h-4 w-4" /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
