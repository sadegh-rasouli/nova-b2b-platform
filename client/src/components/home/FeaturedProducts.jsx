import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { productService } from '../../services';
import { mockProducts } from '../../data/mockData';
import { Badge, Button, Card, Skeleton, MaterialImage } from '../common';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadFeatured() {
      try {
        const response = await productService.getFeaturedProducts();
        if (isMounted && response?.data?.length > 0) {
          setProducts(response.data);
        } else if (isMounted) {
          setProducts(mockProducts.filter((p) => p.isFeatured));
        }
      } catch (err) {
        // Graceful fallback to mock products if API server is not running
        if (isMounted) {
          setProducts(mockProducts.filter((p) => p.isFeatured));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20 bg-white border-b border-industrial-200">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-600">
              Technical Grade Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-industrial-950 tracking-tight">
              Featured Material Grades
            </h2>
            <p className="text-sm text-industrial-600">
              High-demand engineering thermoplastics and polymer compounds ready for immediate testing and volume procurement.
            </p>
          </div>

          <Button
            to="/products"
            variant="outline"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Browse All {mockProducts.length}+ Grades
          </Button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton.Card key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => (
              <Card
                key={product._id || product.code}
                hoverEffect
                className="flex flex-col justify-between overflow-hidden border-industrial-200 group"
              >
                {/* Product Image Banner */}
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <MaterialImage
                    src={product.featuredImage}
                    alt={product.name}
                    code={product.code}
                    category={product.category}
                    className="w-full h-full"
                    imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    showBadge={false}
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <Badge variant="tech" className="bg-white/90 backdrop-blur-sm shadow-sm">
                      {product.code}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="accent" className="shadow-sm">
                      {product.category}
                    </Badge>
                  </div>
                </div>

                {/* Product Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold font-display text-industrial-950 group-hover:text-brand-600 transition-colors">
                      <Link to={`/products/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-industrial-500 mt-2 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Highlight Specs */}
                  {product.specifications?.length > 0 && (
                    <div className="p-3 bg-industrial-50 rounded-md border border-industrial-100 space-y-1.5 font-mono text-xs">
                      {product.specifications.slice(0, 3).map((spec) => (
                        <div key={spec.label} className="flex justify-between items-center text-[11px]">
                          <span className="text-industrial-500">{spec.label}:</span>
                          <span className="font-bold text-industrial-900">
                            {spec.value} {spec.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Certifications Row */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.certifications?.slice(0, 3).map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-industrial-600 bg-industrial-100 px-2 py-0.5 rounded"
                      >
                        <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 border-t border-industrial-100 mt-2 flex items-center justify-between gap-3">
                  <Link
                    to={`/products/${product.slug}`}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <span>Technical TDS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Button
                    to={`/quote?product=${encodeURIComponent(product.name)}&code=${encodeURIComponent(product.code)}`}
                    size="sm"
                    variant="outline"
                  >
                    Request Quote
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
