'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  const { isAuthenticated, initFromStorage } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initFromStorage();
    if (isAuthenticated) router.push('/feed');
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-cream3">
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center px-6 pt-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[image:radial-gradient(rgba(61,61,56,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-grove/5 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-ink/4 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-ink/10 bg-white/60 rounded-full px-4 py-2 text-xs font-medium text-ink2 mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-grove2 animate-pulse" />
            12,000+ developers · Join free
          </div>
          <h1 className="font-serif text-[clamp(44px,7vw,80px)] leading-[1.05] tracking-tight text-ink mb-6 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Where developers<br /><em className="text-grove not-italic">find their people.</em>
          </h1>
          <p className="text-[17px] text-ink2 leading-relaxed mb-10 max-w-lg mx-auto animate-fade-up font-light" style={{ animationDelay: '0.2s', opacity: 0 }}>
            Share your work, discover talent, grow your network. The professional space built for the way developers actually think.
          </p>
          <div className="flex gap-3 justify-center flex-wrap animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <Link href="/auth/register" className="btn-primary py-3 px-8 text-[15px]">Build your profile →</Link>
            <Link href="/auth/login" className="btn-outline py-3 px-8 text-[15px]">Sign in</Link>
          </div>
          <div className="flex gap-0 justify-center mt-16 border border-ink/10 rounded-2xl bg-white/50 overflow-hidden max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            {[['12k+', 'Developers'], ['48k+', 'Posts shared'], ['3.2k+', 'Connections'], ['94%', 'Satisfaction']].map(([n, l], i) => (
              <div key={l} className={`flex-1 py-5 text-center ${i < 3 ? 'border-r border-ink/10' : ''}`}>
                <div className="font-serif text-2xl text-ink">{n}</div>
                <div className="text-xs text-ink3 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
