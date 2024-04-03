import React, { useState, useEffect } from 'react';
import { getBookmarkedProducts, toggleBookmark } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

const BookmarkedProducts = () => {
    const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        const fetchBookmarkedProducts = async () => {
            try {
                const response = await getBookmarkedProducts();
                setBookmarkedProducts(response);
            } catch (error) {
                console.error('Error fetching bookmarked products:', error);
            }
        };

        fetchBookmarkedProducts();
    }, [forceUpdate]);

    const handleRemoveBookmark = async (product) => {
        try {
            const productId = product._id;
            const bookMarkToggle = !product.bookmarked;
            // Toggle bookmark in backend
            await toggleBookmark(productId, { bookmarked: bookMarkToggle });
            setForceUpdate(prevValue => prevValue + 1);
        } catch (error) {
            console.error('Error removing bookmark:', error);
        }
    };

    return (
        <div className="container">
            <h3>Bookmarked Products</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Bookmark</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarkedProducts && bookmarkedProducts.length > 0 ? (
                        bookmarkedProducts.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button onClick={() => handleRemoveBookmark(product)}>
                                        <FontAwesomeIcon
                                            icon={product.bookmarked ? fasHeart : farHeart}
                                            style={{ color: product.bookmarked ? 'blue' : 'black' }}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No bookmarked products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookmarkedProducts;
