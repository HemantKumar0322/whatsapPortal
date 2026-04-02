import React, { useState, useEffect, useCallback } from 'react';
import { Table, Card, Input, Button, Space, Row, Col, Statistic } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { PageTitleSecondary } from '@/components/uiPart';
import { useAppNotification } from '@/hooks/useAppNotification';
import { useGetVendorsQuery } from '@/services/service';

import { logHelper, debounce, isEmpty } from '@/utils';

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


const TAG = "VendorsList page : "
const VendorsList: React.FC = () => {

  const { successToast, errorToast } = useAppNotification();

  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  const [params, setParams] = useState("page=1&limit=10");
  const [meta, setMeta] = useState<any>(null);


  const {
    data: vendorsData,
    isLoading: vendorsLoading,
    // refetch: refetchArticles,
    error: vendorsError
  } = useGetVendorsQuery(params);


  useEffect(() => {
    console.log(TAG, "Vendors data fetched", vendorsData);
    console.log(TAG, " ", vendorsError?.message);
    if (vendorsData) {
      const apiData = handleApiResponseData(vendorsData);
      setData(apiData);
      setFilteredData(apiData);
    } else if (vendorsError) {
      logHelper(TAG, "Error fetching vendors", vendorsError);
      errorToast("Failed to fetch data");
      setData([]);
      setFilteredData([]);
      setMeta(null);
    }
  }, [vendorsData, vendorsError]);

  
  const debouncedSearch = debounce((value: string) => {
    if (!isEmpty(value)) {
      setParams(`page=1&limit=10&search=${value}`);
    } else {
      setParams("page=1&limit=10");
    }
  }, 500);

  const handleApiResponseData = useCallback((vendorsData: any): DataItem[] => {
    console.log("Handling API response data", vendorsData);
    try {
      if (!vendorsData || !vendorsData.data || !vendorsData.data.data) {
        logHelper(TAG, "No data found in API response", vendorsData);
        return [];
      }

      const mappedData = vendorsData.data.data.map((item: any, index: number) => ({
        key: index.toString(),
        id: index + 1,
        name: item?.Name,
        email: item?.Country_Region_Code,
        createdAt: item?.No,
        status: item?.Phone_No,
        category: item?.Location_Code,
        updatedAt: item?.Last_Date_Modified,
        ...item,
      }));

      setMeta(vendorsData.data.metadata);

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
  };

  const columns: ColumnsType<DataItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Number',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      title: 'Country Region Code',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone No',
      dataIndex: 'status',
      key: 'status',

    },
    {
      title: 'Location Code',
      dataIndex: 'category',
      key: 'category',
    },
  ];

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
              onChange={(e) => setSearchText(e.target.value)}
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
          loading={vendorsLoading || loading}
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

export default VendorsList; 