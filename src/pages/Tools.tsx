import React, { useState } from 'react';
import { Card, Row, Col, Tag, Button, Tabs,  message, Input } from 'antd';
import { 
  CopyOutlined, 
  DownloadOutlined, 
  InfoCircleOutlined,
  QrcodeOutlined,
  CodeOutlined
} from '@ant-design/icons';
import InputCustom from '../components/InputCustom';
import InputTextarea from '../components/InputTextarea';
import SelectCustom from '../components/SelectCustom';
import ButtonSimple from '../components/ButtonSimple';

const Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('link-generator');
  const [phoneNumber, setPhoneNumber] = useState('9610986797');
  const [preFillMessage, setPreFillMessage] = useState('hemant');
  const [whatsappNumber, setWhatsappNumber] = useState('9610986797');
  const [welcomeMessage, setWelcomeMessage] = useState('Hello! How can we help you?');
  const [buttonText, setButtonText] = useState('Chat with us');
  const [position, setPosition] = useState('bottom-right');
  const [theme, setTheme] = useState('whatsapp-green');

  const generatedLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${preFillMessage.replace(/\s/g, '%20')}`;
  const widgetCode = `<script async src="https://your-domain.com/widget.js"></script>
<script>
  window.WhatsAppWidget = {
    phoneNumber: "${whatsappNumber}",
    welcomeMessage: "${welcomeMessage}",
    buttonText: "${buttonText}",
    position: "${position}",
    theme: "${theme}"
  };
</script>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    message.success('Link copied to clipboard!');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(widgetCode);
    message.success('Code copied to clipboard!');
  };

  const handleDownloadQR = () => {
    message.success('QR code download started!');
  };

  const positionOptions = [
    { label: 'Bottom Right', value: 'bottom-right' },
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Top Right', value: 'top-right' },
    { label: 'Top Left', value: 'top-left' },
  ];

  const themeOptions = [
    { label: 'WhatsApp Green', value: 'whatsapp-green' },
    { label: 'Dark Mode', value: 'dark' },
    { label: 'Light Mode', value: 'light' },
    { label: 'Custom', value: 'custom' },
  ];

  return (
    <div className=" min-h-screen ">
      {/* Header */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">WhatsApp Tools</h1>
        <p className="text-gray-600 mt-1">Free tools to grow your WhatsApp presence</p>
      </div>

      {/* Tab Toggles */}
      <div className="mb-8 flex gap-3 px-6">
        <Tag 
          color={activeTab === 'link-generator' ? 'green' : 'default'}
          className="px-4 py-2 cursor-pointer font-medium rounded-full"
          onClick={() => setActiveTab('link-generator')}
        >
          Link Generator
        </Tag>
        <Tag 
          color={activeTab === 'chat-widget' ? 'green' : 'default'}
          className="px-4 py-2 cursor-pointer font-medium rounded-full"
          onClick={() => setActiveTab('chat-widget')}
        >
          Chat Widget
        </Tag>
      </div>

      {/* Link Generator Tab */}
      {activeTab === 'link-generator' && (
        <Row gutter={[24, 24]}>
          {/* Create WhatsApp Link */}
          <Col xs={24} lg={12}>
            <Card className="shadow-sm border-0 h-full">
              <div className="flex items-center gap-2 mb-2">
                <InfoCircleOutlined className="text-blue-500 text-lg" />
                <h3 className="text-lg font-semibold text-gray-900">Create WhatsApp Link</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6">Generate click-to-chat links with pre-filled messages</p>

              <div className="space-y-6">
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                  <InputCustom 
                    value={phoneNumber}
                    onChange={(e:any) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="!bg-blue-50 !border-blue-200"
                  />
                  <p className="text-xs text-gray-500 mt-2">Include country code (e.g., +91 for India, +1 for US)</p>
                </div>

                {/* Pre-filled Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Pre-filled Message (Optional)</label>
                  <InputTextarea 
                    value={preFillMessage}
                    onChange={(e:any) => setPreFillMessage(e.target.value)}
                    placeholder="Enter message that will be pre-filled"
                    rows={4}
                    className="!border-green-300 border-2"
                  />
                  <p className="text-xs text-gray-500 mt-2">This message will be pre-filled when someone clicks the link</p>
                </div>

                <ButtonSimple 
                  type="primary"
                  className="!bg-blue-500 hover:!bg-blue-600 !text-white"
                >
                  Generate Link
                </ButtonSimple>
              </div>
            </Card>
          </Col>

          {/* Your WhatsApp Link */}
          <Col xs={24} lg={12}>
            <Card className="shadow-sm border-0 h-full">
              <div className="flex items-center gap-2 mb-2">
                <QrcodeOutlined className="text-blue-500 text-lg" />
                <h3 className="text-lg font-semibold text-gray-900">Your WhatsApp Link</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6">Use this link on your website, social media, or marketing materials</p>

              <div className="space-y-6">
                {/* Generated Link */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Generated Link</label>
                  <div className="flex gap-2">
                    <Input
                      value={generatedLink}
                      readOnly
                      className="!bg-gray-100 text-xs"
                    />
                    <Button 
                      icon={<CopyOutlined />}
                      onClick={handleCopyLink}
                      className="px-4"
                    />
                  </div>
                </div>

                {/* QR Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">QR Code</label>
                  <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center min-h-[250px]">
                    <div className="w-32 h-32 bg-white border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <QrcodeOutlined className="text-4xl text-gray-300" />
                    </div>
                    <p className="text-gray-500 text-sm mt-4">WhatsApp QR Code</p>
                  </div>
                  <Button 
                    icon={<DownloadOutlined />}
                    onClick={handleDownloadQR}
                    className="w-full mt-4"
                  >
                    Download QR Code
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      )}

      {/* Chat Widget Tab */}
      {activeTab === 'chat-widget' && (
        <Row gutter={[24, 24]}>
          {/* Configure Widget */}
          <Col xs={24} lg={12}>
            <Card className="shadow-sm border-0 h-full">
              <div className="flex items-center gap-2 mb-2">
                <InfoCircleOutlined className="text-blue-500 text-lg" />
                <h3 className="text-lg font-semibold text-gray-900">Configure Widget</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6">Customize your floating WhatsApp chat button</p>

              <div className="space-y-6">
                {/* WhatsApp Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">WhatsApp Number</label>
                  <InputCustom 
                    value={whatsappNumber}
                    onChange={(e:any) => setWhatsappNumber(e.target.value)}
                    placeholder="Enter WhatsApp number"
                  />
                </div>

                {/* Welcome Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Welcome Message</label>
                  <InputTextarea 
                    value={welcomeMessage}
                    onChange={(e:any) => setWelcomeMessage(e.target.value)}
                    placeholder="Enter welcome message"
                    rows={3}
                  />
                </div>

                {/* Button Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Button Text</label>
                  <InputCustom 
                    value={buttonText}
                    onChange={(e:any) => setButtonText(e.target.value)}
                    placeholder="e.g., Chat with us"
                  />
                </div>

                {/* Position & Theme */}
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={12}>
                    <SelectCustom 
                      label="Position"
                      value={position}
                      onChange={(value:any) => setPosition(value)}
                      options={positionOptions}
                      className="!border-green-300"
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <SelectCustom 
                      label="Theme"
                      value={theme}
                      onChange={(value:any) => setTheme(value)}
                      options={themeOptions}
                      className="!border-green-300"
                    />
                  </Col>
                </Row>

                <ButtonSimple 
                  type="primary"
                  className="!bg-green-500 hover:!bg-green-600 !text-white"
                >
                  Save Configuration
                </ButtonSimple>
              </div>
            </Card>
          </Col>

          {/* Widget Code & Preview */}
          <Col xs={24} lg={12}>
            <Card className="shadow-sm border-0 h-full">
              <div className="flex items-center gap-2 mb-2">
                <CodeOutlined className="text-blue-500 text-lg" />
                <h3 className="text-lg font-semibold text-gray-900">Widget Code</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6">Copy and paste this code before the closing {'</body>'} tag</p>

              <Tabs
                items={[
                  {
                    key: 'preview',
                    label: 'Preview',
                    children: (
                      <div className="bg-gray-100 rounded-lg p-8 min-h-[300px] flex flex-col items-center justify-center relative">
                        <div className="text-gray-500 text-center mb-8">Your website preview</div>
                        <div className="absolute bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg">
                          <span className="text-sm font-semibold">{buttonText}</span>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: 'code',
                    label: 'Code',
                    children: (
                      <div className="space-y-4">
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-xs">
                          <pre>{widgetCode}</pre>
                        </div>
                        <Button 
                          icon={<CopyOutlined />}
                          onClick={handleCopyCode}
                          className="w-full"
                          type="primary"
                        >
                          Copy Code
                        </Button>
                      </div>
                    ),
                  },
                ]}
              />

              {/* Installation Instructions */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3">Installation</h4>
                <ol className="text-sm text-gray-600 space-y-2">
                  <li>1. Copy the widget code above</li>
                  <li>2. Open your website's HTML file</li>
                  <li>3. Paste the code before the closing {'</body>'} tag</li>
                  <li>4. Save and refresh your website</li>
                </ol>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Tools;
