import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", content: "", tags: "", cover_url: "", author: "" });

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API}/blog`);
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      content: form.content,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      cover_url: form.cover_url || null,
      author: form.author || null,
    };
    try {
      await fetch(`${API}/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setForm({ title: "", content: "", tags: "", cover_url: "", author: "" });
      fetchPosts();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="blog" className="relative py-24 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Live Blog</h2>
          <p className="mt-4 text-white/70">Insights, notes, and behind-the-scenes. Add a new post below.</p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <form onSubmit={onSubmit} className="grid gap-3">
            <input
              required
              placeholder="Title"
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            <input
              placeholder="Tags (comma)"
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            />
            <input
              placeholder="Cover image URL"
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              value={form.cover_url}
              onChange={(e) => setForm((f) => ({ ...f, cover_url: e.target.value }))}
            />
            <input
              placeholder="Author"
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
            />
            <textarea
              required
              placeholder="Write your post content"
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              rows={4}
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            />
            <button type="submit" className="justify-self-start rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold">
              Publish
            </button>
          </form>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-white/70">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="text-white/70">No posts yet. Add your first above.</p>
          ) : (
            posts.map((p) => <PostCard key={p.id} post={p} />)
          )}
        </div>
      </div>
    </section>
  );
}

function PostCard({ post }) {
  return (
    <motion.article
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      {post.cover_url && (
        <img src={post.cover_url} alt="Cover" className="h-40 w-full object-cover" />
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-white/70">{post.content}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(post.tags || []).map((t, idx) => (
            <span key={`${t}-${idx}`} className="text-[11px] rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-white/70">
              {t}
            </span>
          ))}
        </div>
        {post.author && <p className="mt-3 text-xs text-white/50">By {post.author}</p>}
      </div>
    </motion.article>
  );
}
