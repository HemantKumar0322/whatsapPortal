import React, { useState } from 'react';
import { Table, Tag, Space, Button, Tooltip, message, Empty } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { PageTitle } from '../../components/PageTitle';
import type { ColumnsType } from 'antd/es/table';

interface TemplateRecord {
  key: string;
  id: string;
  name: string;
  content: string;
  category: 'MARKETING' | 'UTILITY' | 'NOTIFICATION' | 'PROMOTION';
  createdDate: string;
  status: 'approved' | 'pending';
}

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateRecord[]>([
    {
      key: '1',
      id: 'tpl_001',
      name: 'trial',
      content: 'yes',
      category: 'MARKETING',
      createdDate: '2 Feb 2026, 9:52 pm',
      status: 'approved',
    },
    {
      key: '2',
      id: 'tpl_002',
      name: 'hey',
      content: 'hello brother',
      category: 'MARKETING',
      createdDate: '2 Feb 2026, 7:55 pm',
      status: 'approved',
    },
    {
      key: '3',
      id: 'tpl_003',
      name: 'hello_world',
      content: 'Welcome and congratulations!! This message demonstrates your ability to send a Wh...',
      category: 'UTILITY',
      createdDate: '8 Jan 2026, 2:21 pm',
      status: 'approved',
    },
  ]);

  const pendingTemplates = templates.filter((t) => t.status === 'pending');
  const approvedTemplates = templates.filter((t) => t.status === 'approved');

  const getCategoryColor = (category: string) => {
    const categoryColorMap: { [key: string]: string } = {
      MARKETING: 'blue',
      UTILITY: 'green',
      NOTIFICATION: 'orange',
      PROMOTION: 'purple',
    };
    return categoryColorMap[category] || 'default';
  };

  const handleRevokeTemplate = (templateId: string) => {
    setTemplates(templates.filter((t) => t.key !== templateId));
    message.success('Template revoked successfully');
  };

  const handleViewDetails = (template: TemplateRecord) => {
    message.info(`Viewing details for: ${template.name}`);
  };

  const approvedColumns: ColumnsType<TemplateRecord> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      render: (name: string) => <span className="font-medium">{name}</span>,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: '35%',
      render: (content: string) => (
        <span className="text-gray-600 truncate">
          {content.length > 50 ? `${content.substring(0, 50)}...` : content}
        </span>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '15%',
      render: (category: string) => (
        <Tag color={getCategoryColor(category)} className="cursor-pointer">
          {category}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: '20%',
      render: (createdDate: string) => <span>{createdDate}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      render: (_: string, record: TemplateRecord) => (
        <Space size="middle">
          <Button
            type="text"
            danger
            size="small"
            onClick={() => handleRevokeTemplate(record.key)}
          >
            Revoke
          </Button>
          <Tooltip title="View Details">
            <Button
              type="text"
              size="small"
              icon={<InfoCircleOutlined />}
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="">
      {/* Header Section */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
        <PageTitle title="Template Management" />
        <p className="text-gray-500">Review and approve message templates</p>
      </div>

      {/* Pending Approval Section */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
            1
          </span>
          <h3 className="text-lg font-semibold">Pending Approval</h3>
        </div>
        {pendingTemplates.length === 0 ? (
          <div className="py-12">
            <Empty
              description="No pending templates"
              style={{
                color: '#999',
              }}
            />
          </div>
        ) : (
          <Table
            columns={approvedColumns}
            dataSource={pendingTemplates}
            pagination={false}
            size="middle"
            className="custom-table"
          />
        )}
      </div>

      {/* Approved Templates Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
            {approvedTemplates.length}
          </span>
          <h3 className="text-lg font-semibold">Approved Templates</h3>
        </div>
        <Table
          columns={approvedColumns}
          dataSource={approvedTemplates}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} templates`,
          }}
          size="middle"
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default Templates;
