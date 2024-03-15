// Home.js
import React, { useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { store } from "../App";
import { Navigate, NavLink } from "react-router-dom";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./CSS/Table.css";
import { jwtDecode } from "jwt-decode";


// Your component code goes here...



const Home = () => {
    const [token, setToken] = useContext(store);
    const [userData, setUserData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // Fetch user data
        axios.get("http://localhost:3000/api/myprofile", {
            headers: {
                'x-token': token
            }
        })
        .then(res => setUserData(res.data))
        
        .catch(err => console.log(err));
        // console.log(token);

        // Fetch table data
        axios.get("http://localhost:3000/api/table", {
            headers: {
                'x-token': token
            }
        })
        .then(res => {
            setTableData(res.data);
            setSearchResults(res.data); // Initialize search results with all table data
        })
        .catch(err => console.log(err));
    }, [token]); // Fetch data whenever token changes or on initial mount
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const results = tableData.filter(product =>
            product.pname.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchResults(results);
    };
  
    const handleBookmark = async(pId,pName) => {
        const token=localStorage.getItem("token");

        
        try{
            const UserId=jwtDecode(token).user.id;
            console.log(UserId);
            console.log(token);
        console.log(pId)
            // localStorage.setItem(UserId)
            
            await axios.post(`http://localhost:3000/api/bookmark/add/${UserId}`, { product: pId });
            toast.success(`Product "${pName}" added to wishlist successfully`);
        }
        catch(error){
            const errorMessage=error.response?.data;
            console.log(errorMessage.error)
            if(errorMessage.error==="Product already in wishlist"){

                toast.error(`Product is already in your wishlist `);
            }else{
                console.error('Error:',error);
                toast.error('Failed to add product')
            }

        }

   
    };

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            
            {userData && (
                <center>
                    <h2>Welcome  {userData.name}</h2>
                </center>
            )}
            <div className="search-container d-flex justify-content-between ">
                <div>
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                
            </div>
            <center>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Product Price</th>
                            <th>Wishlist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((product, index) => (
                            <tr key={index}>
                                <td>{product.pname}</td>
                                <td>{product.pdescription}</td>
                                <td>{product.pprice}</td>
                                <td>
                                    <a href="javascript:void(0)" onClick={() => handleBookmark(product._id,product.pname)}>
                                        <i className={`bi ${
                                            product.productBookmarked
                                                ? "bi-bookmark-fill"
                                                : "bi-bookmark"
                                            }`}
                                        ></i>
                                    </a>
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
