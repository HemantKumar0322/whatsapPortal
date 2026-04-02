import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile, 
  Check, 
  CheckCheck, 
  Menu, 
  User, 
  Settings, 
  LogOut,
  Phone,
  Video,
  Info,
  ChevronLeft,
  FileText,
  MapPin,
  Download,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';

// --- Mock Data ---
const INITIAL_CONTACTS = [
  { id: 1, name: "Alice Johnson", lastMessage: "Let's meet at 5!", time: "10:30 AM", unread: 2, online: true },
  { id: 2, name: "Project Team", lastMessage: "The presentation is ready.", time: "9:45 AM", unread: 0, online: false },
  { id: 3, name: "Mom", lastMessage: "Did you eat lunch?", time: "Yesterday", unread: 0, online: true },
  { id: 4, name: "David Miller", lastMessage: "Check out this link.", time: "Monday", unread: 0, online: false },
  { id: 5, name: "Sarah Williams", lastMessage: "Thanks for the help!", time: "Sunday", unread: 0, online: false },
];

const INITIAL_MESSAGES = {
  1: [
    { id: 101, type: 'text', text: "Hey! How are you doing today?", sender: "them", time: "10:25 AM", status: "read" },
    { id: 102, type: 'text', text: "I'm doing great, just working on a new React project.", sender: "me", time: "10:26 AM", status: "read" },
    { id: 103, type: 'location', locationName: "Central Park, NY", lat: 40.7850, lng: -73.9682, sender: "them", time: "10:28 AM", status: "read" },
    { id: 104, type: 'text', text: "Let's meet at 5!", sender: "them", time: "10:30 AM", status: "sent" },
  ],
  2: [
    { id: 201, type: 'text', text: "Team, we need to finalize the deck.", sender: "them", time: "9:00 AM", status: "read" },
    { id: 202, type: 'file', fileName: "Presentation_v2.pdf", fileSize: "2.4 MB", sender: "me", time: "9:45 AM", status: "read" },
  ]
};

// --- Sub-components ---

const Avatar = ({ name, online, size = "md" }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <div className={`avatar-container avatar-${size}`}>
      <div className="avatar-circle">
        {initials}
      </div>
      {online && <span className="online-indicator" />}
    </div>
  );
};

const MessageItem = ({ message }) => {
  const isMe = message.sender === "me";
  
  const renderContent = () => {
    switch (message.type) {
      case 'file':
        return (
          <div className="file-attachment">
            <div className="file-icon-box">
              <FileText size={24} />
            </div>
            <div className="file-info">
              <div className="file-name">{message.fileName}</div>
              <div className="file-size">{message.fileSize}</div>
            </div>
            <button className="download-btn">
              <Download size={16} />
            </button>
          </div>
        );
      case 'location':
        return (
          <div className="location-attachment">
            <div className="location-map-placeholder">
              <MapPin size={32} color="#4f46e5" />
              <div className="map-grid"></div>
            </div>
            <div className="location-footer">
              <div className="location-details">
                <div className="loc-title">Shared Location</div>
                <div className="loc-name">{message.locationName}</div>
              </div>
              <ExternalLink size={14} className="loc-ext" />
            </div>
          </div>
        );
      default:
        return <p className="message-text">{message.text}</p>;
    }
  };
  
  return (
    <div className={`message-row ${isMe ? 'message-me' : 'message-them'}`}>
      <div className={`message-bubble bubble-${message.type || 'text'}`}>
        {renderContent()}
        <div className="message-meta">
          <span className="message-time">{message.time}</span>
          {isMe && (
            <span className="status-icon">
              {message.status === 'read' ? <CheckCheck size={12} /> : <Check size={12} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [activeId, setActiveId] = useState(1);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [senderType, setSenderType] = useState("me"); // "me" or "them"
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 1024);
  const [searchQuery, setSearchQuery] = useState("");
  
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeId]);

  const activeContact = contacts.find(c => c.id === activeId) || contacts[0];
  const currentChatMessages = messages[activeId] || [];

  const addMessage = (payload) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: Date.now(),
      sender: senderType,
      time,
      status: "sent",
      ...payload
    };

    setMessages(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMessage]
    }));

    setContacts(prev => prev.map(c => 
      c.id === activeId ? { 
        ...c, 
        lastMessage: payload.type === 'text' ? payload.text : `Shared a ${payload.type}`, 
        time: "Just now" 
      } : c
    ));
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    addMessage({ type: 'text', text: inputText });
    setInputText("");
  };

  const handleFileClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      addMessage({ 
        type: 'file', 
        fileName: file.name, 
        fileSize: (file.size / 1024 / 1024).toFixed(1) + ' MB' 
      });
    }
  };

  const handleShareLocation = () => {
    addMessage({ 
      type: 'location', 
      locationName: "Current Location", 
      lat: 0, 
      lng: 0 
    });
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <style>{`
        :root {
          --primary: #4f46e5;
          --primary-hover: #4338ca;
          --bg-main: #f8fafc;
          --bg-white: #ffffff;
          --border-color: #e2e8f0;
          --text-main: #1e293b;
          --text-muted: #64748b;
          --online: #22c55e;
          --sidebar-width: 320px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }

        .app-container {
          display: flex;
          height: 100vh;
          width: 100%;
          background: var(--bg-main);
          overflow: hidden;
        }

        /* Sidebar */
        .sidebar {
          width: var(--sidebar-width);
          background: var(--bg-white);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          z-index: 50;
          transition: transform 0.3s ease;
        }

        @media (max-width: 1024px) {
          .sidebar { position: fixed; inset: 0; width: 100%; transform: translateX(-100%); }
          .sidebar.active { transform: translateX(0); }
        }

        .sidebar-header {
          height: 64px; padding: 0 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color);
        }
        .brand { display: flex; align-items: center; gap: 12px; }
        .brand h1 { font-size: 1.25rem; font-weight: 700; }

        .search-container { padding: 16px; }
        .search-box { position: relative; width: 100%; }
        .search-box input {
          width: 100%; padding: 10px 12px 10px 40px; border-radius: 12px; border: none; background: #f1f5f9; font-size: 0.875rem; outline: none;
        }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }

        .contact-list { flex: 1; overflow-y: auto; }
        .contact-item {
          display: flex; align-items: center; gap: 12px; padding: 16px; cursor: pointer; border-left: 4px solid transparent; transition: background 0.2s;
        }
        .contact-item:hover { background: #f8fafc; }
        .contact-item.active { background: #eff6ff; border-left-color: var(--primary); }
        .contact-info { flex: 1; min-width: 0; }
        .contact-name { font-weight: 600; font-size: 0.875rem; }
        .contact-time { font-size: 0.75rem; color: var(--text-muted); }
        .last-msg { font-size: 0.75rem; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        /* Avatars */
        .avatar-container { position: relative; flex-shrink: 0; }
        .avatar-circle {
          border-radius: 50%; background: linear-gradient(135deg, #6366f1, #a855f7); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700;
        }
        .avatar-md { width: 48px; height: 48px; }
        .avatar-md .avatar-circle { width: 48px; height: 48px; }
        .avatar-sm { width: 32px; height: 32px; }
        .avatar-sm .avatar-circle { width: 32px; height: 32px; font-size: 0.75rem; }
        .online-indicator {
          position: absolute; bottom: 0; right: 0; width: 12px; height: 12px; background: var(--online); border: 2px solid white; border-radius: 50%;
        }

        /* Main Chat */
        .main-chat { flex: 1; display: flex; flex-direction: column; position: relative; min-width: 0; }
        .chat-header {
          height: 64px; background: white; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; padding: 0 24px;
        }
        .chat-user { display: flex; align-items: center; gap: 12px; }
        .chat-actions { display: flex; gap: 8px; }

        .message-feed {
          flex: 1; overflow-y: auto; padding: 24px; background-color: var(--bg-main); background-image: radial-gradient(#e2e8f0 1px, transparent 0); background-size: 24px 24px;
        }

        .message-row { display: flex; width: 100%; margin-bottom: 16px; animation: fadeIn 0.3s ease-out; }
        .message-me { justify-content: flex-end; }
        .message-them { justify-content: flex-start; }

        .message-bubble {
          max-width: 70%; padding: 10px 16px; border-radius: 18px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); position: relative;
        }
        .message-me .message-bubble { background: var(--primary); color: white; border-top-right-radius: 4px; }
        .message-them .message-bubble { background: white; color: var(--text-main); border-top-left-radius: 4px; border: 1px solid var(--border-color); }
        
        .bubble-file { padding: 8px; min-width: 240px; }
        .bubble-location { padding: 0; overflow: hidden; min-width: 240px; }

        .message-text { font-size: 0.9375rem; line-height: 1.5; word-wrap: break-word; }
        .message-meta { display: flex; justify-content: flex-end; align-items: center; gap: 4px; margin-top: 4px; }
        .message-time { font-size: 0.625rem; opacity: 0.7; }

        /* File UI */
        .file-attachment { display: flex; align-items: center; gap: 12px; background: rgba(0,0,0,0.05); padding: 10px; border-radius: 12px; }
        .message-me .file-attachment { background: rgba(255,255,255,0.15); }
        .file-icon-box { background: white; padding: 8px; border-radius: 8px; color: var(--primary); display: flex; }
        .file-info { flex: 1; min-width: 0; }
        .file-name { font-size: 0.875rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .file-size { font-size: 0.75rem; opacity: 0.8; }
        .download-btn { background: none; border: none; color: inherit; cursor: pointer; padding: 4px; border-radius: 4px; }
        .download-btn:hover { background: rgba(0,0,0,0.1); }

        /* Location UI */
        .location-map-placeholder { height: 120px; background: #eef2ff; position: relative; display: flex; align-items: center; justify-content: center; }
        .map-grid { position: absolute; inset: 0; background-image: linear-gradient(#d1d5db 1px, transparent 1px), linear-gradient(90deg, #d1d5db 1px, transparent 1px); background-size: 20px 20px; opacity: 0.3; }
        .location-footer { padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(0,0,0,0.05); }
        .loc-title { font-size: 0.625rem; text-transform: uppercase; font-weight: 700; opacity: 0.6; }
        .loc-name { font-size: 0.8125rem; font-weight: 600; }

        /* Footer & Sender Toggle */
        .chat-footer { padding: 16px; background: white; border-top: 1px solid var(--border-color); }
        .footer-tools { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        
        .sender-toggle { display: flex; background: #f1f5f9; padding: 3px; border-radius: 10px; }
        .toggle-btn { 
          padding: 6px 12px; border: none; background: none; font-size: 0.75rem; font-weight: 600; cursor: pointer; border-radius: 8px; transition: all 0.2s; color: var(--text-muted);
        }
        .toggle-btn.active { background: white; color: var(--primary); shadow: 0 1px 2px rgba(0,0,0,0.1); }

        .input-form { max-width: 900px; margin: 0 auto; display: flex; align-items: flex-end; gap: 12px; }
        .input-wrapper { flex: 1; background: #f1f5f9; border-radius: 20px; padding: 4px 12px; display: flex; align-items: center; }
        .input-wrapper textarea { flex: 1; border: none; background: transparent; padding: 10px 8px; outline: none; font-size: 0.875rem; resize: none; max-height: 120px; }
        
        .icon-btn { background: none; border: none; padding: 8px; border-radius: 50%; cursor: pointer; color: var(--text-muted); transition: background 0.2s; }
        .icon-btn:hover { background: #f1f5f9; }
        
        .send-btn { width: 44px; height: 44px; border-radius: 14px; background: var(--primary); color: white; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .send-btn:disabled { background: #cbd5e1; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Sidebar */}
      <aside className={`sidebar ${showSidebar ? 'active' : ''}`}>
        <div className="sidebar-header">
          <div className="brand"><h1>Messages</h1></div>
          <button className="icon-btn" onClick={() => setShowSidebar(false)}><ChevronLeft size={20} /></button>
        </div>
        <div className="search-container">
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>
        <div className="contact-list">
          {filteredContacts.map(contact => (
            <div key={contact.id} onClick={() => setActiveId(contact.id)} className={`contact-item ${activeId === contact.id ? 'active' : ''}`}>
              <Avatar name={contact.name} online={contact.online} />
              <div className="contact-info">
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-time">{contact.time}</span>
                </div>
                <div className="last-msg">{contact.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="main-chat">
        <header className="chat-header">
          <div className="chat-user">
            <button className="icon-btn" style={{marginRight:8}} onClick={() => setShowSidebar(true)}><Menu size={20} /></button>
            <Avatar name={activeContact.name} online={activeContact.online} size="sm" />
            <div>
              <h2 style={{fontSize:'1rem'}}>{activeContact.name}</h2>
              <span style={{fontSize:'0.75rem', color:'var(--online)'}}>{activeContact.online ? 'Online' : 'Offline'}</span>
            </div>
          </div>
          <div className="chat-actions">
            <button className="icon-btn"><Phone size={18} /></button>
            <button className="icon-btn"><Video size={18} /></button>
            <button className="icon-btn"><Info size={18} /></button>
          </div>
        </header>

        <div ref={scrollRef} className="message-feed">
          {currentChatMessages.map(msg => <MessageItem key={msg.id} message={msg} />)}
        </div>

        <footer className="chat-footer">
          <div className="footer-tools">
            <div className="sender-toggle">
              <button className={`toggle-btn ${senderType === 'me' ? 'active' : ''}`} onClick={() => setSenderType('me')}>Sending as Me</button>
              <button className={`toggle-btn ${senderType === 'them' ? 'active' : ''}`} onClick={() => setSenderType('them')}>Sending as {activeContact.name}</button>
            </div>
            <div style={{display:'flex', gap:4}}>
               <button type="button" className="icon-btn" onClick={handleShareLocation} title="Share Location"><MapPin size={20} /></button>
               <button type="button" className="icon-btn" onClick={handleFileClick} title="Share File"><Paperclip size={20} /></button>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="input-form">
            <input type="file" ref={fileInputRef} style={{display:'none'}} onChange={handleFileChange} />
            <div className="input-wrapper">
              <textarea 
                rows="1" placeholder="Type a message..." value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
              />
              <button type="button" className="icon-btn"><Smile size={20} /></button>
            </div>
            <button type="submit" disabled={!inputText.trim()} className="send-btn"><Send size={20} /></button>
          </form>
        </footer>
      </main>
    </div>
  );
}