import React, { useState } from 'react'
import './Home.scss'
import Header from '../../Shared/Components/Header/Header'
import SideBar from '../../Shared/Components/SideBar/SideBar'
import { useNavigate } from 'react-router';
import { Outlet } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const [dataFromSidebar, setDataFromSidebar] = useState(null);

  const handleActionFromSidebar = (data) => {
    setDataFromSidebar(data);
    navigate(data.data.label)
  };
  return (
    <div>
      <div className='body d-flex'>
        <div className='sidebar'>
          <SideBar onAction={handleActionFromSidebar} />
        </div>
        <div className='mainContent'>
          <div className='row col-md-12 p-0 m-0'>
            <Header dataFromSidebar={dataFromSidebar} />
          </div>
          <div className='bodyContainer'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home