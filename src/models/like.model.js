const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const likeSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    blog: { type: Types.ObjectId, ref: 'Blog', required: true, index: true },
    action: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

likeSchema.index({ user: 1, blog: 1 }, { unique: true });

module.exports = model('Like', likeSchema);
