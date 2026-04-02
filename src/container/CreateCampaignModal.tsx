import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';

export interface CampaignData {
  id: string;
  campaignName: string;
  objective: string;
  dailyBudget: number;
  status: 'Active' | 'Paused' | 'Pending';
  createdAt: string;
}

interface CreateCampaignModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<CampaignData, 'id' | 'status' | 'createdAt'>) => void;
}

const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    campaignName: '',
    objective: 'Engagement',
    dailyBudget: 500,
  });

  const objectives = [
    { label: 'Engagement', value: 'Engagement' },
    { label: 'Leads', value: 'Leads' },
    { label: 'Messages', value: 'Messages' },
    { label: 'Clicks', value: 'Clicks' },
  ];

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.campaignName.trim()) {
      message.error('Please enter campaign name');
      return;
    }
    if (!formData.objective) {
      message.error('Please select an objective');
      return;
    }
    if (formData.dailyBudget < 85) {
      message.error('Minimum budget is ₹85/day');
      return;
    }

    onSubmit(formData);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      campaignName: '',
      objective: 'Engagement',
      dailyBudget: 500,
    });
  };

  return (
    <Modal
      title="Create Campaign"
      open={visible}
      onCancel={handleCancel}
      width={500}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Create Campaign
        </Button>,
      ]}
    >
      <div className="space-y-6">
        <p className="text-gray-600 text-sm">
          Create a new Click-to-WhatsApp campaign on Meta Ads
        </p>

        {/* Campaign Name */}
        <div>
          <label className="block font-semibold text-gray-900 mb-2">
            Campaign Name
          </label>
          <input
            type="text"
            title="Campaign Name"
            placeholder="e.g. Summer Sale CTWA"
            value={formData.campaignName}
            onChange={(e) => handleFormChange('campaignName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
          />
        </div>

        {/* Objective */}
        <div>
          <label className="block font-semibold text-gray-900 mb-2">
            Objective
          </label>
          <select
            value={formData.objective}
            onChange={(e) => handleFormChange('objective', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            title="Select objective"
          >
            {objectives.map((obj) => (
              <option key={obj.value} value={obj.value}>
                {obj.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">
            For Click-to-WhatsApp ads, Engagement or Leads work best
          </p>
        </div>

        {/* Daily Budget */}
        <div>
          <label className="block font-semibold text-gray-900 mb-2">
            Daily Budget (₹)
          </label>
          <input
            type="number"
            title="Daily Budget"
            min="85"
            step="1"
            value={formData.dailyBudget}
            onChange={(e) => handleFormChange('dailyBudget', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum ₹85/day. Leave empty to set later.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCampaignModal;
