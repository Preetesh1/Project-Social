'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import Avatar from '@/components/shared/Avatar';
import { formatDate } from '@/lib/utils';
import api from '@/lib/api';
import useAuthStore from '@/store/authStore';
import useFeedStore from '@/store/feedStore';
import toast from 'react-hot-toast';

export default function PostCard({ post }) {
  const { user } = useAuthStore();
  const { toggleLike, addComment } = useFeedStore();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const liked = post.likes?.includes(user?._id);

  const handleLike = async () => {
    try {
      toggleLike(post._id, user._id);
      await api.post(`/posts/${post._id}/like`);
    } catch { toast.error('Failed to like post'); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await api.post(`/posts/${post._id}/comment`, { content: commentText });
      addComment(post._id, data.data.comment);
      setCommentText('');
      toast.success('Comment added');
    } catch { toast.error('Failed to comment'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="card p-5 mb-4 hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden group">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-grove scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      <div className="flex items-start gap-3 mb-4">
        <Link href={`/profile/${post.author?.username}`}>
          <Avatar name={post.author?.name} src={post.author?.avatar} size={40} />
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/profile/${post.author?.username}`} className="font-medium text-ink text-sm hover:text-grove transition-colors no-underline">
            {post.author?.name}
          </Link>
          <p className="text-xs text-ink3 mt-0.5">{post.author?.headline}</p>
          <p className="text-xs text-ink4 mt-0.5">{formatDate(post.createdAt)}</p>
        </div>
      </div>

      <p className="text-[14px] text-ink2 leading-relaxed mb-3 whitespace-pre-wrap">{post.content}</p>

      {post.codeSnippet?.code && (
        <div className="bg-ink rounded-xl p-4 mb-3 overflow-x-auto">
          <p className="text-xs text-ink3 mb-2 font-mono">{post.codeSnippet.language}</p>
          <pre className="text-xs text-cream2 font-mono leading-relaxed">{post.codeSnippet.code}</pre>
        </div>
      )}

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.map(t => <span key={t} className="tag">#{t}</span>)}
        </div>
      )}

      <div className="flex items-center gap-1 pt-3 border-t border-ink/6">
        <button onClick={handleLike} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${liked ? 'text-grove bg-grove/10' : 'text-ink3 hover:bg-ink/7 hover:text-ink'}`}>
          <Heart className={`w-[14px] h-[14px] ${liked ? 'fill-grove' : ''}`} />
          {post.likes?.length || 0}
        </button>
        <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-ink3 hover:bg-ink/7 hover:text-ink transition-all">
          <MessageCircle className="w-[14px] h-[14px]" />
          {post.comments?.length || 0}
        </button>
        <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-ink3 hover:bg-ink/7 hover:text-ink transition-all">
          <Share2 className="w-[14px] h-[14px]" />
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-3">
          {post.comments?.map((c, i) => (
            <div key={i} className="flex gap-2">
              <Avatar name={c.author?.name} src={c.author?.avatar} size={28} />
              <div className="flex-1 bg-cream2 rounded-xl px-3 py-2">
                <span className="text-xs font-medium text-ink">{c.author?.name}</span>
                <p className="text-xs text-ink2 mt-0.5">{c.content}</p>
              </div>
            </div>
          ))}
          <form onSubmit={handleComment} className="flex gap-2 pt-2">
            <Avatar name={user?.name} src={user?.avatar} size={28} />
            <input className="flex-1 text-xs py-2 px-3 rounded-full" placeholder="Add a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} />
            <button type="submit" disabled={submitting} className="btn-primary text-xs py-1.5 px-4">Post</button>
          </form>
        </div>
      )}
    </div>
  );
}
