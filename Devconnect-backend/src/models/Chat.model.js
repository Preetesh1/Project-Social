const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  readAt: { type: Date },
}, { timestamps: true });

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [messageSchema],
  lastMessage: {
    content: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date,
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
