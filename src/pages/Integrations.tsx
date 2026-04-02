import React, { useState } from 'react';
import { Card, Row, Col, Tag, Space } from 'antd';
import {
  GoogleOutlined,
  MessageOutlined,
  LinkOutlined,
  FacebookOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import ButtonSimple from '../components/ButtonSimple';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status?: 'connected' | 'available' | 'coming-soon';
  actions?: string[];
}

const integrationCategories = {
  dataImport: [
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Import contacts from Google Sheets spreadsheets',
      icon: <GoogleOutlined style={{ fontSize: '32px', color: '#4285F4' }} />,
      status: 'connected',
      actions: ['Configure', 'Active'],
    },
  ],
  website: [
    {
      id: 'whatsapp-widget',
      name: 'WhatsApp Chat Widget',
      description: 'Add a floating WhatsApp button to your website',
      icon: <MessageOutlined style={{ fontSize: '32px', color: '#25D366' }} />,
      status: 'available',
      actions: ['Connect'],
    },
  ],
  marketing: [
    {
      id: 'whatsapp-link-generator',
      name: 'WhatsApp Link Generator',
      description: 'Create click-to-chat links with pre-filled messages',
      icon: <LinkOutlined style={{ fontSize: '32px', color: '#0084FF' }} />,
      status: 'available',
      actions: ['Connect'],
    },
  ],
  advertising: [
    {
      id: 'meta-ads',
      name: 'Meta Ads',
      description: 'Create and manage Click-to-WhatsApp ad campaigns',
      icon: <FacebookOutlined style={{ fontSize: '32px', color: '#1877F2' }} />,
      status: 'connected',
      actions: ['Configure', 'Active'],
    },
  ],
  ecommerce: [
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Sync products and orders from your Shopify store',
      icon: <ShopOutlined style={{ fontSize: '32px', color: '#96bf48' }} />,
      status: 'coming-soon',
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      description: 'Connect your WooCommerce store for order notifications',
      icon: <ShopOutlined style={{ fontSize: '32px', color: '#7F54B3' }} />,
      status: 'coming-soon',
    },
  ],
};

const IntegrationCard: React.FC<{ integration: Integration }> = ({ integration }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
    }, 1000);
  };

  return (
    <Card
      hoverable
      className="h-full border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      bodyStyle={{ padding: '24px' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {integration.icon}
          <div className="flex-1">
            <h3 className="font-semibold text-base text-gray-900 mb-1">
              {integration.name}
            </h3>
            <p className="text-sm text-gray-500">{integration.description}</p>
          </div>
        </div>
        <div>
          {integration.status === 'connected' && (
            <Tag color="green">Connected</Tag>
          )}
          {integration.status === 'available' && (
            <Tag color="default">Available</Tag>
          )}
          {integration.status === 'coming-soon' && (
            <Tag color="default">Coming Soon</Tag>
          )}
        </div>
      </div>

      {integration.actions && integration.status !== 'coming-soon' && (
        <Space className="mt-4">
          {integration.actions.map((action, idx) => (
            <ButtonSimple
              key={idx}
              text={action}
              onClick={handleConnect}
              loading={isConnecting}
              size="small"
              type={action === 'Active' ? 'primary' : 'default'}
              className={action === 'Active' ? 'bg-green-500 border-green-500' : ''}
            >
              {action}
            </ButtonSimple>
          ))}
        </Space>
      )}
    </Card>
  );
};

const Integrations: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrations</h1>
        <p className="text-gray-600">Connect your favorite tools and services</p>
      </div>

      {/* Data Import Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Import</h2>
        <Row gutter={[16, 16]}>
          {integrationCategories.dataImport.map((integration) => (
            <Col key={integration.id} xs={24} sm={24} md={12} lg={8}>
              <IntegrationCard integration={integration} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Website Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Website</h2>
        <Row gutter={[16, 16]}>
          {integrationCategories.website.map((integration) => (
            <Col key={integration.id} xs={24} sm={24} md={12} lg={8}>
              <IntegrationCard integration={integration} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Marketing Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Marketing</h2>
        <Row gutter={[16, 16]}>
          {integrationCategories.marketing.map((integration) => (
            <Col key={integration.id} xs={24} sm={24} md={12} lg={8}>
              <IntegrationCard integration={integration} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Advertising Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Advertising</h2>
        <Row gutter={[16, 16]}>
          {integrationCategories.advertising.map((integration) => (
            <Col key={integration.id} xs={24} sm={24} md={12} lg={8}>
              <IntegrationCard integration={integration} />
            </Col>
          ))}
        </Row>
      </div>

      {/* E-commerce Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">E-commerce</h2>
        <Row gutter={[16, 16]}>
          {integrationCategories.ecommerce.map((integration) => (
            <Col key={integration.id} xs={24} sm={24} md={12} lg={8}>
              <IntegrationCard integration={integration} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Integrations;
