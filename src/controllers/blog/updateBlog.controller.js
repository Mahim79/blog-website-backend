const Blog = require('../../models/blog.model');

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;


        const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Run validation on the updated data
        });

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = updateBlog;