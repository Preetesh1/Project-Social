'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { getInitials } from '@/lib/utils';
import { Bell, MessageCircle, Search, LogOut, User, Settings } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout, initFromStorage } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { initFromStorage(); }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); router.push('/'); };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = isAuthenticated
    ? [{ href: '/feed', label: 'Feed' }, { href: '/search', label: 'Explore' }]
    : [{ href: '/', label: 'Home' }, { href: '/auth/login', label: 'Sign in' }];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[58px] flex items-center justify-between px-8 transition-all duration-300 ${scrolled ? 'border-b border-ink/10 bg-cream3/90 backdrop-blur-xl' : 'bg-cream3/60 backdrop-blur-sm'}`}>
      <Link href={isAuthenticated ? '/feed' : '/'} className="flex items-center gap-3 no-underline group">
        <svg width="26" height="26" viewBox="0 0 100 100" fill="none" className="text-ink group-hover:text-grove transition-colors duration-200">
          <circle cx="50" cy="38" r="28" stroke="currentColor" strokeWidth="4" fill="none"/>
          <line x1="50" y1="10" x2="50" y2="66" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <line x1="22" y1="22" x2="78" y2="54" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <line x1="22" y1="54" x2="78" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <path d="M35 66 C30 80 45 88 50 88 C55 88 70 80 65 66" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        </svg>
        <span className="font-serif text-[17px] text-ink tracking-tight">DevConnect</span>
      </Link>

      {isAuthenticated && (
        <div className="flex items-center flex-1 max-w-xs mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink3" />
            <input
              className="w-full pl-9 pr-4 py-2 text-sm rounded-full bg-cream2 border border-ink/10 focus:border-ink/30"
              placeholder="Search developers, posts..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <Link href="/messages" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-ink/7 transition-colors text-ink2 hover:text-ink relative">
              <MessageCircle className="w-[18px] h-[18px]" />
            </Link>
            <Link href="/feed" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-ink/7 transition-colors text-ink2 hover:text-ink relative">
              <Bell className="w-[18px] h-[18px]" />
            </Link>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-9 h-9 rounded-full bg-grove flex items-center justify-center text-cream3 text-xs font-semibold border-2 border-cream3 hover:border-grove2 transition-colors"
              >
                {getInitials(user?.name)}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-11 w-52 bg-white border border-ink/10 rounded-2xl shadow-xl overflow-hidden py-1.5" onClick={() => setDropdownOpen(false)}>
                  <div className="px-4 py-3 border-b border-ink/5">
                    <p className="text-sm font-medium text-ink">{user?.name}</p>
                    <p className="text-xs text-ink3 mt-0.5">@{user?.username}</p>
                  </div>
                  <Link href={`/profile/${user?.username}`} className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink2 hover:bg-ink/5 transition-colors">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink2 hover:bg-ink/5 transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="btn-outline text-sm py-2 px-4">Sign in</Link>
            <Link href="/auth/register" className="btn-primary text-sm py-2 px-4">Join free</Link>
          </>
        )}
      </div>
    </nav>
  );
}
