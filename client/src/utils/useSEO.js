import { useEffect } from 'react';

/**
 * Enterprise SEO & Structured Metadata Engine for NOVA B2B Platform
 * Automatically manages:
 * - Dynamic <title> and meta description
 * - Canonical link (<link rel="canonical" href="...">)
 * - OpenGraph (Facebook, LinkedIn, Slack)
 * - Twitter Cards
 * - Robots meta (index/follow for public, noindex/nofollow for admin)
 * - JSON-LD Schema.org structured data (Organization, WebSite, Product, Article, BreadcrumbList)
 */
export function useSEO({
  title,
  description,
  keywords,
  image,
  ogImage,
  url,
  type = 'website',
  schema,
  schemaJson,
  noindex = false,
}) {
  useEffect(() => {
    // 1. Document Title
    const formattedTitle = title 
      ? `${title} | NOVA Industrial Materials` 
      : 'NOVA — Advanced Materials. Built for Industry.';
    document.title = formattedTitle;

    // Helper: Set or create <meta> tags
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content && content !== '') return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper: Set or create <link> tags
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Canonical URL Resolution
    const canonicalUrl = url || (window.location.origin + window.location.pathname);
    setLinkTag('canonical', canonicalUrl);

    // 3. Robots Meta (index/noindex)
    const isAdminRoute = window.location.pathname.startsWith('/admin') || noindex;
    setMetaTag('name', 'robots', isAdminRoute ? 'noindex, nofollow' : 'index, follow');

    // 4. Standard Metadata
    const defaultDesc = 'Global manufacturer and compounder of high-performance polymer granules, engineering composites, and industrial thermoplastic compounds.';
    setMetaTag('name', 'description', description || defaultDesc);
    if (keywords) setMetaTag('name', 'keywords', keywords);

    // 5. OpenGraph Tags
    const previewImage = ogImage || image || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80';
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description || defaultDesc);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', previewImage);
    setMetaTag('property', 'og:site_name', 'NOVA Industrial Materials');

    // 6. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description || defaultDesc);
    setMetaTag('name', 'twitter:image', previewImage);

    // 7. JSON-LD Structured Data Injection
    const activeSchema = schema || schemaJson;
    let scriptElement = document.querySelector('script#seo-json-ld');
    if (activeSchema) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = 'seo-json-ld';
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(activeSchema);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      const existingScript = document.querySelector('script#seo-json-ld');
      if (existingScript) existingScript.remove();
    };
  }, [title, description, keywords, image, ogImage, url, type, schema, schemaJson, noindex]);
}
