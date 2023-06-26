
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { clearState } from '../slices/LoginSlice'
import './AdminDashboard.css'



const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);


    //console.log("customerData in admindashboard..",customerData)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    let navigate = useNavigate();
    let dispatch = useDispatch();
    const logout = () => {
        //remove token
        sessionStorage.removeItem("token");
        //clear state
        dispatch(clearState());
        //navigate to login
        navigate("/");
    };
    return (
        <div className="container row">
            <div className="col-md-3">
                <div className={`left-navbar ${isOpen ? "open" : ""}`}>
                    <div className="navbar-toggle navbarClass" onClick={toggleMenu}>
                        <span className="toggle-icon">&#9776;</span>
                    </div>
                    <ul className="navbar-menu">
                        <li><NavLink className={({ isActive }) =>
                            isActive ? "active nav-link text-primary fs-5" : "inactive nav-link text-black fs-5"}
                            to="dashboard"> Dashboard</NavLink>
                        </li>
                        <li><NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "active nav-link text-primary fs-5"
                                    : "inactive nav-link text-black fs-5"
                            }
                            to="customers"
                        >
                            Customers
                        </NavLink>
                        </li>
                        <li><NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "active nav-link text-primary fs-5"
                                    : "inactive nav-link text-black fs-5"
                            }
                            to="sellers"
                        >
                            Sellers
                        </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="nav-link fs-5"
                                style={{ color: "black" }}
                                to="/"
                                onClick={logout}>
                                LogOut
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-md-9">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminDashboard