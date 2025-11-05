import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, FilePlus2, BookOpen, Briefcase } from 'lucide-react';

const tabs = [
  { key: 'projects', label: 'Projects', icon: Briefcase },
  { key: 'blog', label: 'Blog Posts', icon: BookOpen },
  { key: 'case', label: 'Case Studies', icon: FilePlus2 },
];

export default function AdminPanel() {
  const [active, setActive] = useState('projects');

  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Settings className="h-5 w-5 text-fuchsia-300" />
          </span>
          <h2 className="text-xl font-semibold tracking-tight text-white">Admin Area</h2>
        </div>
        <p className="text-sm text-zinc-400">You manage content yourself. Nothing is auto-filled.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
              active === key ? 'bg-fuchsia-600 text-white' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
        <AnimatePresence mode="wait">
          {active === 'projects' && (
            <motion.div key="projects" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <AdminSection title="Add Project" description="Create portfolio entries with tech, repo link, and live demo. You control what gets added." />
              <ProjectForm />
            </motion.div>
          )}

          {active === 'blog' && (
            <motion.div key="blog" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <AdminSection title="Publish Blog Post" description="Write long-form posts with tags and cover image. You decide the content." />
              <BlogForm />
            </motion.div>
          )}

          {active === 'case' && (
            <motion.div key="case" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <AdminSection title="New Case Study" description="Explain the problem, your solution, and the impact — pitch-ready." />
              <CaseForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function AdminSection({ title, description }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-zinc-400">{description}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="group block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</span>
      {children}
    </label>
  );
}

function Row({ children }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-fuchsia-400/40 focus:ring-2 focus:ring-fuchsia-500/20 ${props.className || ''}`}
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-fuchsia-400/40 focus:ring-2 focus:ring-fuchsia-500/20 ${props.className || ''}`}
    />
  );
}

function Submit({ children }) {
  return (
    <button type="button" className="group inline-flex items-center justify-center gap-2 rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow shadow-fuchsia-600/30 transition hover:brightness-110">
      {children}
    </button>
  );
}

function ProjectForm() {
  return (
    <form className="space-y-4">
      <Row>
        <Field label="Title"><Input placeholder="Project title" /></Field>
        <Field label="Tech Stack"><Input placeholder="React, FastAPI, MongoDB" /></Field>
      </Row>
      <Row>
        <Field label="Repo URL"><Input placeholder="https://github.com/you/repo" /></Field>
        <Field label="Live URL"><Input placeholder="https://yourapp.com" /></Field>
      </Row>
      <Field label="Description"><Textarea rows={4} placeholder="Short description" /></Field>
      <Submit>Save Project (You add it yourself)</Submit>
    </form>
  );
}

function BlogForm() {
  return (
    <form className="space-y-4">
      <Row>
        <Field label="Title"><Input placeholder="Post title" /></Field>
        <Field label="Tags"><Input placeholder="ai, design, web" /></Field>
      </Row>
      <Field label="Cover Image URL"><Input placeholder="https://images..." /></Field>
      <Field label="Content"><Textarea rows={6} placeholder="Write your article..." /></Field>
      <Submit>Publish Post (Manual control)</Submit>
    </form>
  );
}

function CaseForm() {
  return (
    <form className="space-y-4">
      <Row>
        <Field label="Title"><Input placeholder="Case study title" /></Field>
        <Field label="Client / Role"><Input placeholder="Client name / Your role" /></Field>
      </Row>
      <Field label="Problem"><Textarea rows={3} placeholder="What problem needed solving?" /></Field>
      <Field label="Solution"><Textarea rows={3} placeholder="How did you solve it?" /></Field>
      <Field label="Impact / Results"><Textarea rows={3} placeholder="Outcomes, metrics, value" /></Field>
      <Submit>Save Case Study</Submit>
    </form>
  );
}
