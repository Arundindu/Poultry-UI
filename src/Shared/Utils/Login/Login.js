import React, { useState } from 'react'
import './Login.scss'
import hen from './../../../Assets/Images/hen.jpg';
import { useNavigate } from 'react-router';
import Toaster from '../Toaster';
import { ServiceUtils } from '../ServiceUtils';
import * as CryptoJS from 'crypto-js';
import { sessionService } from '../SessionService';

const Login = () => {
    const [data, setData] = useState({
        userName: '',
        password: ''
    })
    const [forgotData, setForgotData] = useState({
        userName: '',
        eMil: ''
    })
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const changeHandle = (e) => {
        setForgotData({ ...forgotData, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let encodedDetails = JSON.parse(JSON.stringify(data))
        // AES
        // encodedDetails.password = encryptPasswordWithUsername(encodedDetails.password, data.userName, 'token')
        const payload = encodedDetails
        ServiceUtils.postRequest("userLogin", payload).then((response) => {
            if (response.status === 'success') {
                sessionStorage.setItem('userName', encodedDetails.userName)
                sessionStorage.setItem('userType', encodedDetails.userType)
                navigate('/Home/Dashboard')
            } else if (response.status === 'InActive') {
                setShowModal(true);
                Toaster.info(response.message || "Success");
            } else {
                Toaster.error(response.message || "Error");
            }
        });
    }
    const getOtp = (e) => {
        try {
            e.preventDefault();
            let encodedDetails = JSON.parse(JSON.stringify(forgotData))
            // AES
            // encodedDetails.password = encryptPasswordWithUsername(encodedDetails.password, data.userName, 'token')
            const payload = encodedDetails
            ServiceUtils.postRequest("forgotPassword", payload).then((response) => {
                if (response.status === 'success') {
                    sessionStorage.setItem('userName', encodedDetails.userName)
                    sessionStorage.setItem('userType', encodedDetails.userType)
                    setShowForgotModal(false)
                } else {
                    Toaster.error(response.message || "Error");
                }
            });
        } catch (error) {
            console.error(error)
        }
    }

    const encryptPasswordWithUsername = (encData, username, token = null) => {
        try {
            let tokenFromUI = ''
            if (token) {
                tokenFromUI = getFirstThreeCharacters(username) + token;
            }
            const key = CryptoJS.enc.Utf8.parse(tokenFromUI);
            const iv = CryptoJS.lib.WordArray.random(16);
            const encrypted = CryptoJS.AES.encrypt(encData, key, {
                iv,
            });
            return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
        } catch (error) {
            console.error(error);
            return null
        }
    }
    const getFirstThreeCharacters = (username) => {
        let three = '';
        const len = username.length;
        if (len <= 3) {
            three = username + ('a'.repeat(3 - len));
        } else {
            three = username.slice(0, 3);
        }
        return three;
    }

    const goToPublicPage = () => {
        navigate('/Public')
    }

    const routeToSignUp = () => {
        navigate('/Signup')
    }

    const showForgotPassword = () => {
        setShowForgotModal(true);
    }

    const closeModalAndNavigate = () => {
        setShowModal(false);
        setShowForgotModal(false);
    };

    const onActivate = () => {
        const payload = {
            userName: data.userName
        }
        ServiceUtils.postRequest("activateUser", payload).then((response) => {
            if (response.status === 'success') {
                setShowModal(false);
                sessionStorage.setItem('userName', data.userName)
                navigate('/Home/Dashboard')
                Toaster.success(response.message || "Success");
            } else {
                Toaster.error(response.message || "Error");
            }
        });
    };

    const isLoginDisabled = data?.userName?.trim() === '' || data?.password?.trim() === '';
    const isOtpDisabled = forgotData?.userName?.trim() === '' || forgotData?.eMail?.trim() === '';

    return (
        <>
            {window.innerWidth && window.innerWidth > 500 ?
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
                                            {/* <input className='form-control my-2' placeholder='Password' type={showPassword ? 'text' : 'password'} name='password' id='password' onChange={changeHandler} />
                                            <i
                                                className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{
                                                    position: 'absolute',
                                                    right: '50px',
                                                    top: '51%',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer',
                                                    color: '#333'
                                                }}
                                            ></i> */}
                                            <input type="submit" value="Login" className={`btn btn-primary col-12 mt-4 ${isLoginDisabled ? 'btnDisabled' : ''}`} disabled={isLoginDisabled} />
                                        </form>
                                        <div className='col-12 d-flex justify-content-between'>
                                            <a onClick={() => routeToSignUp()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>SignUp?</a>
                                            <a onClick={() => showForgotPassword()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Forgot Password</a>
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
                    <div className='loginContainer'>
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
                                            <input type="submit" value="Login" className={`btn btn-primary col-12 mt-4 ${isLoginDisabled ? 'btnDisabled' : ''}`} disabled={isLoginDisabled} />
                                        </form>
                                        <div className='col-12 d-flex justify-content-between'>
                                            <a onClick={() => routeToSignUp()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>SignUp?</a>
                                            <a onClick={() => showForgotPassword()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Forgot Password</a>
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
            {showForgotModal && (
                <div className="modal fade show justify-content-center" role="dialog" style={{ display: 'flex' }}>
                    <div className={`modal-dialog d-flex align-items-center ${window.innerWidth && window.innerWidth > 500 ? 'w-25' : 'w-100'}`}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Forgot Password?</h5>
                                <button type="button" className="close btn-group" data-dismiss="modal" aria-label="Close" onClick={closeModalAndNavigate}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <input className='form-control my-2' placeholder='Username' type='text' name='userName' id='userName' onChange={changeHandle} />
                                    <input className='form-control my-2' placeholder='E-mail' type='email' name='eMail' id='eMail' onChange={changeHandle} />
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className={`btn btn-primary ${isOtpDisabled ? 'btnDisabled' : ''}`} onClick={getOtp} disabled={isOtpDisabled}>Get OTP</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login