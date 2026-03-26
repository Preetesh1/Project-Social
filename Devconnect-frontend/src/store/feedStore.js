import { create } from 'zustand';

const useFeedStore = create((set, get) => ({
  posts: [],
  loading: false,
  page: 1,
  hasMore: true,

  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((s) => ({ posts: [post, ...s.posts] })),
  toggleLike: (postId, userId) => set((s) => ({
    posts: s.posts.map(p => p._id === postId
      ? { ...p, likes: p.likes.includes(userId) ? p.likes.filter(id => id !== userId) : [...p.likes, userId] }
      : p
    ),
  })),
  addComment: (postId, comment) => set((s) => ({
    posts: s.posts.map(p => p._id === postId ? { ...p, comments: [...p.comments, comment] } : p),
  })),
  setLoading: (loading) => set({ loading }),
}));

export default useFeedStore;
