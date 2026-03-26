const userService = require('../services/user.service');
const { success } = require('../utils/response');

exports.getProfile = async (req, res, next) => { try { const user = await userService.getProfile(req.params.username); success(res, { user }); } catch (e) { next(e); } };
exports.updateProfile = async (req, res, next) => { try { const user = await userService.updateProfile(req.user._id, req.body); success(res, { user }); } catch (e) { next(e); } };
exports.sendConnectionRequest = async (req, res, next) => { try { const data = await userService.sendConnectionRequest(req.user._id.toString(), req.params.id); success(res, data); } catch (e) { next(e); } };
exports.respondToConnection = async (req, res, next) => { try { const data = await userService.respondToConnection(req.user._id.toString(), req.params.id, req.body.action); success(res, data); } catch (e) { next(e); } };
exports.searchUsers = async (req, res, next) => { try { const users = await userService.searchUsers(req.query.q, req.query.page, req.query.limit); success(res, { users }); } catch (e) { next(e); } };
exports.getNotifications = async (req, res, next) => { try { const user = await require('../models/User.model').findById(req.user._id).populate('notifications.from', 'name avatar username'); success(res, { notifications: user.notifications.sort((a, b) => b.createdAt - a.createdAt) }); } catch (e) { next(e); } };
exports.markNotificationsRead = async (req, res, next) => { try { await require('../models/User.model').findByIdAndUpdate(req.user._id, { $set: { 'notifications.$[].read': true } }); success(res, {}, 'Notifications marked read'); } catch (e) { next(e); } };
