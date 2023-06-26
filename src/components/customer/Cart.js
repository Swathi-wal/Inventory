import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct } from '../slices/ProductSlice';
import profilepic from '../../images/dummy_profile.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Cart = () => {
    let token = sessionStorage.getItem('token');
    let data = useSelector(state => state.product)
    let { userObj } = useSelector(state => state.login)
    let [totalAmount, setTotalAmount] = useState(0)
    console.log("data...", data);
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const deleteProducts = (index) => {
        let actionObj = deleteProduct(index);
        dispatch(actionObj);
    }
    const calculateTotalAmount = () => {
        var totalamount = 0;
        for (let product of data) {
            totalamount += (product.quantity * product.price)
        }
        setTotalAmount(totalamount)
    }
    useEffect(() => {
        calculateTotalAmount()
    }, [data])

    const CreateOrder = async () => {
        let values = {
            totalAmount: 0,
            userId: userObj.id,
            paymentId: null,
            deliveryFee: 0,
            deliveryDate: "2023-06-25",
            deliveryAddressId: userObj.addressId,
            tax: 0,
            products: []
            // products: [{
            //     productId:"",
            //     "quantity":"",
            //     "unitPrice":"",
            //     "totalPrice":""
            // }

        }
        //console.log("values...", values)
        //delete data[1].productName;
        //console.log("data[1]...",data[1]);
        for (let product of data) {
            console.log('product..', product)
            //delete product.productName;
            let productObj = {
                productId: product.id,
                quantity: product.quantity,
                unitPrice: product.price,
                totalPrice: 0

            };
            values.products.push(productObj)
            console.log("values after push object..", values);
        }
        console.log("values in cart ...", values);
        try {
            let response = await axios.post("http://localhost:4000/customer/order-details", values, { headers: { Authorization: `Bearer ${token}` } });
            console.log("response", response.data);
            navigate("/customer/payment", { state: { orderDataId: response.data.payload.orderDetailsData.id, totalAmount: response.data.totalAmount } })

        } catch (error) {

        }

        // navigate("/customer/orders")
    }


    return (
        <div>Cart
            <div className="row">
                {
                    data.map((product, index) => {
                        return (
                            <div className="col-3 mx-auto mt-3 " key={index}>
                                <div className='card mb-3 shadow'>
                                    <div className='row no-gutters'>
                                        <div className='text-center mt-5'>
                                            <img src={profilepic} alt="..." height="100px"></img>
                                        </div>
                                        {/* card body */}
                                        <div className="card-body mt2 text-center">
                                            <p className="card-title">ProductName:{product.productName}</p>
                                            <p className="card-text">Price:{product.price}</p>
                                            <p className="card-text">Quantity{product.quantity}</p>
                                            <button className="btn btn-danger" onClick={() => deleteProducts(index)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="container row bg-secondary mt-2">
                <div className="col-md-4 fs-5">TotalAmount:{totalAmount}</div>
                <div className='col-md-8'><button className="btn btn-primary float-end" onClick={() => CreateOrder()}>Place Order</button></div>
            </div>

        </div>
    )
}

export default Cart