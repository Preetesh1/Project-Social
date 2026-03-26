'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Avatar from '@/components/shared/Avatar';
import api from '@/lib/api';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Search() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('people');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    Promise.all([
      api.get(`/users/search?q=${q}`).then(r => setUsers(r.data.data.users)),
      api.get(`/posts/search?q=${q}`).then(r => setPosts(r.data.data.posts)),
    ]).catch(() => {}).finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="min-h-screen bg-cream3">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-[80px] px-4">
        <h2 className="font-serif text-2xl text-ink mb-1">Search results</h2>
        {q && <p className="text-sm text-ink3 mb-6">Showing results for "<span className="text-ink">{q}</span>"</p>}
        <div className="flex gap-1 mb-6 p-1 bg-cream2 rounded-xl w-fit">
          {['people', 'posts'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? 'bg-white text-ink shadow-sm' : 'text-ink3 hover:text-ink'}`}>{t}</button>
          ))}
        </div>
        {loading ? <div className="text-sm text-ink3">Searching...</div> : (
          tab === 'people' ? (
            <div className="space-y-3">
              {users.map(u => (
                <div key={u._id} className="card p-4 flex items-center gap-4">
                  <Avatar name={u.name} src={u.avatar} size={46} />
                  <div className="flex-1">
                    <Link href={`/profile/${u.username}`} className="text-sm font-medium text-ink hover:text-grove no-underline">{u.name}</Link>
                    <p className="text-xs text-ink3 mt-0.5">{u.headline}</p>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">{u.skills?.slice(0, 3).map(s => <span key={s} className="tag text-[10px]">{s}</span>)}</div>
                  </div>
                  <button onClick={() => { api.post(`/users/${u._id}/connect`); toast.success('Request sent!'); }} className="btn-outline text-xs py-1.5 px-4">Connect</button>
                </div>
              ))}
              {users.length === 0 && <p className="text-sm text-ink3">No developers found.</p>}
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map(p => (
                <div key={p._id} className="card p-4">
                  <div className="flex items-center gap-2 mb-2"><Avatar name={p.author?.name} src={p.author?.avatar} size={28} /><span className="text-sm font-medium text-ink">{p.author?.name}</span></div>
                  <p className="text-sm text-ink2 line-clamp-3">{p.content}</p>
                </div>
              ))}
              {posts.length === 0 && <p className="text-sm text-ink3">No posts found.</p>}
            </div>
          )
        )}
      </div>
    </div>
  );
}
