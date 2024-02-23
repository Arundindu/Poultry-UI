import React, { useState } from 'react'
import './Login.scss'
import hen from './../../../Assets/Images/hen.jpg';
import { useNavigate } from 'react-router';


const Login = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(data)
        if (data.username === 'Arun' && data.password === 'Arun@123') {
            navigate('/home/dashboard')
        }
        else {
            alert('Wrong user name or password')
        }
    }
    const validateKey = () => {
        console.log('Validating Key')
    }

    validateKey()
    const isFormIncomplete = data.username.trim() === '' || data.password.trim() === '';
    const buttonClass = isFormIncomplete ? 'btnDisabled' : '';

    return (
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
                                <h1 className='d-flex justify-content-center mb-5'>Broilers</h1>
                                <form onSubmit={submitHandler}>
                                    {/* <label className='mb-1' htmlFor='username'>Username:</label> */}
                                    <input className='form-control my-2' placeholder='Username' type='text' name='username' id='username' onChange={changeHandler} />
                                    {/* <label className='mb-1' htmlFor='password'>Password:</label> */}
                                    <input className='form-control my-2' placeholder='Password' type='password' name='password' id='password' onChange={changeHandler} />
                                    <input type="submit" value="login" className={`btn btn-primary col-12 mt-4 ${buttonClass}`} disabled={isFormIncomplete} />
                                </form>
                                <div className='col-12 d-flex justify-content-between'>
                                    <a href='/signUp'>SignUp?</a>
                                    <a href='/home/dashboard'>Forgot Password</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login