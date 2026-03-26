'use client';
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Avatar from '@/components/shared/Avatar';
import useAuthStore from '@/store/authStore';
import api from '@/lib/api';
import { connectSocket } from '@/lib/socket';
import { formatDate } from '@/lib/utils';
import { Send } from 'lucide-react';

export default function Messages() {
  const { user, initFromStorage } = useAuthStore();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    initFromStorage();
    api.get('/chats').then(r => setChats(r.data.data.chats));
    socketRef.current = connectSocket();
    socketRef.current.on('chat:message', (msg) => setMessages(prev => [...prev, msg]));
    return () => socketRef.current?.off('chat:message');
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const openChat = async (chat) => {
    setActiveChat(chat);
    const { data } = await api.get(`/chats/${chat.participants.find(p => p._id !== user?._id)?._id}`);
    setMessages(data.data.chat.messages || []);
    socketRef.current?.emit('chat:join', { chatId: data.data.chat._id });
  };

  const sendMsg = () => {
    if (!input.trim() || !activeChat) return;
    socketRef.current?.emit('chat:message', { chatId: activeChat._id, content: input });
    setInput('');
  };

  const other = (chat) => chat.participants?.find(p => p._id !== user?._id);

  return (
    <div className="min-h-screen bg-cream3">
      <Navbar />
      <div className="max-w-[1000px] mx-auto pt-[74px] px-4 h-screen pb-4">
        <div className="h-full flex border border-ink/8 rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm">
          <div className="w-72 border-r border-ink/8 flex flex-col">
            <div className="p-4 border-b border-ink/8"><h2 className="font-serif text-base text-ink">Messages</h2></div>
            <div className="flex-1 overflow-y-auto">
              {chats.length === 0 ? <p className="text-xs text-ink3 text-center mt-8">No conversations yet.</p> : chats.map(chat => (
                <div key={chat._id} onClick={() => openChat(chat)} className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-ink/5 ${activeChat?._id === chat._id ? 'bg-grove/8' : 'hover:bg-cream2/50'}`}>
                  <Avatar name={other(chat)?.name} src={other(chat)?.avatar} size={38} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{other(chat)?.name}</p>
                    <p className="text-xs text-ink3 truncate mt-0.5">{chat.lastMessage?.content || 'Start a conversation'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            {activeChat ? (
              <>
                <div className="p-4 border-b border-ink/8 flex items-center gap-3">
                  <Avatar name={other(activeChat)?.name} src={other(activeChat)?.avatar} size={34} />
                  <div><p className="text-sm font-medium text-ink">{other(activeChat)?.name}</p><p className="text-xs text-grove2">Online</p></div>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {messages.map((m, i) => {
                    const isMe = m.sender?._id === user?._id || m.sender === user?._id;
                    return (
                      <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[65%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMe ? 'bg-ink text-cream3 rounded-br-sm' : 'bg-cream2 text-ink rounded-bl-sm'}`}>{m.content}</div>
                      </div>
                    );
                  })}
                  <div ref={bottomRef} />
                </div>
                <div className="p-4 border-t border-ink/8 flex gap-3 items-center">
                  <input className="flex-1 rounded-full py-2.5" placeholder="Write a message..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} />
                  <button onClick={sendMsg} className="w-10 h-10 bg-ink rounded-full flex items-center justify-center hover:bg-grove transition-colors flex-shrink-0">
                    <Send className="w-4 h-4 text-cream3" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center"><div className="text-center"><p className="font-serif text-xl text-ink mb-2">Your messages</p><p className="text-sm text-ink3">Select a conversation to start chatting.</p></div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
