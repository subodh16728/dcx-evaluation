import axios from "axios";
import React  from "react";
import { useEffect, useState } from "react";
import { useParams, NavLink } from 'react-router-dom';
import "../css/Product.css"
import {Product} from "../utils/model"

const ProductDetails: React.FC = () => {

    

    const [productData, SetProductData] = useState<Product>({
        name: "",
        description: "",
        price: 0,
        category: "",
        features: []
    })
    const { id } = useParams();


    // Fetching the user based on id
    useEffect(() => {
        axios.get(`http://localhost:4000/api/product/id/${id}`)
            .then((data) => {
                SetProductData(data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    console.log(productData);


    return (

        <div className="product-container">
            {productData && (
                <div className="product">
                    <div className="header">
                        <div>
                            <h1>Product Details:</h1>
                        </div>
                        <div>
                            <NavLink to={`/addProduct/${id}`}>
                                <i className="fa fa-edit" title="Edit Details"></i>
                            </NavLink>
                        </div>
                    </div>


                    <hr />
                    <h2>{productData.name}</h2>
                    <p className="category">Category: {productData.category}</p>
                    <p className="price">Price: ${productData.price}</p>
                    <p className="description">{productData.description}</p>
                    <h5>Product Feature:</h5>
                    {productData.features.map((dataItem, index) => (
                        <p key={index} className="feature ms-5" ><strong>{dataItem.title} : {dataItem.value}</strong></p>
                    ))}

                </div>
            )}
        </div>
    );
}


export default ProductDetails;