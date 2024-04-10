import React, { useEffect, useState } from 'react';
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import "../css/DashBoard.css"
import { Product } from '../utils/model';
//import userModel from '../../../ServerSide/models/userModel';


const WishListProduct = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [finalProduct, setFinalProduct] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(0);
    const navigate = useNavigate();

    let token = localStorage.getItem("token");
    let userID: string | void;
    let decodedToken: { name: string; id: string } | null;
    if (token) {
        decodedToken = jwtDecode(token);
        userID = decodedToken?.id;
    }
    else {
        decodedToken = null;
    }


    // Search and Fetching Functionality
    useEffect(() => {
        if (!token) {
            toast.info("To view your wishlist Login to your account", { toastId: "khandu" });
            navigate("/login")
        }
        else {
            const fetchProducts = async (searchTerm) => {
                console.log(userID);
                try {
                    const response = await axios.get(`http://localhost:4000/api/product/your/${userID}?q=` + searchTerm)

                    setFilteredProduct(response.data.matchingData);
                    setFinalProduct(response.data.matchingData);

                } catch (error) {
                    console.error(`Error fetching Products: ${error}`)
                }
            }
            fetchProducts(searchTerm);

        }

    }, [searchTerm, forceUpdate]);


    //Sort Functionality
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('asc');
        }
    };

    useEffect(() => {

        const sortedProducts = [...filteredProduct].sort((a, b) => {
            const aValue = (sortBy === 'price') ? parseFloat(a[sortBy]) : a[sortBy];
            const bValue = (sortBy === 'price') ? parseFloat(b[sortBy]) : b[sortBy];
            console.log("sorting applied");

            if (aValue < bValue) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFinalProduct(sortedProducts);
    }, [filteredProduct, sortBy, sortDirection]);

    //wishlist the product
    const handleBookmark = async (data:Product) => {
        const productID = data._id
        try {
            let response: any;
            if (decodedToken) {
                response = await axios.put(`http://localhost:4000/api/user/wishlist/${decodedToken.id}`, {
                    wishlistItem: productID
                });
            }
            toast.success(response.data.message);
            setForceUpdate(prevValue => prevValue + 1);
        } catch (error) {
            console.error("Error Updating Product:", error);
            toast.error(error.response.data.message);
        }
    };


    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search Product...."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button">
                    <i className="fa fa-search"></i>
                </button>
            </div>
            <div className="row product-table-container">
                <h3>Your Wishlist...</h3>
                <table className="product-table">

                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')}>
                                Product Name
                                {sortBy === 'name' && (
                                    <i className={`fa fa-sort-${sortDirection === 'asc' ? 'asc' : 'desc'}`}></i>
                                )}
                            </th>
                            <th onClick={() => handleSort('category')}>
                                Category
                                {sortBy === 'category' && (
                                    <i className={`fa fa-sort-${sortDirection === 'asc' ? 'asc' : 'desc'}`}></i>
                                )}
                            </th>
                            <th onClick={() => handleSort('price')}>
                                Price
                                {sortBy === 'price' && (
                                    <i className={`fa fa-sort-${sortDirection === 'asc' ? 'asc' : 'desc'}`}></i>
                                )}
                            </th>
                            <th> WishList</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {finalProduct.length > 0 ? <tbody>
                        {finalProduct.map((product: Product, index) => (
                            <tr key={index}>
                                <td><NavLink to={`/productDetails/${product._id}`} className="product-link">{product.name}</NavLink></td>
                                <td>{product.category}</td>
                                <td>₹{product.price}</td>
                                <td>
                                    <a
                                    // eslint-disable-next-line no-script-url
                                        href="javascript:void(0)"
                                        onClick={() => handleBookmark(product)}
                                    >
                                        <i
                                            className={`${true
                                                ? "fa-solid fa-heart"
                                                : "fa-regular fa-heart"
                                                }`}
                                        ></i>
                                    </a>
                                </td>


                                <td>
                                    {product._id ? (
                                        <NavLink to={`/addProduct/${product._id}`}>
                                            <i className="fas fa-edit"></i>
                                        </NavLink>
                                    ) : null}
                                </td>
                            </tr>
                        ))}
                    </tbody> : <tbody>
                        <td colSpan={5}><p className='text-center'>Ooops! No products found</p></td>
                    </tbody>}

                </table>
            </div>
        </div>
    )
}

export default WishListProduct;
