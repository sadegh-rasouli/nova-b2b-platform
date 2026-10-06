import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import QuoteRequest from '../models/QuoteRequest.js';
import ContactMessage from '../models/ContactMessage.js';
import BlogPost from '../models/BlogPost.js';
import Project from '../models/Project.js';
import {
  getSeedUsers,
  seedProducts,
  seedBlogPosts,
  seedProjects,
  seedQuotes,
  seedMessages,
} from './seedData.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nova_b2b_db');
    console.log(`[Seeder] Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Seeder Error] Connection failed: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    console.log('[Seeder] Clearing existing collections...');
    await User.deleteMany();
    await Product.deleteMany();
    await QuoteRequest.deleteMany();
    await ContactMessage.deleteMany();
    await BlogPost.deleteMany();
    await Project.deleteMany();

    console.log('[Seeder] Inserting Users...');
    const users = getSeedUsers();
    for (const u of users) {
      await User.create(u); // Triggers pre('save') password hashing
    }

    console.log('[Seeder] Inserting Material Grades & Products...');
    for (const p of seedProducts) {
      await Product.create(p); // Triggers pre('save') slugify
    }

    console.log('[Seeder] Inserting Knowledge Hub Articles...');
    for (const b of seedBlogPosts) {
      await BlogPost.create(b); // Triggers pre('save') slugify
    }

    console.log('[Seeder] Inserting Industrial Case Studies...');
    for (const proj of seedProjects) {
      await Project.create(proj); // Triggers pre('save') slugify
    }

    console.log('[Seeder] Inserting RFQ Quotations & Messages...');
    await QuoteRequest.insertMany(seedQuotes);
    await ContactMessage.insertMany(seedMessages);

    console.log('====================================================');
    console.log('✅ [NOVA Seeder] Database Hydrated Successfully!');
    console.log(`- Admin User: ${users[0].email} / [REDACTED]`);
    console.log(`- Material Grades: ${seedProducts.length} items`);
    console.log(`- Knowledge Articles: ${seedBlogPosts.length} items`);
    console.log(`- Case Studies: ${seedProjects.length} items`);
    console.log(`- Quotations & Inquiries: ${seedQuotes.length + seedMessages.length} items`);
    console.log('====================================================');

    process.exit(0);
  } catch (error) {
    console.error(`[Seeder Error] Data Import Failed: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    console.log('[Seeder] Purging all collections...');
    await User.deleteMany();
    await Product.deleteMany();
    await QuoteRequest.deleteMany();
    await ContactMessage.deleteMany();
    await BlogPost.deleteMany();
    await Project.deleteMany();

    console.log('🗑️ [NOVA Seeder] Database Destroyed / Cleaned.');
    process.exit(0);
  } catch (error) {
    console.error(`[Seeder Error] Data Purge Failed: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
