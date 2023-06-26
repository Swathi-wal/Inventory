import React, { useState } from 'react'
import { Formik } from 'formik'
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { deleteCart } from '../slices/ProductSlice';
import { useDispatch } from 'react-redux';
const CreatePayment = () => {
  let { state } = useLocation();
  console.log("state in payment", state);
  let token = sessionStorage.getItem("token");
  let [responseError, setResponseError] = useState("")
  let [message, setMessage] = useState("")
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const gotoOrders = () => {
    navigate("/customer/orderdetails")
  }
  return (
    <div>
      <div className='container'>
        <h3 className='text-primary fw-2 text-center'>CreatePayment</h3>
        <div className='row shadow mx-auto mb-4' style={{ width: "40%" }}>
          {/* formik */}
          <Formik initialValues={{
            paymentType: "", status: ""
          }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              values.status = "completed"
              console.log("payment values...", values)
              resetForm();
              try {
                let response = await axios.post(`http://localhost:4000/customer/create-payment/orderId/${state.orderDataId}`, values,
                  { headers: { Authorization: `Bearer ${token}` } })
                console.log(response.data.message)
                setMessage(response.data.message)

                setResponseError("")
                //after successful payment remove the cart items because he is already ordered
                let deleteCartobj = deleteCart();
                dispatch(deleteCartobj)

              } catch (err) {
                setResponseError(err)

              }
            }}>
            {({ values, handleChange, handleSubmit }) => (
              <form className='mt-4 mb-5' onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="paymentType" className="mb-2">
                    PaymentType
                  </label>
                  <select className='form-select' onChange={handleChange} id="paymentType" value={values.paymentType}>
                    <option>Choose your payment Method</option>
                    <option value="upi" disabled>UPI</option>
                    <option value="wallet" disabled>Wallet</option>
                    <option value="credit" disabled>Credit</option>
                    <option value="netbanking" disabled>NetBanking</option>
                    <option value="cod">COD</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="totalAmount">TotalAmount</label>
                  <input className="form-control p-2 mb-2" type="number" defaultValue={state.totalAmount}></input>
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="status" className="mb-2">
                    Status
                  </label>
                  <select className='form-select' onChange={handleChange} id="status" value={values.status}>
                    <option value="completed">Completed</option>
                    <option value="incompleted">InCompleted</option>
                  </select>
                </div> */}
                <button type="submit" className="btn btn-primary d-block float-end">
                  Pay Securely
                </button>
                <button className="btn btn-primary d-block float-start" onClick={() => gotoOrders()}>
                  GoBack
                </button>
              </form>
            )}
          </Formik>
        </div>
        <div>
          {message ? <p className="fs-2 text-success text-center">{message}</p> : <p></p>}
        </div>




      </div>
    </div>
  )
}

export default CreatePayment