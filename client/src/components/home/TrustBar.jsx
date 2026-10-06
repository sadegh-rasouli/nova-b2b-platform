import React from 'react';

export default function TrustBar() {
  const metrics = [
    {
      value: '15+',
      label: 'Years of Experience',
      sublabel: 'Industrial polymer formulation since 2011',
    },
    {
      value: '40+',
      label: 'Markets Served',
      sublabel: 'Exporting across Europe, Americas & APAC',
    },
    {
      value: '120+',
      label: 'Enterprise Clients',
      sublabel: 'Tier-1 automotive & industrial converters',
    },
    {
      value: '99.8%',
      label: 'Quality Compliance',
      sublabel: 'Automated batch rheometer inspection',
    },
  ];

  return (
    <section className="bg-white border-b border-industrial-200 py-10">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-industrial-100">
          {metrics.map((m, idx) => (
            <div
              key={m.label}
              className={`flex flex-col text-center px-4 ${idx > 0 ? 'pt-6 md:pt-0' : ''}`}
            >
              <span className="font-display font-black text-3xl sm:text-4xl text-industrial-950 tracking-tight">
                {m.value}
              </span>
              <span className="text-sm font-bold text-industrial-800 font-display mt-1">
                {m.label}
              </span>
              <span className="text-xs text-industrial-500 mt-0.5 leading-tight">
                {m.sublabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
