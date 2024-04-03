import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FeatureForm from "./Feature";

export default function ProductForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: '',
        features: []
    });
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else if (id !== undefined) {
            handleProduct();
        }
    }, []);

    const handleProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/table/${id}`);
            const productData = response.data;
            setData(productData);
            setFeatures(productData.features || []); // Set features if they exist
        } catch (error) {
            console.error(error);
        }
    };

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
        const requestData = {
            ...data,
            features: features // Include updated features in the request
        };
        if (id) {
            const response = await axios.put(`http://localhost:3000/api/table/update/${id}`, requestData);
            if (response.status === 200) {
                toast.success("Product updated successfully");
                navigate("/home");
            } else {
                toast.error("Failed to update product");
            }
        } else {
            const response = await axios.post("http://localhost:3000/api/table/add", requestData);
            if (response.status === 201) {
                toast.success("Product created successfully");
                navigate('/home');
            } else {
                toast.error("Failed to create product");
            }
        }
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
                <form onSubmit={submitHandler}>
                    <div style={{ textAlign: "center" }}><h4>{id ? "Update Product" : "Add Product"}</h4></div>
                    <div className="row container-fluid d-flex flex-row-reverse mt-3">
                        <button type="submit" className="btn btn-success rounded-0" style={{ width: "15%" }}>{(id ? 'Update Product' : 'Add Product')}</button>
                        <button type="button" className="btn btn-secondary me-2" onClick={() => navigate("/home")} style={{ width: "15%" }}>Cancel</button>
                    </div>
                    <div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="name"><strong>Product Name</strong></label>
                                <input type="text" placeholder="Enter Product Name" id="name" autoComplete="off" name="name" value={data.name} onChange={changeHandler} required className="form-control rounded-0" />
                            </div>
                            <div className="col">
                                <label htmlFor="description"><strong>Product Description</strong></label>
                                <textarea type="text" required placeholder="Enter product description" id="description" autoComplete="off" value={data.description} name="description" onChange={changeHandler} className="form-control rounded-0" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="price"><strong>Product Price</strong></label>
                                <input type="Number" min="0" placeholder="Enter Price" required id="price" autoComplete="off" value={data.price} name="price" onChange={changeHandler} className="form-control rounded-0" />
                            </div>
                            <div className="col">
                                <label htmlFor="category"><strong>Category</strong></label>
                                <select id="category" name="category" value={data.category} onChange={changeHandler} required className="form-control rounded-0">
                                    <option value="">Select a category</option>
                                    <option value="men's clothing">Men's Clothing</option>
                                    <option value="jewelery">Jewelery</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="women's clothing">Women's Clothing</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary" required onClick={addFeature}>Add Feature</button><br /><br />
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
