import React, { useEffect, useState } from 'react'
import './Settings.scss'
import { useNavigate } from 'react-router-dom'
import { ServiceUtils } from '../../Shared/Utils/ServiceUtils'
import Toaster from '../../Shared/Utils/Toaster'

const Settings = () => {
  const navigate = useNavigate()
  const [tabKeys, setTabKeys] = useState([])
  const tabKey = [
    {
      "key": "birdsPrice",
      "label": "Birds Price",
    },
    {
      "key": "hensAvailability",
      "label": "Hens Availability"
    },
    {
      "key": "orderedHens",
      "label": "Ordered Hens"
    },
    {
      "key": "notifications",
      "label": "Notifications"
    },
    {
      "key": "userSetup",
      "label": "User Setup"
    },
    {
      "key": "chickPrice",
      "label": "Chick Price"
    },
    {
      "key": "sales",
      "label": "Sales"
    },
    {
      "key": "wastage",
      "label": "Wastage"
    },
    {
      "key": "diseases",
      "label": "Diseases"
    },
    {
      "key": "feedConsumtion",
      "label": "Feed Consumtion"
    },
    {
      "key": "feedPrice",
      "label": "Feed Price"
    },
    {
      "key": "userRoleSetup",
      "label": "User Role Setup"
    },
  ];
  useEffect(()=>{
    getTabDetails();
  });
  const getTabDetails = () => {
    const payload = {
      userName: localStorage.getItem("userName")
    }
    ServiceUtils.postRequest("", payload).then((responseData) => {
      let response = JSON.parse(window.atob(responseData.data))
      if (response.status === 'success') {
        setTabKeys(tabKey)
        Toaster.success(response.message || "Success");
        navigate('/Login')
      } else {
        Toaster.error(response.message || "Error");
      }
    });
  }
  const [filterTabKeys, setFilterTabKeys] = useState(tabKeys)

  const onSearch = (event) => {
    const tab = event.target.value;
    setFilterTabKeys([]);
    if (tab === " " || tab === null) {
      setFilterTabKeys(JSON.parse(JSON.stringify(tabKeys)))
    }
    else {
      setFilterTabKeys(tabKeys.filter(tile => tile.label.toLowerCase().includes(tab.toLowerCase())))
    }
  }
  const loadCardContent = (element) => {
    navigate('/Home/configurations', { state: { details: element } });
  }

  return (
    <div className='pageContainer'>
      <div className='col-md-12 my-3 d-flex justify-content-end'>
        <input type='text' className='form-control responsive-width' placeholder='Search...' onInput={onSearch} />
      </div>
      <div className='row col-md-12 m-0 p-0'>
        {
          filterTabKeys && filterTabKeys.map((element, index) => {
            return (
              <div className='col-md-3 col-6 my-3'>
                <div className='card text-center p-2 cursor-pointer' key={index} style={{ fontSize: '24px' }} onClick={() => loadCardContent(element)}>{element.label}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Settings