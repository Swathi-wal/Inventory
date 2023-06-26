import React from 'react'
import { Formik } from 'formik'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const UpdateProduct = () => {
    let { state } = useLocation();
    console.log("state:...", state)
    let [errorMessage, setErrorMessage] = useState("")
    let [response, setResponse] = useState("")
    let token = sessionStorage.getItem("token")
    let { setValue } = useForm();
    let navigate = useNavigate();
    useEffect(() => {
        setValue("id", state.id)
        setValue("productName", state.productName)
        setValue("price", state.price)
        setValue("perPackQuantity", state.perPackQuantity)
        setValue("quantity", state.quantity)
        setValue("description", state.description)
        setValue("createdBy", state.createdBy)
    }, [])
    return (
        <div>
            <div className="container">
                <h4 className="text-center text-primary fs-2">UpdateProduct</h4>
                {
                    response && <p className='text-success fs-2 text-center fw-bold'>{response}</p>
                }
                <div className='row shadow mx-auto' style={{ width: "40%" }}>
                    {/* formik */}
                    <Formik initialValues={{
                        productName: "", price: "",
                        perPackQuantity: "",
                        quantity: "",
                        description: "",

                    }} //validation
                        validate={
                            values => {
                                const errors = {};
                                if (!values.quantity) {
                                    errors.quantity = "Required"
                                }
                                return errors
                            }} onSubmit={async (values, { setSubmitting, resetForm }) => {
                                resetForm()
                                // values.id = state.id;
                                values.productName = state.productName;
                                values.createdBy = state.createdBy;
                                try {
                                    //make api request
                                    console.log("values..", values)
                                    let response = await axios.put(
                                        `http://localhost:4000/seller/update-product/productId/${state.id}`, values, { headers: { Authorization: `Bearer ${token}` } });
                                    console.log("updatedproduct", response)
                                    if (response.status === 202) {
                                        setResponse(response.data.message)
                                        setErrorMessage("")
                                        navigate("/seller/getproducts")
                                    }
                                }
                                catch (err) {
                                    setErrorMessage(err.response.data.message)
                                }
                            }}>
                        {({
                            values, errors, touched, handleChange, handleSubmit
                        }) => (<form className='mt-4 mb-5' onSubmit={handleSubmit}>
                            {/* productId */}
                            {/* <div className='mb-4'>
                                <label htmlFor="id" className="mb-1">
                                    ProductID
                                </label>
                                <input
                                    id="id"
                                    type="number"
                                    placeholder="enter id"
                                    className="form-control p-2 " onChange={handleChange}
                                    value={state.id}
                                />
                                {errors.id && touched.id && <div className="text-danger">productId:{errors.id}</div>}
                            </div> */}
                            {/* productName */}
                            <div className='mb-4'>
                                <label htmlFor="productName" className="mb-1">
                                    ProductName
                                </label>
                                <input
                                    id="productName"
                                    type="text"
                                    placeholder="enter productName"
                                    className="form-control p-2 " onChange={handleChange}
                                    value={state.productName}
                                />
                                {errors.productName && touched.productName && <div className="text-danger">productName:{errors.productName}</div>}
                            </div>
                            {/* price */}
                            <div className='mb-4'>
                                <label htmlFor="price" className="mb-1">
                                    Price
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    placeholder="enter price"
                                    className="form-control p-2 " onChange={handleChange}
                                    value={values.price}
                                />
                                {errors.price && touched.price && <div className="text-danger">price:{errors.price}</div>}
                            </div>
                            {/* perpackquantity */}
                            <div className='mb-4'>
                                <label htmlFor="perPackQuantity" className="mb-1">
                                    PerPackQuantity
                                </label>
                                <input
                                    id="perPackQuantity"
                                    type="number"
                                    placeholder="enter perPackQuantity"
                                    className="form-control p-2 " onChange={handleChange}
                                    value={values.perPackQuantity}
                                />
                            </div>
                            {/* quantity */}
                            <div className='mb-4'>
                                <label htmlFor="quantity" className="mb-1">
                                    Quantity
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    placeholder="enter quantity"
                                    className="form-control p-2 " onChange={handleChange}
                                    value={values.quantity}
                                />
                                {errors.quantity && touched.quantity && <div className="text-danger">quantity:{errors.quantity}</div>}
                            </div>
                            {/* description */}
                            <div className='mb-4'>
                                <label htmlFor="description" className="mb-1">
                                    Description
                                </label>
                                <input
                                    id="description"
                                    type="textarea" rows="4" cols="30"
                                    placeholder="enter description"
                                    className="form-control p-2 " onChange={handleChange}
                                    value={values.description}
                                />
                            </div>
                            {/* createdBy */}
                            {/* <div className='mb-4'>
                                <label htmlFor="createdBy" className="mb-1">
                                    CreatedBy
                                </label>
                                <input
                                    id="createdBy"
                                    type="number"
                                    className="form-control p-2 " onChange={handleChange}
                                    value={state.createdBy}
                                />
                                {errors.createdBy && touched.createdBy && <div className="text-danger">createdBy:{errors.createdBy}</div>}
                            </div> */}
                            <button type="submit" className="btn btn-primary d-block mx-auto center">
                                Update
                            </button>
                        </form>)}
                    </Formik>
                </div>
                <div className="mb-5 text-danger text-center fw-bold">{errorMessage}</div>
            </div>
        </div>)
}

export default UpdateProduct
