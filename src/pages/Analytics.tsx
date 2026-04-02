import React, { useEffect, useRef } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MessageOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Chart } from '@antv/g2';

// Mock Data
const messageVolumeData = [
  { day: 'Mon', type: 'Inbound', value: 20 },
  { day: 'Mon', type: 'Outbound', value: 30 },
  { day: 'Tue', type: 'Inbound', value: 15 },
  { day: 'Tue', type: 'Outbound', value: 25 },
  { day: 'Wed', type: 'Inbound', value: 40 },
  { day: 'Wed', type: 'Outbound', value: 35 },
  { day: 'Thu', type: 'Inbound', value: 30 },
  { day: 'Thu', type: 'Outbound', value: 20 },
  { day: 'Fri', type: 'Inbound', value: 25 },
  { day: 'Fri', type: 'Outbound', value: 15 },
  { day: 'Sat', type: 'Inbound', value: 12 },
  { day: 'Sat', type: 'Outbound', value: 8 },
  { day: 'Sun', type: 'Inbound', value: 10 },
  { day: 'Sun', type: 'Outbound', value: 5 },
];

const responseTimeTrendData = [
  { time: '00:00', minutes: 2.4 },
  { time: '04:00', minutes: 3.2 },
  { time: '08:00', minutes: 3.5 },
  { time: '12:00', minutes: 2.1 },
  { time: '16:00', minutes: 1.8 },
  { time: '20:00', minutes: 2.8 },
];

const conversationStatusData = [
  { type: 'Active', value: 100 },
  { type: 'Resolved', value: 0 },
];

const Analytics: React.FC = () => {
  const messageChartRef = useRef<Chart | null>(null);
  const responseChartRef = useRef<Chart | null>(null);
  const conversationChartRef = useRef<Chart | null>(null);

  // Message Volume Chart
  useEffect(() => {
    const container = document.getElementById('message-volume-chart');
    if (container && !messageChartRef.current) {
      try {
        const chart = new Chart({
          container: 'message-volume-chart' as any,
          autoFit: true,
          height: 300,
        } as any);

        chart.data(messageVolumeData);

        (chart as any)
          .interval()
          .encode('x', 'day')
          .encode('y', 'value')
          .encode('color', 'type')
          .scale('color', {
            range: ['#10b981', '#d1d5db'],
          })
          .axis('x', { labelAutoRotate: false })
          .axis('y', { labelFormatter: (d: any) => d })
          .legend('color', { position: 'top' as any })
          .coordinate({ type: 'rect' as any });

        chart.render();
        messageChartRef.current = chart;
      } catch (error) {
        console.error('Error rendering message volume chart:', error);
      }
    }

    return () => {
      if (messageChartRef.current) {
        messageChartRef.current.destroy();
        messageChartRef.current = null;
      }
    };
  }, []);

  // Response Time Trend Chart
  useEffect(() => {
    const container = document.getElementById('response-time-chart');
    if (container && !responseChartRef.current) {
      try {
        const chart = new Chart({
          container: 'response-time-chart' as any,
          autoFit: true,
          height: 300,
        } as any);

        chart.data(responseTimeTrendData);

        (chart as any)
          .line()
          .encode('x', 'time')
          .encode('y', 'minutes')
          .encode('color', '#10b981')
          .encode('stroke', '#10b981')
          .attr('stroke-width', 3);

        chart.render();
        responseChartRef.current = chart;
      } catch (error) {
        console.error('Error rendering response time chart:', error);
      }
    }

    return () => {
      if (responseChartRef.current) {
        responseChartRef.current.destroy();
        responseChartRef.current = null;
      }
    };
  }, []);

  // Conversation Status Chart
  useEffect(() => {
    const container = document.getElementById('conversation-status-chart');
    if (container && !conversationChartRef.current) {
      try {
        const chart = new Chart({
          container: 'conversation-status-chart' as any,
          autoFit: true,
          height: 300,
        } as any);

        chart.data(conversationStatusData);

        (chart as any)
          .interval()
          .encode('x', 'constant')
          .encode('y', 'value')
          .encode('color', (d: any) => d.type === 'Active' ? '#10b981' : '#d1d5db')
          .transform([{ type: 'stackY' }])
          .coordinate({ type: 'theta', radius: 0.8, innerRadius: 0.6 });

        chart.render();
        conversationChartRef.current = chart;
      } catch (error) {
        console.error('Error rendering conversation status chart:', error);
      }
    }

    return () => {
      if (conversationChartRef.current) {
        conversationChartRef.current.destroy();
        conversationChartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your WhatsApp Business performance</p>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-0 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Total Conversations</p>
                <Statistic
                  value={14}
                  valueStyle={{ color: '#000', fontSize: '28px', fontWeight: '600' }}
                />
                <p className="text-green-600 text-xs mt-2 flex items-center">
                  <ArrowUpOutlined className="mr-1" /> +12.5%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageOutlined className="text-green-600 text-xl" />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-0 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Active Contacts</p>
                <Statistic
                  value={14}
                  valueStyle={{ color: '#000', fontSize: '28px', fontWeight: '600' }}
                />
                <p className="text-green-600 text-xs mt-2 flex items-center">
                  <ArrowUpOutlined className="mr-1" /> +8.2%
                </p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <PhoneOutlined className="text-pink-600 text-xl" />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-0 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Avg. Response Time</p>
                <Statistic
                  value="11h"
                  valueStyle={{ color: '#000', fontSize: '28px', fontWeight: '600' }}
                />
                <p className="text-red-600 text-xs mt-2 flex items-center">
                  <ArrowDownOutlined className="mr-1" /> -18.3%
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ClockCircleOutlined className="text-blue-600 text-xl" />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-0 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Resolution Rate</p>
                <Statistic
                  value="0%"
                  valueStyle={{ color: '#000', fontSize: '28px', fontWeight: '600' }}
                />
                <p className="text-green-600 text-xs mt-2 flex items-center">
                  <ArrowUpOutlined className="mr-1" /> +2.1%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleOutlined className="text-green-600 text-xl" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts Grid */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} lg={12}>
          <Card className="shadow-sm border-0 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Message Volume</h3>
            <p className="text-gray-600 text-sm mb-6">Inbound vs outbound messages this week</p>
            <div id="message-volume-chart" style={{ minHeight: '300px' }}></div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="shadow-sm border-0 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Response Time Trend</h3>
            <p className="text-gray-600 text-sm mb-6">Average response time throughout the day</p>
            <div id="response-time-chart" style={{ minHeight: '300px' }}></div>
          </Card>
        </Col>
      </Row>

      {/* Conversation Status & Quick Insights */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card className="shadow-sm border-0 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Conversation Status</h3>
            <p className="text-gray-600 text-sm mb-6">Distribution of conversation statuses</p>
            <div id="conversation-status-chart" style={{ minHeight: '300px' }}></div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <span className="text-green-600 font-semibold">Active 100%</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="text-gray-400">Resolved 0%</span>
              </p>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="shadow-sm border-0 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Quick Insights</h3>
            <p className="text-gray-600 text-sm mb-6">Key metrics at a glance</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <span className="text-gray-700 flex items-center text-sm">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Total Contacts
                </span>
                <span className="text-lg font-bold text-gray-900">14</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <span className="text-gray-700 flex items-center text-sm">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Active Conversations
                </span>
                <span className="text-lg font-bold text-gray-900">14</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <span className="text-gray-700 flex items-center text-sm">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                  Waiting for Response
                </span>
                <span className="text-lg font-bold text-gray-900">0</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <span className="text-gray-700 flex items-center text-sm">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Resolved Today
                </span>
                <span className="text-lg font-bold text-gray-900">0</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
