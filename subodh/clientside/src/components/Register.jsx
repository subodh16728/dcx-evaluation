import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Joi from "joi";
import axios from 'axios';
import Cookie from "js-cookie"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slice/registerUserSlice';

const Register = () => {

    const [loading, setLoading] = useState(false);      // loading state
    const [errors, setErrors] = useState({});           // joi errors
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = Cookie.get("token")

    useEffect(() => {
        if (token) {
            navigate("/dashboard")
        }
    }, [])

    // Form validation
    const registerSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        }).required(),
        password: Joi.string().min(3).max(12).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords must match', })
    });

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

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

        const { error } = registerSchema.validate(data, { abortEarly: true });

        // getting the errors in valErr
        if (error) {
            const valErr = {};
            error.details.map((err) => {
                valErr[err.path[0]] = err.message;
            });
            setErrors(valErr);
            return;
        }

        setLoading(true);

        const response = await dispatch(registerUser(data))
        if (response.payload.success === true) {
            toast.success(response.payload.message)
            navigate("/login")
        } else {
            toast.error(response.payload.message)
        }

        setLoading(false);
        setErrors({});
    };


    return (
        <div className="container mt-5 w-50">
            <form className='w-50 p-4 shadow-lg border mx-auto' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={data.name} onChange={handleChange} />
                    <small className="text-danger">{errors.name}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={data.email} onChange={handleChange} />
                    <small className="text-danger">{errors.email}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={data.password} onChange={handleChange} />
                    <small className="text-danger">{errors.password}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} />
                    <small className="text-danger">{errors.confirmPassword}</small>
                </div>
                <p>Already have an account?<span><NavLink to="/login" className="text-decoration-none"> Login</NavLink></span></p>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
            </form>
        </div>
    );
};

export default Register;
