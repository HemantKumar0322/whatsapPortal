import React from 'react';
import { Typography, Card, Row, Col, Statistic } from 'antd';
import { IconUser, IconFile, IconTeam, IconDashboard } from '@/utils/icons';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div>
      <Title level={2}>Welcome to SITE Admin</Title>
      <Paragraph>
        This is the home page of your application. Navigate through the sidebar to explore different sections.
      </Paragraph>
      
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={1128}
              prefix={<IconUser />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Files"
              value={93}
              prefix={<IconFile />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Team Members"
              value={56}
              prefix={<IconTeam />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Projects"
              value={12}
              prefix={<IconDashboard />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home; 