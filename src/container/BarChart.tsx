import { useEffect, useRef, useMemo } from 'react';
import { Chart } from '@antv/g2';

interface ChartData {
  month: string;
  forecast: number;
  demand: number;
}

export const BarChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const chartData: ChartData[] = useMemo(() => [
    // { month: '2023', forecast: 0, demand: 1 },
    { month: 'jan', forecast: 0.8, demand: 0 },
    { month: 'Feb', forecast: 0, demand: 0 },
    { month: 'Mar', forecast: 0, demand: 4 },
    { month: 'Apr', forecast: 1.5, demand: 1 },
    { month: 'May', forecast: 0.80, demand: 0 },
    { month: 'Jun', forecast: 0.18, demand: 5 },
    { month: 'Jul', forecast: 0.8, demand: 0 },
    { month: 'Aug', forecast: 0.8, demand: 0 },
    { month: 'Sep', forecast: 0.6, demand: 1 },
    { month: 'Oct', forecast: 0.12, demand: 6 },
    { month: 'Nov', forecast: 0.8, demand: 0 },
    { month: 'Dec', forecast: 1.5, demand: 0 },
  ], []);

  useEffect(() => {
    if (!chartRef.current) return;

    // Clear previous chart if exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Transform data for the chart
    const transformedData = chartData.flatMap(item => [
      {
        month: item.month,
        value: item.demand,
        type: 'Demand',
        category: 'bar'
      },
      {
        month: item.month,
        value: item.forecast,
        type: 'Forecast',
        category: 'line'
      }
    ]);

    // Create chart using G2 5.x API
    const chart = new Chart({
      container: chartRef.current,
      // width: chartRef.current.clientWidth,
      autoFit: true,
      height: 350,
    });

    chart
      .data(transformedData)
      .encode('x', 'month')
      .encode('y', 'value')
      .encode('color', 'type')
      .scale('color', {
        range: ['#ffc53d', '#722ed1']
      });

    // Add bars for demand data
    chart
      .interval()
      .data(transformedData.filter(d => d.category === 'bar'))
      .encode('x', 'month')
      .encode('y', 'value')
      .encode('color', 'type')
      .style('fillOpacity', 0.8);

    // Add line for forecast data
    chart
      .line()
      .data(transformedData.filter(d => d.category === 'line'))
      .encode('x', 'month')
      .encode('y', 'value')
      .encode('color', 'type')
      .style('lineWidth', 2);

    // Add points for forecast data
    chart
      .point()
      .data(transformedData.filter(d => d.category === 'line'))
      .encode('x', 'month')
      .encode('y', 'value')
      .encode('color', 'type')
      .encode('size', 3)
      .encode('shape', 'circle');

    chart.render();

    chartInstance.current = chart;

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [chartData]);

  return (
    <div className="mb-6 w-full" style={{ height: '400px' }}>
      <div ref={chartRef} style={{ width: '100%', height: '350px' }} />
    </div>
  );
};

// export default BarChart;

export const LineChart = () => {

  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const chartData: ChartData[] = useMemo(() => [
    // { month: '2023', forecast: 0, demand: 1 },
    { month: 'jan', forecast: 0.8, demand: 0 },
    { month: 'Feb', forecast: 0, demand: 0 },
    { month: 'Mar', forecast: 0, demand: 4 },
    { month: 'Apr', forecast: 1.5, demand: 1 },
    { month: 'May', forecast: 0.80, demand: 0 },
    { month: 'Jun', forecast: 0.18, demand: 5 },
    { month: 'Jul', forecast: 0.8, demand: 0 },
    { month: 'Aug', forecast: 0.8, demand: 0 },
    { month: 'Sep', forecast: 0.6, demand: 1 },
    { month: 'Oct', forecast: 0.12, demand: 6 },
    { month: 'Nov', forecast: 0.8, demand: 0 },
    { month: 'Dec', forecast: 1.5, demand: 0 },
  ], []);

  // Transform chartData for area chart
  const areaData = useMemo(() => chartData.map(item => ({
    month: item.month,
    value: item.forecast
  })), [chartData]);

  useEffect(() => {
    if (!chartRef.current) return;

    // Clear previous chart if exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create chart using G2 5.x API
    const chart = new Chart({
      container: chartRef.current,
      // width: chartRef.current.clientWidth,
      autoFit: true,
      height: 350,
    });

    chart
      .data(areaData)
      .area()
      .encode('x', 'month')
      .encode('y', 'value')
      .style('opacity', 0.2)
      .axis('y', { labelFormatter: '~s', title: false });
    chart.render();

    chartInstance.current = chart;

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [areaData]);

  return (
    <div className="mb-6" style={{ height: '400px' }}>
      <div ref={chartRef} style={{ width: '100%', height: '350px' }} />

    </div>
  );
};
