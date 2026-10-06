import React from 'react';
import { ArrowRight, FileCheck, PhoneCall, Shield } from 'lucide-react';
import { Button } from '../common';

export default function QuickRfqCta() {
  return (
    <section className="py-20 bg-gradient-to-br from-industrial-950 via-industrial-900 to-industrial-950 text-white relative overflow-hidden">
      {/* Background Accent Lines */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950/80 border border-brand-500/30 text-brand-300 text-xs font-mono font-semibold">
            <FileCheck className="w-3.5 h-3.5 text-brand-400" />
            <span>DIRECT INDUSTRIAL PROCUREMENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
            Have a Demanding Material Specification?
          </h2>

          <p className="text-sm sm:text-base text-industrial-300 max-w-2xl mx-auto leading-relaxed">
            Tell our application engineering team what mechanical, thermal, or compliance properties your project requires. We provide lot-traceable samples and formal quotations within 24 business hours.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              to="/quote"
              variant="accent"
              size="lg"
              className="shadow-lg font-semibold tracking-wide"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Request a Formal Quote
            </Button>

            <Button
              to="/contact"
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-industrial-600 hover:bg-industrial-800 hover:border-industrial-500"
            >
              Contact Technical Support
            </Button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-8 border-t border-industrial-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-industrial-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-400" />
              <span>Full ISO / RoHS Certification Packs</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-brand-400" />
              <span>Direct Polymer Application Engineers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
