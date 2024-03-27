// Home.js
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { NavLink, useNavigate} from "react-router-dom";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./CSS/Table.css";

const Home = () => {
    // const [userData, setUserData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const[wishlist,setWishlist]=useState([]);
    const navigate= useNavigate();
    
const token = localStorage.getItem("token")
 
    // useEffect(() => {
    //     if (!token) {
    //         navigate("/login")
    //     }
    // }, [])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await fetch(`http://localhost:3000/api/bookmark/${userId}`);
                const data = await response.json();
                console.log(data);
     
                // Check if the product property exists in the response
                if (data[0] && data[0].product) {
                    const dataArray = data[0].product;
                    setWishlist(dataArray);
                } else {
                    console.error('Product data not found in response:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
     
        fetchData();
    }, []);
    

    useEffect(() => {

        // Fetch table data
        axios.get("http://localhost:3000/api/table", {
            headers: {
                'x-token': token
            }
        })
        .then(res => {
            setTableData(res.data);
            setSearchResults(res.data); 
        })
        .catch(err => console.log(err));
       


        
    }, [token]); 
     
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const results = tableData.filter(product =>
            product.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchResults(results);
    };
  
    
    const handleremoveproduct = async (pid) => {
        try {
            await axios.delete(`http://localhost:3000/api/table/${pid}`);
            setTableData(prevTableData => prevTableData.filter(product => product._id !== pid));
            toast.success("Product removed successfully");
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to remove product');
        }
    };


    const addToWishlist = async (pId) => {
        try {
           const UserId=localStorage.getItem("userId");
           console.log(UserId);
            const response = await axios.put(`http://localhost:3000/api/bookmark/add/${UserId}`, { product: pId })
            console.log(response.data.product);
            setWishlist(response.data.product);
            // console.log(wishlist)
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    const isProductInWishlist = (prodId) => {
        return wishlist && wishlist.includes(prodId);
    };
 
 
   
    return (
        <div className="row mx-auto  ">

            <div className="search-container d-flex justify-content-between  "style={{ marginTop: '20px'}}>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        value={searchTerm}
                        onChange={handleSearch}
                    /> <i class="bi bi-search"></i>
                </div>
                
            </div>
            <center>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            
                            <th>Wishlist</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((product, index) => (
                            <tr key={index}>
                                {/* <td>{product.name}</td> */}
                                <td>
                        <NavLink to={`/productDetails/${product._id}`}>
                          {product.name}
                        </NavLink>
                      </td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>
                                                        
                                                           
                                {wishlist && wishlist.length > 0 && (
                                                            isProductInWishlist(product._id) ? (
                                                                <button onClick={() => addToWishlist(product._id)} className='btn btn-danger'>
                                                                    <i className="bi bi-heart-fill"></i>
                                                                </button>
                                                            ) : (
                                                                <button onClick={() => addToWishlist(product._id)} className='btn btn-success'>
                                                                    <i className="bi bi-heart"></i>
                                                                </button>
                                                            )
                                                        )}
                                                        {wishlist && wishlist.length === 0 && (
                                                            <button onClick={() => addToWishlist(product._id)} className='btn btn-success'>
                                                                <i className="bi bi-heart"></i>
                                                            </button>
                                                        )}
                                                    </td>
                                
                                <td> <NavLink className='w-pbuton' onClick={() => { handleremoveproduct(product._id) }}><i className="bi bi-trash3"></i></NavLink>
                                <NavLink
                                                className='text-dark'
                                                to={`/update/${product._id}`}
                                            >
                                                <i className="bi bi-pencil-square ms-3"></i>
                                            </NavLink>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
            
        </div>
    );
};

export default Home;
