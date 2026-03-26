const postService = require('../services/post.service');
const { success } = require('../utils/response');

exports.createPost = async (req, res, next) => { try { const post = await postService.createPost(req.user._id, req.body); success(res, { post }, 'Post created', 201); } catch (e) { next(e); } };
exports.getFeed = async (req, res, next) => { try { const posts = await postService.getFeed(req.user._id, req.query.page, req.query.limit); success(res, { posts }); } catch (e) { next(e); } };
exports.toggleLike = async (req, res, next) => { try { const data = await postService.toggleLike(req.params.id, req.user._id); success(res, data); } catch (e) { next(e); } };
exports.addComment = async (req, res, next) => { try { const comment = await postService.addComment(req.params.id, req.user._id, req.body.content); success(res, { comment }); } catch (e) { next(e); } };
exports.deletePost = async (req, res, next) => { try { await postService.deletePost(req.params.id, req.user._id); success(res, {}, 'Post deleted'); } catch (e) { next(e); } };
exports.searchPosts = async (req, res, next) => { try { const posts = await postService.searchPosts(req.query.q, req.query.page, req.query.limit); success(res, { posts }); } catch (e) { next(e); } };
