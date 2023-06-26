import React, { useState, useEffect } from 'react'
import axios from 'axios';
import profilepic from '../../images/dummy_profile.jpg'
const GetCustomers = () => {
    const [customerData, setCustomerData] = useState([])
    let token = sessionStorage.getItem("token")
    const getCustomers = async () => {
        try {
            let res = await axios.get("http://localhost:4000/admin/customer-details",
                { headers: { Authorization: `Bearer ${token}` } })
            console.log(res.data)
            setCustomerData(res.data.payload)

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getCustomers()
    }, [])
    return (
        <div className="container">
            <div className='row text-center'>
                <h3>Customers</h3>
                {
                    customerData.map((customer, index) => {
                        return (
                            <div className="col-4  mx-auto mt-3 ">
                                <div className='card mb-3 shadow'>
                                    <div className='row no-gutters'>
                                        {/* image */}
                                        <div className='text-center mt-5'>
                                            <img src={profilepic} alt="..." height="100px"></img>
                                        </div>
                                        <div className="card-body mt2 text-center">
                                            {/* <div className='card-title'>CustomerId:{customer.id}</div> */}
                                            <div className='card-text p-2'></div>
                                            <div>FirstName:{customer.firstName}</div>
                                            <div>LastName:{customer.lastName}</div>
                                            <div>Email:{customer.email}</div>
                                            <div>Mobile:{customer.mobile}</div>
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

export default GetCustomers
