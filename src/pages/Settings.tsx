import React, { useState } from 'react';
import { Tabs, Card, Row, Col, Form, Switch, Upload, Table, Input, Select, Button } from 'antd';
import { LockOutlined, DownloadOutlined, UserAddOutlined, PlusOutlined, CheckCircleOutlined, WarningOutlined, EnvironmentOutlined, PictureOutlined, AppstoreOutlined, InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { PageTitleWithDescription } from '@/components/uiPart';

const Settings: React.FC = () => {
  const [accountForm] = Form.useForm();
  const [apiForm] = Form.useForm();
  const [profileForm] = Form.useForm();
  const [teamEmail, setTeamEmail] = useState('');
  const [teamRole, setTeamRole] = useState('member');
  const [newMessageAlerts, setNewMessageAlerts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const teamMembers = [
    {
      key: '1',
      user: 'Harsh Tank',
      role: 'Admin',
      joined: '2024-01-15',
    },
  ];

  const teamColumns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Joined',
      dataIndex: 'joined',
      key: 'joined',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Button type="text" danger size="small">
          Remove
        </Button>
      ),
    },
  ];

  // Tab content components
  const accountAndApiTab = (
    <div className="pt-5">
      {/* Account Profile Section */}
      <Card className="mb-5">
        <div className="flex items-center mb-5">
          <UserAddOutlined className="text-2xl mr-3 text-blue-500" />
          <div>
            <h3 className="m-0 font-semibold">Account Profile</h3>
            <p className="m-0 text-gray-500 text-sm">Update your internal business profile</p>
          </div>
        </div>

        <Form form={accountForm} layout="vertical">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12}>
              <Form.Item label="Email">
                <Input placeholder="harsh.tank@systrocode.tech" disabled className="bg-gray-100" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Business Name">
                <Input placeholder="Systrocode Technologies Private Limited" defaultValue="Systrocode Technologies Private Limited" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Phone Number">
                <Input placeholder="+91-9672040455" defaultValue="+91-9672040455" />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" className="bg-green-500 hover:bg-green-600">
            Save Account Details
          </Button>
        </Form>
      </Card>

      {/* WhatsApp API Configuration Section */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <LockOutlined className="text-2xl mr-3 text-green-500" />
            <div>
              <h3 className="m-0 font-semibold">WhatsApp API Configuration</h3>
              <p className="m-0 text-gray-500 text-sm">Connect your Meta Business Account</p>
            </div>
          </div>
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded text-xs font-medium">
            Connected
          </span>
        </div>

        <Form form={apiForm} layout="vertical">
          <Form.Item label={<span className="flex items-center gap-2"><WarningOutlined className="text-amber-500" /> Access Token (System User)</span>}>
            <Input type="password" defaultValue="••••••••" placeholder="••••••••" />
            <Button className="mt-2">Save</Button>
          </Form.Item>

          <Row gutter={[20, 20]}>
            <Col xs={24} md={12}>
              <Form.Item label="Phone Number ID">
                <Input placeholder="89928901327131" defaultValue="89928901327131" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="WABA ID (Business Account ID)">
                <Input placeholder="13968325487665554" defaultValue="13968325487665554" />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" className="bg-green-500 hover:bg-green-600">
            Save Configuration
          </Button>
        </Form>
      </Card>
    </div>
  );

  const whatsappProfileTab = (
    <div className="pt-5">
      <Card>
        <div className="flex items-center mb-5">
          <CheckCircleOutlined className="text-2xl mr-3 text-green-500" />
          <div>
            <h3 className="m-0 font-semibold">WhatsApp Business Profile</h3>
            <p className="m-0 text-green-500"><strong>Synced with Meta</strong></p>
          </div>
        </div>

        <Form form={profileForm} layout="vertical">
          <Form.Item label="About / Description" required>
            <Input.TextArea placeholder="Tell customers about your business..." maxLength={256} rows={4} />
          </Form.Item>
          <p className="text-xs text-gray-500">Max 256 characters.</p>

          <Row gutter={[20, 20]} className="mt-5">
            <Col xs={24} md={12}>
              <Form.Item label={<span className="flex items-center gap-2"><EnvironmentOutlined className="text-red-500" /> Address</span>}>
                <Input placeholder="A-15 Ashok Vihar near sector-15 girdhor marg malviya nagar Jk" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={<span className="flex items-center gap-2"><CheckCircleOutlined /> Business Email</span>}>
                <Input placeholder="support@avelo.in" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={<span className="flex items-center gap-2"><CheckCircleOutlined className="text-green-500" /> Website 1</span>}>
                <Input placeholder="https://avelo.in/" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={<span className="flex items-center gap-2"><PictureOutlined /> Profile Picture</span>}>
                <Upload maxCount={1}>
                  <Button>Choose File</Button>
                </Upload>
                <p className="text-xs text-gray-500 mt-2">Square JPG or PNG, min 640x640px.</p>
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" className="bg-green-500 hover:bg-green-600">
            Sync to WhatsApp
          </Button>
        </Form>
      </Card>
    </div>
  );

  const automationChatTab = (
    <div className="pt-5">
      {/* Ice Breakers */}
      <Card className="mb-5">
        <div className="flex items-center mb-5">
          <AppstoreOutlined className="text-2xl mr-3 text-green-500" />
          <div>
            <h3 className="m-0 font-semibold">Ice Breakers</h3>
            <p className="m-0 text-gray-500 text-sm">Buttons shown to new customers when they open a chat with you. (Max 4 items)</p>
          </div>
        </div>
        <Button type="dashed" icon={<PlusOutlined />}>
          Add Ice Breaker
        </Button>
      </Card>

      {/* Commands */}
      <Card className="mb-5">
        <div className="flex items-center mb-5">
          <InfoCircleOutlined className="text-2xl mr-3 text-blue-500" />
          <div>
            <h3 className="m-0 font-semibold">Commands</h3>
            <p className="m-0 text-gray-500 text-sm">Menu shortcuts that appear when users type '/' in the chat. (e.g., /help, /reset)</p>
          </div>
        </div>
        <Button type="dashed" icon={<PlusOutlined />}>
          Add Command
        </Button>
      </Card>

      {/* Welcome Message */}
      <Card className="mb-5">
        <div className="flex items-center mb-5">
          <InfoCircleOutlined className="text-2xl mr-3 text-blue-500" />
          <div>
            <h3 className="m-0 font-semibold">Welcome Message</h3>
            <p className="m-0 text-gray-500 text-sm">Automatically greet users when they send their first message.</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
          <div>
            <p className="m-0 font-medium">Enable Welcome Message</p>
            <p className="m-0 text-xs text-gray-500">This is a standard Meta feature availability may vary.</p>
          </div>
          <Switch checked={true} />
        </div>
      </Card>

      <Button type="primary" className="bg-green-500 hover:bg-green-600 mt-5">
        Save Changes
      </Button>
    </div>
  );

  const myTeamTab = (
    <div className="pt-5">
      {/* Invite New Member */}
      <Card className="mb-5">
        <h3 className="mb-3 font-semibold">Invite New Member</h3>
        <p className="text-gray-500 mb-4 text-sm">Send an email invitation to add a new user to your team.</p>

        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} md={10}>
            <Input
              placeholder="colleague@company.com"
              value={teamEmail}
              onChange={(e) => setTeamEmail(e.target.value)}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select value={teamRole} onChange={setTeamRole} className="w-full">
              <Select.Option value="member">Member</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Button type="primary" className="bg-green-500 hover:bg-green-600 w-full">
              Send Invite
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Team Members */}
      <Card>
        <h3 className="font-semibold">Team Members</h3>
        <Table columns={teamColumns} dataSource={teamMembers} pagination={false} />
      </Card>
    </div>
  );

  const privacySecurityTab = (
    <div className="pt-5">
      {/* Data Portability */}
      <Card className="mb-5">
        <div className="flex items-center mb-5">
          <LockOutlined className="text-2xl mr-3 text-amber-500" />
          <div>
            <h3 className="m-0 font-semibold">Data Portability (GDPR Art. 20)</h3>
            <p className="m-0 text-gray-500 text-sm">You have the right to request a copy of your personal data.</p>
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <p className="m-0 mb-3 font-medium">Export Personal Data</p>
          <p className="m-0 text-sm text-gray-500 mb-4">Download your profile, contacts, and settings in JSON format.</p>
          <Button icon={<DownloadOutlined />} className="text-blue-600 border-blue-600">
            Download Data
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <div className="flex items-center mb-5">
          <ExclamationCircleOutlined className="text-2xl mr-3 text-red-500" />
          <div>
            <h3 className="m-0 font-semibold text-red-500">Danger Zone</h3>
            <p className="m-0 text-gray-500 text-sm">Irreversible actions regarding your account.</p>
          </div>
        </div>

        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="m-0 mb-1 font-medium text-red-500">Delete Account</p>
          <p className="m-0 text-sm text-red-600 mb-4">Permanently delete your account and all associated data.</p>
          <Button danger>
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );

  const notificationsTab = (
    <div className="pt-5">
      <Card>
        <h3 className="mb-6 font-semibold">Notification Preferences</h3>

        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <p className="m-0 font-medium">New message alerts</p>
          </div>
          <Switch checked={newMessageAlerts} onChange={setNewMessageAlerts} />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div>
            <p className="m-0 font-medium">Email notifications</p>
          </div>
          <Switch checked={emailNotifications} onChange={setEmailNotifications} />
        </div>
      </Card>
    </div>
  );

  const tabItems: TabsProps['items'] = [
    {
      key: 'account-api',
      label: 'Account & API',
      children: accountAndApiTab,
    },
    {
      key: 'whatsapp-profile',
      label: 'WhatsApp Public Profile',
      children: whatsappProfileTab,
    },
    {
      key: 'automation-chat',
      label: 'Automation & Chat',
      children: automationChatTab,
    },
    {
      key: 'my-team',
      label: 'My Team',
      children: myTeamTab,
    },
    {
      key: 'privacy-security',
      label: 'Privacy & Security',
      children: privacySecurityTab,
    },
    {
      key: 'notifications',
      label: 'Notifications',
      children: notificationsTab,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
        <PageTitleWithDescription
          title="Settings"
          description="Manage your account and WhatsApp Business settings"
        />
      </div>

      <div className="">
        <Tabs items={tabItems} />
      </div>
    </div>
  );
};

export default Settings;
