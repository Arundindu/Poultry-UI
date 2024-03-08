import React from 'react'
import './Dashboard.scss'
import Echarts from '../../Shared/Echarts/Echarts';

const Dashboard = () => {
  const dashboardItems = [
    {
      icon: "fa fa-bar-chart",
      backgroundColor: "dodgerblue !important",
      label: "Total",
      count: "1500",
    },
    {
      icon: "fa fa-pie-chart",
      backgroundColor: "#faa8ca !important",
      label: "Available",
      count: "100",
    },
    {
      icon: "fa fa-balance-scale",
      backgroundColor: "#faa8ca !important",
      label: "Avg.Weight",
      count: "2.53",
    },
    {
      icon: "fa fa-money",
      backgroundColor: "dodgerblue !important",
      label: "Amount",
      count: "123",
    }
  ];

  return (
    <div className='container-fluid row col-md-12 p-0 m-0'>
      <div className='row col-md-6 col-xs-12 p-0 m-0'>
        {
          (dashboardItems && dashboardItems.length > 0) && dashboardItems.map((element) => {
            return (
              <>
                <div className='col-md-6 col-xs-12'>
                  <div className='col-md-12 col-xs-12 mt-3'>
                    <div className='card'>
                      <div className='card-body cardTransition'>
                        <div className='d-flex align-items-center justify-content-between'>
                          <span>
                            {element.label}
                          </span>
                          <i className={element.icon} aria-hidden="true"></i>
                        </div>
                        <div className='row d-flex justify-content-center'>
                          {element.count}
                        </div>
                        <div className='d-flex justify-content-center align-items-center' style={{ fontSize: '15px' }}>
                          <span style={{ cursor: 'pointer' }}>More Info &nbsp; <i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default Dashboard