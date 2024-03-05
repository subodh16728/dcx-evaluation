import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ProductDetails() {
    const [productData, SetProductData] = useState([])
    const { id } = useParams();

    // Fetching the user based on id
    useEffect(() => {
        axios.get(`http://localhost:4000/api/product/id/${id}`)
            .then((data) => {
                console.log(data)
                SetProductData(data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    

    return (
        <div className="product-container">
            {productData && (
                <div className="product shadow">
                    <h2>{productData.ProductName}</h2>
                    <p className="category">Category: {productData.category}</p>
                    <p className="price">Price: ${productData.price}</p>
                    <p className="seller">Seller: {productData.seller}</p>
                    <p className="description">{productData.description}</p>
                </div>
            )}
        </div>
    );
}