const Blog = require('../../models/blog.model');
const Comment = require('../../models/comment.model');

const getCommentsByBlogId = async (req, res) => {
    try {
        const { blogId } = req.params;

        if (!blogId) {
            return res.status(400).json({ message: 'Blog ID is required' });
        }

        // Check if the blog exists and get its isDeleted status
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.isDeleted) {
            return res.status(403).json({ message: 'This blog is deleted by user' });
        }

        // Fetch comments only if blog is not deleted
        const comments = await Comment.find({ blog: blogId, isDeleted: false })
            .populate('user', ' username profilePicture');

        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this blog' });
        }

        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getCommentsByBlogId;
