import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getProducts, toggleBookmark, getBookmarkedProducts } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../utils/model';

const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [bookmarkedProducts, setBookmarkedProducts] = useState<Product[]>([]);
    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        const populateProducts = async () => {
            try {
                const receivedProducts: Product[] = await getProducts();
                setProducts(receivedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        populateProducts();
    }, [forceUpdate]);

    useEffect(() => {
        const fetchBookmarked = async () => {
            try {
                const bookmarked = await getBookmarkedProducts();
                setBookmarkedProducts(bookmarked);
            } catch (error) {
                console.error('Error fetching bookmarked products:', error);
            }
        };

        fetchBookmarked();
    }, []);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSort = () => {
        const sortedProducts = [...products];
        sortedProducts.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            let comparison = 0;
            if (nameA > nameB) {
                comparison = 1;
            } else if (nameA < nameB) {
                comparison = -1;
            }

            return sortOrder === 'asc' ? comparison : comparison * -1;
        });
        setProducts(sortedProducts);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleBookmarkToggle = async (product: Product) => {
        try {
            const productId = product._id;
            const bookMarkToggle = !product.bookmarked;
            await toggleBookmark(productId, { bookmarked: bookMarkToggle });
            setForceUpdate(prevValue => prevValue + 1);
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <button onClick={handleSort} className="btn btn-secondary">Sort</button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Wishlist</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product._id}>
                            <td>
                                <NavLink to={`/products/${product._id}`} style={{ color: 'black' }}>
                                    {product.name}
                                </NavLink>
                            </td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => handleBookmarkToggle(product)}>
                                    <FontAwesomeIcon
                                        icon={product.bookmarked ? fasHeart : farHeart}
                                        style={{ color: product.bookmarked ? 'blue' : 'black' }}
                                    />
                                </button>
                            </td>
                            <td>
                                <NavLink to={`/products/edit/${product._id}`}>
                                    <FontAwesomeIcon icon={faEdit} style={{ color: 'black' }} />
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
