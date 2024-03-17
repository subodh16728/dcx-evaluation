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
                const { pname, pdescription, pprice } = response.data;

                // Update product details state
                setProductDetails(prevDetails => ({
                    ...prevDetails,
                    [productId]: {
                        pname,
                        pdescription,
                        pprice
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

    const handleremoveWishlist = async (pid) => {
        // const token = localStorage.getItem('token');
        // const userId = jwtDecode(token)._id;
        const userId = localStorage.getItem('userId');
            console.log(userId);
            console.log(pid);
 
        await axios.delete(`http://localhost:3000/api/bookmark/delete/${userId}`, { data: { product: pid } });
        setWishlistItems(prevItems => prevItems.map(item => ({
            ...item,
            product: item.product.filter(productId => productId !== pid)
        })));
    }
    return (
        <div>
           
            <h1>Wishlist Items</h1>
            <table className='product-table'>
                <thead>
                    <tr>
                        {/* <th>Product ID</th> */}
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {wishlistItems.map(wishlistItem => (
                        <React.Fragment key={wishlistItem._id}>
                            {wishlistItem.product.map(productId => (
                                <tr key={productId}>
                                    {/* <td>{productId}</td> */}
                                    {productDetails[productId] && (
                                        <React.Fragment>
                                            <td>{productDetails[productId].pname}</td>
                                            <td>{productDetails[productId].pdescription}</td>
                                            <td>{productDetails[productId].pprice}</td>
                                           <td> <button className='w-pbutton' onClick={() => { handleremoveWishlist(productId) }}>Remove</button></td>
                                        </React.Fragment>
                                    )}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Wishlist;


