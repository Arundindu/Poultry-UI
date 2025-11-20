import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import Table from '../../Shared/Table/Table';
import DyanmicForm from '../../Shared/DynamicForm/DyanmicForm';
import { useNavigate } from 'react-router';
import { ServiceUtils } from '../../Shared/Utils/ServiceUtils';
import Toaster from '../../Shared/Utils/Toaster';
import Modal from '../../Shared/Modal/Modal';
import './Configuration.scss'

const Configuration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { details } = location.state || {};
  const [formJson, setFormJson] = useState();
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tableEmittedData, setTableEmittedData] = useState({});
  const formRef = useRef(null);

  const handleTriggerSave = () => {
    if (formRef.current) {
      const newData = { key: "hideSave" };
      formRef.current.triggerSave(newData);
    }
  };
  const getData = (data) => {
    const payload = {
      userName: sessionStorage.getItem("userName"),
      tabName: sessionStorage.getItem('configurationTab'),
      data: data
    }
    let serviceName = payload.tabName
    ServiceUtils.postRequest(serviceName + 'Data', payload).then((response) => {
      if (showModal) {
        setShowModal(false)
      }
      if (response.status === 'success') {
        setFormJson(response.tabData);
        Toaster.success(response.message || "Success");
        getTabJsonData();
        setTimeout(getTableData, 100);
        if (payload.tabName === 'birdsPrice') {
          const subscriptionPayload = {
            subscription: localStorage.getItem('subscription'),
            notificationData: {
              message: `The updated birds price for ${data.date} is ${data.birdsPrice}`,
              title: "Brid's Price Updated"
            }
          }
          ServiceUtils.postRequest("pushNotification", subscriptionPayload).then((response) => {
            if (response.status === "success") {
              Toaster.success("Notification permission enabled");
            } else {
              Toaster.error("Failed to save subscription");
            }
          });
        }
        else if(payload.tabName === 'chickPrice'){
          const subscriptionPayload = {
            subscription: localStorage.getItem('subscription'),
            notificationData: {
              message: `The updated chicks price for ${data.date} is ${data.chickPrice}`,
              title: "Chick's Price Updated"
            }
          }
          ServiceUtils.postRequest("pushNotification", subscriptionPayload).then((response) => {
            if (response.status === "success") {
              Toaster.success("Notification permission enabled");
            } else {
              Toaster.error("Failed to save subscription");
            }
          });
        }
      } else {
        Toaster.error(response.message || "Error");
      }
    });
  }

  const routeToSettings = () => {
    navigate('/Home/Settings')
  }

  const getTabJsonData = () => {
    const payload = {
      userName: sessionStorage.getItem("userName"),
      tabName: details.key
    }
    sessionStorage.setItem('configurationTab', details.key)
    ServiceUtils.postRequest("tabJsonData", payload).then((response) => {
      if (response.status === 'success') {
        setFormJson(response.tabData);
      } else {
        Toaster.error(response.message || "Error");
      }
    });
  }

  const getTableData = () => {
    const payload = {
      userName: sessionStorage.getItem("userName"),
      tabName: details.key
    }
    ServiceUtils.postRequest(details.key + "TableData", payload).then((response) => {
      if (response.status === 'success') {
        setTableData(response.tableData);
      } else {
        Toaster.error(response.message || "Error");
      }
    });
  }

  useEffect(() => {
    getTabJsonData();
  }, [details?.key]);

  useEffect(() => {
    getTableData();
  }, [])

  const handleTableDataEmit = (data) => {
    setTableEmittedData(data)
    setShowModal(true);
  };
  const closeModalAndNavigate = () => {
    setShowModal(false);
  }
  const onDelete = () => {
    try {
      const payload = {
        data: tableEmittedData.data,
        type: tableEmittedData.type,
        userName: sessionStorage.getItem('userName'),
        tabName: sessionStorage.getItem('configurationTab')
      }
      ServiceUtils.postRequest("deleteSettingsTabDetails", payload).then((response) => {
        if (response.status === 'success') {
          setShowModal(false);
          getTableData();
          Toaster.success(response.message || "Success");
        } else {
          Toaster.error(response.message || "Error");
        }
      });
    } catch (error) {
      console.error(error)
    }
  }
  const onUnblock = () => {
    try {
      const payload = {
        data: tableEmittedData.data,
        type: tableEmittedData.type,
        userName: sessionStorage.getItem('userName'),
        tabName: sessionStorage.getItem('configurationTab')
      }
      ServiceUtils.postRequest("unBlockUser", payload).then((response) => {
        if (response.status === 'success') {
          setShowModal(false);
          getTableData();
          Toaster.success(response.message || "Success");
        } else {
          Toaster.error(response.message || "Error");
        }
      });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='pageContainer m-1'>
        <span className='cursor-pointer underline' onClick={() => routeToSettings()}><i className="fa fa-arrow-left" aria-hidden="true"></i> {"Settings/"}{sessionStorage.getItem('configurationTab')}</span>
        {details.key && formJson && formJson.length > 0 && (
          <>
            {formJson?.length > 0 && (
              <DyanmicForm formData={formJson} onSubmit={getData} />
            )}
            {/* <DyanmicForm formData={formJson} onSubmit={getData} /> */}
          </>
        )}
        {details.key && tableData && tableData.headerContent && tableData.headerContent.length > 0 && (
          <>
            {tableData && tableData.headerContent && tableData.headerContent.length > 0 &&
              <Table key={JSON.stringify(tableData)} data={tableData} onDataEmit={handleTableDataEmit} />
            }
          </>
        )}
      </div>
      {showModal && (
        // <Modal />
        <div className="modal fade show" role="dialog" style={{ display: 'flex' }}>
          <div className="modal-dialog w-100 d-flex align-items-center">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{tableEmittedData.type === 'view' ? 'View' : tableEmittedData.type === 'edit' ? 'Edit' : tableEmittedData.type === 'unblock' ? 'Unblock' : 'Delete'}</h5>
                <button type="button" className="close btn-group" data-dismiss="modal" aria-label="Close" onClick={closeModalAndNavigate}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {sessionStorage.getItem('configurationTab') && tableEmittedData.type === 'edit' &&
                  <div>
                    <DyanmicForm ref={formRef} formData={formJson} onSubmit={getData} updateFormValues={tableEmittedData.data} />
                  </div>
                }
                {tableEmittedData.type === 'delete' &&
                  <p>Are you sure you want to delete {tableEmittedData.data.date}?</p>
                }
                {tableEmittedData.type === 'unblock' &&
                  <p>Are you sure you want to unblock the user {tableEmittedData.data.userName}?</p>
                }
              </div>
              <div className="modal-footer">
                {tableEmittedData && tableEmittedData.type === 'edit' &&
                  <button type="button" className="btn btn-primary" onClick={handleTriggerSave}>Update</button>
                }
                {tableEmittedData && tableEmittedData.type === 'delete' &&
                  <button type="button" className="btn btn-outline-danger" onClick={onDelete}>Delete</button>
                }
                {tableEmittedData && tableEmittedData.type === 'unblock' &&
                  <button type="button" className="btn btn-outline-info" onClick={onUnblock}>Unblock</button>
                }
                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal" onClick={closeModalAndNavigate}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Configuration