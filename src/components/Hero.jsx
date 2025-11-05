import Spline from "@splinetool/react-spline";
import { Sparkles, Bot, Code, Palette } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
            <span>Student • Designer • Web Dev • AI Builder</span>
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Build the impossible. Craft with code. Dream with AI.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed">
            I design futuristic interfaces, engineer full‑stack apps, and prototype intelligent tools. This portfolio is my playground of ideas—interactive, animated, and delightfully over‑the‑top.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge icon={Bot} label="AI Apps" />
            <Badge icon={Code} label="Full‑stack" />
            <Badge icon={Palette} label="Design Systems" />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="pointer-events-auto inline-flex items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-fuchsia-500/20 hover:scale-[1.02] transition"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="pointer-events-auto inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
            >
              Let’s Collaborate
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Badge({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80">
      <Icon className="h-3.5 w-3.5 text-fuchsia-400" />
      {label}
    </span>
  );
}
