import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Statistics = () => {
    let token = sessionStorage.getItem('token')
    let [totalProducts, setTotalProducts] = useState("")
    let [totalOrders, setTotalOrders] = useState("")
    let [TotalCustomers, setTotalCustomers] = useState("")
    const getStatistics = async () => {
        try {
            let res = await axios.get("http://localhost:4000/admin/total-statistics",
                { headers: { Authorization: `Bearer ${token}` } })
            console.log(res.data)
            setTotalProducts(res.data.TotalProducts)
            setTotalOrders(res.data.TotalOrders)
            setTotalCustomers(res.data.TotalCustomers)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getStatistics()

    }, [])
    return (
        <div className='text-center m-4'>
            <div className="card text-bg-info mx-auto fs-3 mb-3" style={{ maxWidth: "18rem" }}>
                <div className="card-header">TotalProducts</div>
                <div className="card-body">
                    <p className="card-text">{totalProducts}</p>
                </div>
            </div> 
            <div className="card text-bg-warning mx-auto fs-3 mb-3" style={{ maxWidth: "18rem" }}>
                <div className="card-header">TotalOrders</div>
                <div className="card-body">
                    <p className="card-text">{totalOrders}</p>
                </div>
            </div> 
            <div className="card text-bg-secondary p-3 mx-auto fs-3 mb-3" style={{ maxWidth: "18rem" }}>
                <div className="card-header">TotalCustomers</div>
                <div className="card-body">
                    <p className="card-text">{TotalCustomers}</p>
                </div>
            </div> 
            {/* <div className='row mx-auto'>

            <div className='col-4 bg-warning h-50'>TotalProducts:</div>
            <div className='col-4 bg-success'>TotalOrders:{totalOrders}</div>
            <div className='col-4 bg-primary'>TotalCustomers:{TotalCustomers}</div>

        </div> */}
        </div>
    )
}

export default Statistics