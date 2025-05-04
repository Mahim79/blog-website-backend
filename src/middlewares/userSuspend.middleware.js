const User = require('../models/user.model'); 

const userSuspendMiddleware = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.status === 'suspend') {
            return res.status(403).json({ message: 'Your account is suspended. Please contact Admin.' });
        }

        next();
    } catch (error) {
        console.error('Error in userSuspendMiddleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = userSuspendMiddleware;