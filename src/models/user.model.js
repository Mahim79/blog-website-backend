const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profilePicture: {
        type: String,
        default: 'https://res.cloudinary.com/dutnq2gdm/image/upload/v1745864054/user-1699635_640_mgcjmz.png'
    },
    bio: {
        type: String,
        default: 'This is my bio'
    },
    verificationCode: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['approve', 'suspend'],
        default: 'approve'
    },

}, {
    timestamps: true,
    versionKey: false
});

const User = mongoose.model('User', userSchema);

module.exports = User;