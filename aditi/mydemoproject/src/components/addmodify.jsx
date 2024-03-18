import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postProduct } from "../Service/productApiService";
import Nav from "./navbar";
import {toast} from "react-toastify";
import { modifyById } from "../Service/productApiService";
import { getProductById } from "../Service/productApiService";

const AddModify = () => {
  const [data, setData] = useState({});
  const [originalData,setOriginalData]=useState({});

  const postData = async () => {
    try {
      let receivedProduct = await postProduct(data);
      console.log(receivedProduct);
      navigate("/product");
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Product already availabe!");
    }
  };

  const populateModifiedProduct = async (id, data) => {
    try {
      console.log("ID:", id);
      console.log("Data:", data);
      let receivedProduct = await modifyById(id, data);
      console.log(receivedProduct);
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
      console.log(receivedProduct)
      setData(receivedProduct);
      setOriginalData(receivedProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.name);
    console.log(event.target.value);

    let newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (id) {
        // Check if the data is modified
        const isDataModified =
          data.productName !== originalData.productName ||
          data.productImageUrl !== originalData.productImageUrl ||
          data.productDiscription !== originalData.productDiscription ||
          data.productPrice !== originalData.productPrice ||
          data.productCategory !== originalData.productCategory;
  
        if (isDataModified) {
          populateModifiedProduct(id, data);
        } else {
          toast.error("update atleast any one filed.")
          console.log("No changes made");
        }
      } else {
        postData();
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  

  useEffect(() => {
    try {
      if (id) {
        populateProductById();
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }, []);

 const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <Nav />
      <div
        className="row"
        style={{
          minHeight: "100vh",
          backgroundImage: 'url("/images/product1.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="w-50 mx-auto mt-3">
          <div className=" shadow p-3 bg-body-tertiary rounded mx-auto my-auto">
            <p className="h4 text-white bg-secondary p-2 text-center">
              {id ? "Update Product" : "Add Product"}
            </p>
            <form
              className=" border border-secondary p-3  "
              onSubmit={handleSubmit}
            >
              <div className="mb-2">
                <label className="form-label" htmlFor="productName">
                  <b>Product Name</b>
                </label>
                <input
                  value={data.productName}
                  name="productName"
                  onChange={handleChange}
                  className="form-control"
                  id="productName"
                  type="text"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label" htmlFor="productImageUrl">
                  <b>Product Images</b>
                </label>
                <input
                  onChange={handleChange}
                  name="productImageUrl"
                  className="form-control"
                  id="productImageUrl"
                  type="file"
                  accept="image/*"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label" htmlFor="productDiscription">
                  <b>Product Description</b>
                </label>
                <input
                  name="productDiscription"
                  onChange={handleChange}
                  value={data.productDiscription}
                  className="form-control"
                  id="productDiscription"
                  type="text"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label" htmlFor="productCategory">
                  <b>Product Category</b>
                </label>
                <input
                  name="productCategory"
                  onChange={handleChange}
                  value={data.productCategory}
                  className="form-control"
                  id="productCategory"
                  type="text"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="productPrice">
                  <b>Product Price</b>
                </label>
                <input
                  name="productPrice"
                  onChange={handleChange}
                  value={data.productPrice}
                  className="form-control"
                  id="productPrice"
                  type="number"
                  min={1}
                  required
                />
              </div>
              <div className="container-fluid d-flex flex-row-reverse ">
                <button type="submit" className="btn btn-secondary">
                  {id ? "Update Product" : "Add Product"}
                </button>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/product")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddModify;
