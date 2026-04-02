
import { BarChart } from './BarChart';
import { Table } from 'antd';
import { Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

const { Title } = Typography;

interface HistoricalData {
  month: string;
  opening: number;
  receipts: number;
  demand: number;
  closing: number;
  [key: string]: any; // for other keys
}

const DemandForcast = (props: any) => {

  const { historicalData, articlesData } = props;

  const [formattedData, setFormattedData] = useState<any[]>([]);

  useEffect(() => {
    if (articlesData) {
      const formatted = [];
      if (articlesData?.forecast?.monthly_forecast) {
        formatted.push({ item_No: articlesData.no, ...articlesData.forecast.monthly_forecast });
      }

      if (articlesData?.forecast?.child_forecast) {
        formatted.push(...articlesData.forecast.child_forecast.map((item: any) => ({
          item_No: item.no,
          ...item.monthly_forecast
        })));
      }
      setFormattedData(formatted);
    }
  }, [articlesData]);

  const dateKeys = useMemo(() => {
    if (formattedData.length === 0) return [];
    return Object.keys(formattedData[0]).filter((k) => k !== 'item_No');
  }, [formattedData]);

  const columns = () => dateKeys.map(date => ({
    title: dayjs(date).format("MMM"),
    dataIndex: date,
    key: date,
    align: 'center' as const,
    render: (value: number) => value?.toFixed(2)
  }));

  const forcastColumns: ColumnsType<any> = useMemo(() => [
    {
      title: 'Item No',
      dataIndex: 'item_No',
      key: 'item_No',
      render: (text) => <span className="whitespace-pre-wrap">{text}</span>,
    },
    ...columns()
  ], [formattedData]);

  const historicalColumns: ColumnsType<HistoricalData> = [
    {
      title: 'Document Date',
      dataIndex: 'Document_Date',
      key: 'Document_Date',
      width: 120,
    },
    {
      title: 'Entry No',
      dataIndex: 'Entry_No',
      key: 'Entry_No',
      width: 100,
      render: (value: number) => value === 0 ? '—' : value.toLocaleString(),
    },
    {
      title: 'Entry Type',
      dataIndex: 'Entry_Type',
      key: 'Entry_Type',
      width: 120,
      render: (value: string) => value === '' ? '—' : value,
    },
    {
      title: 'Lot No',
      dataIndex: 'Lot_No',
      key: 'Lot_No',
      width: 100,
      render: (value: string) => value === '' ? '—' : value,
    },
    {
      title: 'Document Type',
      dataIndex: 'Document_Type',
      key: 'Document_Type',
      width: 120,
      render: (value: string) => value === '' ? '—' : value,
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
      width: 100,
      render: (value: string) => value === '' ? '—' : value,
    },
  ];

  return (
    <div>
      <BarChart />
      {formattedData.length > 0 &&
        <div className='mb-5'>
          <Title level={5} className="">Forcast Data</Title>
          <Table
            columns={forcastColumns}
            dataSource={formattedData}
            pagination={false}
            size="small"
            rowKey="month"
            className="custom-table-separator"
            scroll={{ x: 'max-content', y: 310 }}
          // rowClassName='scrollbar-hide'
          />
        </div>
      }
      <Title level={5} className="">Monthly Data</Title>
      <Table
        columns={historicalColumns}
        dataSource={historicalData}
        pagination={false}
        size="small"
        rowKey="month"
        className="custom-table-separator"
        scroll={{ x: 'max-content', y: 600 }}
      // rowClassName='scrollbar-hide'
      />
    </div>
  )
}

export default DemandForcast;
