const jwt = require('jsonwebtoken');


const tokenBlacklist = new Set();

const logoutController = (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ message: 'No token provided' });
        }
        // console.log(authHeader)

        const token = authHeader.split(' ')[1];

        // Optional: Verify token before blacklisting
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // Add the token to blacklist
        tokenBlacklist.add(token);

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { logoutController, tokenBlacklist };
