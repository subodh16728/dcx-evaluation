import React, { useState, useContext, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { store } from '../App'; 
import { NavLink, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';

interface DecodedToken {
    userId: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(store); 
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const [loginError, setLoginError] = useState<string | null>(null);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setLoginError(null);
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!data.email || !data.password) {
            const newErrors: any = {};
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
                const token = res.data.token;
                localStorage.setItem("token", token);

                // Decode the token to extract userId
                const decodedToken = jwtDecode(token) as DecodedToken;
                const userId = decodedToken.userId;

                // Store userId in localStorage
                localStorage.setItem("userId", userId);

                // Set token in context or state
                setToken(token);

                // Navigate to dashboard or desired route
                navigate("/dashboard");

                // Display success message
                toast.success("Login Successful");
            })
            .catch(err => {
                console.error("Login failed:", err);
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    setLoginError(err.response.data.message || "Login failed");
                } else {
                    setLoginError("Login failed");
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

export default Login
