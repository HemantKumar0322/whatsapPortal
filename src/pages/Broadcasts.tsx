import React, { useState } from 'react';
import { Table, Button, Tag, Space, Drawer, Empty, Tooltip } from 'antd';
import { PlusOutlined, SettingOutlined, EyeOutlined } from '@ant-design/icons';
import { PageTitle } from '../components/PageTitle';
import ButtonSimple from '@/components/ButtonSimple';
import { useNavigate } from 'react-router-dom';

interface BroadcastRecord {
  key: string;
  id: string;
  name: string;
  createdDate: string;
  recipients: number;
  template: string;
  status: 'Completed' | 'In Progress' | 'Failed' | 'Scheduled';
  sent: number;
  failed: number;
}

const Broadcasts: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBroadcast, setSelectedBroadcast] = useState<BroadcastRecord | null>(null);
  const [broadcasts] = useState<BroadcastRecord[]>([
    {
      key: '1',
      id: '1',
      name: 'new',
      createdDate: '10 Mar 2026, 2:09 pm',
      recipients: 1,
      template: 'hey',
      status: 'Completed',
      sent: 0,
      failed: 1,
    },
    {
      key: '2',
      id: '2',
      name: 'Marketing',
      createdDate: '10 Mar 2026, 2:08 pm',
      recipients: 1,
      template: 'hey',
      status: 'Completed',
      sent: 0,
      failed: 1,
    },
    {
      key: '3',
      id: '3',
      name: 'trial',
      createdDate: '10 Mar 2026, 2:07 pm',
      recipients: 0,
      template: 'Hello World',
      status: 'In Progress',
      sent: 0,
      failed: 0,
    },
  ]);

  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    const statusColorMap: { [key: string]: string } = {
      Completed: 'success',
      'In Progress': 'processing',
      Failed: 'error',
      Scheduled: 'default',
    };
    return statusColorMap[status] || 'default';
  };

  const columns = [
    {
      title: 'Campaign Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (_: string, record: BroadcastRecord) => (
        <div>
          <p className="">{record.name}</p>
          {/* <p className="text-xs text-gray-500 mb-0">{record.createdDate}</p> */}
        </div>
      ),
    },
    {
      title: 'Date Created',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: '15%',
      render: (createdDate: string) => createdDate || ""  ,
    },
    {
      title: 'Recipients',
      dataIndex: 'recipients',
      key: 'recipients',
      width: '12%',
      render: (recipients: number) => (
        <span>
          {/* <span style={{ marginRight: 8 }}>📄</span> */}
          {recipients} recipients
        </span>
      ),
    },
    {
      title: 'Template',
      dataIndex: 'template',
      key: 'template',
      width: '15%',
      render: (template: string) => template || <Empty description="No template" />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '12%',
      render: (status: string) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: 'Sent / Failed',
      dataIndex: 'sentFailed',
      key: 'sentFailed',
      width: '15%',
      render: (_: string, record: BroadcastRecord) => (
        <div>
          <span className="text-green-600 mr-3">Sent: {record.sent}</span>
          <span className="text-red-600">Failed: {record.failed}</span>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '14%',
      render: (_: string, record: BroadcastRecord) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedBroadcast(record);
                setDrawerOpen(true);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div className='mb-3'>
          <PageTitle title="Broadcasts" />
          <p className="text-gray-500">Create and manage bulk message campaigns.</p>
        </div>
        <div className="flex gap-3 items-center">
          <ButtonSimple onClick={()=> navigate('/templates')} icon={<SettingOutlined />}>Manage Templates</ButtonSimple>
          <ButtonSimple type="primary" icon={<PlusOutlined />}>
            New Campaign
          </ButtonSimple>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={broadcasts}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} campaigns`,
        }}
        // bordered
        size="middle"
        className=" p-2 mt-4 rounded-lg shadow-sm"
      />

      <Drawer
        title="Campaign Details"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={500}
      >
        {selectedBroadcast && (
          <div>
            <div className="mb-6">
              <p className="text-gray-500 mb-1">Campaign Name</p>
              <h3 className="text-lg font-semibold">{selectedBroadcast.name}</h3>
            </div>
            <div className="mb-6">
              <p className="text-gray-500 mb-1">Created Date</p>
              <p>{selectedBroadcast.createdDate}</p>
            </div>
            <div className="mb-6">
              <p className="text-gray-500 mb-1">Recipients</p>
              <p>{selectedBroadcast.recipients}</p>
            </div>
            <div className="mb-6">
              <p className="text-gray-500 mb-1">Template</p>
              <p>{selectedBroadcast.template || 'No template'}</p>
            </div>
            <div className="mb-6">
              <p className="text-gray-500 mb-1">Status</p>
              <Tag color={getStatusColor(selectedBroadcast.status)}>{selectedBroadcast.status}</Tag>
            </div>
            <div className="mb-6">
              <p className="text-gray-500 mb-1">Delivery Stats</p>
              <div>
                <p>✓ Sent: <span className="text-green-600 font-semibold">{selectedBroadcast.sent}</span></p>
                <p>✕ Failed: <span className="text-red-600 font-semibold">{selectedBroadcast.failed}</span></p>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Broadcasts;
