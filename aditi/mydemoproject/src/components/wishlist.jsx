import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Nav from "./navbar";
import { jwtDecode } from "jwt-decode";
import { modifyById } from "../Service/userApiService";
import { getWishlistedProducts } from "../Service/userApiService";
import { toast } from "react-toastify";

const WishList = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [userID, setUserID] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.success("Please login first.",{autoClose:1000})
      navigate("/signin");
    } else {
      const decodedToken = jwtDecode(token);
      const userID = decodedToken._id;
      setUserID(userID);
      populateWishlist(userID);
    }
  }, [token]);

  const populateWishlist = async (userID) => {
    try {
      let receivedProduct = await getWishlistedProducts(userID);
      console.log("total products: ", receivedProduct.wishlist);
      setData(receivedProduct.wishlist);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const populateWishlistedProduct = async (id, data) => {
    try {
      let receivedProduct = await modifyById(id, data);
      console.log(receivedProduct);
      if (receivedProduct) {
        populateWishlist(userID);
      }
      toast.success(receivedProduct.message,{autoClose:1000});
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.receivedProduct.message,{autoClose:1000});
    }
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
    const productID = data._id;
    console.log(data);
    console.log(productID);
    populateWishlistedProduct(userID, { _id: productID });
  };

  return (
    <>
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
        <div className="w-50 mx-auto mt-5">
          <div className="shadow p-3 mb-5 bg-body-tertiary rounded my-auto">
            <p className="h4 text-white bg-secondary p-2 text-center">
              Your Wishlist
            </p>
            {data.length > 0 ? (
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
                        <td>
                          <a href="#" onClick={() => handleBookmark(product)}>
                            <i className="bi bi-bookmark-heart-fill"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="ms-4">
                <img src="/images/NoWishlist.png" alt="wishlist" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
