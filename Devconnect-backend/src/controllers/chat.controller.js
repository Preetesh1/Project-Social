const chatService = require('../services/chat.service');
const { success } = require('../utils/response');

exports.getOrCreateChat = async (req, res, next) => { try { const chat = await chatService.getOrCreateChat(req.user._id, req.params.userId); success(res, { chat }); } catch (e) { next(e); } };
exports.getUserChats = async (req, res, next) => { try { const chats = await chatService.getUserChats(req.user._id); success(res, { chats }); } catch (e) { next(e); } };
