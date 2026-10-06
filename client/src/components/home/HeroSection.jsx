import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { Button, Badge } from '../common';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-industrial-50 to-industrial-100/60 border-b border-industrial-200 py-16 lg:py-24">
      {/* Subtle Technical Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span>PRECISION POLYMER ENGINEERING</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-industrial-950 tracking-tight leading-[1.1]">
              Advanced Materials. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-900 via-brand-700 to-brand-600">
                Built for Industry.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-industrial-600 max-w-xl leading-relaxed font-normal">
              NOVA manufactures and supplies high-performance polymer granules, engineering composites, and custom-compounded materials to tier-1 industrial enterprises worldwide.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                to="/products"
                variant="primary"
                size="lg"
                className="shadow-md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Materials
              </Button>

              <Button
                to="/quote"
                variant="outline"
                size="lg"
                className="bg-white"
              >
                Request a Quote
              </Button>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-6 border-t border-industrial-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-industrial-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>ISO 9001 & IATF 16949</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Verified Lot-to-Lot TDS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Global Dual-Sourcing Logistics</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Industrial Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white border border-industrial-200 shadow-xl overflow-hidden p-6 sm:p-7 space-y-6">
              {/* Card Header */}
              <div className="flex items-start justify-between border-b border-industrial-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="tech">NV-PA66-30GF</Badge>
                    <Badge variant="success">IN STOCK</Badge>
                  </div>
                  <h3 className="text-base font-bold font-display text-industrial-950 mt-1.5">
                    Novamide® PA66-GF30 Composite
                  </h3>
                  <p className="text-xs text-industrial-500 font-mono">
                    Grade Family: Polyamide 66 + 30% Glass Fiber
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-industrial-50 border border-industrial-200 text-brand-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              {/* Verified Technical Data Matrix */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-industrial-50 border border-industrial-100">
                  <span className="text-industrial-500">Tensile Modulus (ISO 527):</span>
                  <span className="font-bold text-industrial-900">9,800 MPa</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-industrial-50 border border-industrial-100">
                  <span className="text-industrial-500">Heat Deflection Temp (1.8 MPa):</span>
                  <span className="font-bold text-industrial-900">250 °C</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-industrial-50 border border-industrial-100">
                  <span className="text-industrial-500">Melt Flow Index (275°C/5kg):</span>
                  <span className="font-bold text-industrial-900">14.5 g/10min</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-industrial-50 border border-industrial-100">
                  <span className="text-industrial-500">Specific Density (ISO 1183):</span>
                  <span className="font-bold text-industrial-900">1.36 g/cm³</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="text-[11px] text-industrial-500">
                  <span>Batch Cert: </span>
                  <strong className="text-industrial-800 font-mono">RoHS / REACH</strong>
                </div>
                <Link
                  to="/products/novamide-pa66-gf30-structural-composite"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 group"
                >
                  <span>View Technical TDS</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
