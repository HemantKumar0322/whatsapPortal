import React, { useState, useEffect, useCallback } from 'react';
import { Table, Card, Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { PageTitleSecondary } from '@/components/uiPart';
import { useAppNotification } from '@/hooks/useAppNotification';
import { useGetLedgerItemsQuery } from '@/services/service';
import { logHelper, debounce, isEmpty } from '@/utils';

const { Search } = Input;



interface DataItem {
  Entry_No: number,
  Entry_Type: string,
  Item_No: string,
  Posting_Date: string,
  Document_No: string,
  Location_Code: string,
  Quantity: number,
  Remaining_Quantity: number,
  Cost_Amount_Actual: number,
  Item_Description: string,
  key: string;
  id: string;
}


const TAG = "LedgerItems page : "

const LedgerItems: React.FC = () => {

  const { errorToast } = useAppNotification();

  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  const [params, setParams] = useState("page=1&limit=10");
  const [meta, setMeta] = useState<any>(null);
  const [defaultCurrent, setDefaultCurrent] = useState(1);
  const [defaultPageSize, setDefaultPageSize] = useState(10);


  const {
    data: ledgerItemsData,
    isLoading: ledgerItemsLoading,
    // refetch: refetchLedgerItems,
    error: ledgerItemsError,
  } = useGetLedgerItemsQuery(params);



  useEffect(() => {
    console.log(TAG, "Articles data fetched", ledgerItemsData);
    console.log(TAG, " ", ledgerItemsError?.message);
    if (ledgerItemsData) {
      const apiData = handleApiResponseData(ledgerItemsData);
      setData(apiData);
      setFilteredData(apiData);
    } else if (ledgerItemsError) {
      logHelper(TAG, "Error fetching articles", ledgerItemsError);
      errorToast("Failed to fetch data");
      setData([]);
      setFilteredData([]);
      setMeta(null);
    }
  }, [ledgerItemsData, ledgerItemsError]);

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

  const handleApiResponseData = useCallback((ledgerItemsData: any): DataItem[] => {
    console.log("Handling API response data", ledgerItemsData);
    try {
      if (!ledgerItemsData || !ledgerItemsData.data || !ledgerItemsData.data.data) {
        logHelper(TAG, "No data found in API response", ledgerItemsData);
        return [];
      }

      const mappedData = ledgerItemsData.data.data.map((item: any, index: number) => ({
        key: index.toString(),
        id: index + 1,
        name: item?.Entry_Type,
        email: item?.Posting_Date,
        createdAt: item?.Item_No,
        status: item?.Document_No,
        category: item?.Location_Code,
        updatedAt: item?.Item_Description,
        ...item,
      }));

      setMeta(ledgerItemsData.data.metadata);

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
      title: 'Sr. No',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Entry Type',
      dataIndex: 'Entry_Type',
      key: 'Entry_Type',
      sorter: (a, b) => a.Entry_Type.localeCompare(b.Entry_Type),
    },
    {
      title: 'Item No',
      dataIndex: 'Item_No',
      key: 'Item_No',
    },
    {
      title: 'Posting Date',
      dataIndex: 'Posting_Date',
      key: 'Posting_Date',

    },
    {
      title: 'Document No',
      dataIndex: 'Document_No',
      key: 'Document_No',
    },
    {
      title: 'Location Code',
      dataIndex: 'Location_Code',
      key: 'Location_Code',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
    },
    {
      title: 'Remaining Quantity',
      dataIndex: 'Remaining_Quantity',
      key: 'Remaining_Quantity',
    },
    {
      title: 'Cost Amount Actual',
      dataIndex: 'Cost_Amount_Actual',
      key: 'Cost_Amount_Actual',
    },
    {
      title: 'Item Description',
      dataIndex: 'Item_Description',
      key: 'Item_Description',
    },

  ];

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden max-h-full">
      <div className="mb-6">
        <PageTitleSecondary title="Data Management" />
      </div>

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
        </Row>
      </Card>

      {/* Data Table */}
      <Card className="flex-1">
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={ledgerItemsLoading || loading}
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

export default LedgerItems; 