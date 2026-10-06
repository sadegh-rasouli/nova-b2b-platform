import Product from '../models/Product.js';
import QuoteRequest from '../models/QuoteRequest.js';
import ContactMessage from '../models/ContactMessage.js';
import BlogPost from '../models/BlogPost.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

// @desc    Get aggregate analytics metrics for admin overview
// @route   GET /api/admin/dashboard/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ status: 'active' });
    const totalQuotes = await QuoteRequest.countDocuments();
    const newQuotes = await QuoteRequest.countDocuments({ status: 'new' });
    const totalMessages = await ContactMessage.countDocuments();
    const unreadMessages = await ContactMessage.countDocuments({ isRead: false });
    const totalArticles = await BlogPost.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalUsers = await User.countDocuments();

    // Quotes status breakdown
    const quotesByStatus = await QuoteRequest.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Products by category
    const productsByCategory = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    // 5 Most recent quotation requests
    const recentQuotes = await QuoteRequest.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('quoteNumber fullName companyName productName quantity unit status createdAt');

    // 5 Most recent contact inquiries
    const recentMessages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email company subject inquiryType isRead status createdAt');

    res.json({
      success: true,
      data: {
        summary: {
          totalProducts,
          activeProducts,
          totalQuotes,
          newQuotes,
          totalMessages,
          unreadMessages,
          totalArticles,
          totalProjects,
          totalUsers,
        },
        quotesByStatus: quotesByStatus.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        productsByCategory,
        recentQuotes,
        recentMessages,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// Product Management (CRUD)
// ==========================================

export const getAllProductsAdmin = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    const query = {};

    if (category && category !== 'All') query.category = category;
    if (status && status !== 'All') query.status = status;
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [{ name: searchRegex }, { code: searchRegex }, { polymerFamily: searchRegex }];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductByIdAdmin = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, message: 'Material grade created successfully', data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Material grade updated successfully', data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Material grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// Quote Pipeline Management
// ==========================================

export const getAllQuotesAdmin = async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'All') query.status = status;
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { quoteNumber: searchRegex },
        { fullName: searchRegex },
        { companyName: searchRegex },
        { productName: searchRegex },
        { corporateEmail: searchRegex },
      ];
    }

    const quotes = await QuoteRequest.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: quotes.length, data: quotes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getQuoteByIdAdmin = async (req, res) => {
  try {
    const quote = await QuoteRequest.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }
    res.json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateQuoteStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const updatePayload = {};
    if (status) updatePayload.status = status;
    if (adminNotes !== undefined) updatePayload.adminNotes = adminNotes;

    const quote = await QuoteRequest.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }
    res.json({ success: true, message: 'Quote status updated successfully', data: quote });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteQuote = async (req, res) => {
  try {
    const quote = await QuoteRequest.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }
    res.json({ success: true, message: 'Quote request deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// Contact Message Management
// ==========================================

export const getAllMessagesAdmin = async (req, res) => {
  try {
    const { isRead, inquiryType, status } = req.query;
    const query = {};

    if (isRead !== undefined && isRead !== 'All') query.isRead = isRead === 'true';
    if (inquiryType && inquiryType !== 'All') query.inquiryType = inquiryType;
    if (status && status !== 'All') query.status = status;

    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleMessageRead = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    message.isRead = !message.isRead;
    await message.save();
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Inquiry status updated', data: message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// Blog Management (CRUD)
// ==========================================

export const getAllBlogPostsAdmin = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, message: 'Article created successfully', data: post });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, message: 'Article updated successfully', data: post });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// Case Study / Project Management (CRUD)
// ==========================================

export const getAllProjectsAdmin = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, message: 'Case study created successfully', data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Case study not found' });
    }
    res.json({ success: true, message: 'Case study updated successfully', data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Case study not found' });
    }
    res.json({ success: true, message: 'Case study deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// User & Role Management
// ==========================================

export const getAllUsersAdmin = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['admin', 'editor', 'viewer'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role specified' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User role updated successfully', data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Prevent deleting oneself
    if (req.user.id === req.params.id) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own active administrator account' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

