import React, { useState, useEffect } from "react";
import { getproducts, getsearchedProducts } from "../Service/productApiService";
import { NavLink, useNavigate } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { modifyById } from "../Service/userApiService";
import { toast } from "react-toastify";
import "../css/product.css";
import { MyData, Products } from "../utils/models";

const Product = () => {
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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  let decodedToken: {_id:string} | null = null;
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

  const populateWishlistedProduct = async (id:string, data:MyData) => {
    try {
      let receivedProduct = await modifyById(id, data);
      toast.success(receivedProduct.message, { autoClose: 1000 });
    } catch (error:any) {
      console.error("Error fetching products:", error);
      toast.error(error.receivedProduct.message, { autoClose: 1000 });
    }
  };

  const searchedProducts = async (searchTerm:string) => {
    try {
      let receivedProduct = await getsearchedProducts(searchTerm);
      setData(receivedProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      searchedProducts(searchTerm);
    }, 1000);
    return () => clearTimeout(timerOut);
  }, [searchTerm]);

  useEffect(() => {
    populateProduct();
  }, []);

  const handleSearchInputChange = (event:React.FormEvent<HTMLInputElement>) => {
    setSearchTerm((event.target as HTMLInputElement).value);
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
  let userID:string;
  const handleBookmark = (data: Products) => {
    if (!token) {
      toast.success("Please login first.", { autoClose: 1000 });
      navigate("/signin");
    } else {
      const productID = data._id;

      if(decodedToken){
      userID = decodedToken._id;
    }
      populateWishlistedProduct(userID, { _id: productID });
    }
  };

  return (
    <>
      <div className="productMain">
        <div className="productContainer">
          <p className="Ptag">Product Table</p>
          <form className="d-flex" role="search">
            <input
              type="text"
              placeholder="Search for Product "
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="searchBox"
            />
          </form>
          <div className="productFormField">
            <table className="table table-striped">
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
              {data.length > 0 ? (
                <tbody>
                  {data.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <NavLink
                          className="name"
                          to={`/productDetails/${product._id}`}
                        >
                          <p>{product.name}</p>
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
                      <td>
                        {token ? (
                          <NavLink to={`/product/modify/${product._id}`}>
                            <i className="bi bi-pencil-fill"></i>
                          </NavLink>
                        ) : (
                          <NavLink to="/signin">
                            <i className="bi bi-pencil-fill"></i>
                          </NavLink>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5}>
                      <p className="text-center mt-3">No items found.</p>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
