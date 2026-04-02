import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Input, 
  Button, 
  Space, 
  Tag, 
  Select, 
  DatePicker, 
  Row, 
  Col, 
  Statistic,
  Progress,
  Typography,
  Divider,
  Tabs,
  Badge
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  DownloadOutlined, 
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  DollarOutlined,
  EyeOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { PageTitleSecondary } from '@/components/uiPart';
import { useAppNotification } from '@/hooks/useAppNotification';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface ReportData {
  key: string;
  id: string;
  customerName: string;
  serviceType: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled' | 'in_progress';
  date: string;
  region: string;
  category: string;
  revenue: number;
}

const Reports: React.FC = () => {
  const [data, setData] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<ReportData[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const { successToast, errorToast } = useAppNotification();

  // Mock data for reports
  const mockData: ReportData[] = [
    {
      key: '1',
      id: 'RPT-001',
      customerName: 'John Doe',
      serviceType: 'Event Logistics',
      amount: 2500,
      status: 'completed',
      date: '2024-01-15',
      region: 'North America',
      category: 'Premium',
      revenue: 2500
    },
    {
      key: '2',
      id: 'RPT-002',
      customerName: 'Jane Smith',
      serviceType: 'Shipping Services',
      amount: 1800,
      status: 'pending',
      date: '2024-01-16',
      region: 'Europe',
      category: 'Standard',
      revenue: 1800
    },
    {
      key: '3',
      id: 'RPT-003',
      customerName: 'Bob Johnson',
      serviceType: 'Custom Setup',
      amount: 3200,
      status: 'in_progress',
      date: '2024-01-17',
      region: 'Asia Pacific',
      category: 'Premium',
      revenue: 3200
    },
    {
      key: '4',
      id: 'RPT-004',
      customerName: 'Alice Brown',
      serviceType: 'Storage Solutions',
      amount: 1200,
      status: 'completed',
      date: '2024-01-18',
      region: 'North America',
      category: 'Basic',
      revenue: 1200
    },
    {
      key: '5',
      id: 'RPT-005',
      customerName: 'Charlie Wilson',
      serviceType: 'Consultation',
      amount: 800,
      status: 'cancelled',
      date: '2024-01-19',
      region: 'Europe',
      category: 'Standard',
      revenue: 0
    },
    {
      key: '6',
      id: 'RPT-006',
      customerName: 'Diana Miller',
      serviceType: 'Event Logistics',
      amount: 2800,
      status: 'completed',
      date: '2024-01-20',
      region: 'Asia Pacific',
      category: 'Premium',
      revenue: 2800
    },
    {
      key: '7',
      id: 'RPT-007',
      customerName: 'Edward Davis',
      serviceType: 'Shipping Services',
      amount: 1500,
      status: 'pending',
      date: '2024-01-21',
      region: 'North America',
      category: 'Standard',
      revenue: 1500
    },
    {
      key: '8',
      id: 'RPT-008',
      customerName: 'Fiona Garcia',
      serviceType: 'Custom Setup',
      amount: 4100,
      status: 'in_progress',
      date: '2024-01-22',
      region: 'Europe',
      category: 'Premium',
      revenue: 4100
    }
  ];

  useEffect(() => {
    setData(mockData);
    setFilteredData(mockData);
  }, []);

  useEffect(() => {
    let filtered = data;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(item =>
        item.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.id.toLowerCase().includes(searchText.toLowerCase()) ||
        item.serviceType.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    // Region filter
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(item => item.region === selectedRegion);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Date range filter
    if (dateRange) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        const startDate = new Date(dateRange[0]);
        const endDate = new Date(dateRange[1]);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    setFilteredData(filtered);
  }, [searchText, selectedStatus, selectedRegion, selectedCategory, dateRange, data]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'orange';
      case 'in_progress':
        return 'blue';
      case 'cancelled':
        return 'red';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const columns: ColumnsType<ReportData> = [
    {
      title: 'Report ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: 'Service Type',
      dataIndex: 'serviceType',
      key: 'serviceType',
      filters: [
        { text: 'Event Logistics', value: 'Event Logistics' },
        { text: 'Shipping Services', value: 'Shipping Services' },
        { text: 'Custom Setup', value: 'Custom Setup' },
        { text: 'Storage Solutions', value: 'Storage Solutions' },
        { text: 'Consultation', value: 'Consultation' },
      ],
      onFilter: (value, record) => record.serviceType === value,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
      filters: [
        { text: 'Completed', value: 'completed' },
        { text: 'Pending', value: 'pending' },
        { text: 'In Progress', value: 'in_progress' },
        { text: 'Cancelled', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      filters: [
        { text: 'North America', value: 'North America' },
        { text: 'Europe', value: 'Europe' },
        { text: 'Asia Pacific', value: 'Asia Pacific' },
      ],
      onFilter: (value, record) => record.region === value,
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue: number) => (
        <Text strong style={{ color: revenue > 0 ? '#52c41a' : '#ff4d4f' }}>
          ${revenue.toLocaleString()}
        </Text>
      ),
      sorter: (a, b) => a.revenue - b.revenue,
    },
  ];

  const handleExport = () => {
    successToast('Report exported successfully!');
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      successToast('Data refreshed successfully!');
    }, 1000);
  };

  const clearFilters = () => {
    setSearchText('');
    setSelectedStatus('all');
    setSelectedRegion('all');
    setSelectedCategory('all');
    setDateRange(null);
  };

  // Calculate statistics
  const stats = {
    totalReports: filteredData.length,
    totalRevenue: filteredData.reduce((sum, item) => sum + item.revenue, 0),
    averageAmount: filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.amount, 0) / filteredData.length : 0,
    completionRate: filteredData.length > 0 ? (filteredData.filter(item => item.status === 'completed').length / filteredData.length) * 100 : 0
  };

  // Chart data
  const serviceTypeData = [
    { type: 'Event Logistics', count: filteredData.filter(item => item.serviceType === 'Event Logistics').length },
    { type: 'Shipping Services', count: filteredData.filter(item => item.serviceType === 'Shipping Services').length },
    { type: 'Custom Setup', count: filteredData.filter(item => item.serviceType === 'Custom Setup').length },
    { type: 'Storage Solutions', count: filteredData.filter(item => item.serviceType === 'Storage Solutions').length },
    { type: 'Consultation', count: filteredData.filter(item => item.serviceType === 'Consultation').length },
  ];

  const regionData = [
    { region: 'North America', revenue: filteredData.filter(item => item.region === 'North America').reduce((sum, item) => sum + item.revenue, 0) },
    { region: 'Europe', revenue: filteredData.filter(item => item.region === 'Europe').reduce((sum, item) => sum + item.revenue, 0) },
    { region: 'Asia Pacific', revenue: filteredData.filter(item => item.region === 'Asia Pacific').reduce((sum, item) => sum + item.revenue, 0) },
  ];

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden max-h-full">
      <div className="mb-6">
        <PageTitleSecondary title="Reports & Analytics" />
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Total Reports"
              value={stats.totalReports}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={stats.totalRevenue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="$"
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Average Amount"
              value={Math.round(stats.averageAmount)}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#722ed1' }}
              suffix="$"
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Completion Rate"
              value={Math.round(stats.completionRate)}
              prefix={<PieChartOutlined />}
              valueStyle={{ color: '#faad14' }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-6">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Search
              placeholder="Search reports..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={4}>
            <Select
              placeholder="Status"
              size="large"
              style={{ width: '100%' }}
              value={selectedStatus}
              onChange={setSelectedStatus}
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="in_progress">In Progress</Select.Option>
              <Select.Option value="cancelled">Cancelled</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={4}>
            <Select
              placeholder="Region"
              size="large"
              style={{ width: '100%' }}
              value={selectedRegion}
              onChange={setSelectedRegion}
            >
              <Select.Option value="all">All Regions</Select.Option>
              <Select.Option value="North America">North America</Select.Option>
              <Select.Option value="Europe">Europe</Select.Option>
              <Select.Option value="Asia Pacific">Asia Pacific</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={4}>
            <Select
              placeholder="Category"
              size="large"
              style={{ width: '100%' }}
              value={selectedCategory}
              onChange={setSelectedCategory}
            >
              <Select.Option value="all">All Categories</Select.Option>
              <Select.Option value="Basic">Basic</Select.Option>
              <Select.Option value="Standard">Standard</Select.Option>
              <Select.Option value="Premium">Premium</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={4}>
            <RangePicker
              size="large"
              style={{ width: '100%' }}
              onChange={(dates) => {
                if (dates) {
                  setDateRange([dates[0]?.format('YYYY-MM-DD') || '', dates[1]?.format('YYYY-MM-DD') || '']);
                } else {
                  setDateRange(null);
                }
              }}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col span={24}>
            <Space>
              <Button 
                icon={<FilterOutlined />} 
                onClick={clearFilters}
                size="large"
              >
                Clear Filters
              </Button>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={handleRefresh}
                loading={loading}
                size="large"
              >
                Refresh
              </Button>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                onClick={handleExport}
                size="large"
              >
                Export Report
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Charts and Table */}
      <Tabs defaultActiveKey="table" className="flex-1">
        <TabPane tab="Data Table" key="table">
          <Card>
            <Table
              columns={columns}
              dataSource={filteredData}
              loading={loading}
              pagination={{
                total: filteredData.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} reports`,
              }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>
        
        <TabPane tab="Service Type Analysis" key="service">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Service Type Distribution">
                {serviceTypeData.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <Text>{item.type}</Text>
                      <Text strong>{item.count}</Text>
                    </div>
                                         <Progress 
                       percent={filteredData.length > 0 ? Math.round((item.count / filteredData.length) * 100) : 0} 
                       strokeColor={['#1890ff', '#52c41a', '#722ed1', '#faad14', '#ff4d4f'][index] || '#1890ff'}
                       showInfo={false}
                     />
                  </div>
                ))}
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Regional Revenue">
                {regionData.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <Text>{item.region}</Text>
                      <Text strong>${item.revenue.toLocaleString()}</Text>
                    </div>
                                         <Progress 
                       percent={stats.totalRevenue > 0 ? Math.round((item.revenue / stats.totalRevenue) * 100) : 0} 
                       strokeColor={['#1890ff', '#52c41a', '#722ed1'][index] || '#1890ff'}
                       showInfo={false}
                     />
                  </div>
                ))}
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Status Overview" key="status">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Status Distribution">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Text>Completed</Text>
                      <Badge count={filteredData.filter(item => item.status === 'completed').length} style={{ backgroundColor: '#52c41a' }} />
                    </div>
                    <Progress 
                      percent={filteredData.length > 0 ? Math.round((filteredData.filter(item => item.status === 'completed').length / filteredData.length) * 100) : 0} 
                      strokeColor="#52c41a"
                      showInfo={false}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <Text>Pending</Text>
                      <Badge count={filteredData.filter(item => item.status === 'pending').length} style={{ backgroundColor: '#faad14' }} />
                    </div>
                    <Progress 
                      percent={filteredData.length > 0 ? Math.round((filteredData.filter(item => item.status === 'pending').length / filteredData.length) * 100) : 0} 
                      strokeColor="#faad14"
                      showInfo={false}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <Text>In Progress</Text>
                      <Badge count={filteredData.filter(item => item.status === 'in_progress').length} style={{ backgroundColor: '#1890ff' }} />
                    </div>
                    <Progress 
                      percent={filteredData.length > 0 ? Math.round((filteredData.filter(item => item.status === 'in_progress').length / filteredData.length) * 100) : 0} 
                      strokeColor="#1890ff"
                      showInfo={false}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <Text>Cancelled</Text>
                      <Badge count={filteredData.filter(item => item.status === 'cancelled').length} style={{ backgroundColor: '#ff4d4f' }} />
                    </div>
                    <Progress 
                      percent={filteredData.length > 0 ? Math.round((filteredData.filter(item => item.status === 'cancelled').length / filteredData.length) * 100) : 0} 
                      strokeColor="#ff4d4f"
                      showInfo={false}
                    />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Revenue by Status">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Text>Completed Revenue</Text>
                      <Text strong style={{ color: '#52c41a' }}>
                        ${filteredData.filter(item => item.status === 'completed').reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                      </Text>
                    </div>
                    <Progress 
                      percent={stats.totalRevenue > 0 ? Math.round((filteredData.filter(item => item.status === 'completed').reduce((sum, item) => sum + item.revenue, 0) / stats.totalRevenue) * 100) : 0} 
                      strokeColor="#52c41a"
                      showInfo={false}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <Text>Pending Revenue</Text>
                      <Text strong style={{ color: '#faad14' }}>
                        ${filteredData.filter(item => item.status === 'pending').reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                      </Text>
                    </div>
                    <Progress 
                      percent={stats.totalRevenue > 0 ? Math.round((filteredData.filter(item => item.status === 'pending').reduce((sum, item) => sum + item.revenue, 0) / stats.totalRevenue) * 100) : 0} 
                      strokeColor="#faad14"
                      showInfo={false}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <Text>In Progress Revenue</Text>
                      <Text strong style={{ color: '#1890ff' }}>
                        ${filteredData.filter(item => item.status === 'in_progress').reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                      </Text>
                    </div>
                    <Progress 
                      percent={stats.totalRevenue > 0 ? Math.round((filteredData.filter(item => item.status === 'in_progress').reduce((sum, item) => sum + item.revenue, 0) / stats.totalRevenue) * 100) : 0} 
                      strokeColor="#1890ff"
                      showInfo={false}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Reports; 