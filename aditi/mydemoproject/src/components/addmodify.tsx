import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postProduct, getProductById, modifyById } from "../Service/productApiService";
import { toast } from "react-toastify";
import Features from "./feature";
import "../css/addmodify.css";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {Products, Feature} from "../utils/models";

const AddModify = () => {
  const [data, setData] = useState<Products>({
    _id:"",
    name: "",
    description: "",
    price: "",
    category: "",
    features: [],
  });
  const [originalData, setOriginalData] = useState<Products>({
    _id:"",
    name: "",
    description: "",
    price: "",
    category: "",
    features: [],
  });
  const [features, setFeatures] = useState<Feature>({
    title: "",
    value: "",
  });

  const postData = async () => {
    try {
      let receivedProduct = await postProduct(data);
      toast.success("Product Added Successfully!", { autoClose: 1000 });
      navigate("/product");
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Product already availabe!", { autoClose: 1000 });
    }
  };

  const populateModifiedProduct = async (id: string, data: Products) => {
    try {
      let receivedProduct = await modifyById(id, data);
      if (!receivedProduct) {
        throw new Error("Failed to update product");
      }
      navigate("/product");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const populateProductById = async () => {
    try {
      let receivedProduct = await getProductById(id);
      setData(receivedProduct);
      setOriginalData(receivedProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const navigate = useNavigate();
  const { id } = useParams();

const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let newData = { ...data };
        let keyName: string = (e.target as HTMLInputElement).name;
        newData[keyName as keyof Omit<Products, "features">] = (e.target as HTMLInputElement).value; // newData.features = event.target.value
        setData(newData);
    }

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (id) {
        // Check if the data is modified
        const isDataModified =
          data.name !== originalData.name ||
          data.description !== originalData.description ||
          data.price !== originalData.price ||
          data.category !== originalData.category ||
          data.features !== originalData.features;

        if (isDataModified) {
          populateModifiedProduct(id, data);
        } else {
          toast.error("Update atleast any one filed.", { autoClose: 1000 });
          console.log("No changes made");
        }
      } else {
        postData();
      }
    } catch (error:any) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    try {
      if (id) {
        populateProductById();
      }
    } catch (error:any) {
      console.error("Error:", error.message);
    }
  }, []);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      toast.success("Please login first.", { toastId: "1", autoClose: 1000 });
      navigate("/signin");
    }
  }, []);

  const addFeature = () => {
    setData({
      ...data,
      features: [...data.features, features],
    });
    setFeatures({ title: "", value: "" });
  };

  const handleChangeInChild = (index:number, name:string, value:string) => {
    const updatedFeatures = [...data.features];
    updatedFeatures[index][name] = value;
    setData({ ...data, features: updatedFeatures });
  };

  const handleDeleteInChild = (index:number) => {
    const updatedFeatures = [...data.features];
    if (data.features.length === 1) {
      toast.success("Atleast one feature should be there.");
    } else {
      updatedFeatures.splice(index, 1);
    }

    setData({ ...data, features: updatedFeatures });
  };

  return (
    <>
      <div className="main">
        <div className="formContainer">
          <p className="pTag">
            <h4>{id ? "Update Product" : "Add Product"}</h4>
          </p>
          <form className="formField" onSubmit={handleSubmit}>
            <div className="fields">
              <div className="btnDiv">
                <OverlayTrigger
                  overlay={(props) => (
                    <Tooltip {...props}>Save product from here!</Tooltip>
                  )}
                  placement="top"
                >
                  <button type="submit" className="Btn">
                  {id ? " Save " : " Save "}
                </button>
                </OverlayTrigger>
                <OverlayTrigger
                  overlay={(props) => (
                    <Tooltip {...props}>Cancel change from here!</Tooltip>
                  )}
                  placement="top"
                >
                  <button
                  className="Btn me-2"
                  title="Cancel"
                  onClick={() => navigate("/product")}
                >
                  Cancel
                </button>
                </OverlayTrigger>
              </div>
              <label className="form-label" htmlFor="name">
                <b>Product Name :</b>
              </label>
              <input
                value={data.name}
                name="name"
                onChange={handleChange}
                className="form-control"
                id="name"
                type="text"
                required
              />
            </div>
            <div className=" fields">
              <label className="form-label" htmlFor="category">
                <b>Product Category :</b>
              </label>
              <select
                id="category"
                className="form-control"
                name="category"
                value={data.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category For Product</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="jewelery">Jewelry</option>
                <option value="electronics">Electronics</option>
                <option value="women's clothing">Women's Clothing</option>
              </select>
            </div>
            <div className=" fields">
              <label className="form-label" htmlFor="price">
                <b>Product Price :</b>
              </label>
              <input
                name="price"
                onChange={handleChange}
                value={data.price}
                className="form-control"
                id="price"
                type="number"
                min={1}
                required
              />
            </div>
            <div className="fields">
              <label className="form-label" htmlFor="description">
                <b>Product Description :</b>
              </label>
              <textarea
                name="description"
                onChange={handleChange}
                value={data.description}
                className="form-control"
                id="description"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="feature">
                <b>{data.features.length >= 1 ? "Product features" : ""}</b>
              </label>
              {data.features.map((dataItem, index) => {
                return (
                  <Features
                    key={index}
                    index={index}
                    data={dataItem}
                    onChange={handleChangeInChild}
                    onDelete={handleDeleteInChild}
                  />
                );
              })}
            </div>
            <div className=" fields">
              <div className="btnDiv">
                <OverlayTrigger
                  overlay={(props) => (
                    <Tooltip {...props}>Add Features from here!</Tooltip>
                  )}
                  placement="top"
                >
                  <button
                    className="featureBtn"
                    onClick={addFeature}
                    title="Add features"
                  >
                    Add Features
                  </button>
                </OverlayTrigger>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddModify;
