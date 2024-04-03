import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/apiService'; // Import the API function to fetch a single product

const ProductDetails = () => {
  const { productId } = useParams(); // Get the productId from the URL params
  const [product, setProduct] = useState(null);

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

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      {product && (
        <div className="card" style={{ width: '400px', minHeight: '400px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
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
