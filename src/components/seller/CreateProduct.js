import React from 'react'
import { Formik } from 'formik'
import axios from 'axios';
import { useState } from 'react';
//import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import ImageUploading from "react-images-uploading";
const CreateProduct = () => {
    let [errorMessage, setErrorMessage] = useState("")
    let [response, setResponse] = useState("")
    // const [images, setImages] = React.useState([]);
    let { userObj } = useSelector(state => state.login);
    let token = sessionStorage.getItem("token")
    const [imag, setImage] = useState("")
    // function handleImage(e) {
    //     console.log(e.target.files)
    //     setImage(e.target.files[0])
    // }
    //let { reset } = useForm()
    return (
        <div>
            <div className="container">
                <h4 className="text-center text-primary fs-2">Create Product</h4>
                {
                    response && <p className='text-success fs-2 text-center fw-bold'>{response}</p>
                }

                <div className='row shadow mx-auto mt-5' style={{ width: "40%" }}>
                    {/* formik */}
                    <Formik initialValues={{
                        productName: "", price: "",
                        perPackQuantity: "",
                        quantity: "",
                        description: "",
                        createdBy: "",
                        image: ""

                    }} //validation
                        validate={
                            values => {
                                const errors = {};

                                if (!values.productName) {
                                    errors.productName = "Required"
                                }
                                if (!values.price) {
                                    errors.price = "Required"
                                }
                                if (!values.quantity) {
                                    errors.quantity = "Required"
                                }


                                return errors
                            }} onSubmit={async (values, { setSubmitting, resetForm }) => {
                                resetForm()
                                values.createdBy = userObj.id;
                                console.log("image..", imag);

                                // values.image = imag.name;
                                console.log("values in createproductwithimg", values);
                                try {
                                    //make api request
                                    console.log("values..", values)
                                    let response = await axios.post(
                                        "http://localhost:4000/seller/create-product",
                                        values, { headers: { Authorization: `Bearer ${token}` } });
                                    console.log("productobject..", response)
                                    console.log("responsemessage..", response.data.message)
                                    if (response.status === 200) {
                                        setResponse(response.data.message)
                                        console.log("responsemessageinif..", response.data.message)
                                        setErrorMessage("")
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
                                    value={values.id}
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
                                    value={values.productName}
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

                                    value={values.createdBy}
                                />
                                {errors.createdBy && touched.createdBy && <div className="text-danger">createdBy:{errors.createdBy}</div>}
                            </div> */}
                            <div className='mb-4 row'>
                                {/* <label htmlFor="createdBy" className="mb-1">
                                    uploadImage
                                </label> */}
                                {/* <input
                                    id="image"
                                    type="file"
                                    name="file"
                                    className="form-control p-2"
                                    onChange={handleImage}

                                /> */}
                                <div className='col'>
                                    <ImageUploading multiple={false} value={values.image}
                                        dataURLKey="data_url"
                                        acceptType={["jpg", "jpeg", "png"]}
                                        onChange={(imageData) => {
                                            // Update the value of `values.image` with the selected image data
                                            console.log("imageData..", imageData);
                                            setImage(imageData[0].file.name);
                                            handleChange({
                                                target: {
                                                    name: "image",
                                                    value: imageData && imageData.length > 0 ? imageData[0].file.name : null,
                                                },
                                            });
                                            console.log("imageData2..", imageData);

                                        }}

                                    >
                                        {({ onImageUpload, isDragging, dragProps }) => (
                                            <button type="button"
                                                style={isDragging ? { color: "red" } : null} // Corrected style object
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                Upload

                                            </button>
                                        )}


                                    </ImageUploading>
                                </div>
                                <div className='col'>{imag}</div>


                            </div>
                            <button type="submit" className="btn btn-primary d-block mx-auto center">
                                Create
                            </button>
                        </form>)}
                    </Formik>
                </div>
                <div className="mb-5 text-danger text-center fw-bold">{errorMessage}</div>

            </div>
        </div>)
}

export default CreateProduct
