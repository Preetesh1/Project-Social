const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, maxlength: 3000 },
  images: [{ type: String }],
  codeSnippet: {
    code: String,
    language: String,
  },
  tags: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
  }],
  shares: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  type: { type: String, enum: ['post', 'article', 'project', 'job'], default: 'post' },
  visibility: { type: String, enum: ['public', 'connections', 'private'], default: 'public' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ tags: 1 });
postSchema.index({ content: 'text' });

module.exports = mongoose.model('Post', postSchema);
