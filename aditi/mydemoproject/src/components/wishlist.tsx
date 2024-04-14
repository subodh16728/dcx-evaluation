import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { modifyById } from "../Service/userApiService";
import { getWishlistedProducts } from "../Service/userApiService";
import { toast } from "react-toastify";
import { MyData, Products } from "../utils/models";
import "../css/wishlist.css"

const WishList = () => {
  const [data, setData] = useState<Products[]>([
    {
      _id:"",
      name: "",
      description: "",
      price: "",
      category: "",
      features: [],
    },
  ]);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [userID, setUserID] = useState<string>("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let decodedToken:{_id:string};

  useEffect(() => {
    if (!token) {
      toast.success("Please login first.",{toastId:'1',autoClose:1000})
      navigate("/signin");
    } else {
      decodedToken = jwtDecode(token);
      setUserID(decodedToken._id);
      populateWishlist(decodedToken._id);
    }
  }, [token]);

  const populateWishlist = async (userID:string) => {
    try {
      let receivedProduct = await getWishlistedProducts(userID);
      setData(receivedProduct.wishlist);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const populateWishlistedProduct = async (id:string, data:MyData) => {
    try {
      let receivedProduct = await modifyById(id, data);
      if (receivedProduct) {
        populateWishlist(userID);
      }
      toast.success(receivedProduct.message,{autoClose:1000});
    } catch (error:any) {
      console.error("Error fetching products:", error);
      toast.error(error.receivedProduct.message,{autoClose:1000});
    }
  };

  const handleSortByName = () => {
    const sortedData = data;
    sortedData.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (sortOrder === "ascending") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    setData(sortedData);
  };

  const handleBookmark = (data:Products) => {
    const productID = data._id;
    populateWishlistedProduct(userID, { _id: productID });
  };

  return (
    <>
        <div className="wishlistMain">
          <div className="wishlistContainer">
            <p className="Ptag">
              Your Wishlist
            </p>
            {data.length > 0 ? (
              <div className="wishlistFormField">
                <table className="table table-striped">
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
                          <NavLink className="name" to={`/productDetails/${product._id}`}>
                            {product.name}
                          </NavLink>
                        </td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>
                        <a
                            href="javaScript:void(0)"
                            onClick={() => handleBookmark(product)}
                          >
                            <i className={"bi bi-bag-heart ms-4"}></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <img src="/images/NoWishlist.png" alt="wishlist" width={700} height={450}  />
              </div>
            )}
          </div>
        </div>
    </>
  );
};

export default WishList;
