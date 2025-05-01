const Comment = require('../../models/comment.model');

const softDeleteComment  = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;

        // Find the comment by ID and check if it belongs to the user
        const comment = await Comment.findOne({ _id: commentId, user: userId });

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found or does not belong to the user' });
        }

        // Soft delete the comment
        comment.isDeleted = true;
        comment.deletedAt = new Date();
        await comment.save();

        return res.status(200).json({ message: 'Comment deleted successfully', comment });
    } catch (error) {
        console.error('Error deleting comment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;

        // Find the comment by ID and check if it belongs to the user
        const comment = await Comment.findOneAndDelete({ _id: commentId, user: userId });

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found or does not belong to the user' });
        }

        

        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {softDeleteComment, deleteComment};