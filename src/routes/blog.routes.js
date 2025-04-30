const express = require('express');

const createBlog = require('../controllers/blog/createBlog.controller');
// const { getAllBlogsController } = require('../controllers/blog/getAllBlogs.controller');
// const { getBlogByIdController } = require('../controllers/blog/getBlogById.controller');
// const { updateBlogController } = require('../controllers/blog/updateBlog.controller');
// const { deleteBlogController } = require('../controllers/blog/deleteBlog.controller');
// const { getBlogsByAuthorController } = require('../controllers/blog/getBlogsByAuthor.controller');
// const { getBlogsByCategoryController } = require('../controllers/blog/getBlogsByCategory.controller');
const { checkBlacklistToken } = require('../middlewares/blacklistToken.middleware');
const { authenticate } = require('../middlewares/verifyJWT.middleware');

const router = express.Router();

// Route to create a new blog
router.post('/create-blog', checkBlacklistToken, authenticate, createBlog);
// Route to get all blogs
// router.get('/', getAllBlogsController);
module.exports = router;