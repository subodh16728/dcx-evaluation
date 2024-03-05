import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import _ from 'lodash';


const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('ProductName');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [finalProduct, setFinalProduct] = useState([]);

    
   

    //Search and Fetching Functionality
    useEffect( ()=> {
        const fetchProducts = async (searchTerm) => {
            try {
                const response = await axios.get("http://localhost:4000/api/product/getProduct?q="+searchTerm)
                setFilteredProduct(response.data);
                setFinalProduct(response.data);
                
            } catch (error) {
                console.error(`Error fetching Products: ${error}`)
            }
        }
        fetchProducts(searchTerm);
    }, [searchTerm]);

    //const abcd = useCallback(()=>_.debounce(handleSearchInputChange, 4000), []); 


    


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
            <div className="row product-table-container shadow rounded p-3">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('ProductName')}>
                                Product Name
                                {sortBy === 'ProductName' && (
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
                        </tr>
                    </thead>
                    <tbody>
                        {finalProduct.map((product, index) => (
                            <tr key={index}>
                                <td><NavLink to={`/productDetails/${product._id}`} className="product-link">{product.ProductName}</NavLink></td>
                                <td>{product.category}</td>
                                <td>₹{product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard;
