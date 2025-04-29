import React, { useState, useEffect } from 'react';
import './Table.scss';

const Table = ({ data, onDataEmit }) => {
  const tableData = {
    headerContent: [
      {
        "key": "ticketNo",
        "label": "Ticket No"
      },
      {
        "key": "title",
        "label": "Title"
      },
      {
        "key": "industryName",
        "label": "Industry Name"
      },
      {
        "key": "requestedby",
        "label": "Requested By"
      },
      {
        "key": "assignedTo",
        "label": "Assigned To"
      },
      {
        "key": "resolver",
        "label": "Resolver"
      },
      {
        "key": "date",
        "label": "Opened Date"
      },
      {
        "key": "priority",
        "hidden": true,
        "label": "Priority"
      },
      {
        "key": "severity",
        "hidden": true,
        "label": "Severity"
      },
      {
        "key": "last_update_time",
        "disabled": true,
        "label": "Last Update"
      },
      {
        "key": "dataLoggerIds",
        "hidden": true,
        "label": "Data Logger Id's"
      }
    ],
    bodyContent: [
      {
        "ticketNo": "SL73452",
        "title": "Data Not Uploading-",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 17:12:28",
        "vendor": "None",
        "last_update_time": "2024-06-13 18:43:30",
        "requestedby": "BHOOMI",
        "time_to_resolve": "0 mins",
        "comments": "<p>Hi,</p><p>As per the ticket it is to clarify that the data push to HSPCB Portal for the mentioned site is not done through GLens, kindly check once with the respective data uploader for the same.</p>",
        "assignedTo": "Rajasekar",
        "industryName": "Bharat rasayan ",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Minor",
        "severity": "Medium",
        "dataLoggerIds": "null"
      },
      {
        "ticketNo": "SL73444",
        "title": "GLens Desktop Client-Localhost_not_loading",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 16:51:40",
        "vendor": "None",
        "last_update_time": "2024-06-13 18:40:10",
        "requestedby": "UltraTech_Bho",
        "time_to_resolve": "0 mins",
        "comments": "<p>Dear sir,</p><p><br></p><p>As per the ticket, and discussion kindly show us tomorrow once where you are not getting the data.</p><p><br></p><p>Thanks,</p>",
        "assignedTo": "Yousuf",
        "industryName": "UltraTech cement Limited-Bhopalgarh",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Minor",
        "severity": "Medium",
        "dataLoggerIds": "MP201A_507"
      },
      {
        "ticketNo": "SL73443",
        "title": "Data Not Uploading-Device",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 16:35:10",
        "vendor": "None",
        "last_update_time": "2024-06-13 19:06:41",
        "requestedby": "sairupam",
        "time_to_resolve": "0 mins",
        "comments": "<p>Please share the TeamViewer access to check the issues. </p>",
        "assignedTo": "Mageswari",
        "industryName": "Shri Dutt India Private Limited ",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Minor",
        "severity": "Low",
        "dataLoggerIds": "MP_100_256"
      },
      {
        "ticketNo": "SL73431",
        "title": "Data Not Uploading-PC",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 16:11:01",
        "vendor": "None",
        "last_update_time": "2024-06-13 17:48:00",
        "requestedby": "BEC",
        "time_to_resolve": "0 mins",
        "comments": "<p>Dear Sir,</p><p>As we Discussed Mention PC is showing offline so kindly check and get back to us.</p><p><br></p><p>Thanks.</p>",
        "assignedTo": "Imran",
        "industryName": "BEC FERTILIZER",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Cosmetic",
        "severity": "Low",
        "dataLoggerIds": "null"
      },
      {
        "ticketNo": "SL73431",
        "title": "Data Not Uploading-PC",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 16:11:01",
        "vendor": "None",
        "last_update_time": "2024-06-13 17:48:00",
        "requestedby": "BEC",
        "time_to_resolve": "0 mins",
        "comments": "<p>Dear Sir,</p><p>As we Discussed Mention PC is showing offline so kindly check and get back to us.</p><p><br></p><p>Thanks.</p>",
        "assignedTo": "Imran",
        "industryName": "BEC FERTILIZER",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Cosmetic",
        "severity": "Low",
        "dataLoggerIds": "null"
      },
      {
        "ticketNo": "SL73431",
        "title": "Data Not Uploading-PC",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 16:11:01",
        "vendor": "None",
        "last_update_time": "2024-06-13 17:48:00",
        "requestedby": "BEC",
        "time_to_resolve": "0 mins",
        "comments": "<p>Dear Sir,</p><p>As we Discussed Mention PC is showing offline so kindly check and get back to us.</p><p><br></p><p>Thanks.</p>",
        "assignedTo": "Imran",
        "industryName": "BEC FERTILIZER",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Cosmetic",
        "severity": "Low",
        "dataLoggerIds": "null"
      },
      {
        "ticketNo": "SL73431",
        "title": "Data Not Uploading-PC",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 16:11:01",
        "vendor": "None",
        "last_update_time": "2024-06-13 17:48:00",
        "requestedby": "BEC",
        "time_to_resolve": "0 mins",
        "comments": "<p>Dear Sir,</p><p>As we Discussed Mention PC is showing offline so kindly check and get back to us.</p><p><br></p><p>Thanks.</p>",
        "assignedTo": "Imran",
        "industryName": "BEC FERTILIZER",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Cosmetic",
        "severity": "Low",
        "dataLoggerIds": "null"
      },
      {
        "ticketNo": "SL73431",
        "title": "Data Not Uploading-PC",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 16:11:01",
        "vendor": "None",
        "last_update_time": "2024-06-13 17:48:00",
        "requestedby": "BEC",
        "time_to_resolve": "0 mins",
        "comments": "<p>Dear Sir,</p><p>As we Discussed Mention PC is showing offline so kindly check and get back to us.</p><p><br></p><p>Thanks.</p>",
        "assignedTo": "Imran",
        "industryName": "BEC FERTILIZER",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Cosmetic",
        "severity": "Low",
        "dataLoggerIds": "null"
      },
      {
        "ticketNo": "SL73431",
        "title": "Data Not Uploading-PC",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 16:11:01",
        "vendor": "None",
        "last_update_time": "2024-06-13 17:48:00",
        "requestedby": "BEC",
        "time_to_resolve": "0 mins",
        "comments": "<p>Dear Sir,</p><p>As we Discussed Mention PC is showing offline so kindly check and get back to us.</p><p><br></p><p>Thanks.</p>",
        "assignedTo": "Imran",
        "industryName": "BEC FERTILIZER",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Cosmetic",
        "severity": "Low",
        "dataLoggerIds": "null"
      },
      {
        "ticketNo": "SL73431",
        "title": "Data Not Uploading-PC",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 16:11:01",
        "vendor": "None",
        "last_update_time": "2024-06-13 17:48:00",
        "requestedby": "BEC",
        "time_to_resolve": "0 mins",
        "comments": "<p>Dear Sir,</p><p>As we Discussed Mention PC is showing offline so kindly check and get back to us.</p><p><br></p><p>Thanks.</p>",
        "assignedTo": "Imran",
        "industryName": "BEC FERTILIZER",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Cosmetic",
        "severity": "Low",
        "dataLoggerIds": "null"
      },
      {
        "ticketNo": "SL73431",
        "title": "Data Not Uploading-PC",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 16:11:01",
        "vendor": "None",
        "last_update_time": "2024-06-13 17:48:00",
        "requestedby": "BEC",
        "time_to_resolve": "0 mins",
        "comments": "<p>Dear Sir,</p><p>As we Discussed Mention PC is showing offline so kindly check and get back to us.</p><p><br></p><p>Thanks.</p>",
        "assignedTo": "Imran",
        "industryName": "BEC FERTILIZER",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Cosmetic",
        "severity": "Low",
        "dataLoggerIds": "null"
      },
      {
        "ticketNo": "SL73431",
        "title": "Data Not Uploading-PC",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 16:11:01",
        "vendor": "None",
        "last_update_time": "2024-06-13 17:48:00",
        "requestedby": "BEC",
        "time_to_resolve": "0 mins",
        "comments": "<p>Dear Sir,</p><p>As we Discussed Mention PC is showing offline so kindly check and get back to us.</p><p><br></p><p>Thanks.</p>",
        "assignedTo": "Imran",
        "industryName": "BEC FERTILIZER",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Cosmetic",
        "severity": "Low",
        "dataLoggerIds": "null"
      },
      {
        "ticketNo": "SL73431",
        "title": "Data Not Uploading-PC",
        "resolver": "Data Upload Issue",
        "date": "2024-06-13 16:11:01",
        "vendor": "None",
        "last_update_time": "2024-06-13 17:48:00",
        "requestedby": "BEC",
        "time_to_resolve": "0 mins",
        "comments": "<p>Dear Sir,</p><p>As we Discussed Mention PC is showing offline so kindly check and get back to us.</p><p><br></p><p>Thanks.</p>",
        "assignedTo": "Imran",
        "industryName": "BEC FERTILIZER",
        "ticket_indicator": {
          "priority": "",
          "aging": "#ffffff"
        },
        "status": "assign",
        "projectName": "Glens",
        "priority": "Cosmetic",
        "severity": "Low",
        "dataLoggerIds": "null"
      }
    ]
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    ticketNo: '',
    title: '',
    industryName: '',
    requestedby: '',
    assignedTo: '',
    resolver: '',
    date: '',
    priority: '',
    severity: '',
    last_update_time: '',
    dataLoggerIds: '',
  });
  const [filteredData, setFilteredData] = useState(data?.bodyContent);

  useEffect(() => {
    console.log(data)
    const filtered = data?.bodyContent.filter((item) =>
      Object.keys(filters).every((key) =>
        filters[key] === '' ||
        (item[key] && item[key]
          .toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase()))
      ) &&
      Object.values(item).some(
        (value) =>
          value &&
          value
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, filters]);

  const handleFilterChange = (key) => (event) => {
    setFilters({ ...filters, [key]: event.target.value });
  };

  const maxRows = 10;
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = (event) => {
    event.preventDefault();
    setIsVisible(!isVisible);
  };

  const emitDataToParent = (body, type) => {
    const dataToEmit = {
      data: body,
      type: type
    };
    if (onDataEmit) {
      onDataEmit(dataToEmit);
    }
  };

  return (
    <>
      <div className='row col-md-12 my-1 d-flex justify-content-end'>
        <button className='btn btn-primary w-auto' style={{ marginRight: '10px' }} onClick={handleToggle}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
        <input type='text' className='form-control w-25' placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className='virtualTable'>
        <table className='table table-borderless table-striped table-hover'>
          <thead className='table-dark'>
            <tr className='table-th'>
              <th scope='col' className='align-baseline slNoCol' style={{ width: '75px' }}>Sl.No</th>
              {data?.actions && Object.keys(data.actions).length > 0 &&
                <th scope='col' className='align-baseline actionCol'>Actions</th>
              }
              {data?.headerContent.map((element) => (
                element && !element.hidden ? (
                  <th key={element.key}>
                    {element.label}
                    {!element.hidden && isVisible && (
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        placeholder={element.label}
                        value={filters[element.key] || ''}
                        onChange={handleFilterChange(element.key)}
                      />
                    )}
                  </th>
                ) : null
              ))}
            </tr>
          </thead>
          <tbody style={{ maxHeight: maxRows * 2.5 + 'rem' }}>
            {filteredData && filteredData?.length > 0 ? filteredData?.map((body, index) => (
              <tr key={index}>
                <td className='slNoCol' style={{ width: '75px' }}>{index + 1}</td>
                {data?.actions && Object.keys(data.actions).length > 0 &&
                  <td className='actionCol'>
                    {data.actions.view && (
                      <button className='btn px-2' style={{ paddingTop: '1px', paddingBottom: '1px' }}>
                        <i className="fa fa-eye" aria-hidden="true" title='View' onClick={() => emitDataToParent(body, 'view')}></i>
                      </button>
                    )}
                    {data.actions.edit && (
                      <button className='btn px-2' style={{ paddingTop: '1px', paddingBottom: '1px' }}>
                        <i className="fa fa-edit" aria-hidden="true" title='Edit' onClick={() => emitDataToParent(body, 'edit')}></i>
                      </button>
                    )}
                    {data.actions.delete && (
                      <button className='btn px-2' style={{ paddingTop: '1px', paddingBottom: '1px' }}>
                        <i className="fa fa-trash" aria-hidden="true" title='Delete' onClick={() => emitDataToParent(body, 'delete')}></i>
                      </button>
                    )}
                    {data.actions.lock && (
                      <button className='btn px-2' style={{ paddingTop: '1px', paddingBottom: '1px' }}>
                        <i className="fa fa-lock" aria-hidden="true" title='Unblock' onClick={() => emitDataToParent(body, 'unblock')}></i>
                      </button>
                    )}
                  </td>
                }
                {data?.headerContent.map(
                  (head) =>
                    !head.hidden && (
                      <td key={head.key} title={body[head.key]}>
                        {body[head.key]}
                      </td>
                    )
                )}
              </tr>
            )) : <tr>No Records Available</tr>
            }
          </tbody>
        </table>
      </div>
      <div className='float-end'>Total Records: {filteredData?.length ? filteredData?.length : 0}</div>
    </>
  );
};

export default Table;