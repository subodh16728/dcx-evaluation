import React, { useContext, useState, useEffect } from "react";
import { store } from "../App";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./CSS/Table.css";

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

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Header />
            {userData && (
                <center>
                    <h2>Welcome  {userData.name}</h2>
                </center>
            )}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <center>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Product Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((product, index) => (
                            <tr key={index}>
                                <td>{product.pname}</td>
                                <td>{product.pdescription}</td>
                                <td>{product.pprice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
};

export default Home;
