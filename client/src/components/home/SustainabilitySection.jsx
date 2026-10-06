import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card } from '../common';

export default function SustainabilitySection() {
  return (
    <section className="py-20 bg-industrial-50 border-b border-industrial-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-medium">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>CIRCULAR MATERIALS INITIATIVE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display text-industrial-950 tracking-tight leading-tight">
              Responsible Polymer Science for Future Manufacturing
            </h2>

            <p className="text-sm text-industrial-600 leading-relaxed">
              At NOVA, we engineer materials that balance demanding mechanical specifications with lifecycle circularity. Our research focuses on high-integrity Post-Consumer Recycled (PCR) compounding, bio-based feedstocks, and waste reduction across manufacturing supply chains.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-white border border-industrial-200 text-emerald-600 flex-shrink-0 mt-0.5">
                  <Recycle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-industrial-900 font-display">
                    High-Integrity PCR Upcycling
                  </h3>
                  <p className="text-xs text-industrial-500 mt-0.5 leading-relaxed">
                    Custom compatibilizers and chain-extending additives restore tensile modulus and impact performance in recycled polyolefins.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-white border border-industrial-200 text-emerald-600 flex-shrink-0 mt-0.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-industrial-900 font-display">
                    Bio-Circular PLA Formulations
                  </h3>
                  <p className="text-xs text-industrial-500 mt-0.5 leading-relaxed">
                    Renewable plant-derived polymers with mineral reinforcements designed for elevated heat deflection and industrial compostability.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/products?category=Custom+Materials"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 font-mono"
              >
                <span>Explore Bio-Circular & Sustainable Compounds</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Sustainable Pillars Card */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl bg-white border border-industrial-200 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-industrial-100 pb-4">
                <div className="text-xs font-mono uppercase tracking-wider text-industrial-500">
                  Circularity & Testing Framework
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ISO 14001 ALIGNED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-xl bg-industrial-50 border border-industrial-100">
                  <div className="font-display font-black text-2xl text-emerald-700">-62%</div>
                  <div className="text-[11px] font-mono text-industrial-600 mt-1">
                    Cradle-to-Gate CO₂ in Bio-PLA
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-industrial-50 border border-industrial-100">
                  <div className="font-display font-black text-2xl text-emerald-700">100%</div>
                  <div className="text-[11px] font-mono text-industrial-600 mt-1">
                    Halogen-Free Flame Retardants
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-industrial-50 border border-industrial-100">
                  <div className="font-display font-black text-2xl text-emerald-700">25 µm</div>
                  <div className="text-[11px] font-mono text-industrial-600 mt-1">
                    Continuous PCR Melt Filtration
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-industrial-50 border border-industrial-100">
                  <div className="font-display font-black text-2xl text-emerald-700">RoHS</div>
                  <div className="text-[11px] font-mono text-industrial-600 mt-1">
                    Zero SVHC Chemical Additives
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-industrial-400 text-center leading-relaxed">
                * Environmental metrics based on verified Life Cycle Assessment (LCA) modeling and technical sample lot testing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
