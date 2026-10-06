import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Leaf, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { Button, Badge } from '../common';
import { cn } from '../../utils/cn';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const location = useLocation();
  const megaMenuRef = useRef(null);

  // Handle sticky navbar background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  // Handle click outside and ESC key for desktop mega menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setIsMegaMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMegaMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Body scroll locking when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const categories = [
    {
      title: 'Polymer Granules',
      description: 'Commodity polyolefins, high-clarity PET, and bimodal HDPE blow molding resins.',
      icon: <Layers className="w-5 h-5 text-brand-600" />,
      link: '/products?category=Polymer+Granules',
      grades: 'PP, HDPE, LLDPE, PET',
    },
    {
      title: 'Engineering Materials',
      description: 'High-heat PA66-GF30 composites, self-lubricating PA6, and ultra-grade PEEK.',
      icon: <Cpu className="w-5 h-5 text-brand-600" />,
      link: '/products?category=Engineering+Materials',
      grades: 'PA66, PEEK, PC/ABS, PA6',
    },
    {
      title: 'Industrial Compounds',
      description: 'Flame retardant UL94 V-0 ABS, elastic TPU elastomers, and conductive ESD polymers.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-600" />,
      link: '/products?category=Industrial+Compounds',
      grades: 'FR-ABS, TPU 85A, ESD-PP',
    },
    {
      title: 'Custom Materials',
      description: 'Bio-circular PLA formulations, tailored mineral loadings, and specialty masterbatches.',
      icon: <Leaf className="w-5 h-5 text-brand-600" />,
      link: '/products?category=Custom+Materials',
      grades: 'Bio-PLA, Custom Blends',
    },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-industrial-200 shadow-sm py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-industrial-100 py-4'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
          aria-label="NOVA Home"
        >
          <span className="font-display font-black text-2xl tracking-tighter text-industrial-950">
            NOVA<span className="text-brand-600 font-sans">.</span>
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider bg-industrial-100 text-industrial-700 border border-industrial-200">
            MATERIALS
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
          {/* Products Dropdown Trigger */}
          <div className="relative" ref={megaMenuRef}>
            <button
              type="button"
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              aria-expanded={isMegaMenuOpen}
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                isMegaMenuOpen || location.pathname.startsWith('/products')
                  ? 'text-brand-600 bg-brand-50/60'
                  : 'text-industrial-700 hover:text-industrial-950 hover:bg-industrial-100/70'
              )}
            >
              <span>Materials Catalog</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', isMegaMenuOpen && 'rotate-180 text-brand-600')} />
            </button>

            {/* Desktop Mega Menu Dropdown */}
            {isMegaMenuOpen && (
              <div 
                onMouseLeave={() => setIsMegaMenuOpen(false)}
                className="absolute top-full left-0 mt-2 w-[580px] -translate-x-12 rounded-xl bg-white border border-industrial-200 shadow-modal p-5 grid grid-cols-2 gap-4 animate-slide-up z-50"
              >
                <div className="col-span-2 pb-2.5 border-b border-industrial-100 flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-industrial-500">
                    Industrial Material Categories
                  </span>
                  <Link 
                    to="/products" 
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
                  >
                    <span>View All Materials</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {categories.map((cat) => (
                  <Link
                    key={cat.title}
                    to={cat.link}
                    className="group p-3 rounded-lg border border-transparent hover:border-industrial-200 hover:bg-industrial-50 transition-all flex items-start gap-3"
                  >
                    <div className="p-2 rounded-md bg-industrial-100 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors flex-shrink-0">
                      {cat.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-industrial-900 group-hover:text-brand-600 transition-colors font-display">
                        {cat.title}
                      </div>
                      <p className="text-xs text-industrial-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {cat.description}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-mono text-industrial-400">
                        {cat.grades}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              cn(
                'px-3.5 py-2 rounded-md text-sm font-medium transition-colors',
                isActive ? 'text-brand-600 bg-brand-50/60' : 'text-industrial-700 hover:text-industrial-950 hover:bg-industrial-100/70'
              )
            }
          >
            About NOVA
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              cn(
                'px-3.5 py-2 rounded-md text-sm font-medium transition-colors',
                isActive ? 'text-brand-600 bg-brand-50/60' : 'text-industrial-700 hover:text-industrial-950 hover:bg-industrial-100/70'
              )
            }
          >
            Case Studies
          </NavLink>

          <NavLink
            to="/insights"
            className={({ isActive }) =>
              cn(
                'px-3.5 py-2 rounded-md text-sm font-medium transition-colors',
                isActive ? 'text-brand-600 bg-brand-50/60' : 'text-industrial-700 hover:text-industrial-950 hover:bg-industrial-100/70'
              )
            }
          >
            Insights
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              cn(
                'px-3.5 py-2 rounded-md text-sm font-medium transition-colors',
                isActive ? 'text-brand-600 bg-brand-50/60' : 'text-industrial-700 hover:text-industrial-950 hover:bg-industrial-100/70'
              )
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Desktop CTA & Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            to="/contact"
            className="text-xs font-mono text-industrial-600 hover:text-industrial-900 transition-colors flex items-center gap-1.5 px-2 py-1"
          >
            <PhoneCall className="w-3.5 h-3.5 text-brand-600" />
            <span>+1 (800) 555-NOVA</span>
          </Link>

          <Button
            to="/quote"
            variant="accent"
            size="sm"
            className="shadow-sm font-medium tracking-wide"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Request a Quote
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-industrial-700 hover:bg-industrial-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-industrial-950/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in">
          <div className="bg-white border-b border-industrial-200 shadow-xl max-h-[calc(100vh-65px)] overflow-y-auto p-6 space-y-6 animate-slide-up">
            <nav className="flex flex-col space-y-2">
              {/* Expandable Mobile Materials Section */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-base font-semibold text-industrial-900 hover:bg-industrial-50"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-brand-600" />
                    Materials Catalog
                  </span>
                  <ChevronDown className={cn('w-4 h-4 transition-transform', isMobileProductsOpen && 'rotate-180')} />
                </button>

                {isMobileProductsOpen && (
                  <div className="pl-6 pr-2 py-2 space-y-2 border-l-2 border-industrial-200 ml-4 my-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.title}
                        to={cat.link}
                        className="block py-2 text-sm text-industrial-700 hover:text-brand-600 font-medium"
                      >
                        <div className="font-semibold text-industrial-900">{cat.title}</div>
                        <div className="text-xs text-industrial-500">{cat.grades}</div>
                      </Link>
                    ))}
                    <Link
                      to="/products"
                      className="block pt-2 text-xs font-bold text-brand-600"
                    >
                      Browse Complete Catalog →
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className="p-3 rounded-lg text-base font-semibold text-industrial-900 hover:bg-industrial-50"
              >
                About NOVA
              </Link>

              <Link
                to="/projects"
                className="p-3 rounded-lg text-base font-semibold text-industrial-900 hover:bg-industrial-50"
              >
                Case Studies
              </Link>

              <Link
                to="/insights"
                className="p-3 rounded-lg text-base font-semibold text-industrial-900 hover:bg-industrial-50"
              >
                Technical Insights
              </Link>

              <Link
                to="/contact"
                className="p-3 rounded-lg text-base font-semibold text-industrial-900 hover:bg-industrial-50"
              >
                Contact Us
              </Link>
            </nav>

            <div className="pt-4 border-t border-industrial-100 flex flex-col gap-3">
              <Button
                to="/quote"
                variant="accent"
                size="lg"
                className="w-full justify-center"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Request a Quote
              </Button>
              <div className="text-center text-xs font-mono text-industrial-500">
                Direct Technical Inquiries: +1 (800) 555-NOVA
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
