import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.1, type: 'spring', stiffness: 180, damping: 18 } }),
};

export default function Hero() {
  return (
    <section className="relative h-[82vh] w-full overflow-hidden">
      {/* 3D Spline scene - keep it fully interactive */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Animated gradient atmospherics (do not block pointer events) */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-600/20 blur-3xl"
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl"
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-balance bg-gradient-to-b from-white via-white to-fuchsia-200/90 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl"
        >
          Futuristic Portfolio Studio
        </motion.h1>
        <motion.p
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="mt-4 max-w-2xl text-pretty text-base text-zinc-300 sm:text-lg"
        >
          Dark, cybernetic, 3D-animated. Built for showcasing projects, writing, and case studies — powered by an AI assistant.
        </motion.p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <motion.a
            custom={0}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            href="#studio"
            className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
          >
            <Sparkles className="h-4 w-4 text-fuchsia-300 transition group-hover:rotate-12" /> Explore the Studio
          </motion.a>

          <motion.a
            custom={1}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            href="#admin"
            className="group inline-flex items-center gap-2 rounded-full bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-600/30 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60"
          >
            <Rocket className="h-4 w-4" /> Admin Area
          </motion.a>
        </div>
      </div>
    </section>
  );
}
