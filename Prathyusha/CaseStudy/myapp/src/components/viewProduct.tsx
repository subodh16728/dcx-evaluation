import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/apiService'; 
import { Product } from '../utils/model';

const ProductDetails = () => {
  const { productId } = useParams(); // Get the productId from the URL params
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate(); // Access history object for navigation

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const receivedProduct = await getProductById(productId); // Fetch the product details using the productId
        setProduct(receivedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBack = () => {
    navigate('/dashboard'); // Navigate to the dashboard route
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: '60px', right: '300px' }}>
        <button className="btn btn-primary" onClick={handleBack}>Back</button>
      </div>
      {product && (
        <div className="card" style={{ width: '500px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <h3 className="card-title mb-4">{product.name}</h3>
            <p className="card-text mb-2"><strong>Description:</strong> {product.description}</p>
            <p className="card-text mb-2"><strong>Category:</strong> {product.category}</p>
            <p className="card-text mb-2"><strong>Price:</strong> {product.price}</p>
            <p className='card-text mb-2'><strong>Features:</strong>{product.features && product.features.length > 0 && (
              <div className="descriptions">
                {product.features.map((feature, index) => (
                  <p key={index}>
                    {feature.title}: {feature.value}
                  </p>
                ))}
              </div>
            )}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
