import React ,{useState}from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";



export default function ProductForm(){
   
    const [data, setData] = useState({
        pname: "",
        pdescription: "",
        pprice: "",
    })
    
    const changeHandler=e=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler=e=>{
        e.preventDefault();
        axios.post("http://localhost:3000/api/table",data)
        .then(res=>alert(res.data))
        .catch(err=>console.error(err))//error handling
        
    }

    return(
        
    <div className="d-flex justify-content-center align-items-center  vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Add New Products</h2>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="pname">
                        <strong>Product Name</strong>
                    </label>
                    <input type="text" placeholder="Enter Product Name" id="pname" autoComplete="off" name="pname" onChange={changeHandler} className="form-control rounded-0"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pdescription">
                        <strong>Product Description</strong>
                    </label>
                    <input type="text" placeholder="Enter product description" id="pdescription" autoComplete="off" name="pdescription" onChange={changeHandler} className="form-control rounded-0"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pprice">
                        <strong>Product Price</strong>
                    </label>
                    <input type="pprice" placeholder="Enter Price" id="pprice" autoComplete="off" name="pprice" onChange={changeHandler} className="form-control rounded-0"/>
                </div>
               
                <button type="submit" className="btn btn-success w-100 rounded-0">Add Product</button>
               
            </form>

        </div>

    </div>
    )
}