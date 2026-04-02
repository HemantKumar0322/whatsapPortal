import { useState } from 'react';
import {
  Input,
  Table,
  Avatar,
  Badge,
  Tag,
  Segmented,
  Empty,
  Row,
  Col,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { PageTitleSecondary } from '@/components/uiPart';

interface Conversation {
  key: string;
  id: string;
  name: string;
  phone: string;
  lastMessage?: string;
  timestamp: string;
  status: 'Active' | 'Waiting' | 'Resolved';
  online: boolean;
  avatar?: string;
}

const conversationsData: Conversation[] = [
  {
    key: '1',
    id: 'harsh',
    name: 'Harsh',
    phone: '9196720404566',
    timestamp: '6 days ago',
    status: 'Active',
    online: true,
  },
  {
    key: '2',
    id: 'deepak',
    name: 'Deepak Saini',
    phone: '9179765894901',
    timestamp: '10 days ago',
    status: 'Active',
    online: true,
  },
  {
    key: '3',
    id: 'emoji',
    name: 'Contact 3',
    phone: '9180505885316',
    timestamp: 'about 1 month ago',
    status: 'Active',
    online: true,
  },
  {
    key: '4',
    id: 'aditya',
    name: 'Aditya',
    phone: '9163505979361',
    timestamp: '2 months ago',
    status: 'Active',
    online: true,
  },
  {
    key: '5',
    id: 'div',
    name: 'Div',
    phone: '9179767796909',
    timestamp: '2 months ago',
    status: 'Active',
    online: true,
  },
  {
    key: '6',
    id: 'dinesh',
    name: 'Dinesh Tank',
    phone: '9196499967877',
    timestamp: '2 months ago',
    status: 'Active',
    online: true,
  },
  {
    key: '7',
    id: 'contact7',
    name: 'Contact 7',
    phone: '9189550008293',
    timestamp: '2 months ago',
    status: 'Waiting',
    online: true,
  },
  {
    key: '8',
    id: 'rakesh',
    name: 'Rakesh Tank',
    phone: '9163502622488',
    timestamp: '2 months ago',
    status: 'Resolved',
    online: true,
  },
];

const Conversations = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filteredData, setFilteredData] = useState<Conversation[]>(conversationsData);

  const handleSearch = (value: string) => {
    setSearchText(value);
    filterConversations(value, filterStatus);
  };

  const handleFilterChange = (value: string | number) => {
    setFilterStatus(value as string);
    filterConversations(searchText, value as string);
  };

  const filterConversations = (search: string, status: string) => {
    let filtered = conversationsData;

    if (status !== 'All') {
      filtered = filtered.filter((conv) => conv.status === status);
    }

    if (search) {
      filtered = filtered.filter(
        (conv) =>
          conv.name.toLowerCase().includes(search.toLowerCase()) ||
          conv.phone.includes(search)
      );
    }

    setFilteredData(filtered);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Active':
        return '#87d068';
      case 'Waiting':
        return '#faad14';
      case 'Resolved':
        return '#1890ff';
      default:
        return '#d9d9d9';
    }
  };

  const getStatusBgColor = (status: string): string => {
    switch (status) {
      case 'Active':
        return '#f6ffed';
      case 'Waiting':
        return '#fffbe6';
      case 'Resolved':
        return '#e6f7ff';
      default:
        return '#fafafa';
    }
  };

  const columns: TableColumnsType<Conversation> = [
    {
      title: '',
      key: 'avatar',
      width: 60,
      render: (_, record) => (
        <Badge
          count={
            record.online ? (
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#52c41a',
                }}
              />
            ) : null
          }
          offset={[-10, 10]}
        >
          <Avatar
            size={48}
            style={{
              backgroundColor: '#87d068',
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {record.name.charAt(0).toUpperCase()}
          </Avatar>
        </Badge>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      dataIndex: 'name',
      render: (name, record) => (
        <div style={{ cursor: 'pointer' }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
          <div style={{ color: '#8c8c8c', fontSize: 12 }}>{record.phone}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: 120,
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          style={{
            backgroundColor: getStatusBgColor(status),
            color: getStatusColor(status),
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Last Contact',
      key: 'timestamp',
      dataIndex: 'timestamp',
      width: 120,
      align: 'right',
      render: (timestamp) => (
        <span style={{ color: '#8c8c8c', fontSize: 12 }}>{timestamp}</span>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{ marginBottom: 32 }}>
        <PageTitleSecondary title="Conversations" subtitle="Manage all your WhatsApp conversations" />
      </div>

      {/* Search and Filter Section */}
      <div style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={24} md={12}>
            <Input
              placeholder="Search by name or phone..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ borderRadius: 6 }}
              allowClear
            />
          </Col>
          <Col xs={24} sm={24} md={12} style={{ textAlign: 'right' }}>
            <Segmented<string>
              value={filterStatus}
              onChange={handleFilterChange}
              options={[
                { label: 'All', value: 'All' },
                { label: 'Active', value: 'Active' },
                { label: 'Waiting', value: 'Waiting' },
                { label: 'Resolved', value: 'Resolved' },
              ]}
              style={{
                backgroundColor: '#f5f5f5',
                padding: '4px',
                borderRadius: '6px',
              }}
            />
          </Col>
        </Row>
      </div>

      {/* Conversations Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: 8 }}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            total: filteredData.length,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} conversations`,
            pageSizeOptions: ['10', '20', '50'],
          }}
          locale={{
            emptyText: <Empty description="No conversations found" />,
          }}
          rowHoverable
          style={{ borderRadius: 8 }}
        />
      </div>
    </div>
  );
};

export default Conversations;
