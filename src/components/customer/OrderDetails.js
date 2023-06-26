import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
//import profilepic from '../../images/dummy_profile.jpg'
function OrderDetails() {
    let [orders, setOrders] = useState([])
    let { userObj } = useSelector(state => state.login)
    
    console.log("userObject:", userObj);
    const getOrderDetails = async () => {
        try {
            let res = await axios.get(`http://localhost:4000/customer/get-order-details/userId/${userObj.id}`)
            console.log("response in orderDetails..", res.data.payload)
            setOrders(res.data.payload)
            console.log("orders...", orders);
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getOrderDetails();
    }, [orders])

    return (
        <div className='text-center fs-5'>
            OrderDetails
            <table className="container table table-responsive text-center mx-auto table-striped  table-bordered mr-3" style={{ width: "30%" }}>
                <thead className="table-dark ">
                    <tr>
                        <th>ProductName</th>
                        <th>quantity</th>
                        <th>TotalPrice</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((orderData, index) => {
                            return (
                                <tr key={index}>
                                    <td>{orderData.product.productName} </td>
                                    <td>{orderData.order.quantity}</td>
                                    <td>{orderData.order.totalPrice}</td>
                                </tr>

                            )
                        })

                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails