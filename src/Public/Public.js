import React, { useEffect, useState } from 'react'
import './Public.scss'
import hen from './../Assets/Images/hen.jpg'
import banner from './../Assets/Images/banner.jpg'
import hen_icon from './../Assets/Images/hen_icon.png'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { ServiceUtils } from '../Shared/Utils/ServiceUtils'
import Toaster from '../Shared/Utils/Toaster'
import Table from '../Shared/Table/Table'

const Public = () => {

  const [birdsPrice, setBirdsPrice] = useState([])
  const [marqueeData, setMarqueeData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    getBirdsPrice()
  }, [])

  const getBirdsPrice = () => {
    const payload = {
      userName: "Arun",
      tabName: "birdsPrice"
    }
    ServiceUtils.postRequest('publicData', payload, false).then((response) => {
      try {
        if (response.status === "success" && response.tableData) {
          setBirdsPrice(response.tableData)
          setMarqueeData(response.marquee)
          console.log(response.tableData)
        } else {
          Toaster.error(response?.message || "Error while processing...! Try again after sometime..!")
        }
      } catch (error) {
        Toaster.error(response?.message || "Error while processing...! Try again after sometime..!")
      }
    })
  }

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
        </div>
        {birdsPrice && birdsPrice.headerContent && (
          <div className='row m-1'>
            <div className='col-md-8 col-12'>
              <h3>Monthly Bird's Price Report</h3>
              <Table key={JSON.stringify(birdsPrice)} data={birdsPrice} />
            </div>
            <div className='col-md-4 col-12'>
              <div className='card price-card'>
                {/* <div class="price-card"> */}
                  <div class="price-card-header">
                    <img src={hen_icon} alt="Hen" class="hen-icon" />
                    <h3>Today's Bird Price</h3>
                  </div>
                  <hr/>
                  <div class="price-value">₹ {marqueeData.birdsPrice} <span>/ kg</span></div>
                  <div className={classNames('price-diff',((birdsPrice.bodyContent[0].birdsPrice - birdsPrice.bodyContent[1].birdsPrice > 0) ? "positive" : (birdsPrice.bodyContent[0].birdsPrice - birdsPrice.bodyContent[1].birdsPrice < 0) ? 'negative' : ''))}>
                    {(birdsPrice.bodyContent[0].birdsPrice - birdsPrice.bodyContent[1].birdsPrice > 0) ? "▲ +" +(birdsPrice.bodyContent[0].birdsPrice - birdsPrice.bodyContent[1].birdsPrice) : (birdsPrice.bodyContent[0].birdsPrice - birdsPrice.bodyContent[1].birdsPrice < 0 ? "▼ -"+(birdsPrice.bodyContent[0].birdsPrice - birdsPrice.bodyContent[1].birdsPrice > 0) : 0)}<span> vs {birdsPrice.bodyContent[1].date}</span>
                  </div>
                  <hr/>
                  <div class="last-updated">
                    Last updated for: {marqueeData.date}
                  </div>
                {/* </div> */}

                {/* <div className='publicCard'>
                  <div><img src=""/>Today's Bird Price</div>
                  <div>148/kg</div>
                  <div>Last Updated: </div>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='footerSection d-flex align-items-center'>
        <marquee behaviour="scroll" direction="left" scrollamount="8" onMouseOver={(e) => e.target.stop()}
          onMouseOut={(e) => e.target.start()}>Dear Customers, The updated bird's price for {marqueeData.date} is {marqueeData.birdsPrice}. Please login to look out for orders, availability, cost and average weight.</marquee>
      </div>
    </div>
  )
}

export default Public