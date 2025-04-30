const Blog = require('../../models/blog.model');

// Controller to create a new blog
const createBlog = async (req, res) => {
    try {
        const { title, content, image, category, tags } = req.body;
        const author = req.user._id;

        // Validate required fields
        if (!title || !content || !author) {
            return res.status(400).json({ message: 'Title, content, and author are required.' });
        }

        // Create a new blog instance
        const newBlog = new Blog({
            title,
            content,
            image,
            category,
            author,
            tags,
        });

        // Save the blog to the database
        const savedBlog = await newBlog.save();

        res.status(201).json({ message: 'Blog created successfully.', blog: savedBlog });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = createBlog;