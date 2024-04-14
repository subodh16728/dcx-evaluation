import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Using useNavigate hook

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
        // Clear validation error when user starts typing
        setErrors({ ...errors, [e.target.name]: '' });
    }

    const validateForm = () => {
        const errors = {};

        if (!data.username.trim()) {
            errors.username = "Username is required";
        }

        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Invalid email address";
        }

        if (!data.password.trim()) {
            errors.password = "Password is required";
        } else if (data.password.trim().length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!data.confirmpassword.trim()) {
            errors.confirmpassword = "Confirm Password is required";
        } else if (data.confirmpassword.trim() !== data.password.trim()) {
            errors.confirmpassword = "Passwords do not match";
        }

        return errors;
    }

    const submitHandler = e => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            axios.post('http://localhost:4000/api/register', data)
                .then(res => {
                    console.log(res.data);
                    if (res.data.error) {
                        toast.error("User already exists"); // user already exists
                    } else {
                        toast.success("Registration successful"); // registration successful
                        // Redirect to login page using useNavigate
                        navigate('/login');
                    }
                })
                .catch(err => console.error(err));
        } else {
            setErrors(errors);
        }
    }

    return (
        <div className='register-form'>
            <ToastContainer />
            <form onSubmit={submitHandler}>
                <h3>Register</h3>
                <div className="form-group">
                    <input type="text" onChange={changeHandler} name="username" placeholder='Username' className="form-control" />
                    {errors.username && <div className="text-danger">{errors.username}</div>}
                </div>
                <div className="form-group">
                    <input type="email" onChange={changeHandler} name="email" placeholder='Email' className="form-control" />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <input type="password" onChange={changeHandler} name="password" placeholder='Password' className="form-control" />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="form-group">
                    <input type="password" onChange={changeHandler} name="confirmpassword" placeholder='Confirm Password' className="form-control" />
                    {errors.confirmpassword && <div className="text-danger">{errors.confirmpassword}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
                <p className="text-center mt-3">Already have an account? <NavLink to="/login">Login</NavLink></p>
            </form>
        </div>
    );
}

export default Register;
