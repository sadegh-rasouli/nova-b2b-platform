import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide article title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide an article excerpt/summary'],
      maxlength: [400, 'Excerpt cannot exceed 400 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide article content'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: [
        'Material Science',
        'Polymer Processing',
        'Sustainability & Circular Economy',
        'Industrial Supply Chain',
        'Quality Assurance & Testing',
        'Industry Trends',
      ],
      index: true,
    },
    author: {
      name: { type: String, default: 'Dr. Evelyn Vance' },
      role: { type: String, default: 'Chief Materials Engineer' },
      avatar: { type: String, default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80' },
    },
    readTimeMinutes: {
      type: Number,
      default: 5,
    },
    coverImage: {
      type: String,
      required: [true, 'Please provide a cover image URL'],
    },
    tags: [String],
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug before save
blogPostSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title);
  }
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
