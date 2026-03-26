const { register, login } = require('../services/auth.service');
const { success } = require('../utils/response');

exports.register = async (req, res, next) => { try { const data = await register(req.body); success(res, data, 'Account created', 201); } catch (e) { next(e); } };
exports.login = async (req, res, next) => { try { const data = await login(req.body); success(res, data, 'Login successful'); } catch (e) { next(e); } };
exports.me = (req, res) => success(res, { user: req.user });
exports.logout = (req, res) => success(res, {}, 'Logged out');
