import React, { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";

export default function Register() {


    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
     
        console.log(data)
        try {
            const response = await axios.post("http://localhost:3000/api/register", data);
            console.log(response);
            // alert("Hello")
            const dataResponse = await response.data;
            console.log(dataResponse);
            if (dataResponse.error) {
                alert(dataResponse.message);
            }
            
            if (dataResponse.success) {
                alert(dataResponse.message);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmpassword: ""
                })

            }

              navigate('/login');    
          



        } catch (error) {
            console.error(error);
            alert(error.response.data.message)
            // alert("Network Error"); // or any other error message you'd like to display
            return false;
        }
    }


    return (

        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input type="text" placeholder="Enter Name" id="name" autoComplete="off" name="name" onChange={changeHandler} className="form-control rounded-0" />
                        {/* {errors.name && <p style={{ color: "red" }}>{errors.name}</p>} */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder="Enter email" id="email" autoComplete="off" name="email" onChange={changeHandler} className="form-control rounded-0" />
                        {/* {errors.email && <p style={{ color: "red" }}>{errors.email}</p>} */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder="Enter Password minmum length 6" id="password" autoComplete="off" name="password" onChange={changeHandler} className="form-control rounded-0" />
                        {/* {errors.password && <p style={{ color: "red" }}>{errors.password}</p>} */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmpassword">
                            <strong>Confirm Password</strong>
                        </label>
                        <input type="password" placeholder="Confirm Password" id="confirmpassword" autoComplete="off" name="confirmpassword" onChange={changeHandler} className="form-control rounded-0" />
                        {/* {errors.confirmpassword && <p style={{ color: "red" }}>{errors.confirmpassword}</p>} */}
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                    <p>Already Have an Account</p>
                    <NavLink to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</NavLink>
                </form>

            </div>

        </div>
    )
}