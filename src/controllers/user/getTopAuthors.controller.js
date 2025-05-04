const User = require('../../models/user.model');
const Blog = require('../../models/blog.model');

const getTopAuthors = async (req, res) => {
    try {
        // Aggregate blogs to count the number of blogs per author
        const topAuthors = await Blog.aggregate([
            {
                $group: {
                    _id: '$author', // Group by author field
                    blogCount: { $sum: 1 } // Count the number of blogs
                }
            },
            {
                $sort: { blogCount: -1 } // Sort by blog count in descending order
            },
            {
                $limit: 5 // Limit to top 5 authors
            }
        ]);

        // Populate author details
        const populatedAuthors = await Promise.all(
            topAuthors.map(async (author) => {
                const user = await User.findById(author._id).select('name username profilePicture'); 
                return {
                    author: user,
                    blogCount: author.blogCount
                };
            })
        );

        res.status(200).json({
            success: true,
            data: populatedAuthors
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = { getTopAuthors };