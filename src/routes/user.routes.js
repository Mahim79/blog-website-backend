const express = require('express');
const { userUpdateController } = require('../controllers/user/userUpdate.controller');
const { authenticate } = require('../middlewares/verifyJWT.middleware');
const { checkBlacklist } = require('../middlewares/blacklistToken.middleware');

const router = express.Router();

// Update user route
router.put('/update/:id', checkBlacklist, authenticate, userUpdateController);



module.exports = router;