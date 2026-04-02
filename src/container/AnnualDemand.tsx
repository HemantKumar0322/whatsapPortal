import { LineChart } from './BarChart';
import { Table } from 'antd';
import { Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface HistoricalData {
  month: string;
  opening: number;
  receipts: number;
  demand: number;
  closing: number;
  [key: string]: any; // Allow additional properties
}

const AnnualDemand = (props: any) => {

  const { historicalData } = props;

  const historicalColumns: ColumnsType<HistoricalData> = [
    {
      title: 'Document_Date',
      dataIndex: 'Document_Date',
      key: 'Document_Date',
      width: 120,
    },
    {
      title: 'Entry No',
      dataIndex: 'Entry_No',
      key: 'Entry_No',
      render: (value: number) => value === 0 ? '—' : value.toLocaleString(),
    },
    {
      title: 'Entry Type',
      dataIndex: 'Entry_Type',
      key: 'Entry_Type',
      render: (value: string) => value === '' ? '—' : value,
    },
    {
      title: 'Lot No',
      dataIndex: 'Lot_No',
      key: 'Lot_No',
      render: (value: string) => value === '' ? '—' : value,
    },
    {
      title: 'Document Type',
      dataIndex: 'Document_Type',
      key: 'Document_Type',
      render: (value: string) => value === '' ? '—' : value,
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
      render: (value: string) => value === '' ? '—' : value,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="line-chart" className="font-medium text-gray-700">
          Stock Prediction
        </label>
        <div className="flex border rounded overflow-hidden text-sm bg-gray-50">
          {["1 Month", "6 Months", "18 Months"].map((label, idx) => (
            <span
              key={label}
              className={`px-2 py-1 ${idx < 2 ? "border-r" : ""} text-gray-600`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <LineChart />
      <Title level={5} className="!mb-3">Monthly Data</Title>
      <Table
        columns={historicalColumns}
        dataSource={historicalData}
        pagination={false}
        size="small"
        rowKey="month"
        className="custom-table-separator"
        scroll={{ x: 'max-content', y: 810 }}
      />
    </div>
  )
}

export default AnnualDemand;
