import React from 'react'
import './PageNotFound.scss'
import Img from './../../../Assets/Images/page-not-found.svg'
import { useNavigate } from 'react-router-dom'
import { sessionService } from '../SessionService'

const PageNotFound = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/Login')
    sessionService.clearSession()
  };
  
  return (
    <div className="pageNotFoundContainer">
      <div className="text-center">
        <img className="img-fluid" src={Img} alt="" style={{ maxWidth: 320 }} preview={false} />
        <h4>Page Not Found ! Go back to Login</h4>
        <button className="btn btn-primary" onClick={goToLogin}>Back To Login</button>
      </div>
    </div>
  )
}

export default PageNotFound