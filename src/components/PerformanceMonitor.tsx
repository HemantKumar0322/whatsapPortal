import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  pageSize: number;
  timestamp: number;
}

interface PerformanceMonitorProps {
  pageName: string;
  onMetrics?: (metrics: PerformanceMetrics) => void;
}

// Extend Performance interface for memory property
interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  pageName, 
  onMetrics 
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    const extendedPerformance = performance as ExtendedPerformance;
    const startMemory = extendedPerformance.memory?.usedJSHeapSize || 0;

    return () => {
      const endTime = performance.now();
      const endMemory = extendedPerformance.memory?.usedJSHeapSize || 0;
      
      const loadTime = endTime - startTime;
      const pageSize = endMemory - startMemory;
      
      const newMetrics: PerformanceMetrics = {
        loadTime,
        pageSize,
        timestamp: Date.now(),
      };

      setMetrics(newMetrics);
      onMetrics?.(newMetrics);

      // Log performance metrics in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 ${pageName} Performance:`, {
          loadTime: `${loadTime.toFixed(2)}ms`,
          pageSize: `${(pageSize / 1024).toFixed(2)}KB`,
        });
      }
    };
  }, [pageName, onMetrics]);

  // Only render in development mode
  if (process.env.NODE_ENV !== 'development' || !metrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50">
      <div className="font-bold mb-1">{pageName}</div>
      <div>Load: {metrics.loadTime.toFixed(0)}ms</div>
      <div>Size: {(metrics.pageSize / 1024).toFixed(1)}KB</div>
    </div>
  );
};

export default PerformanceMonitor; 