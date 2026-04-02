import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import TemplatePreview from './TemplatePreview';

interface TemplateFormData {
  templateName: string;
  category: string;
  header?: string;
  body: string;
  buttons: Array<{ text: string; type: 'URL' | 'PHONE_NUMBER' | 'QUICK_REPLY' }>;
}

interface CreateTemplateModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: TemplateFormData) => void;
}

const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {

  const [formData, setFormData] = useState<TemplateFormData>({
    templateName: '',
    category: 'MARKETING',
    header: '',
    body: '',
    buttons: [],
  });

  const categories = [
    { label: 'MARKETING', value: 'MARKETING' },
    { label: 'UTILITY', value: 'UTILITY' },
    { label: 'AUTHENTICATION', value: 'AUTHENTICATION' },
  ];

  const handleFormChange = (field: keyof TemplateFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.templateName.trim()) {
      alert('Please enter template name');
      return;
    }
    if (!formData.body.trim()) {
      alert('Please enter body text');
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
      templateName: '',
      category: 'MARKETING',
      header: '',
      body: '',
      buttons: [],
    });
  };

  return (
    <Modal
      title="Create WhatsApp Template"
      open={visible}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit for Approval
        </Button>,
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Form Section */}
        <div className="space-y-6 overflow-y-auto h-[65vh] pr-2">
          <p className="text-gray-600 text-sm">
            Design your message template with headers, body, and buttons.
          </p>

          {/* Template Name */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Template Name
            </label>
            <input
              type="text"
              placeholder="e.g. welcome_offer"
              value={formData.templateName}
              onChange={(e) => handleFormChange('templateName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
            <p className="text-xs text-gray-500 mt-1">
              Lowercase only, use underscores.
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleFormChange('category', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              title="Select category"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-900 font-semibold">ℹ Meta Policy Tip:</p>
              <p className="text-xs text-blue-800 mt-1">
                Only for OTP/Verification codes. Media/Images are NOT allowed for this category.
              </p>
            </div>
          </div>

          {/* Header */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Header (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Special Offer"
              value={formData.header}
              onChange={(e) => handleFormChange('header', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Body Text
            </label>
            <textarea
              placeholder="Enter your message body..."
              value={formData.body}
              onChange={(e) => handleFormChange('body', e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.body.length} characters
            </p>
          </div>

        </div>

        {/* Preview Section */}
        <div className="flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-2">
            <div className="w-full">
              <div className="text-center mb-4">
                <p className="text-sm font-semibold text-gray-700">📱 LIVE PREVIEW</p>
              </div>
              <TemplatePreview
                header={formData.header || ''}
                body={formData.body}
                buttons={formData.buttons}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateTemplateModal;
