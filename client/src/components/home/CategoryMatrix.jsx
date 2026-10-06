import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Cpu, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';
import { Card } from '../common';

export default function CategoryMatrix() {
  const categories = [
    {
      title: 'Polymer Granules',
      code: 'CAT-01',
      description: 'Commodity polyolefins, high-clarity PET resin, and high-ESCR blow molding polyethylene grades.',
      icon: <Layers className="w-6 h-6 text-brand-600" />,
      link: '/products?category=Polymer+Granules',
      examples: ['PP-5100 Copolymer', 'HDPE-6000 Blow Molding', 'LLDPE-1800 Film', 'PET-2800 Bottle'],
      badge: 'High Volume Supply',
    },
    {
      title: 'Engineering Materials',
      code: 'CAT-02',
      description: 'Glass-fiber reinforced structural Polyamides, ultra-performance PEEK, and impact-modified PC/ABS blends.',
      icon: <Cpu className="w-6 h-6 text-brand-600" />,
      link: '/products?category=Engineering+Materials',
      examples: ['PA66-GF30 Composite', 'PEEK-4500 Ultra', 'PC/ABS-750 Automotive', 'PA6-MOS2 Lubricated'],
      badge: 'Metal Replacement',
    },
    {
      title: 'Industrial Compounds',
      code: 'CAT-03',
      description: 'Halogen-free flame retardant ABS, flexible TPU elastomers, and electrostatic dissipative (ESD) compounds.',
      icon: <ShieldCheck className="w-6 h-6 text-brand-600" />,
      link: '/products?category=Industrial+Compounds',
      examples: ['ABS-FRV0 Flame Retardant', 'TPU-85A Resilience', 'ESD-PP20 Conductive'],
      badge: 'UL94 & Cleanroom',
    },
    {
      title: 'Custom Formulations',
      code: 'CAT-04',
      description: 'Bio-circular PLA composites, tailored mineral micro-fillers, and custom color masterbatches.',
      icon: <Leaf className="w-6 h-6 text-brand-600" />,
      link: '/products?category=Custom+Materials',
      examples: ['Bio-Circular PLA Compound', 'Custom Mineral Loading', 'Tailored MFI Tuning'],
      badge: 'Tailored Compounding',
    },
  ];

  return (
    <section className="py-20 bg-industrial-50 border-b border-industrial-200">
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-600">
            Material Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-industrial-950 tracking-tight">
            Engineered for Precision Performance
          </h2>
          <p className="text-sm text-industrial-600 leading-relaxed">
            Select an industrial material family to view technical specifications, mechanical properties, and verified compliance certifications.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Card
              key={cat.title}
              hoverEffect
              className="flex flex-col justify-between p-6 bg-white border-industrial-200 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-industrial-100 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                    {cat.icon}
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-industrial-100 text-industrial-600">
                    {cat.code}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-industrial-950 group-hover:text-brand-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-industrial-500 mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-industrial-100 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-industrial-400 block mb-1">
                    Featured Grades:
                  </span>
                  {cat.examples.map((ex) => (
                    <div key={ex} className="text-xs font-mono text-industrial-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500/60" />
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4">
                <Link
                  to={cat.link}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-industrial-900 group-hover:text-brand-600 py-2 border-t border-industrial-100 transition-colors"
                >
                  <span>Explore {cat.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
