import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Joi from "joi";
import Cookie from "js-cookie"
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [isModified, setIsModified] = useState(false);
    const [data, setData] = useState({
        title: "",
        category: "",
        price: "",
        description: ""
    });

    const params = useParams()
    const id = params.id;

    // authentication using jwt token
    const token = Cookie.get("token")
    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else if (id !== undefined) {
            handleProducts()
        }

    }, [])

    const productSchema = Joi.object({
        title: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        updatedAt: Joi.any().strip()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setIsModified(true);
    };

    const handleProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            const { _id, __v, bookmarked, ...updatedData } = response.data;
            setData(updatedData);
        } catch (error) {
            console.error(error)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) {
            return;
        }

        const json = JSON.parse(JSON.stringify(data));
        json["bookmarked"] = false;
        const { error } = productSchema.validate(data, { abortEarly: true });

        if (error) {
            const valErr = {};
            error.details.forEach((err) => {
                valErr[err.path[0]] = err.message;
            });
            setErrors(valErr);
            return;
        }

        setLoading(true);

        try {
            if (id) {
                const response = await axios.put(`http://localhost:5000/api/products/edit/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
                if (response.status === 204) {
                    toast.success("Product updated successfully");
                    navigate("/dashboard");
                }
            } else {
                const response = await axios.post("http://localhost:5000/api/products/add", json, { headers: { Authorization: `Bearer ${token}` } });
                if (response.status === 201) {
                    toast.success("Product created successfully");
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            toast.error("Product already exists");
        } finally {
            setLoading(false);
            setErrors({});
        }
    };

    return (
        <>
            <div className="container mt-5 w-50">
                <form className='w-50 mx-auto p-4 shadow-lg border' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={data.title} onChange={handleChange} />
                        <small className="text-danger">{errors.title}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input type="text" className="form-control" id="category" name="category" value={data.category} onChange={handleChange} />
                        <small className="text-danger">{errors.category}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" name="price" value={data.price} min={1} step="any" onChange={handleChange} />
                        <small className="text-danger">{errors.price}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea id="description" className="form-control" rows={6} cols={20} name="description" value={data.description} onChange={handleChange} ></textarea>
                        <small className="text-danger">{errors.description}</small>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={loading || (id && !isModified)}>{loading ? 'Loading...' : (id ? 'Update Product' : 'Add Product')}</button>

                </form>
            </div>
        </>
    );
};

export default Products;
