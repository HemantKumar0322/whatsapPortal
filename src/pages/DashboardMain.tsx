import React from 'react';
import {Row, Col, List, Avatar, Tag, Space, Typography, Button } from 'antd';
import {
  UserOutlined,
  MessageOutlined,
  BellOutlined,
  CheckCircleOutlined,
  LinkOutlined,
  ChromeOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

import {  PageTitleWithDescription, SimpleCard, TitleCard } from '@/components/uiPart';

const { Text } = Typography;

const DashboardMain: React.FC = () => {

  // Mock data for dashboard
  const stats = {
    totalConversations: 14,
    activeContacts: 14,
    unreadMessages: 0,
    totalMessages: 189,
  };

  const statusIndicators = [
    { label: 'ACCOUNT STATUS', value: 'CONNECTED', color: '#52c41a' },
    { label: 'QUALITY RATING', value: 'GREEN', color: '#52c41a' },
    { label: 'DAILY MESSAGING LIMIT', value: '2,000/day', color: '#1890ff' },
  ];

  const statsConfig = [
    {
      title: "Active",
      value: stats.totalConversations,
      icon: <MessageOutlined />,
      color: "#1890ff",
      growth: "Total Conversations",
    },
    {
      title: "Saved",
      value: stats.activeContacts,
      icon: <UserOutlined />,
      color: "#1890ff",
      growth: "Active Contacts",
    },
    {
      title: "Needs attention",
      value: stats.unreadMessages,
      icon: <BellOutlined />,
      color: "#ff7a45",
      growth: "Unread Messages",
    },
    {
      title: "Lifetime",
      value: stats.totalMessages,
      icon: <CheckCircleOutlined />,
      color: "#95de64",
      growth: "Total Messages",
    },
  ];

  const growthTools = [
    {
      id: 1,
      title: 'Customize WhatsApp Link',
      description: 'Create shareable links & QR for your WA business number',
      icon: <LinkOutlined className="text-2xl text-blue-500" />,
    },
    {
      id: 2,
      title: 'WhatsApp Website Button',
      description: 'Drive WhatsApp sales with personalised CTAs',
      icon: <ChromeOutlined className="text-2xl text-green-500" />,
    },
  ];

  const recentConversations = [
    {
      id: 1,
      name: 'Harsh',
      initials: 'HA',
      time: 'less than a minute ago',
      online: true
    },
    {
      id: 2,
      name: 'samet Kahraman',
      initials: 'SA',
      time: '1 minute ago',
      online: true
    },
    {
      id: 3,
      name: 'Aditya',
      initials: 'AD',
      time: '5 days ago',
      online: false
    },
    {
      id: 4,
      name: 'Dinesh Tank',
      initials: 'DI',
      time: '5 days ago',
      online: false
    },
    {
      id: 5,
      name: 'Anukul Dhuriya',
      initials: 'AN',
      time: '5 days ago',
      online: false
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Send broadcast message',
      description: 'Reach all contacts at once',
      icon: <MessageOutlined />,
    },
    {
      id: 2,
      title: 'Create auto-response',
      description: 'Set up automated replies',
      icon: <CheckCircleOutlined />,
    },
    {
      id: 3,
      title: 'Add new template',
      description: 'Create message templates',
      icon: <CheckCircleOutlined />,
    },
    {
      id: 4,
      title: 'Export conversations',
      description: 'Download chat history',
      icon: <CheckCircleOutlined />,
    },
  ];




  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden">
      <div className="mb-6 bg-white p-4 rounded">
        <PageTitleWithDescription title="Dashboard" description="Welcome back! Here's what's happening today." />
      </div>

      {/* Status Indicators */}
      <Row gutter={[24, 16]} className="mb-6 bg-white p-4 rounded">
        {statusIndicators.map((indicator, index) => (
          <Col xs={24} sm={8} key={index}>
            <div className="flex items-center gap-3">
              <Text type="secondary" className="text-xs font-semibold">{indicator.label}</Text>
              <Tag color={indicator.color} style={{ marginRight: 0 }}>
                {indicator.value}
              </Tag>
            </div>
          </Col>
        ))}
      </Row>

      {/* Main Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        {statsConfig.map((item, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <SimpleCard>
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <Text type="secondary" className="text-xs font-semibold">{item.title}</Text>
                  <span className="text-lg opacity-40">{item.icon}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <Text strong className="text-2xl" style={{ color: item.color }}>
                    {item.value}
                  </Text>
                </div>
                <Text type="secondary" className="text-xs mt-2">
                  {item.growth}
                </Text>
              </div>
            </SimpleCard>
          </Col>
        ))}
      </Row>

      {/* Growth Tools */}
      <div className="mb-6">
        <Text strong className="text-base">Growth Tools</Text>
      </div>
      <Row gutter={[16, 16]} className="mb-6">
        {growthTools.map((tool) => (
          <Col xs={24} sm={12} lg={12} key={tool.id}>
            <SimpleCard className="cursor-pointer hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex flex-col flex-1">
                  <Text strong className="mb-1">{tool.title}</Text>
                  <Text type="secondary" className="text-sm">{tool.description}</Text>
                </div>
                <Button type="text" icon={<ArrowRightOutlined />} />
              </div>
            </SimpleCard>
          </Col>
        ))}
      </Row>

      {/* Recent Conversations and Quick Actions */}
      <Row gutter={[16, 16]} className="flex-1">
        <Col xs={24} lg={14}>
          <TitleCard title="Recent Conversations" className="h-full">
            <List
              dataSource={recentConversations}
              renderItem={(item) => (
                <List.Item className="cursor-pointer hover:bg-gray-50 px-2 py-3 rounded">
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        style={{ backgroundColor: '#1890ff' }}
                        icon={<UserOutlined />}
                      >
                        {item.name.slice(0, 2).toUpperCase()}
                      </Avatar>
                    }
                    title={
                      <Space>
                        <Text strong>{item.name}</Text>
                        {item.online && (
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                      </Space>
                    }
                    description={<Text type="secondary" className="text-xs">{item.time}</Text>}
                  />
                  <Text>Click to view message</Text>
                </List.Item>
              )}
            />
          </TitleCard>
        </Col>

        <Col xs={24} lg={10}>
          <TitleCard title="Quick Actions" className="h-full">
            <Space direction="vertical" className="w-full" size="large">
              {quickActions.map((action) => (
                <div 
                  key={action.id}
                  className="p-3 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-lg mt-1">{action.icon}</div>
                    <div className="flex-1">
                      <Text strong className="block text-sm">{action.title}</Text>
                      <Text type="secondary" className="text-xs">{action.description}</Text>
                    </div>
                  </div>
                </div>
              ))}
            </Space>
          </TitleCard>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardMain; 