import React from 'react';
import { Spin, Typography } from 'antd';
import { IconDashboard } from '@/utils/icons';

const { Text } = Typography;

interface PageLoaderProps {
  message?: string;
  size?: 'small' | 'default' | 'large';
  variant?: 'default' | 'minimal' | 'fullscreen';
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  message = 'Loading page...', 
  size = 'large',
  variant = 'default'
}) => {

  const renderLoader = () => {
    switch (variant) {
      case 'minimal':
        return (
          <div className="flex items-center justify-center p-8">
            <Spin 
              size={size} 
              indicator={<IconDashboard className="text-2xl text-primary-500 animate-spin" />}
            />
            <Text type="secondary" className="ml-3">
              {message}
            </Text>
          </div>
        );
      
      case 'fullscreen':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
              <div className="mb-6">
                <div className="relative">
                  <IconDashboard className="text-6xl text-primary-500 animate-spin" />
                  <div className="absolute inset-0 bg-primary-500/20 rounded-full animate-ping"></div>
                </div>
              </div>
              <Text type="secondary" className="text-xl font-medium">
                {message}
              </Text>
              <div className="mt-4">
                <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="mt-2">
                <Text type="secondary" className="text-sm">
                  Please wait while we load your content...
                </Text>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="mb-4">
                <Spin 
                  size={size} 
                  // indicator={<IconDashboard className="text-4xl text-primary-500 animate-spin" />}
                />
              </div>
              <Text type="secondary" className="text-lg">  {message}  </Text>
              <div className="mt-2">
                <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
                  <div className="w-1/3 h-full bg-primary-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderLoader();
};

export default PageLoader; 