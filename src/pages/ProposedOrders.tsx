import React, { useState, useEffect, useCallback } from 'react';
import { Table, Card, Input, Button, Space, Row, Col, Statistic } from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { PageTitleSecondary } from '@/components/uiPart';
import { useAppNotification } from '@/hooks/useAppNotification';
import { useGetProposeOrderQuery } from '@/services/service';
import { logHelper, debounce, isEmpty } from '@/utils';
import SelectCustom from '@/components/SelectCustom';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

interface DataItem {
  key: string;
  id: string;
  // name: string;
  // email: string;
  // status: 'active' | 'inactive' | 'pending';
  // category: string;
  // createdAt: string;
  // updatedAt: string;
  [key: string]: any; // Allow additional properties
}


const TAG: string = "ProposedOrders page : ";

const ProposedOrders: React.FC = () => {

  const navigate = useNavigate();
  const { errorToast } = useAppNotification();
  
  // const [data, setData] = useState<DataItem[]>([]);
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  const [params, setParams] = useState("page=1&limit=10");
  const [meta, setMeta] = useState<any>(null);

  const {
    data: getProposeOrder,
    isLoading: proposeLoading,
    refetch: refetchProposeOrder,
    error: proposeOrderError
  } = useGetProposeOrderQuery(params);

  useEffect(() => {
    console.log(TAG, "Proposed Order data fetched", getProposeOrder);
    console.log(TAG, " ", proposeOrderError?.message);
    if (getProposeOrder) {
      const apiData = handleApiResponseData(getProposeOrder);
      // setData(apiData);
      setFilteredData(apiData);
    } else if (proposeOrderError) {
      logHelper(TAG, "Error fetching proposed orders", proposeOrderError);
      errorToast("Failed to fetch data");
      // setData([]);
      setFilteredData([]);
      setMeta(null);
    }
  }, [getProposeOrder, proposeOrderError]);


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
  }



  const columns: ColumnsType<DataItem> = [
    {
      title: 'Sr.No',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Item No',
      dataIndex: 'item_no',
      key: 'item_no',
      sorter: (a, b) => a.item_no.localeCompare(b.item_no),
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
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'ROP',
      dataIndex: 'rop',
      key: 'rop',
      sorter: (a, b) => a.rop - b.rop,
    },
    {
      title: 'Safety Stock',
      dataIndex: 'safety_stock',
      key: 'safety_stock',
    },
    {
      title: 'DDLT',
      dataIndex: 'ddlt',
      key: 'ddlt',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'Suggested Qty',
      dataIndex: 'suggested_qty',
      key: 'suggested_qty',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
  ];



  const stats = {
    total: 0,
    active: 0,
    pending: 0,
    inactive: 0,
  };

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden max-h-full">
      <div className="mb-6">
        <PageTitleSecondary title="Proposed Order Lines" />
      </div>

      {/* Statistics Cards */}
      <Row gutter={16} className="mb-6 hidden">
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Total Proposed Lines" value={stats.total} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Total Proposed Qty" value={stats.active} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Avg. Coverage (weeks)" value={stats.pending} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="At-Risk Items" value={stats.inactive} valueStyle={{ color: '#cf1322' }} />
          </Card>
        </Col>
      </Row>

      {/* Search and Actions */}
      <Card className="mb-6">
        <Row gutter={12} align="middle" justify="end">
          <Col xs={24} sm={12} className="hidden">
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
          <Col xs={24} sm={12} className="text-end">
            <Space>
              <SelectCustom
                // label="Select Vendor"
                placeholder="Select Vendor"
                style={{ width: 180 }}
                size="large"
                allowClear
                options={[
                  { label: 'Vendor A', value: 'A' },
                  { label: 'Vendor B', value: 'B' },
                  { label: 'Vendor C', value: 'C' },
                ]}
                onChange={(value: any) => {
                  console.log(TAG, `Selected vendor: ${value}`);
                }}
              />
              <SelectCustom
                // label="Select Vendor"
                placeholder="Select period"
                style={{ width: 180 }}
                size="large"
                allowClear
                options={[
                  { label: 'Period A', value: 'A' },
                  { label: 'Period B', value: 'B' },
                  { label: 'Period C', value: 'C' },
                ]}
                onChange={(value: any) => {
                  console.log(TAG, `Selected period: ${value}`);
                }}
              />
              <Button
                icon={<RedoOutlined />}
                size="large"
                onClick={() => {
                  // handle refetch or filter action
                  console.log(TAG, 'Refetching data...');
                  refetchProposeOrder();
                }}
              />

            </Space>
          </Col>
        </Row>
      </Card>

      {/* Data Table */}
      <Card className="flex-1">
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={proposeLoading || loading}
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

export default ProposedOrders; 