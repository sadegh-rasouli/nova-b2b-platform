import Product from '../models/Product.js';

// @desc    Fetch all products with faceted filtering, live search & pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      polymerFamily,
      industry,
      search,
      sort = 'createdAt_desc',
      page = 1,
      limit = 12,
    } = req.query;

    const query = { status: 'active' };

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Polymer Family filter
    if (polymerFamily && polymerFamily !== 'All') {
      query.polymerFamily = polymerFamily;
    }

    // Industry filter
    if (industry && industry !== 'All') {
      query.industries = { $in: [industry] };
    }

    // Live keyword search across name, code, shortDescription, polymerFamily
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { code: searchRegex },
        { shortDescription: searchRegex },
        { polymerFamily: searchRegex },
      ];
    }

    // Sorting
    let sortOptions = { createdAt: -1 };
    if (sort === 'name_asc') sortOptions = { name: 1 };
    if (sort === 'name_desc') sortOptions = { name: -1 };
    if (sort === 'code_asc') sortOptions = { code: 1 };
    if (sort === 'oldest') sortOptions = { createdAt: 1 };

    // Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    // Extract available distinct polymer families & categories for dynamic filter pills
    const allPolymerFamilies = await Product.distinct('polymerFamily', { status: 'active' });
    const allIndustries = await Product.distinct('industries', { status: 'active' });

    res.json({
      success: true,
      data: products,
      pagination: {
        total: totalProducts,
        page: pageNum,
        totalPages: Math.ceil(totalProducts / limitNum) || 1,
        limit: limitNum,
      },
      filters: {
        availablePolymerFamilies: allPolymerFamilies.filter(Boolean),
        availableIndustries: allIndustries.filter(Boolean),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch single product by slug with related products
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, status: 'active' });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Material grade with slug '${req.params.slug}' was not found.`,
      });
    }

    // Find related products in the same category or polymer family
    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      status: 'active',
      $or: [
        { category: product.category },
        { polymerFamily: product.polymerFamily },
      ],
    })
      .limit(3)
      .select('name slug code category polymerFamily shortDescription featuredImage specifications isFeatured');

    res.json({
      success: true,
      data: product,
      related: relatedProducts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch featured products for homepage showcase
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({ status: 'active', isFeatured: true })
      .limit(6)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: featured.length,
      data: featured,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get product category summary counts
// @route   GET /api/products/categories/summary
// @access  Public
export const getCategoriesSummary = async (req, res) => {
  try {
    const summary = await Product.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: summary.map((s) => ({ category: s._id, count: s.count })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
