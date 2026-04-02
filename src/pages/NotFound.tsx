import React from 'react';
import { Result, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IconHome, IconArrowLeft } from '@/utils/icons';

const { Text } = Typography;

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={[
          <Button 
            type="primary" 
            key="home" 
            icon={<IconHome />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>,
          <Button 
            key="back" 
            icon={<IconArrowLeft />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>,
        ]}
      >
        <div className="text-center mt-6">
          <Text type="secondary">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </Text>
        </div>
      </Result>
    </div>
  );
};

export default NotFound; 