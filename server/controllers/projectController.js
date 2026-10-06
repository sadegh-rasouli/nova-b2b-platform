import Project from '../models/Project.js';

// @desc    Fetch case studies / engineering projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { industry } = req.query;
    const query = {};

    if (industry && industry !== 'All') {
      query.industry = industry;
    }

    const projects = await Project.find(query).sort({ isFeatured: -1, createdAt: -1 });
    const industries = await Project.distinct('industry');

    res.json({
      success: true,
      data: projects,
      industries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch single project by slug
// @route   GET /api/projects/:slug
// @access  Public
export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Case study project not found.',
      });
    }

    const related = await Project.find({
      _id: { $ne: project._id },
      industry: project.industry,
    }).limit(3);

    res.json({
      success: true,
      data: project,
      related,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
