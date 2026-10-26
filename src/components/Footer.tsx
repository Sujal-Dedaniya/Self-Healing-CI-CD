export const Footer = () => {
  const links = [
    { name: 'Product', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="border-t border-white/10 bg-dark-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Nexa<span className="text-brand-500">AI</span>
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-sm">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-400 hover:text-brand-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex gap-4 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-1.332-2.201-1.511-1.212-2.547-1.212-2.547-1.039-.264.219-.385.531.531.531.402.398 1.194.765 1.976.765 1.487.227 2.361-1.04 2.756-1.278-.909-.622-1.98-1.023-3.221-1.023-2.052 0-3.718 1.608-3.718 3.352 0 .275.11.526.306.707-.697-.16-1.44-.282-2.252-.282-1.547 0-2.806 1.261-2.806 2.809 0 .222.075.433.208.595.332.014.652.156.652.156h.001c0 .275.108.524.305.707-.697-.16-1.44-.282-2.252-.282-1.547 0-2.806 1.261-2.806 2.809 0 .222.075.433.208.595.332.014.652.156.652.156h.001c0 .275.108.524.305.707"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.18 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 00-1.585-4.085 8.36 8.36 0 00-3.11-1.378 8.34 8.34 0 00-3.552.233A8.34 8.34 0 0012 3.18a8.34 8.34 0 00-3.553-.233 8.36 8.36 0 00-3.11 1.378 8.17 8.17 0 00-1.586 4.084c0 2.699 1.108 5.093 2.833 6.856a14.07 14.07 0 01-1.87-5.067c0-.45.132-.886.358-1.28A4.04 4.04 0 004.496 7.28c0 1.414.74 2.666 1.863 3.387.782-.063 1.56-.2 2.278-.536a4.26 4.26 0 011.947-2.588 4.04 4.04 0 012.69-.5c.487.295.984.696 1.38 1.167 1.221-3.796 5.19-6.442 9.354-6.442 6.432 0 11.65 5.227 11.65 11.675 0 .19-.007.375-.014.56A8.33 8.33 0 0122 18.29a8.35 8.35 0 01-2.352 5.845c-.064.125-.141.237-.227.345"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.204 0 5.793 2.596 5.793 5.794 0 3.582-2.518 6.427-5.724 6.693l-.175.02-.172-.021c-3.204-.26-5.794-3.105-5.794-6.692 0-3.198 2.589-5.794 5.792-5.794m0 10.688c.194-.786.318-1.614.318-2.488 0-.872-.124-1.7-.318-2.487a2.54 2.54 0 012.497-2.539c1.406 0 2.546 1.137 2.546 2.539 0 .874-.124 1.7-.318 2.487a2.54 2.54 0 01-2.497 2.539 2.54 2.54 0 01-2.546-2.539zm0-8.763c-.355 0-.64.29-.64.648 0 .358.285.647.64.647s.64-.29.64-.647c0-.359-.285-.648-.64-.648"/></svg>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Nexa AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}