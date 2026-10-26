import { motion } from 'framer-motion'

export const HeroBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-brand-400 animate-pulse-slow"
  >
    <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
    v2.4.0 • Now with AI Agents
  </motion.div>
)

export const HeroHeading = () => (
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.1 }}
    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight text-balance mb-6"
  >
    Build the future{' '}
    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-cyan-400">
      with AI
    </span>
  </motion.h1>
)

export const HeroDescription = () => (
  <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl mb-10"
  >
    The next generation platform for modern teams. Deploy, scale, and monitor
    your applications with AI-powered intelligence.
  </motion.p>
)

export const HeroCTA = () => (
  <div className="flex flex-col sm:flex-row gap-4">
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white text-base font-semibold rounded-xl transition-colors shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2"
    >
      Get Started <span className="text-white/80">→</span>
    </motion.button>

    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-base font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Watch Demo
    </motion.button>
  </div>
)