const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const blogSchema = new Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dutnq2gdm/image/upload/v1746035574/placeholder-img_wocdc7.webp'
    },
    summary: { type: String, trim: true },
    category: {
        type: String,
        required: true,
        enum: [
            'technology', 'health', 'lifestyle', 'education', 'business',
            'travel', 'food', 'fashion', 'sports', 'entertainment', 'finance',
            'politics', 'science', 'art', 'history', 'music',
            'photography', 'gaming', 'books', 'movies', 'tv shows'
        ],
        default: 'technology'
    },
    author: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Blog', blogSchema);
