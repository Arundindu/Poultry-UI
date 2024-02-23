import React, { useEffect } from 'react'
import './Trends.scss'
import Echarts from '../../Shared/Echarts/Echarts';


const Trends = () => {

  const option = {
    title: {
      text: 'Market Trend',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    color: ['#3c4858'],
    grid: {
      left: '5%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['20-01-24', '21-01-24', '22-01-24', '23-01-24', '24-01-24', '25-01-24', '26-1-24'],
      name: 'Date',
      nameLocation: 'middle',
      nameGap: '30'
    },
    yAxis: {
      type: 'value',
      name: 'Rate/Kg',
      nameLocation: 'middle',
      nameGap: 40
    },
    series: [
      {
        data: [83, 98, 98, 110, 118, 123, 118],
        type: 'line',
        markPoint: {
          data: [
            { type: 'max', name: 'Max' }
          ]
        },
      }
    ]
  };
  const options = {
    toolbox: {
      feature: {
        saveAsImage: {
          title: 'Save',
          show: true,
          name: 'Customer Wise Sales'
        }
      }
    },
    color: ['#3c4858'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    title: {
      text: 'Customer Wise Sales',
      left: 'center'
    },
    grid: {
      left: '5%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [
          'Vali',
          'Shiva',
          'Bala Krishna',
          'Asunu',
          'Naveen',
          'Sipulla',
          'Venkatramana',
          'Saidu',
          'Charan',
          'DoraSwamy'
        ],
        axisLabel: {
          interval: 0,
          // rotate: 30,
          fontSize: 8
        },
        name: 'Total No. of Hens',
        nameLocation: 'middle',
        nameGap: 30
      }
    ],
    yAxis: [
      {
        name: 'Total No. of Hens',
        nameLocation: 'middle',
        nameGap: 40
      }
    ],
    label: {
      position: 'top',
      show: true,
      color: []
    },
    series: [
      {
        name: 'Sales',
        type: 'bar',
        barWidth: '60%',
        data: [40, 40, 60, 120, 20, 100, 20, 50, 550, 400]
      }
    ]
  };
  useEffect(() => {

  }, []);

  return (
    <div className='trendsContainer'>
      <div className='row col-md-12 col-xs-12 py-2 px-0 m-0'>
        <div className='col-md-6 col-xs-12'>
          <Echarts options={option} />
        </div>
        <div className='col-md-6 col-xs-12'>
          <Echarts options={options} />
        </div>
      </div>
    </div>
  )
}

export default Trends