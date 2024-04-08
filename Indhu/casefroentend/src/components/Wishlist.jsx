import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import "./CSS/Table.css";


const Wishlist = () => {
    const token=localStorage.getItem("token");
    const navigate = useNavigate();
  
    const [wishlistItems, setWishlistItems] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    
    const userId=jwtDecode(token).user.id;
            console.log(userId);
            useEffect(() => {
                if (!token) {
                    navigate("/login")
                }
            }, [])
     
   

    useEffect(() => {                                 
        const fetchWishlistItems = async () => {
            try {
               
                const response = await axios.get(`http://localhost:3000/api/bookmark/${userId}`);
                console.log(response.data)
                setWishlistItems(response.data);
            } catch (error) {
                console.error('Error fetching wishlist items:', error);
            }
        };

        if (userId) {
            fetchWishlistItems();
        }
    }, [userId]);

    useEffect(() => {
        if (!token) {
            navigate("/home");
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchProductDetails = async (productId) => {
            try {

                const response = await axios.get(`http://localhost:3000/api/table/${productId}`);
                const { name, description, price,category } = response.data;

                // Update product details state
                setProductDetails(prevDetails => ({
                    ...prevDetails,
                    [productId]: {
                        name,
                        description,
                        price,
                        category
                    }
                }));
            } catch (error) {
                console.error(`Error fetching product details for productId`, error);
            }
        };

        wishlistItems.forEach(wishlistItem => {
            wishlistItem.product.forEach(productId => {
                if (!productDetails[productId]) {
                    fetchProductDetails(productId);
                }
            });
        });
    }, [wishlistItems, productDetails]);

    const removeProductFromWishlist = async (productId) => {
        try {
            const userId = localStorage.getItem("userId")
            const response = await axios.put(`http://localhost:3000/api/bookmark/add/${userId}`, { product: productId });
            console.log(response);
            setWishlistItems(prevItems => {
                const updatedItems = prevItems.map(item => {
                 
                    if (item.product.includes(productId)) {
                        return {
                            ...item,
                            product: item.product.filter(id => id !== productId)
                        };
                    }
                    return item;
                });
              
                return updatedItems.filter(item => item.product.length > 0);
            });
     
        } catch (error) {
            console.error('Error removing product from wishlist:', error);
        }
    };
    return (
        <div className="row mx-auto" >
           
            <h1>Wishlist Items</h1>
            
            <table className='product-table'>
                <thead>
                    <tr>
                       
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {wishlistItems.length>0 ?
                    (wishlistItems.map(wishlistItem => (
                        <React.Fragment key={wishlistItem._id}>
                            {wishlistItem.product.map(productId => (
                                <tr key={productId}>
                                    
                                    {productDetails[productId] && (
                                        <React.Fragment>
                                            
                                            <td>{productDetails[productId].name}</td>
                                            <td>{productDetails[productId].description}</td>
                                            <td>{productDetails[productId].price}</td>
                                            <td>{productDetails[productId].category}</td>
                                           <td> <button className='w-pbutton' onClick={() => { removeProductFromWishlist(productId) }}><i class="bi bi-trash"></i></button></td>
                                        </React.Fragment>
                                    )}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))):<h1>Cart is empty</h1>}
                </tbody>
            </table>
        </div>
    );
};

export default Wishlist;


