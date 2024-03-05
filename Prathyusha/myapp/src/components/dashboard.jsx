import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/apiService';



const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const populateProducts = async () => {
            try {
                const receivedProducts = await getProducts();
                setProducts(receivedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        populateProducts();
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSort = () => {
        const sortedProducts = [...products];
        sortedProducts.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.productname.localeCompare(b.productname);
            } else {
                return b.productname.localeCompare(a.productname);
            }
        });
        setProducts(sortedProducts);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredProducts = products.filter(product =>
        product.productname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <h2>Products</h2>
            <input
                type="text"
                placeholder="Search by product name"
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <button onClick={handleSort}>Sort by Name</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product._id}>
                            <td>{product.productname}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
