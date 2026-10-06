import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Factory, 
  FileText,
  Layers,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { productService } from '../services';
import { mockProducts } from '../data/mockData';
import { useSEO } from '../utils/useSEO';
import Breadcrumbs from '../components/products/Breadcrumbs';
import ProductGallery from '../components/products/ProductGallery';
import SpecTable from '../components/products/SpecTable';
import ProductCard from '../components/products/ProductCard';
import { Button, Badge, Skeleton, Card } from '../components/common';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product by slug
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    async function loadProduct() {
      try {
        const response = await productService.getProductBySlug(slug);
        if (isMounted && response?.data) {
          setProduct(response.data);
          setRelated(response.related || []);
        } else if (isMounted) {
          // Fallback to client mock data
          const found = mockProducts.find((p) => p.slug === slug);
          if (found) {
            setProduct(found);
            setRelated(mockProducts.filter((p) => p.slug !== slug).slice(0, 3));
          } else {
            setError('Material grade not found');
          }
        }
      } catch (err) {
        if (isMounted) {
          const found = mockProducts.find((p) => p.slug === slug);
          if (found) {
            setProduct(found);
            setRelated(mockProducts.filter((p) => p.slug !== slug).slice(0, 3));
          } else {
            setError('Material grade not found');
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProduct();
    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Dynamic SEO Injection
  useSEO({
    title: product ? `${product.name} (${product.code}) Technical Data Sheet` : 'Material Details',
    description: product ? product.shortDescription : 'NOVA Polymer Technical Specifications',
    keywords: product ? `${product.code}, ${product.polymerFamily}, ${product.name}, TDS, technical specifications` : '',
    image: product?.featuredImage,
    schemaJson: product ? {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": product.featuredImage,
      "description": product.shortDescription,
      "sku": product.code,
      "mpn": product.code,
      "brand": {
        "@type": "Brand",
        "name": "NOVA"
      },
      "category": product.category,
      "material": product.polymerFamily
    } : null,
  });

  if (loading) {
    return (
      <div className="container-custom py-12 space-y-8">
        <Skeleton className="h-6 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5"><Skeleton className="h-96 w-full rounded-2xl" /></div>
          <div className="lg:col-span-7 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton.Text lines={4} />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-24 text-center space-y-6">
        <div className="inline-flex p-4 rounded-full bg-red-50 text-red-600">
          <FileText className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold font-display text-industrial-950">
          Material Grade Not Found
        </h1>
        <p className="text-xs text-industrial-500 max-w-sm mx-auto">
          The requested polymer grade code or slug could not be located in our active material catalog.
        </p>
        <div>
          <Button to="/products" variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Materials Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-industrial-50 pb-20">
      {/* Top Header & Breadcrumbs */}
      <div className="bg-white border-b border-industrial-200 py-6">
        <div className="container-custom space-y-4">
          <Breadcrumbs
            items={[
              { label: 'Materials Catalog', to: '/products' },
              { label: product.category, to: `/products?category=${encodeURIComponent(product.category)}` },
              { label: product.code },
            ]}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="tech" size="lg" className="font-bold text-industrial-950 bg-industrial-100">
                  {product.code}
                </Badge>
                <Badge variant="accent">{product.category}</Badge>
                <Badge variant="success">IN STOCK & QUALIFIED</Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-industrial-950 tracking-tight">
                {product.name}
              </h1>

              <div className="text-xs font-mono text-industrial-500 flex items-center gap-3">
                <span>Polymer Family: <strong className="text-industrial-800">{product.polymerFamily}</strong></span>
                <span>•</span>
                <span>ISO 9001 / IATF 16949 Certified</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                to={`/quote?product=${encodeURIComponent(product.name)}&code=${encodeURIComponent(product.code)}`}
                variant="accent"
                size="md"
                className="shadow-sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Request Quotation for Grade
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => window.print()}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Export TDS Sheet
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="container-custom py-10 space-y-12">
        {/* Overview & Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-5">
            <ProductGallery
              images={product.images}
              featuredImage={product.featuredImage}
              title={product.name}
              code={product.code}
              category={product.category}
            />
          </div>

          {/* Right Column: Descriptions & Benefits */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-industrial-200 shadow-subtle space-y-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-brand-600">
                Material Description & Polymer Chemistry
              </h2>
              <p className="text-xs sm:text-sm text-industrial-700 leading-relaxed font-normal">
                {product.fullDescription || product.shortDescription}
              </p>
            </div>

            {/* Key Benefits */}
            {product.keyBenefits?.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-industrial-200 shadow-subtle space-y-4">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-industrial-900">
                  Engineering Advantages & Key Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-industrial-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Target Applications & Industries Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.applications?.length > 0 && (
                <div className="p-5 rounded-xl bg-white border border-industrial-200 shadow-subtle space-y-2">
                  <div className="text-xs font-mono font-bold uppercase text-industrial-900">
                    Typical Applications
                  </div>
                  <ul className="space-y-1 text-xs text-industrial-600">
                    {product.applications.map((app, i) => (
                      <li key={i} className="flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.industries?.length > 0 && (
                <div className="p-5 rounded-xl bg-white border border-industrial-200 shadow-subtle space-y-2">
                  <div className="text-xs font-mono font-bold uppercase text-industrial-900">
                    Primary Industries
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.industries.map((ind) => (
                      <Badge key={ind} variant="default" size="sm">
                        {ind}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Data Sheet Specification Engine */}
        <section className="space-y-4 pt-4 border-t border-industrial-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-600">
                Verified Material Metrics
              </span>
              <h2 className="text-2xl font-bold font-display text-industrial-950">
                Technical Specification Table (TDS)
              </h2>
            </div>
            <div className="text-xs font-mono text-industrial-500">
              Grade Code: <strong className="text-industrial-900">{product.code}</strong>
            </div>
          </div>

          <SpecTable
            specifications={product.specifications}
            certifications={product.certifications}
            processingMethods={product.processingMethods}
          />
        </section>

        {/* Related Material Grades */}
        {related?.length > 0 && (
          <section className="space-y-6 pt-8 border-t border-industrial-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-600">
                  Alternative Formulations
                </span>
                <h3 className="text-xl font-bold font-display text-industrial-950">
                  Related Material Grades
                </h3>
              </div>
              <Link to="/products" className="text-xs font-mono font-bold text-brand-600 hover:text-brand-700">
                View Entire Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <ProductCard key={rel._id || rel.code} product={rel} />
              ))}
            </div>
          </section>
        )}

        {/* Quick RFQ Bottom Banner */}
        <div className="rounded-2xl bg-industrial-900 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-brand-400 font-bold uppercase tracking-wider">
              Procurement & Trial Orders
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Ready to Test {product.name}?
            </h3>
            <p className="text-xs text-industrial-400 max-w-xl">
              Request lot-traceable sample quantities (25kg Bags or Octabins) or secure high-volume production supply contracts with guaranteed delivery schedules.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              to={`/quote?product=${encodeURIComponent(product.name)}&code=${encodeURIComponent(product.code)}`}
              variant="accent"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Request Quote for {product.code}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
