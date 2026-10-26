import { motion } from 'framer-motion'
import { ShieldCheck, TrendingUp, Users, Zap, Layers, Globe } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    desc: 'Bank-grade encryption and SOC 2 compliance built-in from day one.',
    color: 'from-brand-500/20 to-brand-500/10',
    iconColor: 'text-brand-400',
  },
  {
    icon: TrendingUp,
    title: 'Real-time Analytics',
    desc: 'Track user behavior and system performance with live dashboards.',
    color: 'from-cyan-500/20 to-cyan-500/10',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    desc: 'Work together seamlessly with role-based access and comments.',
    color: 'from-emerald-500/20 to-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Edge deployment ensures sub-100ms latency worldwide.',
    color: 'from-orange-500/20 to-orange-500/10',
    iconColor: 'text-orange-400',
  },
  {
    icon: Layers,
    title: 'Auto Scaling',
    desc: 'Infrastructure that grows with you automatically.',
    color: 'from-violet-500/20 to-violet-500/10',
    iconColor: 'text-violet-400',
  },
  {
    icon: Globe,
    title: 'Global CDN',
    desc: 'Content delivered from the edge closest to your users.',
    color: 'from-rose-500/20 to-rose-500/10',
    iconColor: 'text-rose-400',
  },
]

export const Features = () => {
  return (
    <section id="features" className="section-container">
      <div className="section-header">
        <h2 className="gradient-text">Everything you need to ship faster</h2>
        <p>Powerful features designed for modern development teams.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass-card p-8 hover:border-brand-500/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}