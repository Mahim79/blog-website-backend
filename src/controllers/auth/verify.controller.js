
const User = require('../../models/user.model');

const emailVerifyController = async (req, res) => {
    try {
        const { token } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: 'User ID is required.' });
        }
        if (!token) {
            return res.status(400).json({ success: false, message: 'Verification token is required.' });
        }

        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        if (userDetails.verificationCode !== token) {
            return res.status(400).json({ success: false, message: 'Invalid verification code.' });
        }

        if (userDetails.isVerified) {
            return res.status(400).json({ success: false, message: 'Email already verified.' });
        }
        // Update user verification status
        userDetails.isVerified = true;
        userDetails.verificationCode = undefined; // Clear the verification code after successful verification

        await userDetails.save();

        res.status(200).json({
            success: true,
            message: 'Email successfully verified.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

module.exports = emailVerifyController;