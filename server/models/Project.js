import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const metricSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide case study title'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    industry: {
      type: String,
      required: [true, 'Please provide industry vertical'],
      index: true,
    },
    clientType: {
      type: String,
      required: [true, 'Please specify client type (e.g. Tier 1 Automotive Supplier)'],
    },
    materialUsed: {
      type: String,
      required: [true, 'Please specify material / polymer grade used'],
    },
    challenge: {
      type: String,
      required: [true, 'Please describe engineering challenge'],
    },
    solution: {
      type: String,
      required: [true, 'Please describe technical solution'],
    },
    results: [String],
    metrics: [metricSchema],
    coverImage: {
      type: String,
      required: [true, 'Please provide cover image URL'],
    },
    gallery: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug before save
projectSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title);
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
