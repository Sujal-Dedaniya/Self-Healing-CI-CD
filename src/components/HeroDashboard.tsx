import { motion } from 'framer-motion'
import { Rocket, Brain, Layers } from 'lucide-react'

export const HeroDashboard = () => (
  <div className="relative">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ animation: 'float 6s ease-in-out infinite' }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
      <div className="relative z-10 rounded-3xl border border-white/10 bg-white/5 p-1">
        <div className="rounded-2xl bg-dark-900 p-6 md:p-8 overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: i === 1 ? '#ef4444' : i === 2 ? '#f59e0b' : '#10b981' }}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">Deploy</h3>
              </div>
              <p className="text-xs text-slate-400">Global edge network</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">Analyze</h3>
              </div>
              <p className="text-xs text-slate-400">AI-powered insights</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">Scale</h3>
              </div>
              <p className="text-xs text-slate-400">Auto-scaling infra</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">System Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">All systems operational</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Uptime</p>
                <p className="text-sm font-semibold text-white">99.99%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
)