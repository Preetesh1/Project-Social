'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import useAuthStore from '@/store/authStore';
import useFeedStore from '@/store/feedStore';
import Navbar from '@/components/layout/Navbar';
import PostCard from '@/components/feed/PostCard';
import CreatePost from '@/components/feed/CreatePost';
import Avatar from '@/components/shared/Avatar';
import api from '@/lib/api';
import { LayoutDashboard, Users, Bookmark, Bell, TrendingUp } from 'lucide-react';

export default function Feed() {
  const { user, isAuthenticated, initFromStorage } = useAuthStore();
  const { posts, setPosts, setLoading, loading } = useFeedStore();
  const router = useRouter();

  useEffect(() => {
    initFromStorage();
    if (!isAuthenticated) { router.push('/auth/login'); return; }
    fetchFeed();
  }, [isAuthenticated]);

  const fetchFeed = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/posts/feed');
      setPosts(data.data.posts);
    } catch {}
    finally { setLoading(false); }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-cream3">
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#3D3D38', color: '#F4F3EE', fontSize: '13px', borderRadius: '10px' } }} />
      <Navbar />
      <div className="max-w-[1080px] mx-auto pt-[74px] px-4 grid grid-cols-[220px_1fr_260px] gap-5">

        <aside className="sticky top-[74px] h-fit">
          <div className="card p-4 mb-3">
            <div className="text-center pb-4 border-b border-ink/6 mb-4">
              <Avatar name={user?.name} src={user?.avatar} size={52} className="mx-auto mb-3" />
              <Link href={`/profile/${user?.username}`} className="text-sm font-medium text-ink hover:text-grove no-underline">{user?.name}</Link>
              <p className="text-xs text-ink3 mt-1">{user?.headline || 'Developer'}</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-cream2 rounded-lg py-1.5 text-center"><div className="text-sm font-semibold text-ink">{user?.connections?.length || 0}</div><div className="text-[10px] text-ink3">Connections</div></div>
                <div className="bg-cream2 rounded-lg py-1.5 text-center"><div className="text-sm font-semibold text-ink">0</div><div className="text-[10px] text-ink3">Posts</div></div>
              </div>
            </div>
            <nav className="space-y-0.5">
              {[
                { icon: LayoutDashboard, label: 'Feed', href: '/feed' },
                { icon: Users, label: 'Connections', href: '/feed' },
                { icon: Bookmark, label: 'Saved', href: '/feed' },
                { icon: Bell, label: 'Notifications', href: '/feed' },
              ].map(({ icon: Icon, label, href }) => (
                <Link key={label} href={href} className="sidebar-item">
                  <Icon className="w-4 h-4" /> {label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <main>
          <CreatePost />
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="card p-5 animate-pulse"><div className="flex gap-3"><div className="w-10 h-10 rounded-full bg-cream2" /><div className="flex-1 space-y-2"><div className="h-3 bg-cream2 rounded w-1/3" /><div className="h-2 bg-cream2 rounded w-1/4" /></div></div><div className="mt-4 space-y-2"><div className="h-3 bg-cream2 rounded" /><div className="h-3 bg-cream2 rounded w-5/6" /></div></div>)}
            </div>
          ) : posts.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="font-serif text-xl text-ink mb-2">Your feed is quiet.</p>
              <p className="text-sm text-ink3">Connect with developers to see their posts here.</p>
              <Link href="/search" className="btn-primary inline-block mt-4 text-sm">Discover people →</Link>
            </div>
          ) : (
            posts.map(post => <PostCard key={post._id} post={post} />)
          )}
        </main>

        <aside className="sticky top-[74px] h-fit space-y-3">
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3"><TrendingUp className="w-3.5 h-3.5 text-ink3" /><span className="text-[10px] font-semibold text-ink3 uppercase tracking-wider">Trending</span></div>
            {['#SystemDesign', '#ReactJS', '#OpenSource', '#MLOps', '#DevOps'].map((tag, i) => (
              <div key={tag} className="flex items-center gap-2.5 py-2 border-b border-ink/5 last:border-none cursor-pointer hover:text-grove transition-colors">
                <span className="text-[10px] text-ink4 w-4">{i + 1}</span>
                <div><div className="text-xs font-medium text-ink">{tag}</div><div className="text-[10px] text-ink3 mt-0.5">{[1200, 890, 670, 510, 410][i]} posts</div></div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
