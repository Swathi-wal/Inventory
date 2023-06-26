import React, { useState } from "react";
//import { useForm } from "react-hook-form";
import { Formik } from 'formik'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css'

function Register() {
  //state
  let [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();
  return (
    <div className="register-page">
      <p className='display-4 text-primary text-center' style={{ textShadow: "2px 4px 4px rgba(46,91,173,0.6)" }}>Register</p>

      <div className='row shadow mx-auto' style={{ width: "30%", backgroundColor: "#F5F5F5" }}>
        {/* formik */}
        <Formik initialValues={{
          role: "seller", firstName: "", lastName: "", email: "", password: "", mobile: "", pincode: "",
          street: "", city: "", district: "", country: ""
        }}
          //validation
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
              if (!values.role) {
                errors.role = "Required"
              }
              if (!values.firstName) {
                errors.firstName = "Required"
              }
              if (!values.lastName) {
                errors.lastName = "Required"
              }
              if (!values.password) {
                errors.password = "Required"
              }
              if (!values.mobile) {
                errors.mobile = "Required"
              }
              if (!values.pincode) {
                errors.pincode = "Required"
              }
              if (!values.street) {
                errors.street = "Required"
              }
              if (!values.city) {
                errors.city = "Required"
              }
              if (!values.district) {
                errors.district = "Required"
              }
              if (!values.country) {
                errors.country = "Required"
              }


              return errors
            }}
          // Submit
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetForm()
            try {
              //make api request
              console.log("values..", values)
              values.address = {};
              values.address.pincode = values.pincode;
              values.address.street = values.street;
              values.address.city = values.city;
              values.address.district = values.district;
              values.address.country = values.country;
              delete values.street;
              delete values.city;
              delete values.district;
              delete values.country;
              delete values.pincode;
              let response = await axios.post(
                `${process.env.REACT_APP_PATH}/register-user`,
                values);
              console.log("userOBject..", response)
              //on successfull registration
              if (response.status === 201) {
                navigate("/");
              }
            }
            catch (err) {
              setErrorMessage(err.response.data.message)
            }
          }}>
          {({
            values, errors, touched, handleChange, handleSubmit
          }) => (
            <form className="mt-4 mb-5 " onSubmit={handleSubmit}>
              {/* Enter role */}
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select className="form-select" onChange={handleChange} id="role" value={values.role} name="role">
                  <option value="seller">Seller</option>
                  <option value="customer">Customer</option>
                  <option value="supplier">Supplier</option>
                  <option value="admin">Admin</option>
                </select>

                {errors.role && touched.role && <p className="text-danger">Role:{errors.role}</p>}
              </div>

              {/* firstName */}
              <div className="row">
                <div className="mb-3 col-md-6 p-2">
                  <label htmlFor="firstName" className="mb-1">
                    FirstName
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    className="form-control" onChange={handleChange}
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName && <div className="text-danger">FirstName:{errors.firstName}</div>}
                </div>
                {/* last name */}
                <div className="mb-3 col-md-6 p-2">
                  <label htmlFor="lastName" className="mb-1">
                    LastName
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Enter LastName"
                    className="form-control"
                    onChange={handleChange}
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName && <div className="text-danger">LastName:{errors.lastName}</div>}

                </div>
              </div>

              {/* Email */}
              <div className="mb-3 ">
                <label htmlFor="email" className="mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your Email"
                  className="form-control p-2 "
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && touched.email &&
                  <div className="text-danger">
                    Email : {errors.email}
                  </div>}
              </div>
              {/* password */}
              <div className="mb-3">
                <label htmlFor="password" className="mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                  className="form-control p-2 "
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && touched.password &&
                  <div className="text-danger">Password:{errors.password}</div>}
              </div>
              {/* mobilenumber */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="mobile" className="mb-1">
                    Mobile
                  </label>
                  <input
                    id="mobile"
                    type="number"
                    placeholder="Enter your mobile number"
                    className="form-control p-2 "
                    onChange={handleChange}
                    value={values.mobile}
                  />
                  {errors.mobile && touched.mobile && <p className="text-danger">Mobile:{errors.mobile}</p>}
                </div>
                {/* pincode */}
                <div className="mb-3 col-md-6">
                  <label htmlFor="pincode" className="mb-1">
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    type="number"
                    placeholder="Pincode"
                    className="form-control p-2 "
                    onChange={handleChange}
                    value={values.pincode}

                  />
                  {errors.pincode && touched.pincode && <p className="text-danger">pincode:{errors.pincode}</p>}
                </div>
              </div>
                {/* street */}
                <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="street" className="mb-1">
                    street
                  </label>
                  <input

                    id="street"
                    type="text"
                    placeholder="Enter your street"
                    className="form-control p-2 "
                    onChange={handleChange}
                    value={values.street}
                  />
                  {errors.street && touched.street &&
                    <div className="text-danger">Street:{errors.street}</div>}
                </div>
              
                {/* city */}
                <div className="mb-3 col-md-6">
                  <label htmlFor="city" className="mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Enter your city"
                    className="form-control p-2 "
                    onChange={handleChange}
                    value={values.city}
                  />
                  {errors.city && touched.city &&
                    <div className="text-danger">Street:{errors.city}</div>}

                </div>
                </div>
                {/* district */}
                <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="district" className="mb-1">
                    District
                  </label>
                  <input
                    id="district"
                    type="text"
                    placeholder="Enter district name"
                    className="form-control p-2 "
                    onChange={handleChange}
                    value={values.district}
                  />
                  {errors.district && touched.district &&
                    <div className="text-danger">District:{errors.district}</div>}

                </div>
                
                {/* country */}
                <div className="mb-3 col-md-6">
                  <label htmlFor="country" className="mb-1">
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    placeholder="Enter your country"
                    className="form-control p-2 "
                    onChange={handleChange}
                    value={values.country}

                  />
                  {errors.country && touched.country &&
                    <div className="text-danger">Country:{errors.country}</div>}
                </div>
                </div>
          
              <div className="mb-3">

                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    fontSize: "1.1rem",
                    color: "#4da484",
                    borderBottom: "2px solid #4da484",
                  }}
                  className="float-start "
                >
                  Click here to login
                </Link>
                <button type="submit" className="btn btn-primary d-block float-end">
                  Register
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className="mb-5 text-danger text-center fw-bold">{errorMessage}</div>
    </div>
  );
}

export default Register;
