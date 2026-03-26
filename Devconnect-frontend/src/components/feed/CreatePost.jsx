'use client';
import { useState } from 'react';
import { Code2, Image, Tag } from 'lucide-react';
import Avatar from '@/components/shared/Avatar';
import useAuthStore from '@/store/authStore';
import useFeedStore from '@/store/feedStore';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function CreatePost() {
  const { user } = useAuthStore();
  const { addPost } = useFeedStore();
  const [content, setContent] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const payload = {
        content,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        ...(showCode && code ? { codeSnippet: { code, language } } : {}),
      };
      const { data } = await api.post('/posts', payload);
      addPost(data.data.post);
      setContent(''); setCode(''); setTags(''); setShowCode(false); setExpanded(false);
      toast.success('Post shared!');
    } catch { toast.error('Failed to create post'); }
    finally { setLoading(false); }
  };

  return (
    <div className="card p-5 mb-4">
      <div className="flex gap-3">
        <Avatar name={user?.name} src={user?.avatar} size={38} />
        <div className="flex-1">
          {!expanded ? (
            <button onClick={() => setExpanded(true)} className="w-full text-left px-4 py-2.5 bg-cream2 rounded-full text-sm text-ink3 hover:bg-cream4 transition-colors border border-ink/8">
              Share something with the community...
            </button>
          ) : (
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full min-h-[100px] resize-none text-sm bg-transparent border-none outline-none text-ink placeholder-ink3 leading-relaxed"
                placeholder="What's on your mind? Share code, insights, opportunities..."
                value={content}
                onChange={e => setContent(e.target.value)}
                autoFocus
              />
              {showCode && (
                <div className="mt-3 bg-ink rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                    <select value={language} onChange={e => setLanguage(e.target.value)}
                      className="bg-transparent text-cream2 text-xs border-none outline-none">
                      {['javascript','typescript','python','java','go','rust','cpp','css','html'].map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <textarea className="w-full bg-transparent text-cream2 font-mono text-xs p-4 outline-none resize-none min-h-[100px]"
                    placeholder="// Paste your code here..." value={code} onChange={e => setCode(e.target.value)} />
                </div>
              )}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink/6">
                <div className="flex gap-1">
                  <button type="button" onClick={() => setShowCode(!showCode)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${showCode ? 'bg-ink text-cream3' : 'text-ink3 hover:bg-ink/7 hover:text-ink'}`}>
                    <Code2 className="w-3.5 h-3.5" /> Code
                  </button>
                  <input className="text-xs py-1.5 px-3 rounded-lg w-36" placeholder="tags, react, node..." value={tags} onChange={e => setTags(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setExpanded(false)} className="btn-outline text-xs py-1.5 px-4">Cancel</button>
                  <button type="submit" disabled={loading || !content.trim()} className="btn-primary text-xs py-1.5 px-4 disabled:opacity-50">{loading ? 'Posting...' : 'Share'}</button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
