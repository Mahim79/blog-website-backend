const User = require('../../models/user.model');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -__v -resetToken -resetTokenExpiry');
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message,
        });
    }
};

module.exports = getAllUsers;