import React, { FormEvent } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import ProductFeature from "./ProductFeature";
import Joi from 'joi';
import "../css/AddEdit.css"
import { Product, Feature } from "../utils/model";


<<<<<<< HEAD:flipkart/ClientSide/src/components/AddProduct.tsx
const AddProduct: React.FC = () =>{
=======
//done changes in add product

export default function AddProduct() {
>>>>>>> b1f4509dfccabc6c5252df507864b11d9625b584:flipkart/ClientSide/src/components/AddProduct.jsx
    const { id } = useParams()
    const navigate = useNavigate();

    const feature:Feature = {
        title: "",
        value: ""
    }
    const baseUrl = 'http://localhost:4000/api/product/createProduct';

    const [product, setProduct] = useState<Product>({
        name: "",
        description: "",
        price: 0,
        category: "",
        features: []
    })

    //joi shema validation
    const schema = Joi.object({
        name: Joi.string().required(),
        category: Joi.string().valid('men\'s clothing', 'jewelery', 'electronics', 'women\'s clothing').required(),
        price: Joi.number().positive().required(),
        description: Joi.string().required(),
        features: Joi.array().required()
    }).unknown(true);



    // protected routes
    const token = localStorage.getItem("token")

    const handleChange = (e: { target: { name: string; value: number | string; }; }) => {
        
        setProduct((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }));
    };

    //Adding feature
    const AddFeature = () => {
        setProduct({
            ...product,
            features: [...product.features, feature]
        })
        // data.features.push(feature)
        console.log("data after adding: ", product.features)
    }

    //Delete Feature
    const handleDeleteFeature = (index:number) => {
        if (product.features.length > 1) {
            const updatedFeatures = [...product.features];
            updatedFeatures.splice(index, 1);
            setProduct({ ...product, features: updatedFeatures });
            toast.success("Feature Deleted successfully");
        }
        else {
            toast.error("Atleast one feature must be present");
        }

    };

    //Handle Feature Change
    const handleFeatureChange = (index:number, newData:Feature) => {
        console.log("New data: ", newData);
        console.log("features before", [...product.features]);
        const updatedFeatures = [...product.features];
        updatedFeatures[index] = newData;
        console.log("Update featuer after", updatedFeatures);
        setProduct({ ...product, features: updatedFeatures });
    };



    // Fetch page details in edit mode
    useEffect(() => {
        if (!token) {
            toast.info("To Add Products Please Login to you account", { toastId: "khandu" });
            navigate("/login")
        } else {
            const fetchData = async () => {
                try {
                    if (id) {
                        //edit mode if id as a parameter
                        const response = await axios.get(`http://localhost:4000/api/product/id/${id}`);
                        setProduct(response.data);
                        // const { _id, ...productData } = response.data; // Filter out _id
                        // setProduct(productData);
                    }
                } catch (error) {
                    console.error('Error fetching product details: error.message');
                }
            };
            fetchData();
        }

    }, [baseUrl, id, navigate, token]);


    const addProduct = async () => {

        await axios.post("http://localhost:4000/api/product/createProduct", product)
            .then((product) => {

                toast.success("Product created successfully")
                navigate("/")
            })
            .catch((err) => {
                if (err.response && err.response.status === 400 && err.response.data === `Product already exists`) {
                    toast.error(`Product already exists`);
                }
                else {
                    toast.error(`Product cannot be added: ${err}`)
                }
            })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        const { error } = schema.validate(product);
        if (!error) {
            if (!id) {
                if (event.target) {  //checkValidity();
                    // All required fields are filled, proceed with form submission
                    addProduct();

                } else {
                    // Some required fields are not filled, show pop-up message
                    toast.error("Some required fields are not filled");
                }

            }
            else {
                //PUT request in edit
                await axios.put(`${baseUrl}/${id}`, product);
                toast.success('Product updated successfully');
            }

        } else {
            //joi validation error message
            toast.error(error.details[0].message);
        }



    };




    return (
        <div className="add-product-container">



            <form onSubmit={handleSubmit}>

                <div className="header">
                    <div className="page-header">
                        <h2>{id ? "Edit Product Details" : "Add New Product"}</h2>
                    </div>
                    <div className="add-cancel-button">
                        <button type="submit" className="add-update" >{id ? "Update Product" : "Add Product"}</button>
                        <NavLink to='/'><button type="button" className="cancel" >Cancel</button></NavLink>
                    </div>
                </div>

                <hr />
                <div className="form-group">
                    <label htmlFor="productName" className="col-form-label">Product Name</label>
                    <input type="productName" className="form-control" id="productName" name="name" value={product.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="category" className="col-form-label">Category</label>
                    <select className="form-control" id="category" name="category" value={product.category} onChange={handleChange} required>
                        <option value="">Select a category</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="electronics">Electronics</option>
                        <option value="women's clothing">Women's Clothing</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price" className="col-form-label">Price</label>
                    <input type="price" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="col-form-label">Description</label>
                    <input type="text" className="form-control description-input" id="description" name="description" value={product.description} onChange={handleChange} required />
                </div>

                <button className="feature-button" type="button" onClick={AddFeature}>Add Feature</button>

                {
                    product.features.map((dataItem, index) => {
                        return <ProductFeature key={index} data={dataItem} onDelete={() => handleDeleteFeature(index)} onChange={(newData:Feature) => handleFeatureChange(index, newData)} />
                    })
                }

            </form>
        </div>

    )
}

export default AddProduct;