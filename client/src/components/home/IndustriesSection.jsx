import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  HeartPulse, 
  Cpu, 
  Package, 
  Building2, 
  Tv, 
  ArrowRight 
} from 'lucide-react';
import { Card } from '../common';

export default function IndustriesSection() {
  const industries = [
    {
      title: 'Automotive & Mobility',
      icon: <Car className="w-5 h-5 text-brand-600" />,
      description: 'Under-the-hood metal replacement, thermal coolant management, and lightweight interior cockpit trims.',
      materials: 'PA66-GF30, PC/ABS, PP Copolymer',
      filter: 'Automotive',
    },
    {
      title: 'Medical & Healthcare',
      icon: <HeartPulse className="w-5 h-5 text-brand-600" />,
      description: 'ISO 10993 certified biocompatible polymers capable of enduring 1,000+ autoclave steam sterilization cycles.',
      materials: 'PEEK-4500, Medical Grade TPU',
      filter: 'Medical & Healthcare',
    },
    {
      title: 'Electronics & Clean Energy',
      icon: <Cpu className="w-5 h-5 text-brand-600" />,
      description: 'Halogen-free UL94 V-0 flame retardant compounds and permanent ESD electrostatic dissipation housings.',
      materials: 'ABS-FRV0, ESD-PP, PEEK',
      filter: 'Electronics',
    },
    {
      title: 'Industrial Packaging',
      icon: <Package className="w-5 h-5 text-brand-600" />,
      description: 'High-ESCR UN-certified chemical drum blow molding resins and multi-layer puncture-resistant cast films.',
      materials: 'HDPE-6000, LLDPE-1800, PET-2800',
      filter: 'Packaging',
    },
    {
      title: 'Construction & Logistics',
      icon: <Building2 className="w-5 h-5 text-brand-600" />,
      description: 'Cold-temperature impact resistant logistics totes and heavy-duty structural piping compounds.',
      materials: 'PP-5100 Copolymer, HDPE',
      filter: 'Manufacturing',
    },
    {
      title: 'Consumer Products',
      icon: <Tv className="w-5 h-5 text-brand-600" />,
      description: 'High-gloss cosmetic packaging compacts and vibration-damping ergonomic power tool overmoldings.',
      materials: 'Bio-PLA Compound, TPU 85A, ABS',
      filter: 'Consumer Products',
    },
  ];

  return (
    <section className="py-20 bg-industrial-50 border-b border-industrial-200">
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-600">
            Industrial Sectors
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-industrial-950 tracking-tight">
            Tailored for High-Demand Verticals
          </h2>
          <p className="text-sm text-industrial-600">
            Engineered polymer formulations tested and qualified against international automotive, aerospace, and medical regulatory standards.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <Card
              key={ind.title}
              hoverEffect
              className="p-6 bg-white border-industrial-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-industrial-100 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors w-fit">
                  {ind.icon}
                </div>
                <h3 className="text-base font-bold font-display text-industrial-950 group-hover:text-brand-600 transition-colors">
                  {ind.title}
                </h3>
                <p className="text-xs text-industrial-500 leading-relaxed">
                  {ind.description}
                </p>
              </div>

              <div className="pt-3 border-t border-industrial-100 flex items-center justify-between text-xs">
                <div className="text-[11px] font-mono text-industrial-500">
                  <span className="text-industrial-400">Grades: </span>
                  <strong className="text-industrial-800">{ind.materials}</strong>
                </div>
                <Link
                  to={`/products?industry=${encodeURIComponent(ind.filter)}`}
                  className="text-brand-600 font-bold hover:text-brand-700 flex items-center gap-0.5 ml-2"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
