import React, { useState } from 'react'
import { Formik } from 'formik'
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom'
import { userLogin } from '../slices/LoginSlice'
import { useSelector } from 'react-redux'

const CreateOrder = () => {
  //state
  let [errorMessage, setErrorMessage] = useState("");
  let { state } = useLocation();
  console.log("state in createorder:", state);
  let token = sessionStorage.getItem("token")
  console.log("token in createorder:", token);

  let { userObj } = useSelector(state => state.login)
  let navigate = useNavigate();
  const gotoPayment = (orderData, totalAmount) => {
    navigate("/customer/payment", { state: { orderDataId: orderData, totalAmount: totalAmount } })
  }
  return (
    <div className='container'>
      <h4 className="text-center">Order</h4>
      <div className='row shadow mx-auto' style={{ width: "40%" }}>
        <Formik initialValues={{
          totalAmount: 0, userId: userObj.id, deliveryFee: 0,
          tax:0
        }}//validation
          // validate={
          //   values => {
          //     const errors = {};
          //     if (!values.totalAmount) {
          //       errors.totalAmount = "Required"
          //     }
          //     return errors
          //   }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            values.userId=userObj.id;
            values.tax=0;
            values.paymentId = null;
            values.products = []
            delete state.productName;
            // delete state.createdAt;
            // delete state.createdBy;
            delete state.description;
            delete state.updatedAt;
            delete state.updatedBy;
            delete state.deletedAt;
            // delete state.destroyTime;
            state.productId = state.id;
            delete state.id;
            state.unitPrice = state.price;
            delete state.price;
            delete state.perPackQuantity;
            delete state.destroyTime;
            state.totalPrice = 0;
            state.userId = userObj.id;
            values.deliveryAddressId = userObj.addressId;
            values.deliveryDate="2023-06-25";
            values.totalAmount=0;
            values.tax=0;
            console.log(state);
            values.products.push(state)
            console.log("onsubmit..", values)
            resetForm();
            try {
              let response = await axios.post(
                "http://localhost:4000/customer/order-details",
                values, { headers: { Authorization: `Bearer ${token}` } });
              console.log("productobject..", response)
              if (response.status === 201) {
                // setResponse(response.data.message)
                console.log("order created..", response)
                setErrorMessage("")
                gotoPayment(response.data.payload.orderDetailsData.id, response.data.totalAmount);

              }
            } catch (err) {
              setErrorMessage(err.response.data.message)
            }

          }}>
          {({
            values, errors, handleChange, handleSubmit
          }) => (<form className="mt-4 mb-5 " onSubmit={handleSubmit}>
            {/* <div className="mb-3">
              <label htmlFor="totalAmount" className="mb-1">
                totalAmount
              </label>
              <input
                id="totalAmount"
                type="number"
                placeholder=""
                className="form-control p-2 " onChange={handleChange}
                value={values.totalAmount}
              />
            </div> */}
            {/* <div className="mb-3">
              <label htmlFor="userId" className="mb-1">
                userId
              </label>
              <input
                id="userId"
                type="number"
                placeholder=""
                className="form-control p-2 " onChange={handleChange}
                value={values.userId}
              />
            </div> */}
            {/* <div className="mb-3">
              <label htmlFor="deliveryFee" className="mb-1">
                deliveryFee
              </label>
              <input
                id="deliveryFee"
                type="number"
                placeholder=""
                className="form-control p-2 " onChange={handleChange}
                value={values.deliveryFee}
              />
            </div> */}
            {/* <div className="mb-3">
              <label htmlFor="deliveryDate" className="mb-1">
                deliveryDate
              </label>
              <input
                id="deliveryDate"
                type="text"
                placeholder=""
                className="form-control p-2 " onChange={handleChange}
                value={values.deliveryDate}
              />
            </div> */}
            {/* <div className="mb-3">
              <label htmlFor="tax" className="mb-1">
                tax
              </label>
              <input
                id="tax"
                type="number"
                placeholder=""
                className="form-control p-2 " onChange={handleChange}
                value={values.tax}
              />
            </div> */}
            <button type="submit" className="btn btn-primary d-block float-end">
              order
            </button>

          </form>)}
        </Formik>
      </div>
    </div>
  )
}

export default CreateOrder
