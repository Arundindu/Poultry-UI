import React, { useState } from 'react'
import './Signup.scss'
import hen from './../../../Assets/Images/hen.jpg'
import { useNavigate } from 'react-router';
import Toaster from '../Toaster';
import { ServiceUtils } from '../ServiceUtils';

const Signup = () => {
  const [signupData, setSignUpData] = useState({
    userName: '',
    eMail: '',
    mobile: '',
    password: '',
    userType: 'Client'
  })
  const changeHandler = (e) => {
    setSignUpData({ ...signupData, [e.target.name]: e.target.value })
  }
  const signUpHandler = (e) => {
    e.preventDefault();
    const payload = signupData
    if (signupData.userName && signupData.eMail && signupData.mobile && signupData.password) {
      ServiceUtils.postRequest("addUser", payload).then((response) => {
        if (response.status === 'success') {
          Toaster.success(response.message || "Success");
          navigate('/Login')
        } else {
          Toaster.error(response.message || "Error");
        }
      });
    }

    else {
      Toaster.info('Please enter all the details')
    }
  }
  const routeToLogin = () => {
    navigate('/Login')
  }

  const isFormIncomplete = signupData.eMail.trim() === '' || signupData.mobile.trim() === '' || signupData.password.trim() === '';
  const btnClass = isFormIncomplete ? 'btnDisabled' : '';
  const navigate = useNavigate()
  return (
    (window.innerWidth && window.innerWidth > 500) ?
      <div className='d-flex' style={{ width: '100%', height: '100%' }}>
        <div className='col-4' style={{ backgroundColor: '#fff' }}>
          <div className='borderContainer'>
            <div className='imageContainer'>
              <img src={hen} className="imageLogo" alt="logo" />
            </div>
          </div>
        </div>
        <div className='col-8' style={{ backgroundColor: '#3c4858' }}>
          <div className='signUpContainer d-flex justify-content-center align-items-center row col-md-12'>
            <div className='row col-md-12 justify-content-center'>
              <div className='formContainer col-md-5 d-flex justify-content-center align-items-center py-4'>
                <div className='row col-md-12 d-flex'>
                  <div className='row'>
                    <h2 className='text-center signUpHeader'>Sign Up</h2>
                    <h2 className='text-center signUpHeader'>D C S Reddy Farms</h2>
                    <form onSubmit={signUpHandler}>
                      {/* <label className='mb-1' htmlFor='userName'>User Name:</label> */}
                      <input className='form-control my-2' placeholder='User Name' type='text' name='userName' id='userName' onChange={changeHandler} />
                      {/* <label className='mb-1' htmlFor='eMail'>E-Mail:</label> */}
                      <input className='form-control my-2' placeholder='E-mail' type='text' name='eMail' id='eMail' onChange={changeHandler} />
                      {/* <label className='mb-1' htmlFor='mobile'>Mobile Number:</label> */}
                      <input className='form-control my-2' placeholder='Mobile No' type='number' name='mobile' id='mobile' onChange={changeHandler} />
                      {/* <label className='mb-1' htmlFor='password'>Password:</label> */}
                      <input className='form-control my-2' placeholder='Password' type='password' name='password' id='password' onChange={changeHandler} />
                      <input type="submit" value="Sign Up" className={`btn btn-primary col-12 mt-4 ${btnClass}`} disabled={isFormIncomplete} />
                    </form>
                    <div className='pt-3' style={{ textAlign: 'center' }}>
                      <a onClick={() => routeToLogin()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Goto Login</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      <div className='d-flex' style={{ width: '100%', height: '100%' }}>
        <div className='row m-0' style={{ backgroundColor: '#fff' }}>
          <div className="col-12">
            <div className="borderContainer">
              <div className="imageContainer">
                <img src={hen} className="imageLogo" alt="logo" />
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center align-items-center mobileSignup'>
            <div className='row col-md-12 justify-content-center'>
              <div className='formContainer py-4'>
                <div className='row'>
                  <h2 className='text-center signUpHeader'>Sign Up</h2>
                  <h2 className='text-center signUpHeader'>D C S Reddy Farms</h2>
                  <form onSubmit={signUpHandler}>
                    <input className='form-control my-2' placeholder='User Name' type='text' name='userName' id='userName' onChange={changeHandler} />
                    <input className='form-control my-2' placeholder='E-mail' type='text' name='eMail' id='eMail' onChange={changeHandler} />
                    <input className='form-control my-2' placeholder='Mobile No' type='number' name='mobile' id='mobile' onChange={changeHandler} />
                    <input className='form-control my-2' placeholder='Password' type='password' name='password' id='password' onChange={changeHandler} />
                    <input type="submit" value="Sign Up" className={`btn btn-primary col-12 mt-4 ${btnClass}`} disabled={isFormIncomplete} />
                  </form>
                  <div className='pt-3' style={{ textAlign: 'center' }}>
                    <a onClick={() => routeToLogin()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Goto Login</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Signup