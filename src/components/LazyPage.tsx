import React, { Suspense } from 'react';
import { Result, Button } from 'antd';
import { IconHome } from '@/utils/icons';
import PageLoader from './PageLoader';
import PerformanceMonitor from './PerformanceMonitor';

interface LazyPageProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  pageName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback?: React.ReactNode }, ErrorBoundaryState> {
  
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('sPage loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Result
              status="error"
              title="Page Load Error"
              subTitle="Sorry, something went wrong while loading this page."
              extra={[
                <Button 
                  type="primary" 
                  key="home" 
                  icon={<IconHome />}
                  onClick={() => window.location.href = '/'}
                >
                  Back to Home
                </Button>,
                <Button 
                  key="retry" 
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>,
              ]}
            />
          </div>
        )
      );
    }

    return this.props.children;
  }
}

const LazyPage: React.FC<LazyPageProps> = ({ 
  children, 
  fallback = <PageLoader message="Loading page..." />,
  pageName = 'Unknown'
}) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        {children}
        {/* <PerformanceMonitor pageName={pageName} /> */}
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyPage; 