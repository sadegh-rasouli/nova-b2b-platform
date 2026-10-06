import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Cpu, 
  FlaskConical, 
  Sparkles, 
  Award, 
  Users, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Zap, 
  BarChart3,
  Code,
  Terminal,
  FileText
} from 'lucide-react';
import { useSEO } from '../utils/useSEO';
import Breadcrumbs from '../components/products/Breadcrumbs';
import { Badge, Button, Card } from '../components/common';

export default function AboutPage() {
  useSEO({
    title: 'About NOVA — Advanced Polymer Compounding & Material Science',
    description: 'Discover NOVA enterprise engineering, custom polymer compounding technologies, continuous QA analytics, and sustainable thermoplastic innovations.',
    keywords: 'about NOVA, polymer compounding, thermoplastic engineering, material science, injection molding polymers',
  });

  const coreValues = [
    {
      icon: Cpu,
      title: 'Engineering Excellence',
      description: 'Precision polymer formulation engineered to stringent dimensional tolerances, mechanical load thresholds, and extreme thermal resilience.',
      badge: 'Formula Precision',
    },
    {
      icon: ShieldCheck,
      title: 'Continuous Quality Control',
      description: 'Real-time melt-flow index (MFI) monitoring, automated spectrophotometry color matching, and laser moisture-barrier packaging standards.',
      badge: 'Batch Consistency',
    },
    {
      icon: Users,
      title: 'Engineering Co-Development',
      description: 'Direct collaboration with Tier-1 automotive and industrial molders to customize polymer flow behavior and shrink rates for complex molds.',
      badge: 'Technical Support',
    },
    {
      icon: Sparkles,
      title: 'Sustainable Material Innovation',
      description: 'Pioneering halogen-free flame retardants, bio-circular polyamides, and closed-loop PCR compounding with zero mechanical property degradation.',
      badge: 'Eco Formulations',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Application & Stress Analysis',
      desc: 'Our polymer chemists analyze mechanical stress vectors, operating thermal windows, chemical exposures, and regulatory compliance standards.',
    },
    {
      step: '02',
      title: 'Custom Compounding & Additive Formulation',
      desc: 'Formulation blending utilizing high-torque twin-screw extruders with optimized glass fiber sizing, impact modifiers, and UV stabilization packs.',
    },
    {
      step: '03',
      title: 'Laboratory Rheometry & Pilot Trials',
      desc: '25kg pilot testing including capillary rheometer flow profiling, spiral flow testing, and ISO 527 tensile/flexural destructive validation.',
    },
    {
      step: '04',
      title: 'Industrial Scale-Up & Global Logistics',
      desc: 'Multi-ton production with laser lot-coding, moisture-barrier packaging, and regional staging across European, American, and Asian logistics hubs.',
    },
  ];

  const compoundingCapabilities = [
    {
      title: 'High-Torque Twin-Screw Compounding',
      metrics: 'Continuous feeding with vacuum degassing for ultra-low volatile emissions',
      tags: ['PA66', 'PBT', 'PPS', 'PEEK'],
    },
    {
      title: 'Precision Color Matching & Masterbatches',
      metrics: 'Spectrophotometric ΔE < 0.3 tolerance under multiple illuminant standards',
      tags: ['RAL Colors', 'Custom Pigments', 'Laser-Markable'],
    },
    {
      title: 'Specialty Reinforcements & Fillers',
      metrics: 'Glass fiber (10%-60%), carbon fiber, PTFE, mineral, and PTFE lubricated',
      tags: ['GF Reinforcement', 'CF Reinforced', 'Wear Resistance'],
    },
    {
      title: 'Eco-Compounding & Bio-Circular Formulations',
      metrics: 'ISCC+ certified mass-balanced and post-consumer recycled (PCR) compounding',
      tags: ['PCR Resins', 'Halogen-Free FR', 'Bio-Based'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Top Banner Disclaimer */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-2.5 px-4 text-center text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5 font-medium text-amber-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          Demonstration Platform Notice:
        </span>
        {' '}NOVA is an enterprise portfolio showcase platform. Industrial metrics, compounding labs, and case studies represent realistic demonstration data.
      </div>

      {/* Header / Hero */}
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800 pt-10 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: 'About NOVA', href: '/about' }]} />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-6">
              <FlaskConical className="w-3.5 h-3.5" />
              Advanced Materials Engineering
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Pioneering High-Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">Polymer Compounds</span> for Global Industry
            </h1>
            
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              NOVA specializes in the precision synthesis, compounding, and global distribution of engineering thermoplastics. We partner with Tier-1 manufacturers, automotive innovators, and electronics leaders to engineer materials that withstand extreme thermal, mechanical, and environmental demands.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="primary" size="lg">
                  Explore Material Catalog
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/quote">
                <Button variant="outline" size="lg">
                  Request Technical Quotation (RFQ)
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics / Snapshot Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-6 bg-slate-900/90 backdrop-blur border-slate-800 text-center shadow-xl">
            <div className="text-3xl lg:text-4xl font-black text-cyan-400 tracking-tight">12+</div>
            <div className="text-xs uppercase font-bold text-slate-400 mt-1 tracking-wider">Polymer Families</div>
            <div className="text-[11px] text-slate-500 mt-0.5">PA66, PBT, PPS, POM, PEEK</div>
          </Card>
          <Card className="p-6 bg-slate-900/90 backdrop-blur border-slate-800 text-center shadow-xl">
            <div className="text-3xl lg:text-4xl font-black text-sky-400 tracking-tight">50,000+</div>
            <div className="text-xs uppercase font-bold text-slate-400 mt-1 tracking-wider">Annual MT Capacity</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Automated Extrusion Lines</div>
          </Card>
          <Card className="p-6 bg-slate-900/90 backdrop-blur border-slate-800 text-center shadow-xl">
            <div className="text-3xl lg:text-4xl font-black text-emerald-400 tracking-tight">ISO 9001/14001</div>
            <div className="text-xs uppercase font-bold text-slate-400 mt-1 tracking-wider">Quality Standards</div>
            <div className="text-[11px] text-slate-500 mt-0.5">IATF 16949 Compliant</div>
          </Card>
          <Card className="p-6 bg-slate-900/90 backdrop-blur border-slate-800 text-center shadow-xl">
            <div className="text-3xl lg:text-4xl font-black text-blue-400 tracking-tight">30+</div>
            <div className="text-xs uppercase font-bold text-slate-400 mt-1 tracking-wider">Export Markets</div>
            <div className="text-[11px] text-slate-500 mt-0.5">EU, Americas & APAC Hubs</div>
          </Card>
        </div>
      </div>

      {/* Company Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="cyan" className="mb-3">Our Core Philosophy</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Built on Scientific Rigor & Engineering Integrity
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            From molecular chain structure analysis to high-throughput factory processing, our values drive every formulation we compound.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <Card key={idx} className="p-8 bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="slate" className="text-slate-300">{val.badge}</Badge>
                </div>
                <h3 className="text-lg font-bold text-white mt-6">{val.title}</h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">{val.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Compounding Technology & Capabilities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-800">
            <div>
              <Badge variant="cyan" className="mb-2">Industrial Infrastructure</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Compounding & Processing Capabilities
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                Advanced twin-screw compounding extruders paired with gravimetric loss-in-weight dosing systems ensure exact additive concentrations down to 0.05% tolerances.
              </p>
            </div>
            <Link to="/quote">
              <Button variant="primary">
                Consult an Application Engineer
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {compoundingCapabilities.map((cap, i) => (
              <div key={i} className="p-5 rounded-xl bg-slate-900 border border-slate-800/80">
                <div className="flex items-center gap-2 font-bold text-white text-base">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  {cap.title}
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{cap.metrics}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {cap.tags.map((t, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Material Engineering Workflow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="cyan" className="mb-3">Collaborative Cycle</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Our Material Development Workflow
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            A structured, repeatable methodology from initial injection mold requirements to certified full-scale production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((w, idx) => (
            <div key={idx} className="relative p-6 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-3xl font-black text-cyan-400/30 mb-4">{w.step}</div>
                <h3 className="text-base font-bold text-white mb-2">{w.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{w.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs font-semibold text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                ISO Stage Gate
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project & Developer Attribution Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <Card className="p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Terminal className="w-48 h-48 text-cyan-400" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-4">
              <Code className="w-3.5 h-3.5" />
              Software Architecture & Engineering
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              Designed & Developed by Mohammad Sadegh Rasouli
            </h3>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              NOVA is an enterprise-grade B2B material commerce, Technical Data Sheet (TDS) catalog, and RFQ procurement platform. It demonstrates modern full-stack web architecture, including React 18, Tailwind CSS, Express REST API, MongoDB Mongoose, and enterprise cybersecurity best practices.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge variant="cyan">React 18.3 + Vite</Badge>
              <Badge variant="slate">Node.js Express REST API</Badge>
              <Badge variant="slate">MongoDB & Mongoose</Badge>
              <Badge variant="slate">JWT & RBAC Security</Badge>
              <Badge variant="slate">Tailwind CSS 3.4</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Need Custom Polymer Formulations for Your Mold?
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Submit your technical specifications or request a 25kg trial sample with a complete Certificate of Analysis (CoA).
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/quote">
              <Button variant="primary" size="lg">
                Submit RFQ Specification
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Application Engineering
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
