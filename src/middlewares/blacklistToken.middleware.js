const { tokenBlacklist } = require("../controllers/auth/logout.controller");

exports.checkBlacklist = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

    next();
};

