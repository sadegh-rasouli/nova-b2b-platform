import React from 'react';
import { 
  CheckCircle2, 
  FlaskConical, 
  Globe2, 
  Sliders, 
  ShieldCheck, 
  Recycle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ValueProps() {
  const pillars = [
    {
      title: 'Lot-to-Lot Rheological Consistency',
      description: 'Multi-point capillary rheometer verification guarantees melt flow index within ±4.5% of TDS values for uninterrupted automated injection cycles.',
      icon: <FlaskConical className="w-6 h-6 text-brand-600" />,
    },
    {
      title: 'Application Engineering & Moldflow',
      description: 'Dedicated polymer processing engineers provide mold cavity fill analysis, gate sizing recommendations, and warpage troubleshooting.',
      icon: <Sliders className="w-6 h-6 text-brand-600" />,
    },
    {
      title: 'Global Resilient Supply Chain',
      description: 'Strategic warehousing hubs across North America, Europe, and Asia buffer 4-8 weeks of safety stock to neutralize monomer price volatility.',
      icon: <Globe2 className="w-6 h-6 text-brand-600" />,
    },
    {
      title: 'Custom Compounding & Formulations',
      description: 'Tailored mineral reinforcing, carbon nanotube ESD dissipation, flame retardant additives, and precision color matching.',
      icon: <CheckCircle2 className="w-6 h-6 text-brand-600" />,
    },
    {
      title: 'Rigorous Regulatory Compliance',
      description: 'Complete documentation packs covering EU RoHS, REACH SVHC declarations, FDA 21 CFR food contact, and UL94 flammability yellow cards.',
      icon: <ShieldCheck className="w-6 h-6 text-brand-600" />,
    },
    {
      title: 'Bio-Circular & PCR Upcycling',
      description: 'ISCC+ certified bio-based PLA compounds and reactive compatibilizers that restore virgin tensile strength in recycled polymers.',
      icon: <Recycle className="w-6 h-6 text-brand-600" />,
    },
  ];

  return (
    <section className="py-20 bg-industrial-900 text-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400">
            Engineering Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
            Why Industrial Leaders Rely on NOVA
          </h2>
          <p className="text-sm text-industrial-400 leading-relaxed">
            From formulation chemistry to global maritime delivery, our material solutions eliminate downtime and elevate manufacturing yields.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-7 rounded-xl bg-industrial-800/80 border border-industrial-700/80 hover:border-brand-500/50 transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-industrial-900/90 text-brand-400 w-fit border border-industrial-700 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold font-display text-white group-hover:text-brand-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-industrial-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 pt-8 border-t border-industrial-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-industrial-400">
          <div>
            Need custom compounding specifications or trial samples?
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 font-bold text-brand-400 hover:text-brand-300 transition-colors font-mono"
          >
            <span>Read About NOVA Manufacturing Capabilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
