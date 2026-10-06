import React, { useState } from 'react';
import { Layers, ShieldCheck, Atom } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * MaterialImage Component
 * Robust image wrapper that renders a sleek industrial fallback graphic
 * whenever the remote image fails to load (e.g. offline, CDN unreachable, blocked).
 */
export default function MaterialImage({
  src,
  alt = 'Polymer Material',
  code = '',
  category = '',
  className = '',
  imageClassName = '',
  fallbackClassName = '',
  showBadge = true,
  loading = 'lazy',
}) {
  const [hasError, setHasError] = useState(!src);

  if (hasError || !src) {
    return (
      <div
        className={cn(
          'relative w-full h-full min-h-[140px] flex flex-col items-center justify-center p-6 select-none overflow-hidden bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-slate-800 text-white',
          fallbackClassName,
          className
        )}
      >
        {/* Subtle Industrial Grid / Hex Pattern */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#64748b 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* Ambient Glow */}
        <div className="absolute w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

        {/* Center Graphic Icon */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-2.5">
          <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
            <Atom className="w-6 h-6 animate-pulse text-cyan-400" />
          </div>

          <div className="space-y-0.5">
            <div className="font-mono text-[11px] font-bold tracking-wider text-cyan-400 uppercase">
              {code || 'NOVA COMPOUND'}
            </div>
            {category && (
              <div className="text-[10px] text-slate-400 tracking-wide font-sans">
                {category}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Technical Tag */}
        {showBadge && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between text-[9px] font-mono text-slate-400 px-2 py-1 rounded bg-slate-950/70 border border-slate-800/80 backdrop-blur-xs">
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              SPEC GRADE
            </span>
            <span className="text-slate-500">ISO/IATF QUALIFIED</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('relative w-full h-full overflow-hidden bg-slate-900', className)}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        onError={() => setHasError(true)}
        className={cn('w-full h-full object-cover transition-all duration-300', imageClassName)}
      />
    </div>
  );
}
