import React, { useState } from 'react';
import { Row, Col, Table, Button, Empty, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { PageTitleWithDescription, SimpleCard } from '@/components/uiPart';
import ButtonSimple from '@/components/ButtonSimple';
import CreateCampaignModal, { CampaignData } from '@/container/CreateCampaignModal';

import { PlusOutlined, ImportOutlined } from '@ant-design/icons';

const Campaigns: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);

  // Stats data
  const stats = [
    {
      title: 'Total Campaigns',
      value: campaigns.length,
      icon: '📌',
    },
    {
      title: 'Active Campaigns',
      value: campaigns.filter((c) => c.status === 'Active').length,
      icon: '📊',
    },
    {
      title: 'Daily Budget',
      value: `₹${campaigns.reduce((sum, c) => sum + c.dailyBudget, 0).toFixed(2)}`,
      icon: 'ℹ️',
    },
    {
      title: 'Account Balance',
      value: '₹0.03',
      icon: 'ℹ️',
    },
  ];

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCreateCampaign = (data: Omit<CampaignData, 'id' | 'status' | 'createdAt'>) => {
    const newCampaign: CampaignData = {
      ...data,
      id: `campaign_${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toLocaleString(),
    };
    setCampaigns([...campaigns, newCampaign]);
    setIsModalVisible(false);
    message.success('Campaign created successfully!');
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    message.success('Campaign deleted successfully');
  };

  const columns = [
    {
      title: 'Campaign Name',
      dataIndex: 'campaignName',
      key: 'campaignName',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Objective',
      dataIndex: 'objective',
      key: 'objective',
      render: (text: string) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: 'Daily Budget',
      dataIndex: 'dailyBudget',
      key: 'dailyBudget',
      render: (value: number) => <span className="font-semibold">₹{value.toFixed(2)}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusColor = {
          Active: 'bg-green-100 text-green-700',
          Paused: 'bg-yellow-100 text-yellow-700',
          Pending: 'bg-blue-100 text-blue-700',
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[status as keyof typeof statusColor]}`}>
            {status}
          </span>
        );
      },
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => <span className="text-sm text-gray-500">{date}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: CampaignData) => (
        <div className="flex gap-2">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDeleteCampaign(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden">
      <SimpleCard className="mb-6">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4 ">
          <div>
            <PageTitleWithDescription
              title="Campaigns"
              description="Manage your Meta Ads campaigns for Click-to-WhatsApp."
            />
          </div>
          <div className="flex gap-3 items-center">
            <ButtonSimple
              icon={<ImportOutlined />}
              onClick={() => console.log("sync for meta")}
            >
              Sync from Meta
            </ButtonSimple>
            <ButtonSimple
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleOpenModal}
            >
              Create Campaign
            </ButtonSimple>
          </div>
        </div>
      </SimpleCard>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <SimpleCard className="h-full">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <span className="text-1xl">{stat.icon}</span>
              </div>
            </SimpleCard>
          </Col>
        ))}
      </Row>

      {/* Campaigns Table */}
      <SimpleCard>
        <h2 className="text-xl font-bold mb-4">All Campaigns</h2>
        {campaigns.length === 0 ? (
          <Empty
            description="No campaigns yet"
            style={{ marginTop: '50px', marginBottom: '50px' }}
          >
            <p className="text-gray-500 mb-4">Create your first Click-to-WhatsApp campaign</p>
            <Button type="primary" onClick={handleOpenModal}>
              Create Campaign
            </Button>
          </Empty>
        ) : (
          <Table
            columns={columns}
            dataSource={campaigns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="mt-4"
          />
        )}
      </SimpleCard>

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleCreateCampaign}
      />
    </div>
  );
};

export default Campaigns; 