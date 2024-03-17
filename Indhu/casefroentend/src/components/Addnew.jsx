import React, { useState,useEffect } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";


export default function ProductForm() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
 
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])
    const [data, setData] = useState({
        pname: "",
        pdescription: "",
        pprice: "",
    });

    const [errors, setErrors] = useState({
        pname: "",
        pdescription: "",
        pprice: "",
    });

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear previous error message
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        let formIsValid = true;
        const newErrors = { ...errors };

        // Validate product name
        if (data.pname === "") {
            newErrors.pname = "Product name is required";
            formIsValid = false;
        }

        // Validate product description
        if (data.pdescription === "") {
            newErrors.pdescription = "Product description is required";
            formIsValid = false;
        }

        // Validate product price
        if (data.pprice === "" ) {
            newErrors.pprice = "Product price is required";
            formIsValid = false;
        }
        else if(data.pprice<=0){
            newErrors.pprice = "Product price should be greater than 0";
            formIsValid = false;

        }

        setErrors(newErrors);

        if (formIsValid) {
            try {
                const res = await axios.post("http://localhost:3000/api/table", data);
                toast.success(res.data);
                navigate('/home');
            } catch (err) {
                console.error(err);
                console.log(err.response?.data); // Log error response data
                // Handle error, e.g., show error message to the user
                const errormessage=err.response?.data;
                // Check if the error response contains a message
                if (errormessage==="Product already exists") {
                    toast.error("Product already exists");
                } else {
                    console.error("Error:",err);
                    toast.error("An error occurred. Please try again later.");
                }
            }
        }
        
        
    };

    return (
        <div> 
     
    
        <div className="d-flex justify-content-center align-items-center vh-100">
           
            <div className="bg-white p-3 rounded w-25">
                <h2>Add New Products</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="pname">
                            <strong>Product Name</strong>
                        </label>
                        <input type="text" placeholder="Enter Product Name" id="pname" autoComplete="off" name="pname" onChange={changeHandler} className="form-control rounded-0" />
                        {errors.pname && <p className="text-danger">{errors.pname}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pdescription">
                            <strong>Product Description</strong>
                        </label>
                        <input type="text" placeholder="Enter product description" id="pdescription" autoComplete="off" name="pdescription" onChange={changeHandler} className="form-control rounded-0" />
                        {errors.pdescription && <p className="text-danger">{errors.pdescription}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pprice">
                            <strong>Product Price</strong>
                        </label>
                        <input type="text" placeholder="Enter Price" id="pprice" autoComplete="off" name="pprice" onChange={changeHandler} className="form-control rounded-0" />
                        {errors.pprice && <p className="text-danger">{errors.pprice}</p>}
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">Add Product</button>

                </form>

            </div>

        </div>
        </div>
    );
}