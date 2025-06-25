import React, { useEffect, useState } from 'react'
import './UserRoleSetup.scss'
import classNames from 'classnames'
import { ServiceUtils } from '../../Shared/Utils/ServiceUtils'
import Toaster from '../../Shared/Utils/Toaster'
import { useNavigate } from 'react-router-dom'

const UserRoleSetup = () => {
    const [activeCard, setActiveCard] = useState('')
    const [fieldsData, setFieldsData] = useState({})
    const [tabs, setTabs] = useState([])
    const [pages, setPages] = useState([])
    const navigate = useNavigate()

    const data = {
        "admin": {
            "dashboard": true,
            "about": true,
            "trends": true,
            "settings": true,
            "settingssubPage": {
                "birdsPrice": true,
                "chickPrice": true,
                "diseases": true,
                "feedConsumption": true,
                "feedPrice": true,
                "hensAvailability": true,
                "mortality": true,
                "notifications": true,
                "orderHens": true,
                "sales": true,
                "sheds": true,
                "userSetup": true,
                "userRoleSetup": true,
                "blockedUsers": false
            },
            "gallery": true,
            "diseases": false
        },
        "vendor": {
            "dashboard": true,
            "about": true,
            "trends": true,
            "settings": true,
            "settingssubPage": {
                "birdsPrice": true,
                "chickPrice": false,
                "diseases": false,
                "feedConsumption": false,
                "feedPrice": false,
                "hensAvailability": true,
                "mortality": false,
                "notifications": false,
                "orderHens": false,
                "sales": false,
                "sheds": false,
                "userSetup": false,
                "userRoleSetup": false,
                "blockedUsers": false
            },
            "gallery": false,
            "diseases": false
        },
        "user": {
            "dashboard": true,
            "about": true,
            "trends": true,
            "settings": false,
            "settingssubPage": {
                "birdsPrice": false,
                "chickPrice": false,
                "diseases": false,
                "feedConsumption": false,
                "feedPrice": false,
                "hensAvailability": true,
                "mortality": false,
                "notifications": false,
                "orderHens": false,
                "sales": false,
                "sheds": false,
                "userSetup": false,
                "userRoleSetup": false,
                "blockedUsers": false
            },
            "gallery": false,
            "diseases": false
        },
        "farmer": {
            "dashboard": true,
            "about": true,
            "trends": true,
            "settings": true,
            "settingssubPage": {
                "birdsPrice": false,
                "chickPrice": false,
                "diseases": false,
                "feedConsumption": false,
                "feedPrice": false,
                "hensAvailability": true,
                "mortality": false,
                "notifications": true,
                "orderHens": true,
                "sales": false,
                "sheds": false,
                "userSetup": false,
                "userRoleSetup": false,
                "blockedUsers": false
            },
            "gallery": false,
            "diseases": true
        }
    }

    const fetchUserTabDetails = () => {
        ServiceUtils.localJSONS('getUserRoleTabs').then((response) => {
            if (response.status === 'success') {
                setTabs(response.data)
                setActiveCard(response.data[0].key)
            } else {
                Toaster.error(response.message || "Error");
            }
        });
    }
    const fetchUserPageDetails = () => {
        ServiceUtils.localJSONS('getUserRolePages').then((response) => {
            if (response.status === 'success') {
                setPages(response.data)
            } else {
                Toaster.error(response.message || "Error");
            }
        });
    }

    useEffect(() => {
        const initialize = async () => {
            fetchUserTabDetails()
            fetchUserPageDetails()
        }

        initialize()
    }, [])

    useEffect(() => {
        if (activeCard && pages.length > 0) {
            const initialData = {
                [activeCard]: {}
            }
            pages.forEach((page) => {
                initialData[activeCard][page.key] = data[activeCard] ? data[activeCard][page.key] : false
                if (page.subPage) {
                    initialData[activeCard][page.key + "subPage"] = {}
                    page.subPage.forEach((sub) => {
                        initialData[activeCard][page.key + "subPage"][sub.key] = data[activeCard] ? data[activeCard][page.key + "subPage"][sub.key] : false
                    })
                }
            })
            setFieldsData(initialData)
        }
    }, [activeCard, pages])

    const getActiveTab = (tab) => {
        setActiveCard(tab.key)
    }

    const updateContent = (event, page, subPage = null) => {
        setFieldsData(prev => {
            const updated = { ...prev }
            if (!updated[activeCard]) {
                updated[activeCard] = {}
            }
            if (subPage) {
                if (!updated[activeCard][page + "subPage"]) {
                    updated[activeCard][page + "subPage"] = {}
                }
                updated[activeCard][page + "subPage"][subPage] = event.target.checked
            } else {
                updated[activeCard][page] = event.target.checked
            }
            return updated
        })
    }

    const handleSubmit = () => {
        console.log(fieldsData)
    }
    const routeToSettings = () => {
        navigate('/Home/Settings')
    }

    return (
        <div className="pageContainer">
            <div className='d-flex justify-content-between m-1'>
                <span className='cursor-pointer underline' onClick={() => routeToSettings()}><i className="fa fa-arrow-left" aria-hidden="true"></i> {"Settings/User Role Setup"}</span>
                <button className='btn' style={{ border: '1px solid' }}>Add New User Role</button>
            </div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {tabs.map((tab) => (
                                <li className="nav-item" key={tab.key}>
                                    <button className={classNames("nav-link px-5", { 'active': activeCard === tab.key })} onClick={() => getActiveTab(tab)}>
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='container-fluid'>
                {pages.map((page) => (
                    <div className='p-1' key={page.key}>
                        <div className='mainPage'>
                            <input type='checkbox' onChange={(e) => updateContent(e, page.key)}
                                checked={fieldsData?.[activeCard]?.[page.key] || false} />&nbsp; <label>{page.label}</label>
                        </div>
                        {page.subPage && page.subPage.map((subPage) => (
                            <div className='px-4 py-1 subPage' key={subPage.key}>
                                <input
                                    type='checkbox'
                                    disabled={!fieldsData?.[activeCard]?.[page.key]}
                                    onChange={(e) => updateContent(e, page.key, subPage.key)}
                                    checked={fieldsData?.[activeCard]?.[page.key + "subPage"]?.[subPage.key] || false}
                                />
                                &nbsp; <label>{subPage.label}</label>
                            </div>
                        ))}
                    </div>
                ))}
                <div className='d-flex justify-content-end m-1'>
                    <button className='btn btn-primary' onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default UserRoleSetup