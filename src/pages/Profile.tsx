import React, { useState } from 'react';
import { Card, Form, Input, Button, Avatar, Upload, message, Divider, Row, Col, Typography } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, UploadOutlined } from '@ant-design/icons';

import { PageTitleSecondary } from '@/components/uiPart';
import { useAppNotification } from '@/hooks/useAppNotification';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { successToast, errorToast } = useAppNotification();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      successToast('Profile updated successfully!');
    } catch (error) {
      errorToast('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'avatar',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden max-h-full">
      <div className="mb-6">
        <PageTitleSecondary title="Profile Settings" />
      </div>

      <Row gutter={[24, 24]} className="flex-1">
        <Col xs={24} lg={8}>
          <Card className="h-fit">
            <div className="text-center">
              <Avatar 
                size={120} 
                icon={<UserOutlined />} 
                className="mb-4"
                src="https://i.ibb.co/chNczQZ6/icon-7797704-1280.png"
              />
              <Title level={4} className="mb-2">John Doe</Title>
              <Text type="secondary">Administrator</Text>
              
              <Divider />
              
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} className="w-full">
                  Change Avatar
                </Button>
              </Upload>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Personal Information">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '+1 234 567 8900',
                company: 'UPURCHASE',
                address: '123 Business Street, City, Country',
                position: 'Administrator'
              }}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please enter your first name!' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please enter your last name!' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please enter your phone number!' }]}
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Company"
                    name="company"
                    rules={[{ required: true, message: 'Please enter your company name!' }]}
                  >
                    <Input placeholder="Company Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Position"
                    name="position"
                    rules={[{ required: true, message: 'Please enter your position!' }]}
                  >
                    <Input placeholder="Position" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please enter your address!' }]}
              >
                <Input prefix={<EnvironmentOutlined />} placeholder="Address" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile; 