import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, putProduct } from '../services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // State variables
  const [product, setProduct] = useState({});
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [categories, setCategories] = useState([
    "men's clothing",
    "jewelry",
    "electronics",
    "women's clothing"
  ]);
  const [features, setFeatures] = useState([]);
  

  // Fetch product details when component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
        setUpdatedProduct({ ...fetchedProduct });
        setFeatures(fetchedProduct.features || []);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Handle changes in input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle changes in feature fields
  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
  };

  // Add a new feature
  const addFeature = () => {
    setFeatures([...features, { title: '', value: '' }]);
  };

  
  const removeFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedData = { ...updatedProduct, features };
      await putProduct(productId, updatedData);
      toast.success('Product updated successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Product</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            <input type="text" name="name" value={updatedProduct.name || ''} onChange={handleInputChange} className="form-control" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <input type="text" name="description" value={updatedProduct.description || ''} onChange={handleInputChange} className="form-control" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
          <div className="col-sm-10">
            <select name="category" value={updatedProduct.category || ''} onChange={handleInputChange} className="form-select">
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
          <div className="col-sm-10">
            <input type="text" name="price" value={updatedProduct.price || ''} onChange={handleInputChange} className="form-control" />
          </div>
        </div>
        {/* Feature fields */}
        <div className="mb-3">
          <button type="button" className="btn btn-outline-primary me-2" onClick={addFeature}>Add Feature</button>
          {features.map((feature, index) => (
            <div key={index} className="mb-2 row">
              <div className="col-sm-5">
                <input type="text" value={feature.title || ''} onChange={(e) => handleFeatureChange(index, 'title', e.target.value)} className="form-control me-2" />
              </div>
              <div className="col-sm-5">
                <input type="text" value={feature.value || ''} onChange={(e) => handleFeatureChange(index, 'value', e.target.value)} className="form-control me-2" />
              </div>
              <div className="col-sm-2">
                <button type="button" className="btn btn-danger" onClick={() => removeFeature(index)}>
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mb-3">
          <button type="submit" className="btn btn-success">Update</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
