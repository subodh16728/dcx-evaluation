import React, { useState } from "react";
import axios from "axios";

export default function AddProduct({ updateProducts }) {
    const [formData, setFormData] = useState({
        productname: "",
        price: "",
        description: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/products", formData);
            
            if (response.status === 201) {
                updateProducts(); // Update products list in the dashboard
                setFormData({
                    productname: "",
                    price: "",
                    description: ""
                });
                alert("Product created successfully");
                console.log("Response status:", response.status); 
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError("Product already exists");
            } else {
                console.error("Error adding product:", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <div className="mb-3">
                <label htmlFor="productname" className="form-label">Product Name</label>
                <input type="text" name="productname" value={formData.productname} onChange={handleChange} className="form-control" placeholder="Enter Productname" />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" placeholder="Enter Price" />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} className="form-control" placeholder="Enter Description" />
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
    );
}
