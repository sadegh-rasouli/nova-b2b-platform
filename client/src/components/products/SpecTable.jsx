import React from 'react';
import { CheckCircle2, ShieldCheck, FileCheck, Info } from 'lucide-react';
import { Badge } from '../common';
import { cn } from '../../utils/cn';

export default function SpecTable({
  specifications = [],
  certifications = [],
  processingMethods = [],
  className = '',
}) {
  if (!specifications || specifications.length === 0) {
    return (
      <div className="p-6 text-center text-xs font-mono text-industrial-500 bg-industrial-50 rounded-lg border border-industrial-200">
        No technical specification data available for this grade.
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Specification Table */}
      <div className="overflow-x-auto rounded-xl border border-industrial-200 bg-white shadow-subtle">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-industrial-100/80 border-b border-industrial-200 text-industrial-700 font-mono uppercase tracking-wider text-[11px]">
              <th scope="col" className="py-3 px-4 sm:px-6 font-bold">Property Parameter</th>
              <th scope="col" className="py-3 px-4 sm:px-6 font-bold">Typical Value</th>
              <th scope="col" className="py-3 px-4 sm:px-6 font-bold">Unit</th>
              <th scope="col" className="py-3 px-4 sm:px-6 font-bold">Test Standard</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-industrial-100 font-mono">
            {specifications.map((spec, index) => (
              <tr 
                key={spec.label || index}
                className="hover:bg-brand-50/40 transition-colors"
              >
                <td className="py-3.5 px-4 sm:px-6 font-medium text-industrial-900 font-sans text-xs">
                  {spec.label}
                </td>
                <td className="py-3.5 px-4 sm:px-6 font-bold text-industrial-950">
                  {spec.value}
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-industrial-500">
                  {spec.unit || '—'}
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-industrial-600">
                  <span className="inline-block px-2 py-0.5 rounded bg-industrial-100 text-industrial-700 text-[10px] font-semibold border border-industrial-200">
                    {spec.testStandard || 'ISO Standard'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Certifications and Processing Methods Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Compliance Badges */}
        {certifications?.length > 0 && (
          <div className="p-4 rounded-xl bg-industrial-50 border border-industrial-200 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-industrial-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Compliance & Certifications</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1 text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Processing Methods */}
        {processingMethods?.length > 0 && (
          <div className="p-4 rounded-xl bg-industrial-50 border border-industrial-200 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-industrial-700">
              <FileCheck className="w-4 h-4 text-brand-600" />
              <span>Recommended Processing</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {processingMethods.map((method) => (
                <span
                  key={method}
                  className="inline-flex items-center gap-1 text-xs font-mono font-medium text-industrial-700 bg-white border border-industrial-200 px-2.5 py-1 rounded shadow-subtle"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Demo Technical Data Disclaimer */}
      <div className="p-3 bg-industrial-100/60 rounded-lg border border-industrial-200 text-[11px] font-mono text-industrial-500 flex items-start gap-2">
        <Info className="w-4 h-4 text-industrial-400 flex-shrink-0 mt-0.5" />
        <span>
          <strong>Engineering Notice: </strong> Typical property values are derived from standardized injection molded test specimens (ISO/ASTM) for demonstration and preliminary selection. Certified batch-specific Certificates of Analysis (CoA) are issued with commercial shipments.
        </span>
      </div>
    </div>
  );
}
