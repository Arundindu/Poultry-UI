import React, { useState } from 'react';
import './Home.scss';
import Header from '../../Shared/Components/Header/Header';
import SideBar from '../../Shared/Components/SideBar/SideBar';
import { useNavigate } from 'react-router';
import { Outlet } from "react-router-dom";
import classNames from 'classnames';

const Home = () => {
  const navigate = useNavigate()
  const [dataFromSidebar, setDataFromSidebar] = useState(null);
  const [sideBarStatus, setSideBarStatus] = useState('inActive');

  const handleActionFromSidebar = (data) => {
    if (data.key === 'status') {
      setSideBarStatus(data.data)
    }
    else {
      setDataFromSidebar(data);
      navigate(data.data.label)
    }
  };

  return (
    (window && window.innerWidth > 768) ? (
      <>
        <div className='body d-flex'>
          <div className={classNames("sidebar", { "activeBar": sideBarStatus === 'Active' })}>
            <SideBar onAction={handleActionFromSidebar} />
          </div>
          <div className='mainContent'>
            <div className='row col-md-12 p-0 m-0'>
              <Header dataFromSidebar={dataFromSidebar} />
            </div>
            <Outlet />
          </div>
        </div>
      </>
    ) : (
      <>
        <div className='body d-flex'>
          <div className={classNames("bottomBar", { "activeBar": sideBarStatus === 'Active' })}>
            <SideBar onAction={handleActionFromSidebar} />
          </div>
          <div className='mainContentAbove'>
            <div className='row col-md-12 p-0 m-0'>
              <Header dataFromSidebar={dataFromSidebar} />
            </div>
            <Outlet />
          </div>
        </div>
      </>
    )

  )
}

export default Home