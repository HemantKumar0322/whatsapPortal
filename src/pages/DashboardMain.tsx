import React from 'react';
import {Row, Col, Statistic, Progress, List, Avatar, Tag, Space, Typography, } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import {  PageTitleWithDescription, SimpleCard, TitleCard } from '@/components/uiPart';

const { Text } = Typography;

const DashboardMain: React.FC = () => {

  // Mock data for dashboard
  const stats = {
    totalUsers: 11,
    totalOrders: 11,
    totalRevenue: 11,
    growthRate: 12.5,
    pendingOrders: 23,
    completedOrders: 789,
    cancelledOrders: 44
  };

  const statsConfig = [
    {
      title: "Active",
      value: stats.totalUsers,
      titleIcon: <UserOutlined />,
      icon: <UserOutlined />,
      color: "#3f8600",
      growth: `Total Conversations`,
      growthIcon: <RiseOutlined className="text-green-500 mr-1" />,
    },
    {
      title: "Saved",
      value: stats.totalOrders,
      titleIcon: <ShoppingCartOutlined />,
      icon: <ShoppingCartOutlined />,
      color: "#1890ff",
      growth: "Active Contacts",
      growthIcon: <RiseOutlined className="text-green-500 mr-1" />,
    },
    {
      title: "Needs attention",
      value: stats.totalRevenue,
      titleIcon: <DollarOutlined />,
      icon: <DollarOutlined />,
      color: "#722ed1",
      // suffix: "$",
      growth: "Unread Messages",
      growthIcon: <RiseOutlined className="text-green-500 mr-1" />,
    },
    {
      title: "Lifetime",
      value: stats.growthRate,
      titleIcon: <RiseOutlined />,
      icon: <RiseOutlined />,
      color: "#d3d3d3b6",
      suffix: "%",
      growth: "Total Messages",
      growthIcon: <FallOutlined className="text-red-500 mr-1" />,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'placed a new order',
      target: 'Event Logistics Package',
      time: '2 minutes ago',
      status: 'pending'
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'completed payment for',
      target: 'Shipping Services',
      time: '15 minutes ago',
      status: 'completed'
    },
    {
      id: 3,
      user: 'Bob Johnson',
      action: 'requested quote for',
      target: 'Custom Event Setup',
      time: '1 hour ago',
      status: 'pending'
    },
    {
      id: 4,
      user: 'Alice Brown',
      action: 'cancelled order',
      target: 'Basic Logistics',
      time: '2 hours ago',
      status: 'cancelled'
    },
    {
      id: 5,
      user: 'Charlie Wilson',
      action: 'updated profile information',
      target: '',
      time: '3 hours ago',
      status: 'completed'
    }
  ];

  const topServices = [
    { name: 'Event Logistics', orders: 234, revenue: 45600 },
    { name: 'Shipping Services', orders: 189, revenue: 38900 },
    { name: 'Custom Setup', orders: 156, revenue: 31200 },
    { name: 'Storage Solutions', orders: 98, revenue: 19600 },
    { name: 'Consultation', orders: 67, revenue: 13400 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'orange';
      case 'cancelled':
        return 'red';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined />;
      case 'pending':
        return <ClockCircleOutlined />;
      case 'cancelled':
        return <ExclamationCircleOutlined />;
      default:
        return <EyeOutlined />;
    }
  };




  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden">
      <div className="mb-6">
        <PageTitleWithDescription title="Dashboard" description="Welcome back! Here's what's happening today." />
      </div>

      {/* Main Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        {statsConfig.map((item, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <SimpleCard >
              <Statistic
                title={<div className="flex items-center justify-between space-x-2">
                  <span> {item.titleIcon}</span>
                  <span className={`bg-[#ffffff] px-1 rounded-full`}>
                    {item.title}
                  </span>
                </div>}
                value={item.value}
                prefix={item.icon}
                valueStyle={{ color: item.color }}
                suffix={item.suffix}
              />
              <div className="mt-2">
                <Text type="secondary">
                  {item.growthIcon}
                  {item.growth}
                </Text>
              </div>
            </SimpleCard>
          </Col>
        ))}
      </Row>

      {/* Order Status Progress */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <TitleCard title="Order Status Overview">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Text>Completed Orders</Text>
                  <Text strong>{stats.completedOrders}</Text>
                </div>
                <Progress
                  percent={Math.round((stats.completedOrders / stats.totalOrders) * 100)}
                  strokeColor="#52c41a"
                  showInfo={false}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <Text>Pending Orders</Text>
                  <Text strong>{stats.pendingOrders}</Text>
                </div>
                <Progress
                  percent={Math.round((stats.pendingOrders / stats.totalOrders) * 100)}
                  strokeColor="#faad14"
                  showInfo={false}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <Text>Cancelled Orders</Text>
                  <Text strong>{stats.cancelledOrders}</Text>
                </div>
                <Progress
                  percent={Math.round((stats.cancelledOrders / stats.totalOrders) * 100)}
                  strokeColor="#ff4d4f"
                  showInfo={false}
                />
              </div>
            </div>
          </TitleCard>
        </Col>
        <Col xs={24} lg={12}>
          <TitleCard title="Top Services">
            <List
              dataSource={topServices}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{index + 1}</Avatar>}
                    title={item.name}
                    description={`${item.orders} orders • $${item.revenue.toLocaleString()}`}
                  />
                  <div className="text-right">
                    <Text strong>${item.revenue.toLocaleString()}</Text>
                  </div>
                </List.Item>
              )}
            />
          </TitleCard>
        </Col>
      </Row>

      {/* Recent Activities */}
      <TitleCard title="Recent Activities" className="flex-1">
        <List
          dataSource={recentActivities}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={
                  <Space>
                    <Text strong>{item.user}</Text>
                    <Text>{item.action}</Text>
                    {item.target && <Text strong>{item.target}</Text>}
                  </Space>
                }
                description={
                  <Space>
                    <Text type="secondary">{item.time}</Text>
                    <Tag
                      color={getStatusColor(item.status)}
                      icon={getStatusIcon(item.status)}
                    >
                      {item.status}
                    </Tag>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </TitleCard>
    </div>
  );
};

export default DashboardMain; 