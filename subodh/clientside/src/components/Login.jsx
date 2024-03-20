import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from "axios";
import Joi from "joi";
import Cookie from "js-cookie"
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../store/slice/registerUserSlice';

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = Cookie.get("token")

    useEffect(() => {
        if (token) {
            navigate("/dashboard")
        }
    }, [])

    // Form validation
    const loginSchema = Joi.object({
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        }).required(),
        password: Joi.string().min(3).max(12).required()
    });

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = loginSchema.validate(data, { abortEarly: true });

        if (error) {
            const valErr = {};
            error.details.forEach((err) => {
                valErr[err.path[0]] = err.message;
            });
            setErrors(valErr);
            return;
        }

        setLoading(true);
        if (!token) {
            const response = await dispatch(loginUser(data))
            if (response.payload && response.payload.success === true) {
                Cookie.set("token", response.payload.token)
                Cookie.set("userID", response.payload.userID)
                toast.success(response.payload.message)
                navigate("/dashboard")
            } else {
                toast.error(`Check your credentials`)
            }
        } else {
            toast.info(`Already logged in`);
            navigate("/dashboard")
        }


        setLoading(false);
        setErrors({});
    };

    return (

        <>
            <div className="container mt-5 w-50">
                <form className='w-50 mx-auto p-4 shadow-lg border' onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={data.email} onChange={handleChange} />
                        <small className="text-danger">{errors.email}</small>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={data.password} onChange={handleChange} />
                        <small className="text-danger">{errors.password}</small>
                    </div>
                    <p>New User?<span><NavLink to="/register" className="text-decoration-none"> Register</NavLink></span></p>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
                </form>
            </div>

        </>
    )
}

export default Login