import React, { useState } from 'react';
import { Row, Col } from 'antd';

import { PageTitleWithDescription, SimpleCard } from '@/components/uiPart';
import ButtonSimple from '@/components/ButtonSimple';
import CreateTemplateModal from '@/container/CreateTemplateModal';

import { PlusOutlined, ImportOutlined } from '@ant-design/icons';

interface TemplateData {
  templateName: string;
  category: string;
  header?: string;
  body: string;
  buttons?: Array<{ text: string; type: 'URL' | 'PHONE_NUMBER' | 'QUICK_REPLY' }>;
  status?: string;
}

const Templates: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [templates, setTemplates] = useState<TemplateData[]>([]);

  const defaultTemplates = [
    {
      templateName: "trial",
      category: "MARKETING",
      status: "Pending",
      body: "This template is introduction to our features.",
    },
    {
      templateName: "hello_world",
      category: "UTILITY",
      status: "Approved",
      body: "This template is used for welcoming new users to our service. It includes a friendly greeting and an introduction to our features.",
    },
    {
      templateName: "hey",
      category: "AUTHENTICATION",
      status: "Rejected",
      body: "This template is for welcoming new users to our service.",
    },
    {
      templateName: "Lifetime",
      category: "MARKETING",
      status: "Approved",
      body: "This template is for service.",
    },
  ];

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCreateTemplate = (data: TemplateData) => {
    const newTemplate = {
      ...data,
      status: "Pending",
    };
    setTemplates([...templates, newTemplate]);
    setIsModalVisible(false);
    console.log("Template created:", newTemplate);
    // Here you would typically send this to your API
  };

  const statsConfig = templates.length > 0 ? templates : defaultTemplates;

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden">
      <SimpleCard className="mb-6">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4 ">
          <div>
            <PageTitleWithDescription
              title="Message Templates"
              description="Create and manage WhatsApp templates."
            />
            {/* <p className="text-gray-500">Manage your contacts and start conversations.</p> */}
          </div>
          <div className="flex gap-3 items-center">
            <ButtonSimple
              icon={<ImportOutlined />}
              onClick={() => console.log("sync for meta")}
            >
              Sync for Meta
            </ButtonSimple>
            <ButtonSimple
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleOpenModal}
            >
              New Template
            </ButtonSimple>
          </div>
        </div>
      </SimpleCard>

      {/* Main Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        {statsConfig.map((item, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <SimpleCard className="h-full">
              <div className="flex items-center justify-between space-x-2">
                <span className='font-semibold'> {item.templateName}</span>
                <span className={`px-2 rounded-full text-xs font-semibold ${
                  item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                  item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="my-2 text-gray-400 text-sm">{item.category}</p>
              <p className='font-medium text-[12px] text-gray-600'>{item.body}</p>
            </SimpleCard>
          </Col>
        ))}
      </Row>

      {/* Create Template Modal */}
      <CreateTemplateModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleCreateTemplate}
      />    </div>
  );
};

export default Templates; 