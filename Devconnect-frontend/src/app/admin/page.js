'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import api from '@/lib/api';
import Avatar from '@/components/shared/Avatar';
import toast from 'react-hot-toast';
import { Users, FileText, Activity } from 'lucide-react';

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/admin/stats').then(r => setStats(r.data.data.stats)),
      api.get('/admin/users').then(r => setUsers(r.data.data.users)),
    ]).catch(() => toast.error('Admin access required')).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-cream3">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-[80px] px-4">
        <h1 className="font-serif text-3xl text-ink mb-6">Admin panel</h1>
        {stats && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: Users, label: 'Total users', value: stats.totalUsers },
              { icon: FileText, label: 'Total posts', value: stats.totalPosts },
              { icon: Activity, label: 'Active (7d)', value: stats.activeUsers },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="card p-5">
                <div className="flex items-center gap-3 mb-2"><Icon className="w-4 h-4 text-ink3" /><span className="text-xs font-medium text-ink3 uppercase tracking-wide">{label}</span></div>
                <div className="font-serif text-3xl text-ink">{value}</div>
              </div>
            ))}
          </div>
        )}
        <div className="card p-5">
          <h2 className="font-serif text-lg text-ink mb-4">All users</h2>
          <div className="space-y-2">
            {users.map(u => (
              <div key={u._id} className="flex items-center gap-3 py-2.5 border-b border-ink/5 last:border-none">
                <Avatar name={u.name} src={u.avatar} size={36} />
                <div className="flex-1"><p className="text-sm font-medium text-ink">{u.name}</p><p className="text-xs text-ink3">@{u.username} · {u.email}</p></div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${u.isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>{u.isActive ? 'Active' : 'Suspended'}</span>
                <button onClick={() => { api.patch(`/admin/users/${u._id}/toggle`).then(() => { setUsers(prev => prev.map(p => p._id === u._id ? { ...p, isActive: !p.isActive } : p)); toast.success('Updated'); }); }}
                  className="text-xs btn-outline py-1 px-3">{u.isActive ? 'Suspend' : 'Restore'}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
