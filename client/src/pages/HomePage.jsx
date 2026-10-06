import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TrustBar from '../components/home/TrustBar';
import CategoryMatrix from '../components/home/CategoryMatrix';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ValueProps from '../components/home/ValueProps';
import IndustriesSection from '../components/home/IndustriesSection';
import CaseStudySpotlight from '../components/home/CaseStudySpotlight';
import SustainabilitySection from '../components/home/SustainabilitySection';
import QuickRfqCta from '../components/home/QuickRfqCta';
import { useSEO } from '../utils/useSEO';

export default function HomePage() {
  useSEO({
    title: 'NOVA — High-Performance Polymer Compounds & Engineering Thermoplastics',
    description: 'Global manufacturer and compounder of engineering thermoplastics, reinforced polyamide PA66-GF30, flame retardant compounds, and custom industrial resins.',
    keywords: 'polymer granules, engineering plastics, PA66-GF30, PEEK, PBT, custom compounding, thermoplastic supplier, industrial materials, B2B polymer',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://nova-materials.com/#organization',
          'name': 'NOVA Industrial Materials',
          'url': 'https://nova-materials.com',
          'logo': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
          'description': 'Advanced polymer compounding, custom thermoplastic formulations, and technical data sheets.',
          'contactPoint': {
            '@type': 'ContactPoint',
            'contactType': 'Technical Sales & Engineering Support',
            'email': 'engineering@nova-materials.com',
          },
        },
        {
          '@type': 'WebSite',
          '@id': 'https://nova-materials.com/#website',
          'url': 'https://nova-materials.com',
          'name': 'NOVA Materials Platform',
          'publisher': {
            '@id': 'https://nova-materials.com/#organization',
          },
        },
      ],
    },
  });

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Metrics Bar */}
      <TrustBar />

      {/* 3. Product Categories Matrix */}
      <CategoryMatrix />

      {/* 4. Featured Technical Materials */}
      <FeaturedProducts />

      {/* 5. Why NOVA Engineering Value Propositions */}
      <ValueProps />

      {/* 6. Industries Served */}
      <IndustriesSection />

      {/* 7. Case Study Spotlight */}
      <CaseStudySpotlight />

      {/* 8. Sustainability & Circularity */}
      <SustainabilitySection />

      {/* 9. Direct RFQ Quotation CTA */}
      <QuickRfqCta />
    </div>
  );
}
