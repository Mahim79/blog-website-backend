const express = require('express');
const { userUpdateController } = require('../controllers/user/userUpdate.controller');
const { authenticate } = require('../middlewares/verifyJWT.middleware');
const { checkBlacklist } = require('../middlewares/blacklistToken.middleware');
const userDeleteController = require('../controllers/user/userDelete.controller');

const router = express.Router();

// Update user route
router.put('/update/:id', checkBlacklist, authenticate, userUpdateController);

// Delete user route
router.delete('/delete/:id', checkBlacklist, authenticate,userDeleteController );



module.exports = router;