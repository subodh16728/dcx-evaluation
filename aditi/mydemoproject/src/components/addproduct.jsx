import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postProduct } from "../Service/productApiService";
import Nav from "./navbar";

const AddProduct = () => {
  const [data, setData] = useState({
    productName: "",
    productImageUrl: "",
    productDiscription: "",
    productPrice: 0,
    productCategory: "",
  });

  const postData = async () => {
    try {
      let receivedProduct = await postProduct(data);
      console.log(receivedProduct);
      window.alert("Added new product successfully!");
      navigate("/product");
    } catch (error) {
        window.alert("Product already availabe!");
      console.error("Error fetching products:", error);
    }
  };

  const navigate = useNavigate();

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
    postData();
  };

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
              Add Product
            </p>
          {/* <hr /> */}
          <form className=" border border-secondary p-3  " onSubmit={handleSubmit}>
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
                value={data.productImageUrl}
                className="form-control"
                id="productImageUrl"
                type="string"
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label" htmlFor="productDiscription">
                <b>Product Discription</b>
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
            <div className="d-grid gap-2">
                <input type="submit" className="btn btn-secondary" />
              </div>
          </form>
        </div>
        </div>
        </div>
    </>
  );
};

export default AddProduct;
