import React, { useState,useContext } from 'react';
import axios from 'axios';
import { store } from '../App';
import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [token,setToken]=useContext(store)
    const [data, setData] = useState({
        email: "",
        password: ""
    });
 
    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
 
    const submitHandler = e => {
        e.preventDefault();
        if (!data.email || !data.password) {
            alert("Please provide both email and password");
            return;
        }
        axios.post('http://localhost:4000/api/login', data)
            .then(res => setToken(res.data.token))
            .catch(err=>console.error("login failed:",err));
           
    }
   
   
    if(token){
       
          return <Navigate to ='/dashboard'/>
    }
 
    return (
        <div className='login-container'> {/* Add container to center form */}
    <form onSubmit={submitHandler} className="login-form">
        <h3>Login</h3>
        <div className="form-group">
            <input type="email" onChange={changeHandler} name="email" placeholder='Email' className="form-control" />
        </div>
        <div className="form-group">
            <input type="password" onChange={changeHandler} name="password" placeholder='Password' className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
        <p className="text-center mt-3">Don't have an account? <NavLink to="/register">Register</NavLink></p>
    </form>
</div>

    
    );
}
 
export default Login;