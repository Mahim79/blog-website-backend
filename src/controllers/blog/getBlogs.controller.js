const Blog = require('../../models/blog.model');
const Like = require('../../models/like.model');


// Controller to get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isDeleted: false });
        res.status(200).json({ success: true, count: blogs.length, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
// Controller to get all blogs with pagination
const getAllBlogsWithPagination = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;


        // Convert to numbers
        page = Number(page);
        limit = Number(limit);

        // Validate that page and limit are positive integers
        if (isNaN(page) || page <= 0 || isNaN(limit) || limit <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Page and limit must be positive numbers.'
            });
        }

        const blogs = await Blog.find({ isDeleted: false })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalBlogs = await Blog.countDocuments();
        const totalPages = Math.ceil(totalBlogs / limit);

        res.status(200).json({
            success: true,
            pagination: {
                totalBlogs,
                totalPages,
                currentPage: Number(page),
                limit: Number(limit),
            },
            data: blogs,

        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
// Controller to get all blogs with pagination for admin
const getAllBlogsWithPaginationForAdmin = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;


        // Convert to numbers
        page = Number(page);
        limit = Number(limit);

        // Validate that page and limit are positive integers
        if (isNaN(page) || page <= 0 || isNaN(limit) || limit <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Page and limit must be positive numbers.'
            });
        }

        const blogs = await Blog.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalBlogs = await Blog.countDocuments();
        const totalPages = Math.ceil(totalBlogs / limit);

        res.status(200).json({
            success: true,
            pagination: {
                totalBlogs,
                totalPages,
                currentPage: Number(page),
                limit: Number(limit),
            },
            data: blogs,

        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

// Controller to get all blogs by category
const getBlogsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const blogs = await Blog.find( { category },{ isDeleted: false });
        if (blogs.length === 0) {
            return res.status(404).json({ success: false, message: 'No blogs found for this category' });
        }
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
// Controller to get all blogs by author
const getBlogsByAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;
        const blogs = await Blog.find({ author: authorId, isDeleted: false });
        if (blogs.length === 0) {
            return res.status(404).json({ success: false, message: 'No blogs found for this author' });
        }
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}



// Controller to get a single blog by ID
const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        if (blog.isDeleted) {
            return res.status(404).json({ success: false, message: 'This Blog is Suspended' });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
// Controller to get single blog for admin
const getSingleBlogForAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
       
        res.status(200).json({ success: true, data: blog });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

//controller to get most liked blogs
const getPopularBlogs = async (req, res) => {
    try {
        const mostLikedBlogs = await Like.aggregate([
            { $match: { action: true } }, // only true likes
            {
                $group: {
                    _id: '$blog',
                    totalLikes: { $sum: 1 }
                }
            },
            { $sort: { totalLikes: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'blogs',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'blog'
                }
            },
            { $unwind: '$blog' },
            {
                $project: {
                    totalLikes: 1,
                    blog: {
                        _id: '$blog._id',
                        title: '$blog.title',
                        image: '$blog.image',
                        category: '$blog.category',
                        createdAt: '$blog.createdAt',
                        author: '$blog.author'
                    }
                }
            }
        ]);

        res.status(200).json({ success: true, data: mostLikedBlogs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

//controller to get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Blog.distinct('category');
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};


module.exports = {
    getAllBlogs,
    getAllBlogsWithPagination,
    getBlogsByCategory,
    getBlogsByAuthor,
    getSingleBlog,
    getAllBlogsWithPaginationForAdmin,
    getPopularBlogs,
    getAllCategories,
    getSingleBlogForAdmin

};