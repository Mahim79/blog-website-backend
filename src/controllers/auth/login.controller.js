const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Secret key for JWT
const secretKey = process.env.SECRET_KEY;




// Login a user
exports.login = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const identifier = email || username;
        // Check if the request body contains either email or username and password
        if (!identifier || !password) {
            return res.status(400).json({ message: 'Email/Username and password are required' });
        }
        

        // Find the user by username
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });
        // console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the user is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Email not verified' });
        }
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const { _id, role } = user;

        // Generate a JWT token
        const token = jwt.sign({ _id, username, email, role }, secretKey, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
