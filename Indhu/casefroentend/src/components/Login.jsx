import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export default function Login(){

    const [token,setToken]=useState();
   
    const[data,setData]=useState({
        
        email:"",
        password:"",
    
    })
    
    const changeHandler=e=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    
    const submitHandler=e=>{
        e.preventDefault();
        axios.post("http://localhost:3000/api/login",data)
        .then(res=>{
            toast.success("Logged in Successfully")
          
            const token=res.data.token;
            localStorage.setItem("token", token);

            const UserId=jwtDecode(token).user.id;
            // console.log(UserId);
           
            localStorage.setItem("userId",UserId);
            setToken(token)})
            
        .catch(err=>{
            console.log(err)
            toast.error("Incorrect Email or Password")});
    }
    if(token){
        return <Navigate to="/home"/>
    }

    return(
        
    <div className="d-flex justify-content-center align-items-center  vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input type="email" placeholder="Enter email" id="email" autoComplete="off" name="email"  className="form-control rounded-0" required onChange={changeHandler}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input type="password" placeholder="Enter Password" id="password" autoComplete="off" name="password" className="form-control rounded-0" required onChange={changeHandler}/>
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                <p>New User Please Create Account</p>

                <NavLink to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Register</NavLink>
            </form>

        </div>

    </div>
    )
}