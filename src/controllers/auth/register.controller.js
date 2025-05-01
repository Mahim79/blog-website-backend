const User = require('../../models/user.model');

const { sendEmail } = require('../../utils/nodemailer.config');


// Register a new user
exports.register = async (req, res) => {
    try {

        const { firstName, lastName, username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Check if the username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists try another username' });
        }
        // Generate a verification code (OTP)
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        // console.log(verificationCode)

        // Create a new user
        const newUser = new User({ firstName, lastName, username, email, password, verificationCode });
        await newUser.save();
        // Send verification email (you can use a service like Nodemailer for this)

        await sendEmail(newUser.email, newUser.username, verificationCode);
        console.log('Verification email sent to:', email);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};
