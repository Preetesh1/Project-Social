'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      setAuth(data.data.user, data.data.token);
      toast.success('Welcome to DevConnect!');
      router.push('/feed');
    } catch (err) { toast.error(err.response?.data?.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-cream3 flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none" className="text-ink">
              <circle cx="50" cy="38" r="28" stroke="currentColor" strokeWidth="4" fill="none"/>
              <line x1="50" y1="10" x2="50" y2="66" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <line x1="22" y1="22" x2="78" y2="54" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <line x1="22" y1="54" x2="78" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M35 66 C30 80 45 88 50 88 C55 88 70 80 65 66" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <h1 className="font-serif text-2xl text-ink">Join DevConnect</h1>
          <p className="text-sm text-ink3 mt-1">Build your developer presence</p>
        </div>
        <div className="card p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="text-xs font-medium text-ink2 block mb-1.5">Full name</label>
              <input type="text" placeholder="Preetesh Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
            <div><label className="text-xs font-medium text-ink2 block mb-1.5">Email</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
            <div><label className="text-xs font-medium text-ink2 block mb-1.5">Password</label>
              <input type="password" placeholder="Min 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} /></div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm disabled:opacity-60 mt-2">{loading ? 'Creating account...' : 'Create account'}</button>
          </form>
        </div>
        <p className="text-center text-sm text-ink3 mt-5">Already a member? <Link href="/auth/login" className="text-grove font-medium no-underline">Sign in →</Link></p>
      </div>
    </div>
  );
}
