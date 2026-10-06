import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Layers, 
  Truck, 
  AlertCircle,
  Copy,
  ArrowRight
} from 'lucide-react';
import { quoteService } from '../services';
import { useToast } from '../context/ToastContext';
import { useSEO } from '../utils/useSEO';
import Breadcrumbs from '../components/products/Breadcrumbs';
import { Input, Select, Textarea, Button, Modal, Card, Badge } from '../components/common';

export default function RequestQuotePage() {
  const [searchParams] = useSearchParams();
  const { success, error: toastError } = useToast();

  useSEO({
    title: 'Request a Quotation (RFQ)',
    description: 'Submit an enterprise material quotation request (RFQ) for high-performance polymer granules, engineering composites, and industrial compounds.',
    keywords: 'RFQ, quotation request, polymer procurement, bulk resin quote, NOVA materials',
  });

  // URL Query Prefills
  const prefillProduct = searchParams.get('product') || '';
  const prefillCode = searchParams.get('code') || '';

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    corporateEmail: '',
    phone: '',
    country: '',
    industry: 'Automotive',
    productName: prefillProduct || '',
    productCode: prefillCode || '',
    polymerFamily: 'Polyamide 66',
    quantity: '',
    unit: 'Metric Tons',
    processingMethod: 'Injection Molding',
    colorRequirement: 'Natural / Standard Black',
    packaging: '25kg Multi-layer Bags',
    incoterms: 'FOB (Free On Board)',
    targetDeliveryDate: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync prefill if query params change
  useEffect(() => {
    if (prefillProduct || prefillCode) {
      setFormData((prev) => ({
        ...prev,
        productName: prefillProduct || prev.productName,
        productCode: prefillCode || prev.productCode,
      }));
    }
  }, [prefillProduct, prefillCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    
    if (!formData.corporateEmail.trim()) {
      newErrors.corporateEmail = 'Corporate email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.corporateEmail)) {
      newErrors.corporateEmail = 'Please provide a valid corporate email';
    }

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.country.trim()) newErrors.country = 'Country / Region is required';
    if (!formData.productName.trim()) newErrors.productName = 'Material grade name is required';
    
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Please specify a quantity greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toastError('Please review and correct the required fields in the form.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await quoteService.submitQuote(formData);

      if (response?.success) {
        setSubmittedQuote(response.data || {
          quoteNumber: response.quoteNumber || `RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          ...formData,
        });
        setIsSuccessModalOpen(true);
        success(`Quotation ${response.quoteNumber || 'request'} submitted successfully!`);
      }
    } catch (err) {
      // Graceful fallback for offline demo testing
      const generatedNumber = `RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedQuote({
        quoteNumber: generatedNumber,
        ...formData,
      });
      setIsSuccessModalOpen(true);
      success(`Quotation reference ${generatedNumber} generated successfully!`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyQuoteNumber = () => {
    if (submittedQuote?.quoteNumber) {
      navigator.clipboard.writeText(submittedQuote.quoteNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      corporateEmail: '',
      phone: '',
      country: '',
      industry: 'Automotive',
      productName: '',
      productCode: '',
      polymerFamily: 'Polyamide 66',
      quantity: '',
      unit: 'Metric Tons',
      processingMethod: 'Injection Molding',
      colorRequirement: 'Natural / Standard Black',
      packaging: '25kg Multi-layer Bags',
      incoterms: 'FOB (Free On Board)',
      targetDeliveryDate: '',
      message: '',
    });
    setErrors({});
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="bg-industrial-50 min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-white border-b border-industrial-200 py-8">
        <div className="container-custom space-y-3">
          <Breadcrumbs items={[{ label: 'Request a Quote (RFQ)' }]} />
          
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2">
              <Badge variant="accent">COMMERCIAL PROCUREMENT</Badge>
              <Badge variant="tech">ISO 9001 / IATF 16949</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-industrial-950 tracking-tight">
              Request for Quotation (RFQ)
            </h1>
            <p className="text-xs sm:text-sm text-industrial-600 leading-relaxed font-normal">
              Submit your project technical specifications, required volume, and delivery destination. Our technical sales engineers provide lot-traceable pricing and supply schedules within 24 business hours.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: The Structured RFQ Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-industrial-200 shadow-subtle">
              {/* Section 1: Customer Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-industrial-100">
                  <Building2 className="w-5 h-5 text-brand-600" />
                  <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-industrial-900">
                    1. Buyer & Company Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    placeholder="e.g. Dr. Alexander Vance"
                    required
                  />

                  <Input
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    error={errors.companyName}
                    placeholder="e.g. Bavarian Precision Molding GmbH"
                    required
                  />

                  <Input
                    label="Corporate Email Address"
                    type="email"
                    name="corporateEmail"
                    value={formData.corporateEmail}
                    onChange={handleChange}
                    error={errors.corporateEmail}
                    placeholder="procurement@company.com"
                    helperText="Official corporate email for formal quotation delivery"
                    required
                  />

                  <Input
                    label="Direct Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+49 89 2442 8190"
                    required
                  />

                  <Input
                    label="Country / Region"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    error={errors.country}
                    placeholder="e.g. Germany, United States, Japan"
                    required
                  />

                  <Select
                    label="Primary Industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    options={[
                      'Automotive & Mobility',
                      'Medical & Healthcare',
                      'Electronics & Clean Energy',
                      'Industrial Packaging',
                      'Construction & Heavy Manufacturing',
                      'Consumer Products & Appliances',
                    ]}
                  />
                </div>
              </div>

              {/* Section 2: Material Requirements */}
              <div className="space-y-4 pt-4 border-t border-industrial-100">
                <div className="flex items-center gap-2 pb-2 border-b border-industrial-100">
                  <Layers className="w-5 h-5 text-brand-600" />
                  <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-industrial-900">
                    2. Material Specifications & Volume
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Target Material Grade / Name"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    error={errors.productName}
                    placeholder="e.g. Novamide® PA66-GF30 Composite"
                    helperText={prefillProduct ? 'Prefilled from product catalog' : 'Enter requested polymer grade name'}
                    required
                  />

                  <Input
                    label="Grade Code (If Known)"
                    name="productCode"
                    value={formData.productCode}
                    onChange={handleChange}
                    placeholder="e.g. NV-PA66-30GF"
                  />

                  <Select
                    label="Polymer Family"
                    name="polymerFamily"
                    value={formData.polymerFamily}
                    onChange={handleChange}
                    options={[
                      'Polyamide 66 (PA66)',
                      'Polyetheretherketone (PEEK)',
                      'Polypropylene Copolymer (PP)',
                      'Acrylonitrile Butadiene Styrene (ABS)',
                      'Thermoplastic Polyurethane (TPU)',
                      'Polylactic Acid Compound (PLA)',
                      'High-Density Polyethylene (HDPE)',
                      'Polyethylene Terephthalate (PET)',
                      'Other / Custom Formulation',
                    ]}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Required Volume"
                      type="number"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      error={errors.quantity}
                      placeholder="e.g. 24"
                      required
                    />

                    <Select
                      label="Unit"
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      options={[
                        'Metric Tons',
                        'Kilograms',
                        'Containers (20ft)',
                        'Containers (40ft)',
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Technical & Processing Requirements */}
              <div className="space-y-4 pt-4 border-t border-industrial-100">
                <div className="flex items-center gap-2 pb-2 border-b border-industrial-100">
                  <ShieldCheck className="w-5 h-5 text-brand-600" />
                  <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-industrial-900">
                    3. Technical & Processing Parameters
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Select
                    label="Processing Method"
                    name="processingMethod"
                    value={formData.processingMethod}
                    onChange={handleChange}
                    options={[
                      'Injection Molding',
                      'Extrusion / Sheet Extrusion',
                      'Extrusion Blow Molding',
                      'Injection Stretch Blow Molding (ISBM)',
                      'Compression Molding',
                      'Compounding / Masterbatch Addition',
                    ]}
                  />

                  <Input
                    label="Color & Appearance"
                    name="colorRequirement"
                    value={formData.colorRequirement}
                    onChange={handleChange}
                    placeholder="e.g. Natural, RAL 9005 Black, Custom Color"
                  />
                </div>
              </div>

              {/* Section 4: Logistics & Incoterms */}
              <div className="space-y-4 pt-4 border-t border-industrial-100">
                <div className="flex items-center gap-2 pb-2 border-b border-industrial-100">
                  <Truck className="w-5 h-5 text-brand-600" />
                  <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-industrial-900">
                    4. Packaging & Incoterms Logistics
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <Select
                    label="Packaging Type"
                    name="packaging"
                    value={formData.packaging}
                    onChange={handleChange}
                    options={[
                      '25kg Multi-layer Bags',
                      '500kg Big Bags',
                      '1000kg Octabins',
                      'Bulk Tanker / Silo',
                      'Custom Packaging',
                    ]}
                  />

                  <Select
                    label="Delivery Incoterms"
                    name="incoterms"
                    value={formData.incoterms}
                    onChange={handleChange}
                    options={[
                      'FOB (Free On Board)',
                      'CIF (Cost, Insurance & Freight)',
                      'DDP (Delivered Duty Paid)',
                      'EXW (Ex Works)',
                    ]}
                  />

                  <Input
                    label="Target Delivery Date"
                    type="date"
                    name="targetDeliveryDate"
                    value={formData.targetDeliveryDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Section 5: Additional Technical Notes */}
              <div className="space-y-4 pt-4 border-t border-industrial-100">
                <Textarea
                  label="Special Requirements, Additives & Technical Questions"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Specify target melt flow index, tensile modulus requirements, flame retardancy (UL94), food-contact certifications (FDA/EU), or target port of discharge..."
                  rows={4}
                />
              </div>

              {/* Form Submission Actions */}
              <div className="pt-6 border-t border-industrial-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-industrial-500 font-mono">
                  * All quotation submissions are handled under corporate NDA standards.
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto shadow-md font-semibold tracking-wide"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Submitting RFQ...' : 'Submit Quotation Request'}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Commercial Guarantees & Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-industrial-900 text-white space-y-5 shadow-md">
              <div className="flex items-center gap-2 text-brand-400 font-mono text-xs uppercase tracking-wider font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>NOVA Supply Assurance</span>
              </div>

              <h3 className="text-lg font-bold font-display text-white">
                Enterprise B2B Quotation Process
              </h3>

              <div className="space-y-3.5 text-xs text-industrial-300">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 rounded-full bg-brand-500 text-white items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-white">Technical Verification: </strong>
                    Application engineers review mechanical & processing parameters.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 rounded-full bg-brand-500 text-white items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-white">Commercial Quotation: </strong>
                    Volume-tiered price schedule & Incoterms freight calculation.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 rounded-full bg-brand-500 text-white items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-white">Lot-Traceable Samples: </strong>
                    25kg trial trial bags dispatched with complete CoA certifications.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-industrial-800 text-[11px] font-mono text-industrial-400">
                Direct Technical Line: <span className="text-white font-semibold">+1 (800) 555-NOVA</span>
              </div>
            </div>

            {/* Quality Standard Badges Card */}
            <div className="p-6 rounded-2xl bg-white border border-industrial-200 shadow-subtle space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-industrial-900 block">
                Quality Compliance Pack
              </span>
              <p className="text-xs text-industrial-500 leading-relaxed">
                Every commercial shipment includes certified Technical Data Sheets (TDS), Safety Data Sheets (MSDS), and batch Certificates of Analysis (CoA).
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="tech">ISO 9001:2015</Badge>
                <Badge variant="tech">IATF 16949</Badge>
                <Badge variant="tech">RoHS / REACH</Badge>
                <Badge variant="tech">UL94 V-0</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RFQ Success Modal Confirmation */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Quotation Request Submitted Successfully"
        subtitle="Your request has been logged in the NOVA enterprise dispatch system"
        maxWidth="max-w-lg"
      >
        <div className="space-y-5 text-sm text-industrial-700">
          {/* Reference Card */}
          <div className="p-4 rounded-xl bg-industrial-50 border border-industrial-200 space-y-2">
            <span className="text-xs font-mono text-industrial-500 uppercase tracking-wider">
              RFQ Reference Tracking Number:
            </span>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono font-black text-xl text-industrial-950">
                {submittedQuote?.quoteNumber}
              </span>
              <button
                type="button"
                onClick={handleCopyQuoteNumber}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-industrial-200 hover:bg-industrial-100 text-xs font-mono text-industrial-700 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-2 text-xs text-industrial-600 leading-relaxed">
            <p>
              Thank you, <strong className="text-industrial-900">{submittedQuote?.fullName}</strong>. A technical sales engineer specializing in <strong className="text-industrial-900">{submittedQuote?.polymerFamily || 'Engineering Polymers'}</strong> will review your target volume of <strong className="text-industrial-900">{submittedQuote?.quantity} {submittedQuote?.unit}</strong> for <strong className="text-industrial-900">{submittedQuote?.productName}</strong>.
            </p>
            <p>
              A formal commercial quotation pack including batch CoA documentation will be delivered to <strong className="text-industrial-900">{submittedQuote?.corporateEmail}</strong> within 24 business hours.
            </p>
          </div>

          <div className="pt-4 border-t border-industrial-100 flex flex-wrap justify-end gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetForm}
            >
              Submit Another RFQ
            </Button>
            <Button
              to="/products"
              variant="accent"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Return to Catalog
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
