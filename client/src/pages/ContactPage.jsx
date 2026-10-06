import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck,
  Building,
  Globe
} from 'lucide-react';
import { contactService } from '../services';
import { useToast } from '../context/ToastContext';
import { useSEO } from '../utils/useSEO';
import Breadcrumbs from '../components/products/Breadcrumbs';
import FAQAccordion from '../components/common/FAQAccordion';
import { Input, Select, Textarea, Button, Badge, Card } from '../components/common';

export default function ContactPage() {
  const { success, error: toastError } = useToast();

  useSEO({
    title: 'Contact Technical Sales & Global Support',
    description: 'Connect with NOVA application engineers, request 25kg polymer trial samples, or inquire about volume material contracts.',
    keywords: 'contact NOVA, polymer technical support, material sample request, polymer supplier contact',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    inquiryType: 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide message details (at least 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toastError('Please correct the highlighted form fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await contactService.submitMessage(formData);
      if (response?.success) {
        setIsSuccess(true);
        success('Your inquiry has been dispatched to our technical engineering desk.');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          inquiryType: 'General Inquiry',
          message: '',
        });
      }
    } catch (err) {
      // Offline demo fallback
      setIsSuccess(true);
      success('Your inquiry has been received (Demonstration Mode).');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        inquiryType: 'General Inquiry',
        message: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: 'What is the Minimum Order Quantity (MOQ) for commercial polymer shipments?',
      answer: 'Standard commercial production MOQ is 1 Metric Ton (40 x 25kg multi-layer moisture-barrier bags) for stocked grades. For custom compounded or custom-color formulations, typical compounding campaign MOQ is 3 to 5 Metric Tons depending on base resin family.',
    },
    {
      question: 'How do we request a 25kg trial sample for injection tool testing?',
      answer: 'Qualified manufacturing enterprises and tier suppliers can request 25kg trial sample bags with batch Certificate of Analysis (CoA). Select "Sample Request" in the form above or specify trial sample requirements directly on the RFQ form.',
    },
    {
      question: 'What regulatory and compliance documentation is provided with shipments?',
      answer: 'Every commercial delivery is accompanied by a full technical documentation pack including verified Technical Data Sheets (TDS), Safety Data Sheets (MSDS), EU RoHS & REACH SVHC compliance declarations, and FDA 21 CFR / EU 10/2011 food-contact certificates where applicable.',
    },
    {
      question: 'What international freight Incoterms and delivery lead times are supported?',
      answer: 'We support standard international trade terms including FOB (Free On Board), CIF (Cost, Insurance & Freight), and DDP (Delivered Duty Paid). Stocked grades ship within 3 to 5 business days from regional distribution hubs in Europe, North America, and Asia.',
    },
    {
      question: 'Can NOVA develop custom reinforced or impact-modified formulations?',
      answer: 'Yes. Our application engineering lab develops tailored polymer compounds including custom glass-fiber loadings (10% to 50%), carbon nanotube ESD dissipation, halogen-free UL94 V-0 flame retardants, and elastomer impact modifiers.',
    },
  ];

  return (
    <div className="bg-industrial-50 min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-white border-b border-industrial-200 py-8">
        <div className="container-custom space-y-3">
          <Breadcrumbs items={[{ label: 'Contact & Support' }]} />
          
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2">
              <Badge variant="accent">GLOBAL TECHNICAL SUPPORT</Badge>
              <Badge variant="tech">24/7 ENGINEERING DESK</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-industrial-950 tracking-tight">
              Contact NOVA Technical Sales
            </h1>
            <p className="text-xs sm:text-sm text-industrial-600 leading-relaxed">
              Connect with our polymer formulation specialists, request 25kg mold trial samples, or inquire about regional distribution and supply contracts.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-10 space-y-16">
        {/* Contact Form & Office Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 bg-white border-industrial-200 shadow-subtle">
              <div className="flex items-center justify-between pb-4 border-b border-industrial-100 mb-6">
                <div>
                  <h2 className="text-lg font-bold font-display text-industrial-950">
                    Send an Inquiry or Sample Request
                  </h2>
                  <p className="text-xs text-industrial-500 mt-0.5">
                    Technical representatives respond within 24 business hours.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-brand-50 text-brand-600">
                  <Mail className="w-5 h-5" />
                </div>
              </div>

              {isSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block text-sm mb-0.5">Inquiry Dispatched Successfully!</strong>
                    <span>Thank you for reaching out. A NOVA materials engineer will follow up with complete technical documentation.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="e.g. Marcus Thorne"
                    required
                  />

                  <Input
                    label="Corporate Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="m.thorne@company.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Apex Tier-1 Supplier"
                  />

                  <Input
                    label="Contact Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 019-2834"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Inquiry Type"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    options={[
                      'General Inquiry',
                      'Technical Support & TDS',
                      'Sample Request (25kg Trial)',
                      'Supply Chain & Logistics',
                      'Compliance & Certification',
                      'Partnership & Distribution',
                    ]}
                  />

                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    placeholder="e.g. PEEK-4500 Biocompatibility Data"
                    required
                  />
                </div>

                <Textarea
                  label="Inquiry Details & Specifications"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  placeholder="Describe your material requirements, injection mold parameters, target delivery dates, or sample shipping address..."
                  rows={4}
                  required
                />

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    variant="accent"
                    size="md"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Right Column: Global Locations & Direct Support */}
          <div className="lg:col-span-5 space-y-6">
            {/* Global Distribution Hubs */}
            <div className="p-6 rounded-2xl bg-white border border-industrial-200 shadow-subtle space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-industrial-900 pb-3 border-b border-industrial-100">
                <Globe className="w-4 h-4 text-brand-600" />
                <span>Regional Distribution Hubs</span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Europe */}
                <div className="p-3.5 rounded-lg bg-industrial-50 border border-industrial-100 space-y-1">
                  <div className="font-bold text-industrial-950 font-display flex items-center justify-between">
                    <span>European Distribution Center</span>
                    <Badge variant="tech">FRANKFURT / ROTTERDAM</Badge>
                  </div>
                  <p className="text-industrial-500 font-mono text-[11px]">
                    Materials Logistic Park 4, 60549 Frankfurt, Germany
                  </p>
                  <p className="text-industrial-600 font-mono text-[11px]">
                    Phone: +49 89 2442 8190
                  </p>
                </div>

                {/* Americas */}
                <div className="p-3.5 rounded-lg bg-industrial-50 border border-industrial-100 space-y-1">
                  <div className="font-bold text-industrial-950 font-display flex items-center justify-between">
                    <span>North America Operations</span>
                    <Badge variant="tech">CHICAGO HUB</Badge>
                  </div>
                  <p className="text-industrial-500 font-mono text-[11px]">
                    820 Innovation Parkway, Suite 400, Chicago, IL 60601
                  </p>
                  <p className="text-industrial-600 font-mono text-[11px]">
                    Phone: +1 (800) 555-6682
                  </p>
                </div>

                {/* Asia Pacific */}
                <div className="p-3.5 rounded-lg bg-industrial-50 border border-industrial-100 space-y-1">
                  <div className="font-bold text-industrial-950 font-display flex items-center justify-between">
                    <span>Asia-Pacific Regional Logistics</span>
                    <Badge variant="tech">SINGAPORE</Badge>
                  </div>
                  <p className="text-industrial-500 font-mono text-[11px]">
                    Jurong Industrial Materials Terminal, Singapore 628900
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Lines Box */}
            <div className="p-6 rounded-2xl bg-industrial-900 text-white space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-brand-400 block">
                Direct Engineering Desk
              </span>
              <p className="text-xs text-industrial-300 leading-relaxed">
                For urgent processing troubleshooting, gate sizing analysis, or immediate quotation requests:
              </p>
              <div className="pt-2 text-xs font-mono space-y-1 text-industrial-200">
                <div>Email: <strong className="text-white">technical.sales@nova-materials.com</strong></div>
                <div>Hotline: <strong className="text-white">+1 (800) 555-NOVA</strong></div>
                <div>Hours: <span className="text-industrial-400">Monday – Friday (08:00 – 18:00 UTC)</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="pt-8 border-t border-industrial-200 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-600">
              Procurement & Engineering Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-industrial-950">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-industrial-600">
              Find answers regarding minimum orders, 25kg trial sample protocols, technical testing certifications, and international logistics.
            </p>
          </div>

          <FAQAccordion items={faqItems} />
        </section>
      </div>
    </div>
  );
}
