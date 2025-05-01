const express = require('express');

const createBlog = require('../controllers/blog/createBlog.controller');
const { getAllBlogs, getAllBlogsWithPagination, getBlogsByCategory, getBlogsByAuthor, getBlogsWithCommentsAndLikes, getSingleBlog, getSingleBlogWithCommentsAndLikes, getPopularBlogs,getAllCategories } = require('../controllers/blog/getBlogs.controller');

const { checkBlacklistToken } = require('../middlewares/blacklistToken.middleware');
const { authenticate } = require('../middlewares/verifyJWT.middleware');

const router = express.Router();

// Route to create a new blog
router.post('/create-blog', checkBlacklistToken, authenticate, createBlog);
// Route to get all blogs
router.get('/all-blog', getAllBlogs);
// Route to get all blogs with pagination
router.get('/all-blog/pagination', getAllBlogsWithPagination);
// Route to get all blogs by category
router.get('/category/:category', getBlogsByCategory);
// Route to get all blogs by author
router.get('/author/:authorId', getBlogsByAuthor);

// Route to get all blogs with comments and likes
router.get('/all-blog/comments-likes', getBlogsWithCommentsAndLikes);
// Route to get a single blog by ID
router.get('/single-blog/:id', getSingleBlog);
// Route to get a single blog by ID with comments and likes
router.get('/single-blog/comments-likes/:id', getSingleBlogWithCommentsAndLikes);
// Route to get popular blogs
router.get('/popular-blogs', getPopularBlogs);
// Route to get all categories
router.get('/categories', getAllCategories);




module.exports = router;