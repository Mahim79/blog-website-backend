const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const commentSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    blog: { type: Types.ObjectId, ref: 'Blog', required: true, index: true },
    content: { type: String, required: true, trim: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Comment', commentSchema);
