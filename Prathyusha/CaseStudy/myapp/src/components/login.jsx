import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { store } from '../App'; 
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

import { jwtDecode } from "jwt-decode"
import { toast } from 'react-toastify';
const Login = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(store); 
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState(null); // State for login error message

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
        setLoginError(null); // Clear previous login error message when user starts typing
    }

    const submitHandler = e => {
        e.preventDefault();
        if (!data.email || !data.password) {
            const newErrors = {};
            if (!data.email) {
                newErrors.email = "Email is required";
            }
            if (!data.password) {
                newErrors.password = "Password is required";
            }
            setErrors(newErrors);
            return;
        }
        axios.post('http://localhost:4000/api/login', data)
            .then(res => {
                const token=res.data.token;
                localStorage.setItem("token",token);
                const userId=jwtDecode(token).user.id;
                localStorage.setItem("UserId",userId);
                setToken(token);
                console.log(res.data.token);
                console.log(res.data.userId);
                //  dispatch(fetchUserDetails(userId));
               navigate("/dashboard");
               toast.success("Login Successful");

            })
            .catch(err => {
                console.error("login failed:", err);
                if (err.response && err.response.status === 401) {
                    setLoginError("User does not exist"); 
                }
            });
    }

    

    return (
        <div className='login-container'> 
            <form onSubmit={submitHandler} className="login-form">
                <h3>Login</h3>
                <div className="form-group">
                    <input type="email" onChange={changeHandler} name="email" placeholder='Email' className="form-control" />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <input type="password" onChange={changeHandler} name="password" placeholder='Password' className="form-control" />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                {loginError && <div className="text-danger">{loginError}</div>} 
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <p className="text-center mt-3">Don't have an account? <NavLink to="/register">Register</NavLink></p>
            </form>
        </div>
    );
}

export default Login;
