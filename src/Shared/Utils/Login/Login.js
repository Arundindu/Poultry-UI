import React, { useState } from 'react'
import './Login.scss'
import hen from './../../../Assets/Images/hen.jpg';
import { useNavigate } from 'react-router';
import Toaster from '../Toaster';
import { ServiceUtils } from '../ServiceUtils';

const Login = () => {
    const [data, setData] = useState({
        userName: '',
        password: ''
    })
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const payload = data
        ServiceUtils.postRequest("userLogin", payload).then((responseData) => {
            let response = JSON.parse(window.atob(responseData.data))
            if (response.status === 'success') {
                localStorage.setItem('userName', data.userName)
                navigate('/Home/Dashboard')
            } else if(response.status === 'InActive'){
                setShowModal(true);
                Toaster.info(response.message || "Success");
            } else {
                Toaster.error(response.message || "Error");
            }
        });
    }

    const goToPublicPage = () => {
        navigate('/Public')
    }

    const routeToSignUp = () => {
        navigate('/Signup')
    }

    const routeToDashboard = () => {
        navigate('/Home/Dashboard')
    }

    const validateKey = () => {
        console.log('Validating Key')
    }

    const closeModalAndNavigate = () => {
        setShowModal(false);
    };

    const onActivate = () => {
        const payload = {
            userName:data.userName
        }
        ServiceUtils.postRequest("activateUser", payload).then((responseData) => {
            let response = JSON.parse(window.atob(responseData.data))
            if (response.status === 'success') {
                setShowModal(false);
                localStorage.setItem('userName', data.userName)
                navigate('/Home/Dashboard')
                Toaster.success(response.message || "Success");
            } else {
                Toaster.error(response.message || "Error");
            }
        });
    };

    validateKey()
    const isFormIncomplete = data.userName.trim() === '' || data.password.trim() === '';
    const buttonClass = isFormIncomplete ? 'btnDisabled' : '';

    return (
        <>
            {window.innerWidth && window.innerWidth > 425 ?
                <div className='container-fluid'>
                    <div>
                        <div className='circle1'></div>
                        <div className='circle2'></div>
                        <div className='circle3'></div>
                        <div className='circle4'></div>
                        <div className='circle5'></div>
                        <div className='circle6'></div>
                        <div className='circle7'></div>
                    </div>
                    <div className='row d-flex justify-content-center align-items-center loginContainer'>
                        <div className='row'>
                            <div className='col-6 d-flex justify-content-center align-items-center'>
                                <img src={hen} className="appLogo" alt="logo" />
                            </div>
                            <div className='col-6 d-flex justify-content-center align-items-center'>
                                <div className='row col-12'>
                                    <div className='col-12'>
                                        <h1 className='d-flex justify-content-center mb-5'>D C S Reddy Farms</h1>
                                        <form onSubmit={submitHandler}>
                                            <input className='form-control my-2' placeholder='Username' type='text' name='userName' id='userName' onChange={changeHandler} />
                                            <input className='form-control my-2' placeholder='Password' type='password' name='password' id='password' onChange={changeHandler} />
                                            <input type="submit" value="Login" className={`btn btn-primary col-12 mt-4 ${buttonClass}`} disabled={isFormIncomplete} />
                                        </form>
                                        <div className='col-12 d-flex justify-content-between'>
                                            <a onClick={() => routeToSignUp()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>SignUp?</a>
                                            <a onClick={() => routeToDashboard()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Forgot Password</a>
                                        </div>
                                        <div className='col-12 d-flex justify-content-around'><a onClick={() => goToPublicPage()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Back to Public Page</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='container-fluid'>
                    <div>
                        <div className='circle1'></div>
                        <div className='circle2'></div>
                        <div className='circle3'></div>
                        <div className='circle4'></div>
                        <div className='circle5'></div>
                        <div className='circle6'></div>
                        <div className='circle7'></div>
                    </div>
                    <div className='row d-flex justify-content-center align-items-center loginContainer'>
                        <div className='row'>
                            <div className='col-12 d-flex justify-content-around align-items-center'>
                                <img src={hen} className="appLogo" alt="logo" />
                                <h3 className='d-flex justify-content-center align-items-center'>D C S Reddy Farms</h3>
                            </div>
                            <div className='col-12 d-flex justify-content-center align-items-center'>
                                <div className='row col-12'>
                                    <div className='col-12'>
                                        <form onSubmit={submitHandler}>
                                            <input className='form-control my-2' placeholder='Username' type='text' name='userName' id='userName' onChange={changeHandler} />
                                            <input className='form-control my-2' placeholder='Password' type='password' name='password' id='password' onChange={changeHandler} />
                                            <input type="submit" value="Login" className={`btn btn-primary col-12 mt-4 ${buttonClass}`} disabled={isFormIncomplete} />
                                        </form>
                                        <div className='col-12 d-flex justify-content-between'>
                                            <a onClick={() => routeToSignUp()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>SignUp?</a>
                                            <a onClick={() => routeToDashboard()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Forgot Password</a>
                                        </div>
                                        <div className='col-12 d-flex justify-content-around'><a onClick={() => goToPublicPage()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Back to Public Page</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {showModal && (

                <div className="modal fade show" role="dialog" style={{ display: 'flex' }}>
                    <div className="modal-dialog w-100 d-flex align-items-center">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Activate User</h5>
                                <button type="button" className="close btn-group" data-dismiss="modal" aria-label="Close" onClick={closeModalAndNavigate}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>The User is InActive. Please activate.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={onActivate}>Activate</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal" onClick={closeModalAndNavigate}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login