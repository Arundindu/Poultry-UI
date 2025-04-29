import React, { useEffect, useState, createContext } from 'react'
import './SideBar.scss'
import logo from '../../../Assets/Images/hen.jpg'
import classNames from "classnames";

export const MyContext = createContext();

const SideBar = ({ onAction }) => {

  const [tab, setTab] = useState('Dashboard')
  const [sideBarStatus, setSideBarStatus] = useState('inActive');
  const [sideBarWidth, setSideBarWidth] = useState('inActive');

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    // Attach event listener to window resize
    window.addEventListener('resize', handleResize);
    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);

  useEffect(() => {
    if (tab) {
      let pathName = window.location.hash.split('/')
      let name = pathName[pathName.length - 1]
      if (name !== tab) {
        setTab(name);
      }
    }
  }, [tab])
  const sideBarItems = [
    {
      icon: "dashboard",
      id: "dashboard",
      label: "Dashboard",
      route: "/Home/Dashboard",
    },
    {
      icon: "info",
      id: "info",
      label: "About",
      route: "/Home/About",
    },
    {
      icon: "trending_up",
      id: "trends",
      label: "Trends",
      route: "/Home/Trends",
    },
    {
      icon: "settings",
      label: "Settings",
      id: "settings",
      route: "/Home/Settings",
    },
    {
      icon: "collections_bookmark",
      label: "Gallery",
      id: "gallery",
      route: "/Home/Gallery",
    },
    {
      icon: "coronavirus",
      label: "Diseases",
      id: "diseases",
      route: "/Home/Diseases",
    }
  ];

  const handleClick = (e) => {
    if (typeof e === 'object') {
      setTab(e.label)
      onAction({ data: e });
      sessionStorage.setItem('selectedSubHeader', '')
    }
    else if (typeof e === 'string') {
      onAction({ key: 'status', data: e });
    }
  };
  const updateSideBarStatus = (e) => {
    if (e === 'inActive') {
      setSideBarStatus('Active')
      handleClick('Active')
      setSideBarWidth('Active')
    }
    else {
      setSideBarStatus('inActive')
      handleClick('inActive')
      setSideBarWidth('inActive')
    }
  }
  return (
    <MyContext.Provider value={{ sideBarWidth, setSideBarWidth }}>
      {windowWidth > 768 ? (
        <div className={classNames("sidebar-container pt-1", {
          "activeBar": sideBarStatus === 'Active',
        })}>
          <div style={{ height: '95%' }}>
            <div className='d-flex align-items-center mb-2' style={{ fontSize: '1.6rem' }}>
              <img src={logo} className="imageStyle" alt="logo" />&nbsp;&nbsp; <span className='title'>D.C.S.REDDY FARMS</span>
            </div>
            {
              (sideBarItems && sideBarItems.length > 0) && sideBarItems.map((element) => {
                return (
                  <div className={classNames("d-flex align-items-center menu", {
                    "active-menu": tab === element.label,
                  })} style={{ height: '2.5rem', paddingLeft: '1rem', cursor: 'pointer' }} onClick={() => handleClick(element)}>
                    <i className="material-icons">{element['icon']}</i>&nbsp;&nbsp;<span>{element.label}</span>
                  </div>
                )
              })
            }
          </div>
          <div className='d-flex justify-content-center' style={{ height: '5%', borderTop: '1px solid' }} onClick={() => updateSideBarStatus(sideBarStatus)}>
            <span className='btn d-flex justify-content-center align-items-center'>{sideBarStatus === 'Active' ? <i className="fa fa-angle-double-left d-flex justify-content-center" aria-hidden="true"></i> : <i className="fa fa-angle-double-right d-flex justify-content-center" title='Expand' aria-hidden="true"></i>} &nbsp; {sideBarStatus === 'Active' ? 'Collapse' : ''}</span>
          </div>
        </div>
      ) : (
        <div className={classNames("bottomBar-container pt-1", {
          "activeBar": sideBarStatus === 'Active',
        })}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            {
              (sideBarItems && sideBarItems.length > 0) && sideBarItems.map((element) => {
                return (
                  <div className={classNames("d-flex align-items-center justify-content-center menu", {
                    "active-menu": tab === element.label,
                  })} style={{ height: '2.5rem', padding: '0.5rem', cursor: 'pointer' }} onClick={() => handleClick(element)}>
                    <i className="material-icons">{element['icon']}</i>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
      }
    </MyContext.Provider>

  )
}
export default SideBar