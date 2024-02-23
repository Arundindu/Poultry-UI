import React, { useEffect, useState } from 'react'
import './SideBar.scss'
import logo from '../../../Assets/Images/hen.jpg'
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const SideBar = ({ onAction }) => {

  const navigate = useNavigate();
  const [tab, setTab] = useState('Dashboard')

  useEffect(() => {
    // navigate('/home/dashboard')
  }, [tab])
  const sideBarItems = [
    {
      icon: "dashboard",
      id: "dashboard",
      label: "Dashboard",
      route: "/home/dashboard",
    },
    {
      icon: "trending_up",
      id: "trends",
      label: "Trends",
      route: "/home/trends",
    },
    {
      icon: "settings",
      label: "Settings",
      id: "settings",
      route: "/home/settings",
    },
    {
      icon: "collections_bookmark",
      label: "Gallery",
      id: "gallery",
      route: "/home/gallery",
    }
  ];

  const handleClick = (e) => {
    setTab(e.label)
    // navigate('/home/dashboard')
    onAction({ data: e });
  };
  return (
    <div className='sidebar-container pt-1'>
      <div className='d-flex align-items-center mb-2' style={{ fontSize: '1.6rem' }}>
        <img src={logo} className="imageStyle" alt="logo" />&nbsp;&nbsp; <span className='title'>POULTRY FARMS</span>
      </div>
      {
        (sideBarItems && sideBarItems.length > 0) && sideBarItems.map((element) => {
          return (
            <div className={classNames("d-flex align-items-center menu", {
              "active-menu": tab === element.label,
            })} style={{ height: '2.5rem', paddingLeft: '1rem',cursor:'pointer' }} onClick={() => handleClick(element)}>
              <i className="material-icons">{element['icon']}</i>&nbsp;&nbsp;<span>{element.label}</span>
            </div>
          )
        })
      }
    </div>
  )
}
export default SideBar