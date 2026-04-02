import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Radio, message } from 'antd';
import {
  DollarOutlined,
  TeamOutlined,
  FileTextOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { LabelInput } from '../components/LabelInput';
import ButtonSimple from '../components/ButtonSimple';

const Affiliate: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [copied, setCopied] = useState(false);

  const affiliateLink = 'https://www.avelo.in/?ref=harsh.t-eaje';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    message.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <div className=" min-h-screen ">
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Affiliate Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your performance and earnings</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            Status: active
          </span>
          <span className="text-gray-600 text-sm">harsh.tank-eaje</span>
        </div>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-0 hover:shadow-md transition h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Total Earnings</p>
                <Statistic
                  value="0.00"
                  prefix="₹"
                  valueStyle={{ color: '#000', fontSize: '24px', fontWeight: '600' }}
                />
                <p className="text-gray-500 text-xs mt-2">+0% from last month</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarOutlined className="text-blue-600 text-lg" />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-0 hover:shadow-md transition h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Pending Commission</p>
                <Statistic
                  value="0.00"
                  prefix="₹"
                  valueStyle={{ color: '#000', fontSize: '24px', fontWeight: '600' }}
                />
                <p className="text-gray-500 text-xs mt-2">Available for payout</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarOutlined className="text-blue-600 text-lg" />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-0 hover:shadow-md transition h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Total Referrals</p>
                <Statistic
                  value={0}
                  valueStyle={{ color: '#000', fontSize: '24px', fontWeight: '600' }}
                />
                <p className="text-gray-500 text-xs mt-2">All time referrals</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TeamOutlined className="text-blue-600 text-lg" />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-0 hover:shadow-md transition h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Commission Rate</p>
                <Statistic
                  value="20"
                  suffix="%"
                  valueStyle={{ color: '#000', fontSize: '24px', fontWeight: '600' }}
                />
                <p className="text-gray-500 text-xs mt-2">Recurring commission</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarOutlined className="text-blue-600 text-lg" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Content - Referrals & Affiliate Link */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} lg={12}>
          <Card className="shadow-sm border-0 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Recent Referrals</h3>
            <p className="text-gray-600 text-sm mb-8">People who signed up using your link</p>
            
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-4xl mb-4">👥</div>
              <p className="text-gray-500 text-center">
                No referrals yet. Share your link to start earning!
              </p>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="shadow-sm border-0 h-full">
            <div className="bg-gray-900 text-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Your Affiliate Link</h3>
              <p className="text-gray-400 text-sm mb-6">Share this link to track referrals</p>
              
              {/* Link Display */}
              <div className="bg-gray-800 rounded p-3 mb-4 flex items-center justify-between">
                <code className="text-sm text-blue-400 break-all font-mono">
                  {affiliateLink}
                </code>
                <button
                  onClick={handleCopyLink}
                  className="ml-2 p-1.5 hover:bg-gray-700 rounded transition"
                  title="Copy link"
                >
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1h2V4a2 2 0 00-2-2h-2a2 2 0 00-2 2v1H6a1 1 0 000 2h1v10H6a1 1 0 000 2h1v1a2 2 0 002 2h2a2 2 0 002-2v-1h2a1 1 0 000-2h-1V7h1a1 1 0 000-2h-2V3z" />
                  </svg>
                </button>
              </div>

              {/* Copy Link Button */}
              <button
                onClick={handleCopyLink}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition"
              >
                {copied ? '✓ Copied!' : 'Copy Link'}
              </button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Resources & Payment Settings */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card className="shadow-sm border-0 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Resources</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileOutlined className="text-blue-600 text-lg" />
                  <span className="text-gray-900 font-medium">Marketing Assets</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileTextOutlined className="text-blue-600 text-lg" />
                  <span className="text-gray-900 font-medium">Commission Guide</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileTextOutlined className="text-blue-600 text-lg" />
                  <span className="text-gray-900 font-medium">Terms of Service</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="shadow-sm border-0 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Settings</h3>
            <p className="text-gray-600 text-sm mb-6">How you get paid</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition cursor-pointer">
                <Radio
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
                <div>
                  <p className="font-medium text-gray-900">UPI (India)</p>
                  <p className="text-xs text-gray-500">Instant transfer to your UPI account</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition cursor-pointer">
                <Radio
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                />
                <div>
                  <p className="font-medium text-gray-900">Bank Transfer (India)</p>
                  <p className="text-xs text-gray-500">Direct transfer to your bank account</p>
                </div>
              </div>
            </div>

            {/* Payment Details Form */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              {paymentMethod === 'upi' ? (
                <div>
                  <LabelInput className="mb-2" required>
                    UPI ID
                  </LabelInput>
                  <input
                    type="text"
                    placeholder="user@upi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  />
                  <ButtonSimple
                    type="primary"
                    className="!bg-blue-600 !text-white !border-blue-600 hover:!bg-blue-700"
                  >
                    Update UPI ID
                  </ButtonSimple>
                </div>
              ) : (
                <div>
                  <LabelInput className="mb-2" required>
                    Account Holder Name
                  </LabelInput>
                  <input
                    type="text"
                    placeholder="Enter account holder name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  />

                  <LabelInput className="mb-2" required>
                    Account Number
                  </LabelInput>
                  <input
                    type="text"
                    placeholder="Enter account number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  />

                  <LabelInput className="mb-2" required>
                    IFSC Code
                  </LabelInput>
                  <input
                    type="text"
                    placeholder="Enter IFSC code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  />

                  <ButtonSimple
                    type="primary"
                    className="!bg-blue-600 !text-white !border-blue-600 hover:!bg-blue-700"
                  >
                    Update Bank Details
                  </ButtonSimple>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Affiliate;
