import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Tabs, Table, Tag, Button, Space, Tooltip, message } from 'antd';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { PageTitle } from '../../components/PageTitle';

interface SubscriptionRecord {
  key: string;
  user: string;
  plan: string;
  status: 'active' | 'expiring' | 'expired';
  usage: string;
  expires: string;
}

const Subscriptions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [subscriptions, setSubscriptions] = useState<SubscriptionRecord[]>([]);

  const handleDeleteSubscription = (key: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.key !== key));
    message.success('Subscription deleted successfully');
  };

  const subscriptionColumns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      width: '25%',
      render: (user: string) => <span>{user}</span>,
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
      width: '18%',
      render: (plan: string) => <span className="font-medium">{plan}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => {
        const statusColors: { [key: string]: string } = {
          active: 'green',
          expiring: 'orange',
          expired: 'red',
        };
        return (
          <Tag color={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        );
      },
    },
    {
      title: 'Usage',
      dataIndex: 'usage',
      key: 'usage',
      width: '15%',
      render: (usage: string) => <span>{usage}</span>,
    },
    {
      title: 'Expires',
      dataIndex: 'expires',
      key: 'expires',
      width: '15%',
      render: (expires: string) => <span>{expires}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '12%',
      render: (_: string, record: SubscriptionRecord) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Button type="text" size="small" icon={<InfoCircleOutlined />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteSubscription(record.key)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      description: 'Basic plan for getting started',
      price: '0',
      currency: '₹',
      period: '/month',
      messages: '100',
      contacts: '50',
      features: ['Basic messaging', 'Up to 50 contacts'],
    },
    {
      name: 'Starter',
      description: 'For small businesses',
      price: '499',
      currency: '₹',
      period: '/month',
      messages: '1,000',
      contacts: '500',
      features: ['1000 messages/month', '500 contacts', 'Broadcast campaigns', 'Scheduled messages'],
    },
    {
      name: 'Professional',
      description: 'For growing businesses',
      price: '1699',
      currency: '₹',
      period: '/month',
      messages: '5,000',
      contacts: '2,000',
      features: ['5000 messages/month', '2000 contacts', 'Advanced analytics', 'Priority support', 'Segment campaigns'],
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: '4999',
      currency: '₹',
      period: '/month',
      messages: '50,000',
      contacts: '10,000',
      features: [
        '50000 messages/month',
        '10000 contacts',
        'Dedicated support',
        'Custom integrations',
        'API access',
      ],
    },
  ];

  const tabItems = [
    {
      key: 'all',
      label: 'All Subscriptions',
      children: (
        <Table
          columns={subscriptionColumns}
          dataSource={subscriptions}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} subscriptions`,
          }}
          size="middle"
          locale={{
            emptyText: 'No subscriptions found',
          }}
        />
      ),
    },
    {
      key: 'active',
      label: 'Active',
      children: (
        <Table
          columns={subscriptionColumns}
          dataSource={subscriptions.filter(sub => sub.status === 'active')}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} active subscriptions`,
          }}
          size="middle"
          locale={{
            emptyText: 'No active subscriptions',
          }}
        />
      ),
    },
    {
      key: 'expired',
      label: 'Expired',
      children: (
        <Table
          columns={subscriptionColumns}
          dataSource={subscriptions.filter(sub => sub.status === 'expired')}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} expired subscriptions`,
          }}
          size="middle"
          locale={{
            emptyText: 'No expired subscriptions',
          }}
        />
      ),
    },
    {
      key: 'plans',
      label: 'Manage Plans',
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition-shadow"
              hoverable
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.currency}{plan.price}</span>
                <span className="text-gray-500 ml-1">{plan.period}</span>
              </div>
              <div className="mb-6 pb-6 border-b">
                <p className="text-sm text-gray-600 mb-2">
                  Messages: <span className="font-semibold">{plan.messages}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Contacts: <span className="font-semibold">{plan.contacts}</span>
                </p>
              </div>
              <div className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </p>
                ))}
              </div>
              {/* <Button type="primary" block>
                Select Plan
              </Button> */}
            </Card>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
        <PageTitle title="Subscription Management" />
        <p className="text-gray-500">Monitor and manage user subscriptions</p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <div className="flex items-center gap-4">
              <div className="text-3xl">👤</div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Active Subscriptions</div>
                <div className="flex items-center gap-2">
                  <Statistic value={0} suffix="" />
                  <span className="text-xs text-green-500 font-medium">0 active</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <div className="flex items-center gap-4">
              <div className="text-3xl">⏱️</div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Expiring Soon</div>
                <div className="flex items-center gap-2">
                  <Statistic value={0} suffix="" />
                  <span className="text-xs text-orange-500 font-medium">All good</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <div className="flex items-center gap-4">
              <div className="text-3xl">📋</div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Expired</div>
                <div className="flex items-center gap-2">
                  <Statistic value={0} suffix="" />
                  <span className="text-xs text-gray-400 font-medium">None</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <div className="flex items-center gap-4">
              <div className="text-3xl">💰</div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Monthly Revenue</div>
                <div className="flex items-center gap-2">
                  <Statistic value={0} prefix="₹" suffix="" />
                  <span className="text-xs text-green-500 font-medium">This month</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tabs Section */}
      <Card className="shadow-sm">
        <Tabs
          items={tabItems}
          activeKey={activeTab}
          onChange={setActiveTab}
        />
      </Card>
    </div>
  );
};

export default Subscriptions;
