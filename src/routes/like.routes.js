const express = require('express');
const likeController = require('../controllers/like/like.controller');
const { authenticate } = require('../middlewares/verifyJWT.middleware');
const { checkBlacklistToken } = require('../middlewares/blacklistToken.middleware');
const getLikesByBlogId = require('../controllers/like/getLikesbyBlogId.controller');
const userSuspendMiddleware = require('../middlewares/userSuspend.middleware');




const router = express.Router();

// Like or unlike a blog post
router.post('/:blogId', checkBlacklistToken, authenticate,userSuspendMiddleware, likeController);
// Get the number of likes for a blog post
router.get('/:blogId', getLikesByBlogId);


module.exports = router;
