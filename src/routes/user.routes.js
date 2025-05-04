const express = require('express');
const { userUpdateController, userSuspendController } = require('../controllers/user/userUpdate.controller');
const { authenticate } = require('../middlewares/verifyJWT.middleware');
const { checkBlacklistToken } = require('../middlewares/blacklistToken.middleware');
const userDeleteController = require('../controllers/user/userDelete.controller');
const adminOnly = require('../middlewares/admin.middleware');
const getUserDetailsController = require('../controllers/user/getUserDetails.controller');

const router = express.Router();
// Get user details route
router.get('/details/:id',  getUserDetailsController);
// Update user route
router.put('/update/:id', checkBlacklistToken, authenticate, userUpdateController);
//suspend user route
router.put('/suspend/:id', checkBlacklistToken, authenticate, adminOnly, userSuspendController);

// Delete user route
router.delete('/delete/:id', checkBlacklistToken, authenticate, userDeleteController);



module.exports = router;