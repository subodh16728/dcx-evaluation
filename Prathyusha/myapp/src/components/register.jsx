import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    });

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/register', data)
            .then(res => {
                if (res.data.error) {
                    alert(res.data.message); // Alert user already exists
                } else {
                    alert(res.data); // Alert registration successful
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div className='register-form'>
            <form onSubmit={submitHandler}>
                <h3>Register</h3>
                <div className="form-group">
                    <input type="text" onChange={changeHandler} name="username" placeholder='Username' className="form-control" />
                </div>
                <div className="form-group">
                    <input type="email" onChange={changeHandler} name="email" placeholder='Email' className="form-control" />
                </div>
                <div className="form-group">
                    <input type="password" onChange={changeHandler} name="password" placeholder='Password' className="form-control" />
                </div>
                <div className="form-group">
                    <input type="password" onChange={changeHandler} name="confirmpassword" placeholder='Confirm Password' className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
                <p className="text-center mt-3">Already have an account? <NavLink to="/login">Login</NavLink></p>
            </form>
        </div>
    );
}

export default Register;
