import React, { useState } from 'react'
import Cookie from "js-cookie"
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../App.css"

const Navbar = () => {

    const navigate = useNavigate()
    const token = Cookie.get("token")

    const handleLogout = () => {
        Cookie.remove("token")
        Cookie.remove("userID")
        navigate("/")
    }

    const name = useSelector((state) => (
        state.userDetails.name
    ))

    return (
        <>
            <div className='container-fluid navbar-container'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
                    <div className="container-fluid">
                        {/* <NavLink className="navbar-brand" to="/"><i class="bi bi-shop"></i></NavLink> */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/dashboard"><i class="bi bi-house-fill"></i>&nbsp;Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/offers"><i class="fa-solid fa-percent"></i>&nbsp;Offers</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/bookmarks"><i class="bi bi-bookmark-fill"></i>&nbsp;Bookmarks</NavLink>
                                </li>
                            </ul>

                            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                                {token ? (
                                    <>
                                        <div class="navbar-collapse dropdown-center" id="navbarNavDarkDropdown">
                                            <ul class="navbar-nav">
                                                <li class="nav-item dropdown">
                                                    <a class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <b>Welcome {name}</b>
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-menu-dark dropdown-button">
                                                        <li><a className="dropdown-item" href='javascript:void(0)'>
                                                            <i class="bi bi-person-fill"></i>&nbsp;&nbsp;Profile
                                                        </a></li>
                                                        <li><NavLink className="dropdown-item" onClick={handleLogout} to="/login">
                                                            <i class="bi bi-box-arrow-right"></i>&nbsp;&nbsp;Logout
                                                        </NavLink></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" activeClassName="active" to="/login">
                                            Login
                                        </NavLink>
                                    </li>
                                )}

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar;