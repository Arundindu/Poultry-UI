import React, { useEffect, useState } from 'react'
import './Diseases.scss'
import classNames from 'classnames'
import { ServiceUtils } from '../../Shared/Utils/ServiceUtils'
import Toaster from '../../Shared/Utils/Toaster'

const Diseases = () => {
  const [diseaseList,setDiseaseList] = useState([]);

  useEffect(()=>{
    getDiseasesList();
  },[])

  const getDiseasesList = () => {
    const payload = {
      userName: localStorage.getItem('userName')
    }
    ServiceUtils.postRequest("diseasesList", payload).then((responseData) => {
      let response = JSON.parse(window.atob(responseData.data))
      if (response.status === 'success') {
        setDiseaseList(response.data)
        Toaster.success(response.message || "Success");
      } else {
        Toaster.error(response.message || "Error");
      }
    });
  }

  const [cardId, setCardId] = useState(0)
  const activeCard = (index) => {
    if (cardId === index) {
      setCardId()
    }
    else {
      setCardId(index)
    }
  }
  return (
    <div className='pageContainer'>
      <div className='col-md-12 col-12'>
        {
          (diseaseList && diseaseList.length > 0) && diseaseList.map((element, index) => {
            return (
              <div style={{ fontSize: '1rem' }} className='card m-3'>
                <div className='card-header d-flex justify-content-between align-items-center'>
                  <h5 className='fw-bold'>{element.diseaseName} --- {element.medicineName}</h5>
                  <span>
                    <i className={`fa fa-2x cursor-pointer ${cardId === index ? 'fa-angle-down' : 'fa-angle-up'}`} aria-hidden="true" onClick={() => activeCard(index)}></i>
                  </span>
                </div>
                <div className={classNames('card-body', { 'd-none': cardId !== index }, (window.innerWidth > 426) ? "d-flex" : "")}>
                  {/* <img style={{ height: '15rem', width: '15rem' }} src={require(`../../Assets/Images/${element?.diseaseImagePath}`)} alt="..." /> */}
                  <img style={{ height: '15rem', width: '15rem' }} src={element.diseaseImage.imageData} alt="..." />
                  <p className='p-2 d-flex align-items-center'>{element.diseaseDescription}</p>
                  <img style={{ height: '15rem', width: '15rem' }} src={element.medicineImage.imageData} alt="..." />
                  {/* <img style={{ height: '15rem', width: '15rem' }} src={require(`../../Assets/Images/${element?.vaccineImagePath}`)} alt="..." /> */}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Diseases