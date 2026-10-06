import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-industrial-950 text-industrial-300 border-t border-industrial-800">
      {/* Top Value Banner */}
      <div className="border-b border-industrial-800/80 bg-industrial-900/40 py-8">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-industrial-800 text-brand-400 border border-industrial-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display">
                Certified Quality & Regulatory Compliance
              </div>
              <div className="text-xs text-industrial-400 mt-0.5">
                ISO 9001:2015 • IATF 16949 • RoHS & REACH SVHC Compliant • FDA 21 CFR
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <span>Submit RFQ Inquiries</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-display font-black text-2xl tracking-tighter text-white">
                NOVA<span className="text-brand-400 font-sans">.</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-industrial-800 text-industrial-300 border border-industrial-700">
                INDUSTRIAL MATERIALS
              </span>
            </Link>
            <p className="text-xs text-industrial-400 max-w-sm leading-relaxed">
              Global manufacturer and distributor of high-performance polymer granules, engineered composites, and specialized industrial compounds built for precision manufacturing.
            </p>
            <div className="space-y-2 pt-2 text-xs text-industrial-400 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>Materials Technology Park, Global Logistics Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>+1 (800) 555-NOVA • +49 89 2442 8190</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>technical.sales@nova-materials.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Material Grades */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Material Categories
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/products?category=Polymer+Granules" className="hover:text-white transition-colors">
                  Polymer Granules (PP, PE, PET)
                </Link>
              </li>
              <li>
                <Link to="/products?category=Engineering+Materials" className="hover:text-white transition-colors">
                  Engineering Polymers (PA66, PEEK)
                </Link>
              </li>
              <li>
                <Link to="/products?category=Industrial+Compounds" className="hover:text-white transition-colors">
                  Industrial Compounds (FR-ABS, TPU)
                </Link>
              </li>
              <li>
                <Link to="/products?category=Custom+Materials" className="hover:text-white transition-colors">
                  Bio-Circular & Custom Compounds
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-brand-400 hover:text-brand-300 font-semibold inline-flex items-center gap-1 pt-1">
                  Full TDS Data Sheets →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Capabilities */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About NOVA Materials
                </Link>
              </li>
              <li>
                <Link to="/about#manufacturing" className="hover:text-white transition-colors">
                  Compounding Capabilities
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">
                  Industrial Case Studies
                </Link>
              </li>
              <li>
                <Link to="/about#sustainability" className="hover:text-white transition-colors">
                  Sustainability & PCR Pledge
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Global Locations & Plants
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Knowledge */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/insights" className="hover:text-white transition-colors">
                  Polymer Knowledge Hub
                </Link>
              </li>
              <li>
                <Link to="/insights/polymer-rheology-understanding-melt-flow-index" className="hover:text-white transition-colors">
                  Melt Flow Index (MFI) Guide
                </Link>
              </li>
              <li>
                <Link to="/quote" className="hover:text-white transition-colors">
                  Request RFQ Quotation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Sample & Trial Requests
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-industrial-500 hover:text-industrial-300 transition-colors">
                  Client / Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Portfolio Attribution */}
        <div className="mt-12 pt-8 border-t border-industrial-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-industrial-500">
          <div className="flex flex-wrap items-center gap-6">
            <span>&copy; {currentYear} NOVA Platform (Demonstration B2B Project). All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-industrial-400">
              Designed & Developed by <strong className="text-industrial-200 font-semibold">Mohammad Sadegh Rasouli</strong>
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span className="hover:text-industrial-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-industrial-300 cursor-pointer">Terms of Supply</span>
            <span className="hover:text-industrial-300 cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
