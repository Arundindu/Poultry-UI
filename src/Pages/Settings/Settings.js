import React, { useEffect, useState } from 'react'
import './Settings.scss'
import { useNavigate } from 'react-router-dom'
import { ServiceUtils } from '../../Shared/Utils/ServiceUtils'
import Toaster from '../../Shared/Utils/Toaster'

const Settings = () => {
  const navigate = useNavigate()
  const [tabKeys, setTabKeys] = useState([])
  const [filterTabKeys, setFilterTabKeys] = useState()

  const getTabDetails = () => {
    const payload = {
      userName: sessionStorage.getItem("userName")
    }
    ServiceUtils.postRequest("fetchSettingTabData", payload).then((response) => {
      if (response.status === 'success') {
        setTabKeys(response.tabData);
        setFilterTabKeys(response.tabData);
      } else {
        Toaster.error(response.message || "Error");
      }
    });
  }

  const onSearch = (event) => {
    const tab = event.target.value;
    if (tab.trim() === "") {
      setFilterTabKeys([...tabKeys]);
    } else {
      setFilterTabKeys(
        tabKeys.filter((tile) => tile.label.toLowerCase().includes(tab.toLowerCase()))
      );
    }
  }
  const loadCardContent = (element) => {
    if(element.key !== "userRoleSetup"){
      navigate('/Home/Configurations', { state: { details: element } });
    }
    else{
      navigate('/Home/UserRoleSetup')
    }
  }

  useEffect(() => {
    getTabDetails();
  }, []);

  return (
    <div className="pageContainer">
      <div className="col-md-12 my-3 d-flex justify-content-end">
        <input type="text" className="form-control responsive-width" placeholder="Search..." onInput={onSearch} />
      </div>
      <div className="row col-md-12 m-0 p-0">
        {filterTabKeys && filterTabKeys.map((element, index) => {
          return (
            <div className="col-md-3 col-6 my-3" key={index}>
              <div className="card text-center p-2 cursor-pointer" style={{ fontSize: '24px' }} onClick={() => loadCardContent(element)}>
                {element.label}
              </div>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default Settings