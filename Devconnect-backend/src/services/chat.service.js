const Chat = require('../models/Chat.model');

const getOrCreateChat = async (user1, user2) => {
  let chat = await Chat.findOne({ participants: { $all: [user1, user2] } })
    .populate('participants', 'name avatar username lastSeen');
  if (!chat) {
    chat = await Chat.create({ participants: [user1, user2] });
    chat = await chat.populate('participants', 'name avatar username lastSeen');
  }
  return chat;
};

const sendMessage = async (chatId, senderId, content) => {
  const chat = await Chat.findById(chatId);
  if (!chat) throw new Error('Chat not found');
  chat.messages.push({ sender: senderId, content });
  chat.lastMessage = { content, sender: senderId, createdAt: new Date() };
  await chat.save();
  return chat.messages[chat.messages.length - 1];
};

const getUserChats = async (userId) => {
  return Chat.find({ participants: userId, isActive: true })
    .populate('participants', 'name avatar username lastSeen')
    .sort({ updatedAt: -1 })
    .select('-messages');
};

module.exports = { getOrCreateChat, sendMessage, getUserChats };
