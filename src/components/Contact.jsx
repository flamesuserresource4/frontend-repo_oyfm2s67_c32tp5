import { Mail, Github, Linkedin, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-[#0a0413] to-black text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.15),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <Rocket className="h-3.5 w-3.5 text-fuchsia-400" />
            <span>Let’s build something unforgettable</span>
          </div>
          <h2 className="mt-6 text-3xl sm:text-5xl font-extrabold tracking-tight">Open for internships, collabs & gigs</h2>
          <p className="mt-4 text-white/70">
            Whether you need a stunning interface, a fast full‑stack app, or an AI prototype—I’ve got you. Reach out and let’s make it real.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:you@example.com"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-fuchsia-500/20 hover:scale-[1.02] transition"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </motion.div>

        <div className="mt-16 text-center text-white/50 text-xs">
          © {new Date().getFullYear()} Your Name. Crafted with love, code, and a dash of chaos.
        </div>
      </div>
    </section>
  );
}
