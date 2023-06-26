

import React, { useEffect, useState } from 'react'
import { userLogin } from '../slices/LoginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import "./Login.css"
import profilepic from '../../images/dummy_profile.jpg'

const Login = () => {
  //destructure the attributes using useselector hook
  let { status, userObj, errorMessage } = useSelector(state => state.login)
  console.log("errormessageinlogin..", errorMessage)
  console.log("userObject checking:", userObj)
  //to dispatch the actionobj to reducer function
  let dispatch = useDispatch()
  //to navigate create navigate() function
  let navigate = useNavigate()
  // after the first rendering of page completed then only useEffect called
  let [Message, setMessage] = useState("")
  useEffect(() => {
    if (status === "success") {
      // Checking role based on that navigate to required to component
      if (userObj.role === "seller") {
        navigate("/seller")
      }
      if (userObj.role === "customer") {
        navigate("/customer")
      }
      if (userObj.role === "admin") {
        navigate("/admin")
      }
    }
  }, [status])
  return (
    <div id="LoginForm">
      <div className='' >
        {/* conditional rendering--- if role is assigned then only login otherwise unauthorized access */}
        {
          errorMessage ? <p className="display-4 text-danger">{errorMessage}</p> : <p></p>
        }
        {
          Message ? <p className="display-4 text-danger">{Message}</p> : <p></p>
        }
        <div className='row mx-auto m-5 bg-light shadow rounded' style={{ width: "40%" }}>
          {/* formik */}
          <Formik initialValues={{
            email: "", password: ""
          }} //validation
            validate={
              values => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required'
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                if (!values.password) {
                  errors.password = "Required"
                }
                return errors
              }}
            onSubmit={async (values, { setSubmitting,resetForm }) => {
              resetForm();
              try {
                //make api reques
                console.log("values...", values)
                //  console.log("userActionObj...",userActionObj)
                let userObj = userLogin(values)
                dispatch(userObj)
              }
              catch (err) {
                setMessage(err.response.data.message)
                // setMessage(err)
              }
            }}>
            {({
              values, errors, touched, handleChange, handleSubmit
            }) => (<div className='col-3 col-sm-8 col-md-6  mx-auto p-3 mb-3 semibold fs-6 rounded' style={{ height: "20%", width: "50%" }}>
              {/* <p className='display-4 text-primary text-center' style={{ textShadow: "2px 4px 4px rgba(46,91,173,0.6)" }}>Login</p> */}
              <div className="text-center">
                <img src={profilepic} alt="..." style={{ borderRadius: "50%", width: "50%", height: "50%" }} ></img>
              </div>
              {/* if any error display */}
              {
                errorMessage ? <p className="display-4 text-danger">{errorMessage}</p> : <p></p>
              }
              {/* creating login form */}

              <form onSubmit={handleSubmit} >
                <div className='mb-4  fw-semibold'>
                  {/*  Email */}
                  <label htmlFor='email' className='form-label fs-5'> Email </label>
                  <div className='input-group'>
                    <div className="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor" class="bi bi-envelope" viewBox="0 1 16 17">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                      </svg>
                    </div>
                    <input type="email" name="email" id="email"
                      className='form-control'
                      onChange={handleChange}
                      value={values.email}
                      placeholder="Enter Email" ></input>
                  </div>
                  {/* validating email */}
                  {errors.email && touched.email &&
                    <div className="text-danger">
                      Email : {errors.email}
                    </div>}
                </div>
                <div className='mb-2  fw-semibold'>
                  {/* Password */}
                  <label htmlFor='password' className='form-label fs-5'> Password </label>
                  <div className='input-group'>
                    <div className="input-icon">

                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" fill="currentColor" class="bi bi-eye-slash" viewBox="0 2 16 18">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                      </svg></div>

                    <input type="password" id="password" name="password"
                      className='form-control'
                      placeholder='Enter Password'
                      onChange={handleChange}
                      value={values.password}></input>
                  </div>
                  {errors.password && touched.password &&
                    <div className="text-danger">Password:{errors.password}</div>}
                </div>
                <div className='text-center mx-auto'>
                  {/* when you submit it submits  data as an object  */}
                  <button type="submit" className='animated-button btn btn-primary rounded float-end'>Login</button>
                </div>
                <div className='mb-2'>
                  <Link to="register" style={{
                    textDecoration: "none",
                    fontSize: "1.0rem",
                    color: "#4a484",
                    borderBottom: "3px solid black"
                  }} className="text-center">Click here to register</Link>

                </div>
              </form>
            </div>)}
          </Formik>
        </div>
      </div>
    </div>);
}

export default Login