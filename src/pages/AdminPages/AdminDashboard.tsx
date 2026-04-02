import React from 'react';
import { Card, Row, Col, Space, Statistic } from 'antd';
import {
  UserOutlined,
  MessageOutlined,
  CommentOutlined,
  PhoneOutlined,
  FireOutlined,
  FileTextOutlined,
  TeamOutlined,
  FileOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { SimpleCard } from '@/components/uiPart';

const AdminDashboard: React.FC = () => {
  const statCards = [
    {
      title: 'Total Users',
      value: 4,
      icon: <UserOutlined />,
      color: '#87d068',
    },
    {
      title: 'Total Conversations',
      value: 14,
      icon: <CommentOutlined />,
      color: '#1890ff',
    },
    {
      title: 'Total Messages',
      value: 186,
      icon: <MessageOutlined />,
      color: '#52c41a',
    },
    {
      title: 'Total Contacts',
      value: 14,
      icon: <PhoneOutlined />,
      color: '#faad14',
    },
    {
      title: 'Active Today',
      value: 0,
      icon: <FireOutlined />,
      color: '#faad14',
    },
    {
      title: 'Pending Templates',
      value: 0,
      icon: <FileTextOutlined />,
      color: '#1890ff',
    },
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      icon: <TeamOutlined className="text-3xl text-green-500" />,
      bgColor: 'bg-green-50',
      link: '/user-management',
    },
    {
      title: 'Review Templates',
      icon: <FileOutlined className="text-3xl text-blue-500" />,
      bgColor: 'bg-blue-50',
      link: '/admin-templates',
    },
    {
      title: 'Affiliates',
      icon: <DashboardOutlined className="text-3xl text-green-500" />,
      bgColor: 'bg-green-50',
      link: '/affiliate',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 text-sm mt-1">System overview and management</p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[20, 20]} className="mb-8">
        {statCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card className="shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                  <Statistic
                    value={stat.value}
                    valueStyle={{ color: '#000', fontSize: '32px', fontWeight: 'bold' }}
                  />
                </div>
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                >
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <SimpleCard className='border border-gray-200 shadow-sm mb-8'>
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <DashboardOutlined className="text-green-500" />
          Quick Actions
        </h2>
        <Row gutter={[20, 20]}>
          {quickActions.map((action, index) => (
            <Col xs={24} sm={12} lg={12} key={index}>
              <Card
                className={`shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-200 ${action.bgColor}`}
                hoverable
              >
                <Space direction="vertical" size="large" className="w-full flex-row items-center justify-between">
                  <div className="flex justify-center">{action.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center">
                    {action.title}
                  </h3>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </SimpleCard>
    </div>
  );
};

export default AdminDashboard;
