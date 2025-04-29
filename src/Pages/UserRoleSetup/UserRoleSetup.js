import React, { useEffect, useState } from 'react'
import './UserRoleSetup.scss'
import classNames from 'classnames'

const UserRoleSetup = () => {
    const [activeCard, setActiveCard] = useState('')
    const [fieldsData, setFieldsData] = useState({})
    const pages = [
        {
            key: "dashboard",
            label: "Dashboard"
        },
        {
            key: "about",
            label: "About"
        },
        {
            key: "trends",
            label: "Trends"
        },
        {
            key: "settings",
            label: "Settings",
            subPage: [
                {
                    key: "birdsPrice",
                    label: "Birds Price"
                },
                {
                    key: "chickPrice",
                    label: "Chicks Price"
                },
                {
                    key: "diseases",
                    label: "Diseases"
                },
                {
                    key: "feedConsumption",
                    label: "Feed Consumption"
                },
                {
                    key: "feedPrice",
                    label: "Feed Price"
                },
                {
                    key: "hensAvailability",
                    label: "Hens Availability"
                },
                {
                    key: "mortality",
                    label: "Mortality"
                },
                {
                    key: "notifications",
                    label: "Notifications"
                },
                {
                    key: "orderHens",
                    label: "Order Hens"
                },
                {
                    key: "sales",
                    label: "Sales"
                },
                {
                    key: "sheds",
                    label: "Sheds"
                },
                {
                    key: "userSetup",
                    label: "User Setup"
                },
                {
                    key: "userRoleSetup",
                    label: "User Role Setup"
                },
                {
                    key: "blockedUsers",
                    label: "Blocked Users"
                }
            ]
        },
        {
            key: "gallery",
            label: "Gallery"
        },
        {
            key: "diseases",
            label: "Diseases"
        }
    ]
    const tabs = [
        {
            key: "admin",
            label: "Admin"
        },
        {
            key: "vendor",
            label: "Vendor"
        },
        {
            key: "user",
            label: "User"
        },
        {
            key: "farmer",
            label: "Farmer"
        }
    ]
    useEffect(() => {
        setActiveCard('admin')
        if (pages) {
            const initialData = {};
            pages.forEach((page) => {
                initialData[page.key] = false;
                if (page.subPage) {
                    initialData[page.key + "subPage"] = {}
                    page.subPage.forEach((sub) => {
                        initialData[page.key + "subPage"][sub.key] = false;
                    });
                }
            });
            setFieldsData(initialData);
        }
    }, [])
    const getActiveTab = (tab) => {
        setActiveCard(tab.key)
    }

    const updateContent = (event, page, subPage = null) => {
        setFieldsData(prev => {
            if (subPage) {
                return {
                    ...prev,
                    [page + "subPage"]: {
                        ...(prev[page + "subPage"] || {}),
                        [subPage]: event.target.checked
                    }
                };
            } else {
                return {
                    ...prev,
                    [page]: event.target.checked
                };
            }
        });
    };
    const handleSubmit = () => {
        console.log(fieldsData)
    }
    return (
        <>
            <div className="pageContainer">
                <div className='d-flex justify-content-end m-1'>
                    <button className='btn' style={{ border: '1px solid' }}>Add New User Role</button>
                </div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {tabs && tabs.map((tab) => (
                                    <li className="nav-item">
                                        <button className={classNames("nav-link px-5", { 'active': activeCard === tab.key })} onClick={() => getActiveTab(tab)}>{tab.label}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='container-fluid'>
                    {pages && pages.length > 0 && pages.map((page) => (
                        <div className='p-1'>
                            <div className='mainPage'>
                                <input type='checkbox' onChange={(e) => updateContent(e, page.key)} checked={fieldsData[page.key]} /> &nbsp; <label>{page.label}</label>
                            </div>
                            {page.subPage && page.subPage.length > 0 && page.subPage.map((subPage) => (
                                <div className='px-4 py-1 subPage'>
                                    <input type='checkbox' id={subPage.key} disabled={fieldsData[page.key] ? false : true} onChange={(e) => updateContent(e, page.key, subPage.key)} checked={fieldsData[page.key + "subPage"]?.[subPage.key]} /> &nbsp; <label>{subPage.label}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className='d-flex justify-content-end m-1'>
                        <button className='btn btn-primary' onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserRoleSetup