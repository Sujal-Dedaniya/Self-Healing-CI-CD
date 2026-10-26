import { motion } from 'framer-motion'
import { cn } from '../utils'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    desc: 'Perfect for side projects and hobbyists.',
    features: ['Up to 3 projects', '5,000 requests/month', 'Community support', 'Basic analytics'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    desc: 'For growing teams and startups.',
    features: ['Unlimited projects', '100,000 requests/month', 'Priority email support', 'Advanced analytics', 'Custom domains', 'Team collaboration'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    desc: 'For large organizations with custom needs.',
    features: ['Unlimited everything', '1M+ requests/month', '24/7 phone support', 'Custom SLAs', 'SSO & SAML', 'Dedicated account manager'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export const Pricing = () => {
  return (
    <section id="pricing" className="section-container">
      <div className="section-header">
        <h2 className="gradient-text">Simple, transparent pricing</h2>
        <p>Choose the plan that fits your team. No hidden fees.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
              'glass-card p-8 rounded-3xl relative flex flex-col',
              plan.highlighted
                ? 'border-brand-500/50 shadow-2xl shadow-brand-500/10 scale-105'
                : 'border-white/10 hover:border-white/20',
            )}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="text-slate-400">/mo</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">{plan.desc}</p>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                  <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={cn(
                'w-full py-4 rounded-xl text-base font-semibold transition-colors',
                plan.highlighted
                  ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white',
              )}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}