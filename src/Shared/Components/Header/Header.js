import React from 'react'
import './Header.scss'

const Header = ({ dataFromSidebar }) => {
  return (
    <div className='container d-flex justify-content-between align-items-center'>
      <div style={{ fontWeight: '600' }}>{dataFromSidebar === null ? 'Dashboard' : dataFromSidebar.data.label}</div>
      <div className='profile d-flex align-items-center'><i className="material-icons">person</i>&nbsp;ARUN</div>
    </div>
  )
}

export default Header