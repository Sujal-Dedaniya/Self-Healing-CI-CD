import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, StartupX',
    content: 'Nexa transformed how we deploy code. What used to take hours now takes minutes.',
    avatar: 'SC',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'VP Engineering, TechFlow',
    content: 'The AI-powered insights have helped us catch issues before they reach production.',
    avatar: 'MR',
  },
  {
    name: 'Elena Kovac',
    role: 'Product Lead, ScaleUp',
    content: 'Best developer experience we\'ve ever had. Our team is shipping 3x faster.',
    avatar: 'EK',
  },
]

export const Testimonials = () => {
  return (
    <section id="testimonials" className="section-container bg-dark-900/30 rounded-3xl border border-white/10">
      <div className="section-header">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Trusted by teams worldwide</h2>
        <p className="text-slate-400">Hear what our customers have to say.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 glass-card"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center text-white font-bold mb-6">
              {t.avatar}
            </div>
            <p className="text-slate-300 leading-relaxed mb-6 italic">"{t.content}"</p>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}