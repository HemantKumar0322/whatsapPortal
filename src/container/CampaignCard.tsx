import React from 'react';
import { Collapse } from 'antd';

export interface CampaignMetrics {
  id: string;
  campaignName: string;
  status: 'ACTIVE' | 'PAUSED' | 'PENDING';
  objective: string;
  dailyLimit: number;
  createdDate: string;
  impressions: number;
  clicks: number;
  reach: number;
  spend: number;
  ctr: number;
  cpc: number;
}

interface CampaignCardProps {
  campaign: CampaignMetrics;
  onDelete?: (id: string) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-700';
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-700';
      case 'PENDING':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Collapse header with campaign info
  const header = (
    <div className="flex justify-between items-center w-full pr-4">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-gray-900">{campaign.campaignName}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Objective: {campaign.objective} • Daily Limit: ₹{campaign.dailyLimit.toFixed(2)}
        </p>
      </div>
      <div className="flex gap-2 items-center ml-4">
        <span className="text-xs text-gray-500 text-right min-w-fit">
          <p className="font-semibold">CREATED ON</p>
          <p>{campaign.createdDate}</p>
        </span>
      </div>
    </div>
  );

  // Collapse content with metrics
  const content = (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 pt-4">
      <div className="text-center">
        <p className="text-xs text-gray-600 mb-2">📊 Impressions</p>
        <p className="text-lg font-bold text-gray-900">{campaign.impressions.toLocaleString()}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-600 mb-2">🔗 Clicks</p>
        <p className="text-lg font-bold text-gray-900">{campaign.clicks.toLocaleString()}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-600 mb-2">👥 Reach</p>
        <p className="text-lg font-bold text-gray-900">{campaign.reach.toLocaleString()}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-600 mb-2">💰 Spend</p>
        <p className="text-lg font-bold text-gray-900">₹{campaign.spend.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-600 mb-2">📈 CTR</p>
        <p className="text-lg font-bold text-gray-900">{campaign.ctr.toFixed(2)}%</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-600 mb-2">💵 CPC</p>
        <p className="text-lg font-bold text-gray-900">₹{campaign.cpc.toFixed(2)}</p>
      </div>
    </div>
  );

  const items = [
    {
      key: campaign.id,
      label: header,
      children: content,
    },
  ];

  return (
    <div className="mb-4">
      <Collapse 
      items={items} 
      className='bg-white'
      />
    </div>
  );
};

export default CampaignCard;
