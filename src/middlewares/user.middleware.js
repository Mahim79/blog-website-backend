// Middleware to authenticate the user using JWT
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

exports.authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
