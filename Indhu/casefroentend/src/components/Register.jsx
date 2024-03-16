import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink ,useNavigate} from "react-router-dom";


export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    });

    const [errors, setErrors] = useState({});

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear previous error message
    };

    const validateForm = () => {
        const newErrors = {};

        if (!data.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!data.email.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!data.password.trim()) {
            newErrors.password = 'Password is required';
        }
        if (!data.confirmpassword.trim()) {
            newErrors.confirmpassword = 'Confirm Password is required';
        } else if (data.confirmpassword !== data.password) {
            newErrors.confirmpassword = 'Passwords and confirm password is same';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if there are no errors
    };

    const submitHandler = async (e) => {
        e.preventDefault();
    
        if (validateForm()) {
            try {
                const res = await axios.post("http://localhost:3000/api/register", data);
                toast.success(res.data);
                // Redirect to login page after successful registration
                navigate('/home');
            } catch (err) {
                console.error(err);
                const errormessage=err.response?.data;
                // Check if the error response contains a message
                if (errormessage==="User already exists") {
                    toast.error("User already exists");
                } else {
                    console.error("Error:",err);
                    toast.error("An error occurred. Please try again later.");
                }
            }
        }
    };
    
    

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input type="text" placeholder="Enter Name" id="name" autoComplete="off" name="name" onChange={changeHandler} className={`form-control rounded-0 ${errors.name && 'is-invalid'}`} />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder="Enter email" id="email" autoComplete="off" name="email" onChange={changeHandler} className={`form-control rounded-0 ${errors.email && 'is-invalid'}`} />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder="Enter Password" id="password" autoComplete="off" name="password" onChange={changeHandler} className={`form-control rounded-0 ${errors.password && 'is-invalid'}`} />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmpassword">
                            <strong>Confirm Password</strong>
                        </label>
                        <input type="password" placeholder="Confirm Password" id="confirmpassword" autoComplete="off" name="confirmpassword" onChange={changeHandler} className={`form-control rounded-0 ${errors.confirmpassword && 'is-invalid'}`} />
                        {errors.confirmpassword && <div className="invalid-feedback">{errors.confirmpassword}</div>}
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                    <p>Already Have an Account</p>
                    <NavLink to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</NavLink>
                </form>
            </div>
        </div>
    );
}
