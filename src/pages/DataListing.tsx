import React, { useState, useEffect, useCallback } from 'react';
import { Table, Card, Input, Button, Space, Modal, Form, Select, Row, Col, Statistic } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { PageTitleSecondary } from '@/components/uiPart';
import { useAppNotification } from '@/hooks/useAppNotification';
import { useGetArticlesQuery } from '@/services/service';
import { logHelper, debounce, isEmpty } from '@/utils';
import { useNavigate } from 'react-router';

const { Search } = Input;

interface DataItem {
  key: string;
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  category: string;
  createdAt: string;
  updatedAt: string;
}


const TAG: string = "DataListing page : ";

const DataListing: React.FC = () => {

    const navigate = useNavigate();
    const { errorToast } = useAppNotification();

  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);
  const [form] = Form.useForm();

  const [params, setParams] = useState("page=1&limit=10");
  const [meta, setMeta] = useState<any>(null);
  const [defaultCurrent, setDefaultCurrent] = useState(1);
  const [defaultPageSize, setDefaultPageSize] = useState(10);

  const {
    data: articlesData,
    isLoading: articlesLoading,
    // refetch: refetchArticles,
    error: articlesError
  } = useGetArticlesQuery(params);

  useEffect(() => {
    console.log(TAG, "Articles data fetched", articlesData);
    console.log(TAG, " ", articlesError?.message);
    if (articlesData) {
      const apiData = handleApiResponseData(articlesData);
      setData(apiData);
      setFilteredData(apiData);
    } else if (articlesError) {
      logHelper(TAG, "Error fetching articles", articlesError);
      errorToast("Failed to fetch data");
      setData([]);
      setFilteredData([]);
      setMeta(null);
    }
  }, [articlesData, articlesError]);

  // useEffect(() => {
  //   debouncedSearch(searchText);
  // }, [searchText]);

  const debouncedSearch = debounce((value: string) => {
    if (!isEmpty(value)) {
      setParams(`page=1&limit=10&search=${value}`);
    } else {
      setParams("page=1&limit=10");
    }
  }, 500);

  const handleApiResponseData = useCallback((articlesData: any): DataItem[] => {
    console.log("Handling API response data", articlesData);
    try {
      if (!articlesData || !articlesData.data || !articlesData.data.data) {
        logHelper(TAG, "No data found in API response", articlesData);
        return [];
      }

      const mappedData = articlesData.data.data.map((item: any, index: number) => ({
        key: index.toString(),
        id: index + 1,
        name: item?.assemblyPolicy,
        email: item?.baseUnitOfMeasure,
        status: item?.itemCategoryCode,
        category: item?.description,
        createdAt: item?.no,
        updatedAt: item?.itemCategoryCode,
        ...item,
      }));

      setMeta(articlesData.data.metadata);

      logHelper(TAG, "Successfully mapped API data", { count: mappedData.length });
      return mappedData;
    } catch (error) {
      logHelper(TAG, "Error mapping API data", error);
      errorToast("Failed to process data from server");
      return [];
    }
  }, [errorToast]);

  const callPaginationAction = (page: number, limit: number) => {
    console.log(`page=${page}&limit=${limit}`);

    setParams(`page=${page}&limit=${limit}`);
    setDefaultCurrent(page);
    setDefaultPageSize(limit);
  }

  const columns: ColumnsType<DataItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Assembly Policy',
      dataIndex: 'assemblyPolicy',
      key: 'assemblyPolicy',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Item No',
      dataIndex: 'createdAt',
      key: 'createdAt',
      // sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      render: (text) => (
        <span
          className='text-red-500 cursor-pointer'
          onClick={() => navigate(`/items?item_no=${text}`)}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Unit Of Measure',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Category Code',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const stats = {
    total: data.length,
    active: data.filter(item => item.status === 'active').length,
    pending: data.filter(item => item.status === 'pending').length,
    inactive: data.filter(item => item.status === 'inactive').length,
  };

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden max-h-full">
      <div className="mb-6">
        <PageTitleSecondary title="Data Management" />
      </div>

      {/* Statistics Cards */}
      <Row gutter={16} className="mb-6 hidden">
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Total Records" value={stats.total} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Active" value={stats.active} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Pending" value={stats.pending} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Inactive" value={stats.inactive} valueStyle={{ color: '#cf1322' }} />
          </Card>
        </Col>
      </Row>

      {/* Search and Actions */}
      <Card className="mb-6">
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12}>
            <Search
              placeholder="Search by Number"
              allowClear
              enterButton={<SearchOutlined onClick={() => debouncedSearch(searchText)} />}
              size="large"
              value={searchText}
              onChange={(e: any) => setSearchText(e.target.value)}
              onPressEnter={() => debouncedSearch(searchText)}
            />
          </Col>
          <Col xs={24} sm={12} className="text-right hidden">
            <Space>
              <Button icon={<FilterOutlined />} size="large">
                Filters
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={handleAdd}
              >
                Add New
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Data Table */}
      <Card className="flex-1">
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={articlesLoading || loading}
          pagination={{
            total: meta?.total,
            current: meta?.page,
            pageSize: meta?.limit,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            onChange: (currentPage, size) => callPaginationAction(currentPage, size),
            onShowSizeChange: (currentPage, size) => callPaginationAction(currentPage, size)

          }}
          scroll={{ x: "max-content" }}
        />
      </Card>

    </div>
  );
};

export default DataListing; 