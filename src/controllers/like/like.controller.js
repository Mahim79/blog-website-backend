const Like = require('../../models/like.model');
const Blog = require('../../models/blog.model');


const likeController = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;

        // Check if the blog exists
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if the user has already liked the blog
        const existingLike = await Like.findOne({ user: userId, blog: blogId });
        if (existingLike) {
            // If the user has already liked the blog, remove the like
            await Like.deleteOne({ _id: existingLike._id });
            return res.status(200).json({ message: 'Like removed', action: false });
        } else {
            // If the user has not liked the blog, add a new like
            const newLike = new Like({ user: userId, blog: blogId, action: true });
            await newLike.save();
            return res.status(201).json({ message: 'Blog liked', action: true });
        }
    } catch (error) {
        console.error('Error liking/unliking blog:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

 
module.exports = likeController;