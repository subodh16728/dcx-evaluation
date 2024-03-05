import React,{useState,useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from "react-router-dom";
import { store } from "../App";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Login(){
    const [token,setToken]=useContext(store)
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
        .then(res=>setToken(res.data.token))
        .catch(err=>alert("Incorrect Email or Password",err));
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
                    <input type="email" placeholder="Enter email" id="email" autoComplete="off" name="email"  className="form-control rounded-0" onChange={changeHandler}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input type="password" placeholder="Enter Password" id="password" autoComplete="off" name="password" className="form-control rounded-0" onChange={changeHandler}/>
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                
              
                <NavLink to="/" className=" w-100 rounded-0">Register</NavLink>
            </form>

        </div>

    </div>
    )
}