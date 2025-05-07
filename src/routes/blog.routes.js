const express = require('express');

const createBlog = require('../controllers/blog/createBlog.controller');
const { getAllBlogs, getAllBlogsWithPagination, getBlogsByCategory, getBlogsByAuthor, getBlogsWithCommentsAndLikes, getSingleBlog, getSingleBlogWithCommentsAndLikes, getAllBlogsWithPaginationForAdmin, getPopularBlogs, getAllCategories, getSingleBlogForAdmin } = require('../controllers/blog/getBlogs.controller');

const { checkBlacklistToken } = require('../middlewares/blacklistToken.middleware');
const { authenticate } = require('../middlewares/verifyJWT.middleware');
const userSuspendMiddleware = require('../middlewares/userSuspend.middleware');
const adminOnly = require('../middlewares/admin.middleware');
const updateBlog = require('../controllers/blog/updateBlog.controller');
const { deleteBlog, softDeleteBlog } = require('../controllers/blog/deleteBlog.controller');

const router = express.Router();

// Route to create a new blog
router.post('/create-blog', checkBlacklistToken, authenticate, userSuspendMiddleware, createBlog);
// Route to get all blogs
router.get('/all-blog', getAllBlogs);
// Route to get all blogs with pagination
router.get('/all-blog/pagination', getAllBlogsWithPagination);
// Route to get all blogs with pagination for admin
router.get('/all-blog/pagination/admin', checkBlacklistToken, authenticate, adminOnly, getAllBlogsWithPaginationForAdmin);
// Route to get all blogs by category
router.get('/category/:category', getBlogsByCategory);
// Route to get all blogs by author
router.get('/author/:authorId', getBlogsByAuthor);
// Route to get a single blog by ID
router.get('/single-blog/:id', getSingleBlog);
// Route to get a single blog by ID for admin
router.get('/single-blog/admin/:id', checkBlacklistToken, authenticate, adminOnly, getSingleBlogForAdmin);
// Route to get popular blogs
router.get('/popular-blogs', getPopularBlogs);
// Route to get all categories
router.get('/categories', getAllCategories);

//update blog
router.put('/update-blog/:id', checkBlacklistToken, authenticate, userSuspendMiddleware, updateBlog);

//soft delete blog
router.put('/soft-delete-blog/:id', checkBlacklistToken, authenticate, userSuspendMiddleware, softDeleteBlog);

//delete blog for admin 
router.delete('/delete-blog/:id', checkBlacklistToken, authenticate, adminOnly, deleteBlog);



module.exports = router;