import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function FAQAccordion({ items = [], className = '' }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question || index}
            className={cn(
              'rounded-xl border transition-all duration-200 overflow-hidden bg-white',
              isOpen
                ? 'border-brand-300 ring-1 ring-brand-500/10 shadow-sm'
                : 'border-industrial-200 hover:border-industrial-300'
            )}
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors"
            >
              <span className="font-bold font-display text-sm sm:text-base text-industrial-950 pr-4">
                {item.question}
              </span>
              <div
                className={cn(
                  'p-1 rounded-full bg-industrial-100 text-industrial-600 transition-transform duration-200 flex-shrink-0',
                  isOpen && 'rotate-180 bg-brand-50 text-brand-600'
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-industrial-600 leading-relaxed border-t border-industrial-100 pt-3 animate-slide-up">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
