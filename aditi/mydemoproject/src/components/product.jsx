import React, { useState, useEffect } from "react";
import { getproducts } from "../Service/productApiService";
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

  const populateBookmarkedProduct = async (id, data) => {
    try {
      let receivedProduct = await modifyById(id, data);
      console.log(receivedProduct);
      if (receivedProduct) {
        populateProduct();
      }
      toast.success(receivedProduct.message);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.receivedProduct.message);
    }
  };

  useEffect(() => {
    populateProduct();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortByName = () => {
    const sortedData = filteredData;
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

  const filteredData = data.filter(
    (item) =>
      (item.productName &&
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.productCategory.some((category) =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleBookmark = (data) => {
  
    if (!token) {
      navigate("/signin");
    }else{
      const productID = data._id;
      const userID = decodedToken._id;
      console.log(data);
      console.log(productID);
      populateBookmarkedProduct(userID, { _id: productID });
    }
    
  };

  return (
    <>
      <Nav />
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
                placeholder="Search Product"
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="searchBox mx-auto"
              />
            </form>
            <div>
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
                  {filteredData.map((product) => (
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
                          {/* <i
                            class={`bi ${
                              product.productBookmarked
                                ? "bi-bookmark-heart-fill"
                                : "bi-bookmark-heart"
                            }`}
                          ></i> */}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
