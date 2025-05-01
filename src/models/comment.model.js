const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const commentSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    blog: { type: Types.ObjectId, ref: 'Blog', required: true, index: true },
    content: { type: String, required: true, trim: true },
    isEdited: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Comment', commentSchema);
