import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const specificationItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    unit: { type: String, default: '' },
    testStandard: { type: String, default: '' }, // e.g., ISO 527, ASTM D1238
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [150, 'Product name cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    code: {
      type: String,
      required: [true, 'Please provide a unique product grade code'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Polymer Granules',
        'Engineering Materials',
        'Industrial Compounds',
        'Custom Materials',
      ],
      index: true,
    },
    polymerFamily: {
      type: String,
      required: [true, 'Please specify polymer family (e.g., PP, PA66, PEEK, ABS, TPU)'],
      trim: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Please provide a short description'],
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    fullDescription: {
      type: String,
      required: [true, 'Please provide full technical description'],
    },
    specifications: [specificationItemSchema],
    keyBenefits: [String],
    applications: [String],
    industries: {
      type: [String],
      index: true,
    },
    processingMethods: [String], // e.g. Injection Molding, Extrusion, Blow Molding
    certifications: [String], // e.g. ISO 9001, RoHS, REACH, UL94 V-0, FDA 21 CFR
    images: {
      type: [String],
      default: [],
    },
    featuredImage: {
      type: String,
      required: [true, 'Please provide a featured image URL'],
    },
    datasheetUrl: {
      type: String,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'active',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug before save if modified
productSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = slugify(this.name);
  }
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
