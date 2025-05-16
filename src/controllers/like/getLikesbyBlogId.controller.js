const Like = require('../../models/like.model'); // Adjust the path as needed

const getLikesByBlogId = async (req, res) => {
    try {
        const { blogId } = req.params;

        if (!blogId) {
            return res.status(400).json({ message: 'Blog ID is required' });
        }

        const likes = await Like.find({ blog: blogId, action: true });
        // Extract user IDs from the likes
        const userIds = likes.map((like) => like.user);

        res.status(200).json({
            blogId,
            totalLikes: likes.length,
            userIds,
        });
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getLikesByBlogId;
