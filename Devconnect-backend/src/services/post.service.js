const Post = require('../models/Post.model');
const User = require('../models/User.model');
const ApiError = require('../utils/apiError');

const createPost = async (authorId, data) => {
  const post = await Post.create({ author: authorId, ...data });
  return post.populate('author', 'name avatar headline username');
};

const getFeed = async (userId, page = 1, limit = 20) => {
  const user = await User.findById(userId);
  const following = [...(user.following || []), userId];
  const posts = await Post.find({ author: { $in: following }, isActive: true, visibility: { $in: ['public', 'connections'] } })
    .populate('author', 'name avatar headline username')
    .populate('comments.author', 'name avatar username')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  return posts;
};

const toggleLike = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new ApiError('Post not found', 404);
  const liked = post.likes.includes(userId);
  if (liked) post.likes.pull(userId);
  else post.likes.push(userId);
  await post.save();
  return { liked: !liked, likesCount: post.likes.length };
};

const addComment = async (postId, userId, content) => {
  const post = await Post.findById(postId);
  if (!post) throw new ApiError('Post not found', 404);
  post.comments.push({ author: userId, content });
  await post.save();
  await post.populate('comments.author', 'name avatar username');
  return post.comments[post.comments.length - 1];
};

const deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new ApiError('Post not found', 404);
  if (post.author.toString() !== userId) throw new ApiError('Not authorized', 403);
  post.isActive = false;
  await post.save();
};

const searchPosts = async (query, page = 1, limit = 20) => {
  return Post.find({ $text: { $search: query }, isActive: true })
    .populate('author', 'name avatar headline username')
    .sort({ score: { $meta: 'textScore' } })
    .skip((page - 1) * limit)
    .limit(limit);
};

module.exports = { createPost, getFeed, toggleLike, addComment, deletePost, searchPosts };
