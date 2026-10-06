import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { MaterialImage } from '../common';

export default function ProductGallery({ images = [], featuredImage, title = '', code = '', category = '', className = '' }) {
  const allImages = images?.length > 0 ? images : featuredImage ? [featuredImage] : [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="h-80 w-full rounded-2xl overflow-hidden border border-industrial-200 shadow-sm">
        <MaterialImage code={code} category={category} alt={title} />
      </div>
    );
  }

  const currentImage = allImages[selectedIndex] || allImages[0];

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Image Display */}
      <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 border border-industrial-200 shadow-sm">
        <MaterialImage
          src={currentImage}
          alt={`${title} - View ${selectedIndex + 1}`}
          code={code}
          category={category}
          className="w-full h-full"
          imageClassName="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnail Selector */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                'relative h-18 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all',
                selectedIndex === idx
                  ? 'border-brand-600 ring-2 ring-brand-500/20 shadow-sm'
                  : 'border-industrial-200 opacity-70 hover:opacity-100'
              )}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
