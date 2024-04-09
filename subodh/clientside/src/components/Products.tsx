import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Joi from "joi";
import Cookie from "js-cookie"
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Features from './Features';
import {ErrorContainer, Feature, Product} from "../utils/model";

const Products = () => {

    const [errors, setErrors] = useState<ErrorContainer>({});
    const navigate = useNavigate();
    const [feature] = useState<Feature>(
        {
            title: "",
            value: ""
        }
    )

    const [data, setData] = useState<Product>({
        name: "",
        category: "",
        price: "",
        description: "",
        features: []
    });

    const params = useParams()
    const id = params.id;
    const token = Cookie.get("token")
    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else if (id !== undefined) {
            handleProducts()
        }

    }, [])

    const productSchema = Joi.object({
        name: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        features: Joi.array().required(),
        createdAt: Joi.any().strip(),
        updatedAt: Joi.any().strip()
    });

    const AddFeature = () => {
        setData({
            ...data,
            features: [...data.features, feature]
        })
    }

    const handleChangeFeatures = (index: number, name: string, value: string) => {
        const updatedFeatures = [...data.features];
        updatedFeatures[index][name] = value;
        setData({ ...data, features: updatedFeatures });
    };

    const handleDeleteFeatures = (index: number) => {
        const updatedFeatures = [...data.features];
        updatedFeatures.splice(index, 1);
        setData({ ...data, features: updatedFeatures });
    };

    const handleCancel = () => {
        navigate("/dashboard")
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let newData = { ...data };
        let keyName: string = (event.target as HTMLInputElement).name; // features
        newData[keyName as keyof Omit<Product, "features">] = (event.target as HTMLInputElement).value; // newData.features = event.target.value
        setData(newData);
    }

    const handleProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            const { _id, __v, bookmarked, ...updatedData } = response.data;
            setData(updatedData);
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const json = JSON.parse(JSON.stringify(data));
        json["bookmarked"] = false;
        const { error } = productSchema.validate(data, { abortEarly: true });

        if (error) {
            const valErr:ErrorContainer = {};
            error.details.forEach((err) => {
                valErr[err.path[0]] = err.message;
            });
            setErrors(valErr);
            return;
        }

        try {
            if (id) {
                const response = await axios.put(`http://localhost:5000/api/products/edit/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
                if (response.status === 204) {
                    toast.success("Product updated successfully");
                    navigate("/dashboard");
                }
            } else {
                const response = await axios.post("http://localhost:5000/api/products/add", json, { headers: { Authorization: `Bearer ${token}` } });
                console.log("Added product response: ",response)
                if (response.status === 201) {
                    toast.success("Product created successfully");
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            toast.error("Product already exists");
        } finally {
            setErrors({});
        }
    };

    return (
        <>
            <div className="container mt-2 mb-3 w-100">
                <form className='w-50 mx-auto p-4 shadow-lg' onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-between'>
                        <h2 className=''>Product details</h2>
                        <div className='w-50 d-flex justify-content-end'>
                            <button type="submit" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="product-btn">{id ? 'Update Product' : 'Add Product'}</button>
                        </div>
                    </div>

                    <hr />
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={data.name} onChange={handleChange} />
                        <small className="text-danger">{errors.name}</small>
                    </div>
                    <div className="mb-3 w-full">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className='form-control' name="category" id="category" value={data.category} onChange={handleChange}>
                            <option value="">Select Category For Product</option>
                            <option value="men's clothing">Men's Clothing</option>
                            <option value="jewelery">Jewelery</option>
                            <option value="electronics">Electronics</option>
                            <option value="women's clothing">Women's Clothing</option>
                        </select>
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

                    <div className='w-75 ms-auto'>
                        <button type="button" className="w-25 btn btn-outline-secondary ms-auto d-block feature-btn" onClick={AddFeature}>Add feature</button>
                    </div>
                    {
                        data.features.map((dataItem, index) => {
                            return <Features key={index} index={index} data={dataItem} onChange={handleChangeFeatures} onDelete={handleDeleteFeatures} />
                        })
                    }

                </form>
            </div>
        </>
    );
};

export default Products;
