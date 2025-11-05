import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function CaseStudies() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    problem: "",
    solution: "",
    impact: "",
    images: "",
  });

  const fetchCases = async () => {
    try {
      const res = await fetch(`${API}/case-studies`);
      const data = await res.json();
      setCases(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      summary: form.summary,
      problem: form.problem,
      solution: form.solution,
      impact: form.impact,
      images: form.images
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      links: {},
    };
    try {
      await fetch(`${API}/case-studies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setForm({ title: "", summary: "", problem: "", solution: "", impact: "", images: "" });
      fetchCases();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="case-studies" className="relative py-24 bg-gradient-to-b from-[#0a0a12] to-black text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Case Studies</h2>
          <p className="mt-4 text-white/70">Concise breakdowns of problems, solutions, and measurable impact.</p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
            <input
              required
              placeholder="Title"
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            <input
              placeholder="Images (comma-separated URLs)"
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              value={form.images}
              onChange={(e) => setForm((f) => ({ ...f, images: e.target.value }))}
            />
            <textarea
              required
              placeholder="Summary"
              className="sm:col-span-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              rows={2}
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
            />
            <textarea
              required
              placeholder="Problem"
              className="sm:col-span-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              rows={2}
              value={form.problem}
              onChange={(e) => setForm((f) => ({ ...f, problem: e.target.value }))}
            />
            <textarea
              required
              placeholder="Solution"
              className="sm:col-span-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              rows={2}
              value={form.solution}
              onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))}
            />
            <textarea
              required
              placeholder="Impact"
              className="sm:col-span-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              rows={2}
              value={form.impact}
              onChange={(e) => setForm((f) => ({ ...f, impact: e.target.value }))}
            />
            <button type="submit" className="justify-self-start rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold">
              Add Case Study
            </button>
          </form>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-white/70">Loading…</p>
          ) : cases.length === 0 ? (
            <p className="text-white/70">No case studies yet. Add one above.</p>
          ) : (
            cases.map((c) => <CaseCard key={c.id} item={c} />)
          )}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ item }) {
  return (
    <motion.article
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="mt-2 text-sm text-white/70">{item.summary}</p>
      <div className="mt-4 grid gap-2 text-sm">
        <Detail label="Problem" value={item.problem} />
        <Detail label="Solution" value={item.solution} />
        <Detail label="Impact" value={item.impact} />
      </div>
    </motion.article>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <span className="text-white/60">{label}: </span>
      <span className="text-white/85">{value}</span>
    </div>
  );
}
