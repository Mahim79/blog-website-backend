const Blog = require('../../models/blog.model'); 

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the blog by ID and delete it
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully', blog: deletedBlog });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const softDeleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the blog by ID and update the isDeleted field
        const deletedBlog = await Blog.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully for user', blog: deletedBlog });
    } catch (error) {
        console.error('Error soft deleting blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { deleteBlog, softDeleteBlog };