import React from 'react'
import './Public.scss'
import hen from './../Assets/Images/hen.jpg'
import banner from './../Assets/Images/banner.jpg'
import { useNavigate } from 'react-router-dom'
import { ServiceUtils } from '../Shared/Utils/ServiceUtils'
import Toaster from '../Shared/Utils/Toaster'

const Public = () => {

  const navigate = useNavigate()

  const routeToLogin = () => {
    navigate('/Login')

    // ServiceUtils.getRequest('asset-dashboard').then((_response) => {
    //   try {
    //     if (_response.status === 200 && _response.data) {
    //       let responseData = JSON.parse(JSON.stringify(_response.data));
    //       let assetStyle = [];
    //       responseData.forEach((element) => {
    //         console.log(element)
    //       })
    //     } else {
    //       Toaster.error(_response?.data?.message || "Error while processing...! Try again after sometime..!")
    //     }
    //   } catch (error) {
    //     Toaster.error(_response?.data?.message || "Error while processing...! Try again after sometime..!")
    //   }
    // })
  }

  return (
    <div className='mainContainer'>
      <div className='headerSection d-flex align-items-center justify-content-between mx-3'>
        <div className='d-flex align-items-center'>
          <img className='logoImageStyle' src={hen} alt='Logo' />
          <div className='mx-3 logoBrand' style={{ fontSize: '2rem' }}>D C S Reddy Farms</div>
        </div>
        <div>
          <button className='btn btn-primary' title='Click here to navigate to login' onClick={() => routeToLogin()} >Login</button>
        </div>
      </div>
      <div className='mainSection'>
        <img src={banner} className='bannerImage' alt='banner' width={'100%'} height={'80%'} />
        <div className='d-flex position-absolute bannerContent'>Welcome to D C S Reddy Farms, where we raise healthy, free-range poultry in a natural, sustainable environment. Experience the freshest, most delicious poultry products, raised with care and dedication from farm to table.</div>
        <div className='row m-4'>
          <div className='col-md-12 p-2'>
            <div className='card'>
              <div className='card-header'>
                About
              </div>
              <div className='card-body publicCard'>
                At D C S REDDY Farms, we are a leading provider of high-quality poultry products, committed to delivering fresh, nutritious, and ethically produced chicken to our customers. Founded in 1995, our journey began with a simple mission: to nourish families with wholesome food while maintaining the highest standards of animal welfare, sustainability, and safety. Today, we are proud to be a trusted name in the poultry industry, serving across areas of Chittoor and Kadapa.
              </div>
            </div>
          </div>
          {/* <div className='col-md-4 p-2'>
            <div className='card'>
              Test
            </div>
          </div> */}
        </div>
      </div>
      <div className='footerSection d-flex align-items-center'>
        <marquee behaviour="scroll" direction="left" scrollamount="8" onMouseOver={(e) => e.target.stop()}
          onMouseOut={(e) => e.target.start()}>Dear Customers, The updated bird's price for 08-10-2024 is 126. Please login to look out for orders, availability, cost and average weight.</marquee>
      </div>
    </div>
  )
}

export default Public