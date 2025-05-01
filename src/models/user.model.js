const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profilePicture: {
        type: String,
        default: 'https://res.cloudinary.com/dutnq2gdm/image/upload/v1745864054/user-1699635_640_mgcjmz.png'
    },
    bio: { type: String, default: 'This is my bio' },
    phoneNumber: { type: String, default: null },
    verificationCode: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ['approve', 'suspend'], default: 'approve' },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null }
}, {
    timestamps: true,
    versionKey: false
});

// Virtual for full name
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = model('User', userSchema);
