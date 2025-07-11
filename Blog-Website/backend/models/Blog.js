import mongoose from 'mongoose';

    const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    cover: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link to User model
    createdAt: { type: Date, default: Date.now }
    });

    export default mongoose.model('Blog', blogSchema);
