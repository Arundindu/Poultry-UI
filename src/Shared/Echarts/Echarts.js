import React, { useEffect, useRef } from 'react'
import './Echarts.scss'
import * as echarts from 'echarts';

const Echarts = ({ options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    chart.setOption(options);

    const resizeCharts = () => {
      chart.resize();
    };

    window.addEventListener('resize', resizeCharts);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', resizeCharts);
    };
  }, []);

  return (
    <div ref={chartRef} className='graphCard' id="chart" style={{ height: '275px' }} />
  )
}

export default Echarts