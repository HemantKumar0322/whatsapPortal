import React, { useState } from 'react';
import { Card, Row, Col, Table, Space, Empty, Button, Modal, Form, Input } from 'antd';
import { FileOutlined, QuestionCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import ButtonSimple from '../components/ButtonSimple';

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
  invoiceNumber: string;
}

const Invoices: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Mock invoice data
  const invoices: Invoice[] = [];

  const columns = [
    {
      title: 'Invoice #',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === 'paid'
              ? 'bg-green-100 text-green-700'
              : status === 'pending'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button
          type="text"
          icon={<DownloadOutlined />}
          className="text-blue-600 hover:text-blue-800"
        >
          Download
        </Button>
      ),
    },
  ];

  const handleUpdateCard = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(() => {
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Invoices</h1>
          <p className="text-gray-600">View and manage your payment history</p>
        </div>

        {/* Invoice History Section */}
        <Card
          className="mb-6 border border-gray-200 rounded-lg shadow-sm"
          bodyStyle={{ padding: '32px' }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Invoice History</h2>
            <p className="text-gray-600 text-sm">Download past invoices for your records</p>
          </div>

          {invoices.length === 0 ? (
            <div className="py-16">
              <Empty
                description={
                  <div className="text-center">
                    <FileOutlined
                      style={{
                        fontSize: '48px',
                        color: '#93c5fd',
                        marginBottom: '16px',
                        display: 'block',
                      }}
                    />
                    <p className="text-gray-600 mt-4">
                      No invoices found. Once you subscribe, your payment history will appear here.
                    </p>
                  </div>
                }
              />
            </div>
          ) : (
            <Table
              dataSource={invoices}
              columns={columns}
              rowKey="id"
              pagination={false}
              className="bg-white"
            />
          )}
        </Card>

        {/* Payment Method Section */}
        <Card
          className="border border-gray-200 rounded-lg shadow-sm"
          bodyStyle={{ padding: '24px' }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Space size="large">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <QuestionCircleOutlined style={{ fontSize: '24px', color: '#3b82f6' }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                  <p className="text-sm text-gray-600">Securely managed by Stripe</p>
                </div>
              </Space>
            </Col>
            <Col>
              <ButtonSimple
                onClick={handleUpdateCard}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Update Card
              </ButtonSimple>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Update Card Modal */}
      <Modal
        title="Update Payment Method"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save Card"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-6"
        >
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[{ required: true, message: 'Please enter card number' }]}
          >
            <Input placeholder="1234 5678 9012 3456" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[{ required: true, message: 'Please enter expiry date' }]}
              >
                <Input placeholder="MM/YY" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="CVV"
                name="cvv"
                rules={[{ required: true, message: 'Please enter CVV' }]}
              >
                <Input placeholder="123" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Name on Card"
            name="nameOnCard"
            rules={[{ required: true, message: 'Please enter name on card' }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            label="Billing Address"
            name="billingAddress"
            rules={[{ required: true, message: 'Please enter billing address' }]}
          >
            <Input placeholder="123 Main Street" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Invoices;
