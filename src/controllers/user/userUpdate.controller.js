

const User = require('../../models/user.model.js');
const bcrypt = require('bcryptjs');


exports.userUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, password, profilePicture, bio } = req.body;

        //hash the password if provided
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Find the user by ID and update their information
        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            password: hashedPassword,
            profilePicture,
            bio
        }, { new: true })
        // console.log(user)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the updated user information as a response
        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePicture: user.profilePicture,
                bio: user.bio
            }
        });

    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

}

exports.userSuspendController = async (req, res) => {
    try {
        const { id } = req.params;
        const { isSuspended } = req.body;

        // Find the user by ID and update their information
        const user = await User.findByIdAndUpdate(id, {
            status: isSuspended 
        }, { new: true })

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User suspended successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePicture: user.profilePicture,
                bio: user.bio,
                status: user.status
            }
        });

    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

}




