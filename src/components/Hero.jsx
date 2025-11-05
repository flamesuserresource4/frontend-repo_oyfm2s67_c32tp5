import Spline from "@splinetool/react-spline";
import { Sparkles, Rocket, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[92vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/90" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-300" />
            <span>Product-focused • Full‑stack • AI Experiences</span>
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Elegant software, real outcomes.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed">
            I build production-grade web products with 3D presence and AI features. Crisp design, reliable
            engineering, and measurable impact—crafted for teams and investors who expect polish.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge label="AI Interfaces" />
            <Badge label="Full‑stack Delivery" />
            <Badge label="Design Systems" />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="pointer-events-auto inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-indigo-700/20 hover:scale-[1.02] transition"
            >
              <Rocket className="mr-2 h-4 w-4" /> View Work
            </a>
            <a
              href="#assistant"
              className="pointer-events-auto inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
            >
              Ask the AI Assistant
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Badge({ label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80">
      <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
      {label}
    </span>
  );
}
