import mongoose from 'mongoose';

const quoteRequestSchema = new mongoose.Schema(
  {
    quoteNumber: {
      type: String,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, 'Please provide full name'],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
    },
    corporateEmail: {
      type: String,
      required: [true, 'Please provide corporate email address'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide contact phone number'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Please provide country/region'],
      trim: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null,
    },
    productName: {
      type: String,
      required: [true, 'Please specify requested material or grade'],
    },
    productCode: {
      type: String,
      default: '',
    },
    quantity: {
      type: Number,
      required: [true, 'Please specify required quantity/volume'],
      min: [1, 'Quantity must be at least 1'],
    },
    unit: {
      type: String,
      enum: ['Metric Tons', 'Kilograms', 'Containers (20ft)', 'Containers (40ft)'],
      default: 'Metric Tons',
    },
    packaging: {
      type: String,
      enum: ['25kg Multi-layer Bags', '500kg Big Bags', '1000kg Octabins', 'Bulk Tanker / Silo', 'Custom Packaging'],
      default: '25kg Multi-layer Bags',
    },
    targetDeliveryDate: {
      type: Date,
    },
    incoterms: {
      type: String,
      enum: ['EXW (Ex Works)', 'FOB (Free On Board)', 'CIF (Cost, Insurance & Freight)', 'DDP (Delivered Duty Paid)'],
      default: 'FOB (Free On Board)',
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'reviewing', 'contacted', 'quoted', 'closed', 'archived'],
      default: 'new',
      index: true,
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate RFQ reference number before save
quoteRequestSchema.pre('save', function (next) {
  if (!this.quoteNumber) {
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.quoteNumber = `RFQ-${year}-${randomSuffix}`;
  }
  next();
});

const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);
export default QuoteRequest;
