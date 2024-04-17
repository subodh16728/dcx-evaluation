import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Features from "./Features";
import { Product, Feature } from "../utils/model";

const AddModify = () => {
  const { id } = useParams();
  console.log("id:", id)
  const navigate = useNavigate();

  const initialProductState: Product = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    features: [],
    bookmarked: false,
  };

  const [data, setData] = useState<Product>(initialProductState);
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:4000/api/products/${id}`);
          setData(response.data);
          setFeatures(response.data.features);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductById();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addFeature = () => {
    setFeatures([...features, { title: '', value: '' }]);
  };

  const handleChangeInChild = (index: number, name: string, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][name] = value;
    setFeatures(updatedFeatures);
  };

  const handleDeleteInChild = (index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:4000/api/products/${id}`, {
          ...data,
          features: features,
        });
        toast.success("Product updated successfully!");
      } else {
        await axios.post("http://localhost:4000/api/products", {
          ...data,
          features: features,
        });
        toast.success("Product added successfully!");
        
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save product. Please try again later.");
    }
  };

  return (
    <div className="form">
      <div className="formContainer">
            <h4>{id ? "Update Product" : "Add Product"}</h4>
      
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="product">
            <label className="form-label" htmlFor="name"><strong>Product Name</strong></label>
            <input value={data.name} name="name" onChange={handleChange} className="form-control" id="name" type="text" required/>
          </div>

          <div className="product">
            <label className="form-label" htmlFor="category">
              <strong>Category</strong>
            </label>
            <select
              id="category"
              className="form-control"
              name="category"
              value={data.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="jewelry">Jewelry</option>
              <option value="electronics">Electronics</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          <div className="product">
            <label className="form-label" htmlFor="price">
              <b>Product Price:</b>
            </label>
            <input name="price" onChange={handleChange} value={data.price?.toString()} className="form-control" id="price" type="number" min={1} required />
          </div>

          <div className="product">
            <label className="form-label" htmlFor="description">
              <strong>Description</strong>
            </label>
            <input name="description"
              onChange={handleChange} value={data.description} className="form-control" id="description" required/>
          </div>

          <div>
            <label className="form-label">
              <strong>{features.length >= 1 ? "Product Features" : ""}</strong>
            </label>
            {features.map((feature, index) => (
              <Features
                key={index}
                index={index}
                data={feature}
                onChange={handleChangeInChild}
                onDelete={handleDeleteInChild}
              />
            ))}
          </div>

          <div className="product">
            <div className="btnDiv">
                <button className="btn btn-outline-primary" onClick={addFeature} title="Add features">Add Features</button>
              
            </div>
          </div>

          <div className="btnDiv">
              <button type="submit" className="btn btn-success">Save</button>
              <button className="btn btn-secondary" title="Cancel" onClick={() => navigate("/dashboard")} >Cancel </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModify;
