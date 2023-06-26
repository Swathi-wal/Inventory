import React, { useState, useEffect } from 'react'
import axios from 'axios'
import profilepic from '../../images/dummy_profile.jpg'
const GetSellers = () => {
    let token = sessionStorage.getItem("token")
    let [sellerDetails, setSellerDetails] = useState([])
    let [responseError, setResponseError] = useState("")

    const getSellers = async () => {
        try {
            let res = await axios.get("http://localhost:4000/admin/seller-details",
                { headers: { Authorization: `Bearer ${token}` } })
            console.log(res.data)
            setSellerDetails(res.data.payload)
            // console.log("sellerDetails..",sellerDetails)

        } catch (err) {
            setResponseError(err.message)

        }
    }


    useEffect(() => {
        getSellers()
    }, [])
    return (
        <div className='container'>
            <div className='row text-center'>
                {
                    sellerDetails.map((seller, index) => {
                        return (
                            <div className="col-4 mx-auto mt-3 ">
                                <div className='card mb-3 shadow'>
                                    <div className='row no-gutters'>
                                        {/* image */}
                                        <div className='text-center mt-5'>
                                            <img src={profilepic} alt="..." height="100px"></img>
                                        </div>
                                        <div className="card-body mt-2 text-center">
                                            {/* <p className="card-title">SellerId:{seller.id}</p> */}
                                            <div className="card-text p-2">
                                                <p>FirstName:{seller.firstName}</p>
                                                <p>LastName:{seller.lastName}</p>
                                                <div>Email:{seller.email}</div>
                                                <div>Mobile:{seller.mobile}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })
                }
            </div>
        </div>
    )
}

export default GetSellers
