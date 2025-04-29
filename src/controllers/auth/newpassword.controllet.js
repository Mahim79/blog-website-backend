const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');

const setNewPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        // console.log(id)
        // Validate the request body
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        if (!newPassword) {
            return res.status(400).json({ message: 'New password is required' });
        }


        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: 'User is not verified' });
        }

        //hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = setNewPassword;