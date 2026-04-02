import React, { useState, useEffect, useRef } from 'react';
import { 
  Layout, 
  Input, 
  List, 
  Avatar, 
  Badge, 
  Button, 
  Space, 
  Card, 
  Dropdown, 
  ConfigProvider, 
  Typography,
  Divider,
  Segmented,
  Tooltip
} from 'antd';
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
  FileText,
  MapPin,
  Download,
  ExternalLink
} from 'lucide-react';

const { Header, Content, Sider, Footer } = Layout;
const { Text, Title } = Typography;
const { TextArea } = Input;

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
    { id: 103, type: 'location', locationName: "Central Park, NY", sender: "them", time: "10:28 AM", status: "read" },
    { id: 104, type: 'text', text: "Let's meet at 5!", sender: "them", time: "10:30 AM", status: "sent" },
  ],
  2: [
    { id: 201, type: 'text', text: "Team, we need to finalize the deck.", sender: "them", time: "9:00 AM", status: "read" },
    { id: 202, type: 'file', fileName: "Presentation_v2.pdf", fileSize: "2.4 MB", sender: "me", time: "9:45 AM", status: "read" },
  ]
};

// --- Sub-components ---

const MessageItem = ({ message }) => {
  const isMe = message.sender === "me";
  
  const renderContent = () => {
    switch (message.type) {
      case 'file':
        return (
          <Card 
            size="small" 
            style={{ 
              borderRadius: 12, 
              background: isMe ? 'rgba(255,255,255,0.1)' : '#f5f5f5', 
              border: 'none',
              minWidth: 200
            }}
          >
            <Space align="start">
              <div style={{ background: isMe ? '#fff' : '#4f46e5', padding: 8, borderRadius: 8, display: 'flex' }}>
                <FileText size={20} color={isMe ? '#4f46e5' : '#fff'} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text strong style={{ color: isMe ? '#fff' : 'inherit', fontSize: 13 }}>{message.fileName}</Text>
                <Text style={{ color: isMe ? '#e0e0e0' : 'gray', fontSize: 11 }}>{message.fileSize}</Text>
              </div>
              <Button 
                type="text" 
                icon={<Download size={14} color={isMe ? '#fff' : 'gray'} />} 
                size="small" 
              />
            </Space>
          </Card>
        );
      case 'location':
        return (
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e8e8e8', background: '#fff' }}>
            <div style={{ height: 100, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyCenter: 'center', position: 'relative' }}>
               <MapPin size={32} color="#4f46e5" style={{ zIndex: 1 }} />
               <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 0)', backgroundSize: '10px 10px' }} />
            </div>
            <div style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text style={{ fontSize: 10, display: 'block', color: 'gray', textTransform: 'uppercase' }}>Shared Location</Text>
                <Text strong style={{ fontSize: 12 }}>{message.locationName}</Text>
              </div>
              <ExternalLink size={14} color="#4f46e5" />
            </div>
          </div>
        );
      default:
        return <Text style={{ color: isMe ? '#fff' : 'inherit', fontSize: 14 }}>{message.text}</Text>;
    }
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', marginBottom: 16 }}>
      <div 
        style={{ 
          maxWidth: '75%', 
          padding: message.type === 'text' ? '8px 16px' : '4px',
          background: isMe ? '#4f46e5' : '#fff',
          borderRadius: 20,
          borderTopRightRadius: isMe ? 4 : 20,
          borderTopLeftRadius: isMe ? 20 : 4,
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
          position: 'relative'
        }}
      >
        {renderContent()}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4, marginTop: 4 }}>
          <Text style={{ fontSize: 10, color: isMe ? '#e0e0e0' : 'gray', opacity: 0.8 }}>{message.time}</Text>
          {isMe && (
            <span style={{ display: 'flex' }}>
              {message.status === 'read' ? <CheckCheck size={12} color="#e0e0e0" /> : <Check size={12} color="#e0e0e0" />}
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
  const [senderType, setSenderType] = useState("me");
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeId]);

  const activeContact:any = contacts.find(c => c.id === activeId) || contacts[0];
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

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    addMessage({ type: 'text', text: inputText });
    setInputText("");
  };

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

  const menuItems = [
    { key: '1', label: 'Profile', icon: <User size={14} /> },
    { key: '2', label: 'Settings', icon: <Settings size={14} /> },
    { key: '3', type: 'divider' },
    { key: '4', label: 'Logout', icon: <LogOut size={14} />, danger: true },
  ];

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4f46e5',
          borderRadius: 12,
        },
      }}
    >
      <Layout style={{ height: '100vh', background: '#f8fafc' }}>
        {/* Sider (Contacts) */}
        <Sider
          theme="light"
          width={320}
          breakpoint="lg"
          collapsedWidth="0"
          trigger={null}
          collapsible
          collapsed={!showSidebar}
          onCollapse={(collapsed) => setShowSidebar(!collapsed)}
          style={{ borderRight: '1px solid #e2e8f0' }}
        >
          <div style={{ height: 64, padding: '0 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
            <Title level={4} style={{ margin: 0 }}>Messages</Title>
          </div>
          
          <div style={{ padding: 16 }}>
            <Input 
              prefix={<Search size={16} color="gray" />} 
              placeholder="Search conversations..." 
              variant="filled"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <List
            className="contact-list-scroll"
            style={{ height: 'calc(100vh - 128px)', overflowY: 'auto' }}
            dataSource={filteredContacts}
            renderItem={(contact) => (
              <List.Item
                onClick={() => setActiveId(contact.id)}
                style={{ 
                  padding: '16px 20px', 
                  cursor: 'pointer', 
                  borderLeft: `4px solid ${activeId === contact.id ? '#4f46e5' : 'transparent'}`,
                  background: activeId === contact.id ? '#eff6ff' : 'transparent',
                  transition: '0.2s'
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Badge dot={contact.online} color="#22c55e" offset={[-4, 32]}>
                      <Avatar 
                        style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                        size={44}
                      >
                        {contact.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </Badge>
                  }
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong style={{ fontSize: 14 }}>{contact.name}</Text>
                      <Text style={{ fontSize: 11, color: 'gray' }}>{contact.time}</Text>
                    </div>
                  }
                  description={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text ellipsis style={{ fontSize: 12, maxWidth: 160 }}>{contact.lastMessage}</Text>
                      {contact.unread > 0 && <Badge count={contact.unread} size="small" />}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Sider>

        <Layout className="site-layout">
          {/* Header */}
          <Header style={{ 
            background: '#fff', 
            padding: '0 24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <Space size={16}>
              <Button 
                type="text" 
                icon={<Menu size={20} />} 
                onClick={() => setShowSidebar(!showSidebar)}
                className="sidebar-trigger"
              />
              <Badge dot={activeContact.online} color="#22c55e" offset={[-2, 28]}>
                <Avatar style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                  {activeContact.name.charAt(0).toUpperCase()}
                </Avatar>
              </Badge>
              <div style={{ lineHeight: 1 }}>
                <Text strong style={{ display: 'block' }}>{activeContact.name}</Text>
                <Text style={{ fontSize: 12, color: activeContact.online ? '#22c55e' : 'gray' }}>
                  {activeContact.online ? 'Online' : 'Offline'}
                </Text>
              </div>
            </Space>

            <Space>
              <Tooltip title="Voice Call"><Button type="text" shape="circle" icon={<Phone size={18} />} /></Tooltip>
              <Tooltip title="Video Call"><Button type="text" shape="circle" icon={<Video size={18} />} /></Tooltip>
              <Tooltip title="Contact Info"><Button type="text" shape="circle" icon={<Info size={18} />} /></Tooltip>
              <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                <Button type="text" shape="circle" icon={<MoreVertical size={18} />} />
              </Dropdown>
            </Space>
          </Header>

          {/* Messages Content */}
          <Content 
            style={{ 
              padding: '24px', 
              overflowY: 'auto', 
              background: '#f8fafc',
              backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
            ref={scrollRef}
          >
            <Divider plain style={{ fontSize: 11, color: '#94a3b8' }}>TODAY</Divider>
            {currentChatMessages.map(msg => <MessageItem key={msg.id} message={msg} />)}
          </Content>

          {/* Input Footer */}
          <Footer style={{ background: '#fff', padding: '16px 24px', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Segmented
                  size="small"
                  options={[
                    { label: 'Me', value: 'me' },
                    { label: activeContact.name, value: 'them' }
                  ]}
                  value={senderType}
                  onChange={setSenderType}
                />
                <Space>
                  <Button type="text" icon={<MapPin size={20} color="gray" />} onClick={() => addMessage({ type: 'location', locationName: "User's Location" })} />
                  <Button type="text" icon={<Paperclip size={20} color="gray" />} onClick={() => fileInputRef.current.click()} />
                </Space>
              </div>
              
              <div style={{ display: 'flex', gap: 12, alignItems: 'end' }}>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                <div style={{ flex: 1, position: 'relative' }}>
                  <TextArea 
                    placeholder="Type a message..." 
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    variant="filled"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onPressEnter={(e) => {
                      if (!e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    style={{ borderRadius: 16, paddingRight: 40 }}
                  />
                  <Button 
                    type="text" 
                    icon={<Smile size={20} color="gray" />} 
                    style={{ position: 'absolute', right: 8, bottom: 4 }}
                  />
                </div>
                <Button 
                  type="primary" 
                  shape="circle" 
                  size="large"
                  icon={<Send size={20} />} 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                />
              </div>
            </div>
          </Footer>
        </Layout>
      </Layout>

      <style>{`
        .contact-list-scroll::-webkit-scrollbar { width: 4px; }
        .contact-list-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .contact-list-scroll::-webkit-scrollbar-track { background: transparent; }
        
        @media (max-width: 991px) {
          .sidebar-trigger { display: flex !important; align-items: center; justify-content: center; }
        }
        @media (min-width: 992px) {
          .sidebar-trigger { display: none !important; }
        }
      `}</style>
    </ConfigProvider>
  );
}