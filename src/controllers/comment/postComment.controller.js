const commentSchema = require('../../models/comment.model');


const postComment = async (req, res) => {
    try {
        const userId = req.user._id;
        // console.log(userId)
        const { blogId } = req.params;
        const { content } = req.body;

        // Validate input
        if (!content || !blogId) {
            return res.status(400).json({ message: 'Content and blog ID are required' });
        }

        // Create a new comment
        const newComment = await commentSchema.create({
            user: userId,
            blog: blogId,
            content,
        });

        return res.status(201).json({ message: 'Comment posted successfully', comment: newComment });
    } catch (error) {
        console.error('Error posting comment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = postComment;