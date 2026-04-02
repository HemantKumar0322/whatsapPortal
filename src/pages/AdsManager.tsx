import React, { useState } from 'react';
import { Row, Col, Button, Empty, message, Select } from 'antd';
import { PlusOutlined, ImportOutlined } from '@ant-design/icons';

import { PageTitleWithDescription, SimpleCard } from '@/components/uiPart';
import ButtonSimple from '@/components/ButtonSimple';
import CampaignCard, { CampaignMetrics } from '@/container/CampaignCard';
import CreateCampaignModal, { CampaignData } from '@/container/CreateCampaignModal';

const AdsManager: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timePeriod, setTimePeriod] = useState('7');
  const [campaigns, setCampaigns] = useState<CampaignMetrics[]>([
    {
      id: 'campaign_1',
      campaignName: 'GPT bundle - Nexusify',
      status: 'ACTIVE',
      objective: 'Outcome Sales',
      dailyLimit: 250,
      createdDate: '3/26/2026',
      impressions: 10344,
      clicks: 229,
      reach: 8869,
      spend: 847.44,
      ctr: 2.21,
      cpc: 3.70,
    },
  ]);

  const accountMetrics = {
    totalSpend: campaigns.reduce((sum, c) => sum + c.spend, 0),
    liveCampaigns: campaigns.filter((c) => c.status === 'ACTIVE').length,
    totalCampaigns: campaigns.length,
    accountId: '2058894311599595',
  };

  // Stats data matching the design
  const stats = [
    {
      title: 'Total Spend',
      value: `₹${accountMetrics.totalSpend.toFixed(2)}`,
      subtitle: 'Active Account Status',
      icon: '💵',
      borderColor: 'border-l-blue-500',
    },
    {
      title: 'Live Campaigns',
      value: accountMetrics.liveCampaigns,
      subtitle: 'Driving traffic to WhatsApp',
      icon: '💬',
      borderColor: 'border-l-green-500',
    },
    {
      title: 'Total Campaigns',
      value: accountMetrics.totalCampaigns,
      subtitle: '',
      icon: '📌',
      borderColor: 'border-l-orange-500',
    },
    {
      title: 'Account ID',
      value: accountMetrics.accountId,
      subtitle: '',
      icon: '₹',
      borderColor: 'border-l-yellow-500',
    },
  ];

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCreateCampaign = (data: Omit<CampaignData, 'id' | 'status' | 'createdAt'>) => {
    const newCampaign: CampaignMetrics = {
      id: `campaign_${Date.now()}`,
      campaignName: data.campaignName,
      status: 'PENDING',
      objective: data.objective,
      dailyLimit: data.dailyBudget,
      createdDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }),
      impressions: 0,
      clicks: 0,
      reach: 0,
      spend: 0,
      ctr: 0,
      cpc: 0,
    };
    setCampaigns([...campaigns, newCampaign]);
    setIsModalVisible(false);
    message.success('Campaign created successfully!');
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    message.success('Campaign deleted successfully');
  };

  const handleSync = () => {
    message.loading({ content: 'Syncing campaigns...', duration: 2 });
  };

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <SimpleCard className="mb-6">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <div>
            <PageTitleWithDescription
              title="Ads Manager"
              description="Create and manage Click-to-WhatsApp ads on Facebook & Instagram."
            />
          </div>
          <div className="flex gap-3 items-center">
            <ButtonSimple
              icon={<ImportOutlined />}
              onClick={handleSync}
            >
              Sync from Meta
            </ButtonSimple>
            <ButtonSimple
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleOpenModal}
            >
              Create Ad Campaign
            </ButtonSimple>
          </div>
        </div>
      </SimpleCard>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <SimpleCard className={`h-full border-l-4 ${stat.borderColor}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2 break-words">{stat.value}</p>
                  {stat.subtitle && <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>}
                </div>
                <span className="text-2xl ml-2">{stat.icon}</span>
              </div>
            </SimpleCard>
          </Col>
        ))}
      </Row>

      {/* Your Meta Campaigns Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Meta Campaigns</h2>
        <Select
          value={timePeriod}
          onChange={(value) => setTimePeriod(value)}
          style={{ width: 150 }}
          options={[
            { label: 'Last 7 days', value: '7' },
            { label: 'Last 30 days', value: '30' },
            { label: 'Last 90 days', value: '90' },
            { label: 'All time', value: 'all' },
          ]}
        />
      </div>

      {/* Campaign Cards */}
      <div className="flex-1 overflow-y-auto">
        {campaigns.length === 0 ? (
          <SimpleCard className="flex flex-col items-center justify-center h-96">
            <Empty
              description="No campaigns yet"
              style={{ marginTop: '50px', marginBottom: '50px' }}
            >
              <p className="text-gray-500 mb-4">Create your first Click-to-WhatsApp ad campaign</p>
              <Button type="primary" onClick={handleOpenModal}>
                Create Ad Campaign
              </Button>
            </Empty>
          </SimpleCard>
        ) : (
          <div className="space-y-2 pb-4">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onDelete={handleDeleteCampaign}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleCreateCampaign}
      />
    </div>
  );
};

export default AdsManager; 