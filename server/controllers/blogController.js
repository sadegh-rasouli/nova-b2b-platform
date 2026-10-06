import BlogPost from '../models/BlogPost.js';

// @desc    Fetch published blog insights
// @route   GET /api/insights
// @access  Public
export const getBlogPosts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { excerpt: searchRegex },
        { tags: { $in: [searchRegex] } },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 9;
    const skip = (pageNum - 1) * limitNum;

    const total = await BlogPost.countDocuments(query);
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const categories = await BlogPost.distinct('category', { isPublished: true });

    res.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
      categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch single blog post by slug
// @route   GET /api/insights/:slug
// @access  Public
export const getBlogPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Insight article not found.',
      });
    }

    const related = await BlogPost.find({
      _id: { $ne: post._id },
      isPublished: true,
      category: post.category,
    })
      .limit(3)
      .select('title slug excerpt coverImage category readTimeMinutes publishedAt');

    res.json({
      success: true,
      data: post,
      related,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
