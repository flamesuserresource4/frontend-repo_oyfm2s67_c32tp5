import { Rocket, Sparkles, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      <div className="backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center gap-2 text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-fuchsia-500/20">
              <Rocket className="h-5 w-5" />
            </div>
            <span className="font-semibold tracking-tight">Next-Gen Portfolio</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#skills" className="hover:text-white transition">Skills</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/80 hover:text-white transition"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/80 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium shadow-lg shadow-fuchsia-500/20"
            >
              <Sparkles className="h-4 w-4" />
              Hire Me
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
