const User = require('../../models/user.model');

const { sendEmail } = require('../../utils/nodemailer.config');

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isVerified = false;

        // Generate a verification code 
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        // Set token and expiration on user
        user.verificationCode = verificationCode;

        await user.save();

        await sendEmail(user.email, user.username, verificationCode)


        res.status(200).json({ message: 'Code send on email for Password reset' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = forgotPassword;