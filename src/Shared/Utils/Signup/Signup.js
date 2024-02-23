import React, { useState } from 'react'
import './Signup.scss'
import hen from './../../../Assets/Images/hen.jpg'
import { useNavigate } from 'react-router';

const Signup = () => {
  const [signupData, setSignUpData] = useState({
    eMail: '',
    mobile: '',
    password: ''
  })
  const changeHandler = (e) => {
    setSignUpData({ ...signupData, [e.target.name]: e.target.value })
  }
  const signUpHandler = (e) => {
    e.preventDefault();
    console.log(signupData)
    if (signupData.eMail && signupData.mobile && signupData.password) {
      navigate('/login')
    }
    else {
      alert('Wrong user name or password')
    }
  }

  const isFormIncomplete = signupData.eMail.trim() === '' || signupData.mobile.trim() === '' || signupData.password.trim() === '';
  const btnClass = isFormIncomplete ? 'btnDisabled' : '';
  const navigate = useNavigate()
  return (
    <div className='d-flex' style={{ width: '100%', height: '100%' }}>
      <div className='col-4' style={{ backgroundColor: '#fff' }}>
        <div className='borderContainer'>
          <div className='imageContainer'>
            <img src={hen} className="imageLogo" alt="logo" />
          </div>
        </div>
      </div>
      <div className='col-8' style={{ backgroundColor: '#02153d' }}>
        <div className='signUpContainer d-flex justify-content-center align-items-center row col-md-12'>
          <div className='row col-md-12 justify-content-center'>
            <div className='formContainer col-md-5 d-flex justify-content-center align-items-center py-4'>
              <div className='row col-md-12 d-flex'>
                <div className='row'>
                  <h4 className='text-center signUpHeader'>Sign Up</h4>
                  <h4 className='text-center signUpHeader'>Broilers</h4>
                  <form onSubmit={signUpHandler}>
                    {/* <label className='mb-1' htmlFor='eMail'>E-Mail:</label> */}
                    <input className='form-control my-2' placeholder='E-mail' type='text' name='eMail' id='eMail' onChange={changeHandler} />
                    {/* <label className='mb-1' htmlFor='mobile'>Mobile Number:</label> */}
                    <input className='form-control my-2' placeholder='Mobile No' type='text' name='mobile' id='mobile' onChange={changeHandler} />
                    {/* <label className='mb-1' htmlFor='password'>Password:</label> */}
                    <input className='form-control my-2' placeholder='Password' type='password' name='password' id='password' onChange={changeHandler} />
                    <input type="submit" value="Sign Up" className={`btn btn-primary col-12 mt-4 ${btnClass}`} disabled={isFormIncomplete} />
                  </form>
                  <div className='pt-3' style={{ textAlign: 'center' }}>
                    <a href='/login'>Goto Login</a>
                  </div>
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