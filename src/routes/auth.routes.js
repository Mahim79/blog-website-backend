

const forgotPassword = require("../controllers/auth/forgotpass.controller");
const { login } = require("../controllers/auth/login.controller");
const setNewPassword = require("../controllers/auth/newpassword.controllet");
const { register } = require("../controllers/auth/register.controller");
const emailVerifyController = require("../controllers/auth/verify.controller");


const router = require("express").Router();

// Register User
router.post("/register", register);

// Verify User Email
router.post("/verify/:id", emailVerifyController)
// Login User
router.post("/login", login);

// verify User email forgot password
router.post("/forgotpass", forgotPassword)

//reset password
router.post("/newpass/:id", setNewPassword)


module.exports = router;



