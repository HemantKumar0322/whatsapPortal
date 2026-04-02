import React, { useState } from 'react';
import { Row, Col, Statistic, Table, Input, Empty, Typography } from 'antd';
import { SearchOutlined, FileTextOutlined, DollarOutlined } from '@ant-design/icons';
import { PageTitleWithDescription, SimpleCard, TitleCard } from '@/components/uiPart';

const { Text } = Typography;

const Invoices: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  // Mock data for statistics
  const stats = {
    totalRevenue: 0,
    totalInvoices: 0,
  };

  // Mock data for invoices
  const invoices:any = [
    // Empty by default - showing no invoices
  ];

  const columns = [
    {
      title: 'Invoice #',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      width: '15%',
    },
    {
      title: 'User / Business',
      dataIndex: 'userBusiness',
      key: 'userBusiness',
      width: '25%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '20%',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === 'paid' ? 'bg-green-100 text-green-800' :
          status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          status === 'cancelled' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="mb-6">
        <PageTitleWithDescription 
          title="All Invoices" 
          description="Monitor all system transactions and payments" 
        />
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <SimpleCard>
            <Statistic
              title={
                <div className="flex items-center gap-2">
                  <DollarOutlined className="text-blue-500" />
                  <span>Total Revenue</span>
                </div>
              }
              value={stats.totalRevenue}
              prefix="₹"
              valueStyle={{ color: '#1890ff', fontSize: '24px' }}
            />
            <Text type="secondary" className="text-xs mt-2 block">
              Lifetime collected earnings
            </Text>
          </SimpleCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <SimpleCard>
            <Statistic
              title={
                <div className="flex items-center gap-2">
                  <FileTextOutlined className="text-blue-500" />
                  <span>Total Invoices</span>
                </div>
              }
              value={stats.totalInvoices}
              valueStyle={{ color: '#1890ff', fontSize: '24px' }}
            />
            <Text type="secondary" className="text-xs mt-2 block">
              Across all users
            </Text>
          </SimpleCard>
        </Col>
      </Row>

      {/* Transactions Table */}
      <TitleCard title="Transactions" description="List of all generated invoices">
        <div className="mb-4">
          <Input
            placeholder="Search invoice or business..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full max-w-sm"
            size="large"
          />
        </div>

        <Table
          columns={columns}
          dataSource={invoices}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} invoices`,
          }}
          locale={{
            emptyText: (
              <Empty
                description="No invoices found matching your search."
                style={{ margin: '40px 0' }}
              />
            ),
          }}
          // rowKey={(record: any, index: number) => index}
        />
      </TitleCard>
    </div>
  );
};

export default Invoices;
