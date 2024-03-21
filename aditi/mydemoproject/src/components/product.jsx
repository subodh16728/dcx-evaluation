import React, { useState, useEffect } from "react";
import { getproducts, getsearchedProducts } from "../Service/productApiService";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Nav from "./navbar";
import { modifyById } from "../Service/userApiService";
import { toast } from "react-toastify";

const Product = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  let decodedToken = null;
  if (token) {
    decodedToken = jwtDecode(token);
  }
  
  const populateProduct = async () => {
    try {
      let receivedProduct = await getproducts();
      if (receivedProduct?.length > 0) {
        setData(receivedProduct);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const populateWishlistedProduct = async (id, data) => {
    try {
      let receivedProduct = await modifyById(id, data);
      console.log(receivedProduct);
      toast.success(receivedProduct.message,{autoClose:1000});
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.receivedProduct.message,{autoClose:1000});
    }
  };

  const searchedProducts = async (searchTerm) => {

    try {
      let receivedProduct = await getsearchedProducts(searchTerm);
        setData(receivedProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
}

  useEffect(() => {
    let timerOut = setTimeout ( () => {
      searchedProducts(searchTerm);
    },1000);
    return () => clearTimeout (timerOut);
  }, [searchTerm]);

  useEffect(() => {
    populateProduct();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortByName = () => {
    const sortedData = data;
    sortedData.sort((a, b) => {
      const nameA = a.productName.toLowerCase();
      const nameB = b.productName.toLowerCase();

      if (sortOrder === "ascending") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    setData(sortedData);
  };

  const handleBookmark = (data) => {
  
    if (!token) {
      toast.success("Please login first.",{autoClose:1000})
      navigate("/signin");
    }else{
      const productID = data._id;
      const userID = decodedToken._id;
      console.log(data);
      console.log(productID);
      populateWishlistedProduct(userID, { _id: productID });
    }
    
  };

  return (
    <>
      <div
        className="row"
        style={{
          minHeight: "100vh",
          backgroundImage: 'url("images/product1.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="w-50 mx-auto mt-5">
          <div className="shadow p-3 mb-5 bg-body-tertiary rounded my-auto">
            <p className="h4 text-white bg-secondary p-2 text-center">
              Product Table
            </p>
            <form className="d-flex" role="search">
              <input
                type="text"
                placeholder="Search for Product "
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="searchBox mx-auto"
              />
            </form>
            <div>
            {data.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th className="sorting-head" onClick={handleSortByName}>
                      P.Name {sortOrder === "ascending" ? "↑" : "↓"}
                    </th>
                    <th>P.Price</th>
                    <th>P.Category</th>
                    <th>Wishlist</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <NavLink to={`/productDetails/${product._id}`}>
                          {product.productName}
                        </NavLink>
                      </td>
                      <td>{product.productPrice}</td>
                      <td>{product.productCategory}</td>
                      <td className="text-center">
                        <a
                          href="#"
                          onClick={() => handleBookmark(product)}
                        >
                          <i
                            class={"bi bi-bookmark-heart-fill"}
                          ></i>
                        </a>
                      </td>
                      <td>
                        {product._id ? (
                          <NavLink to={`/product/modify/${product._id}`}>
                            <i className="bi bi-pencil-fill me-3"></i>
                          </NavLink>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              ) : (
                <p className="text-center mt-3">No items found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
