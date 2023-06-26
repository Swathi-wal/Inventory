import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//create actionfunction invoked by react component take it from slice
import { addProduct } from '../slices/ProductSlice'
//to dispatch the action obj to redux store
import { useDispatch } from 'react-redux'
// import Carousel from './Carousel'
import profilepic from '../../images/dummy_profile.jpg'
const GetProducts = () => {
    // let customersData=props.customerData;
    // console.log("customerData in getproducts", props.name)
    let { userObj } = useSelector(state => state.login)
    let data = useSelector(state => state.product)
    console.log("products data...", data);
    let [products, setProduct] = useState([])
    let [deleteState, setDeleteState] = useState(false)
    let token = sessionStorage.getItem("token")
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const getProductsBySeller = async () => {
        try {
            if (userObj.role === "seller") {
                let res = await axios.get(`http://localhost:4000/seller/getproducts/sellerId/${userObj.id}`,
                    { headers: { Authorization: `Bearer ${token}` } });
                console.log("get products:", res.data.payload)
                setProduct(res.data.payload)
            }
            if (userObj.role === "customer") {
                let res = await axios.get(`http://localhost:4000/customer/getproducts`)
                console.log("customer products:", res.data.payload);
                setProduct(res.data.payload)
            }
        } catch (err) {
            console.log("error is:", err)
        }
    }
    useEffect(() => {
        getProductsBySeller()
    }, [deleteState])
    const editProduct = (product) => {
        console.log("Product:", product);
        navigate('/seller/updateproduct', { state: product })
    }
    const deleteProduct = async (product) => {
        console.log("deleteproduct", product)
        try {
            let res = await axios.delete(`http://localhost:4000/seller/delete-product-by-id/productId/${product.id}`,
                { headers: { Authorization: `Bearer ${token}` } })
            console.log(res);
            setDeleteState(true)
        } catch (err) {
            console.log(err)
        }
    }
    const addtoCart = async (product) => {

        let actionObj = addProduct(product);
        dispatch(actionObj)
        navigate("/customer/cart")
    }

    return (
        <div>
            <p className="text-center text-primary fs-2">Products</p>
            {/* <Carousel/> */}
            <div className="row">
                {/* traverse products array */}
                {
                    products?.map((product, index) => {
                        console.log("product.image:", product);
                        console.log(product.image);
                        const importURl = product.image ? require(`./../../images/${product.image}`) : require("./../../images/dummy_profile.jpg")
                        // import profilepic from importURl
                        return (
                            <div className="col-3 mx-auto mt-3 " key={index}>
                                <div className='card mb-3 shadow'>
                                    <div className='row no-gutters'>
                                        {/* image */}
                                        <div className='text-center mt-5'>
                                            <img src={importURl} alt="..." style={{ height: "100px", width: "100px" }}></img>
                                        </div>
                                        {/* card body */}
                                        <div className="card-body mt2 text-center">
                                            <p className="card-title">Name:{product.productName}</p>
                                            {/* price */}
                                            <div className="text-secondary">
                                                <span className="text-dark">Price: {product.price} </span></div>
                                            <div className="card-text p-2"></div>
                                            <div>Description:{product.description}</div>
                                            {
                                                userObj.role === "customer" && <button className='btn btn-primary rounded m-2 w-10 h-19' onClick={() => addtoCart(products[index])}>Add to Cart</button>
                                            }
                                        </div>
                                        <div className='display inline-block text-center float-start m-2'>


                                            {userObj.role === "seller" && <button className='btn btn-warning m-2' onClick={() => editProduct(products[index])}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                                </svg></button>}
                                            {userObj.role === "seller" && <button className='btn btn-danger' onClick={() => deleteProduct(products[index])}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                                </svg></button>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }

            </div>






        </div>
    )
}

export default GetProducts
