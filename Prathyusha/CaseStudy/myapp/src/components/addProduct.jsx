import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FeatureForm from "./Features";

export default function ProductForm() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: '',
        features: []
    });

    const [features, setFeatures] = useState([]);

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const addFeature = () => {
        setFeatures([...features, { title: '', value: '' }]);
    };

    const handleFeatureChange = (index, field, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index][field] = value;
        setFeatures(updatedFeatures);
    };

    const removeFeature = index => {
        const updatedFeatures = [...features];
        updatedFeatures.splice(index, 1);
        setFeatures(updatedFeatures);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/api/products", { ...data, features });
            toast.success("Product added successfully");
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            console.log(err.response?.data);

            const errormessage = err.response?.data;

            if (errormessage === "Product already exists") {
                toast.error("Product already exists");
            } else {
                console.error("Error:", err);
                toast.error("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="bg-white p-3 rounded w-50 scrollable-form-container">
                <div style={{ textAlign: "center" }}><h3>Add New Products</h3></div>
                
                <form onSubmit={submitHandler}>
                <div className="row container-fluid d-flex flex-row-reverse mt-3">
                        <button type="submit" className="btn btn-success -0" style={{ width: "15%" }}>Save</button>
                        <button type="button" className="btn btn-secondary me-2" onClick={() => navigate("/dashboard")} style={{ width: "15%" }}>Cancel</button>
                    </div>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"><strong>Product Name</strong></label>
                            <input type="text" placeholder="Enter Product Name" id="name" autoComplete="off" name="name" onChange={changeHandler} className="form-control rounded-0" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label"><strong>Product Description</strong></label>
                            <input type="text" placeholder="Enter product description" id="description" autoComplete="off" name="description" onChange={changeHandler} className="form-control rounded-0" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label"><strong>Product Price</strong></label>
                            <input type="number" placeholder="Enter Price" id="price" autoComplete="off" name="price" onChange={changeHandler} className="form-control rounded-0" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label"><strong>Category</strong></label>
                            <select id="category" name="category" onChange={changeHandler} className="form-control rounded-0" required>
                                <option value="">Select a category</option>
                                <option value="men's clothing">Men's Clothing</option>
                                <option value="jewelery">Jewelery</option>
                                <option value="electronics">Electronics</option>
                                <option value="women's clothing">Women's Clothing</option>
                            </select>
                        </div>
                        <button type="button" className="btn btn-outline-primary" onClick={addFeature} >Features</button><br /><br />
                        {features.map((feature, index) => (
                            <FeatureForm
                                key={index}
                                index={index}
                                title={feature.title}
                                value={feature.value}
                                onChange={(field, value) => handleFeatureChange(index, field, value)}
                                removeFeature={() => removeFeature(index)}
                            />
                        ))}
                    </div>
                    
                </form>
            </div>
        </div>
    );
}
