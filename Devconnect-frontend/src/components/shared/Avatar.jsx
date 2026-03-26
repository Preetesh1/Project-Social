import { getInitials } from '@/lib/utils';

const colors = ['bg-grove', 'bg-ink', 'bg-grove2', '#8A6A4A', '#4A3A5A'];

export default function Avatar({ name, src, size = 40, className = '' }) {
  const bg = colors[name?.charCodeAt(0) % colors.length] || 'bg-grove';
  if (src) {
    return <img src={src} alt={name} className={`rounded-full object-cover ${className}`} style={{ width: size, height: size }} />;
  }
  return (
    <div className={`rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0 ${typeof bg === 'string' && bg.startsWith('bg-') ? bg : ''} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.3, background: typeof bg === 'string' && !bg.startsWith('bg-') ? bg : undefined }}>
      {getInitials(name)}
    </div>
  );
}
