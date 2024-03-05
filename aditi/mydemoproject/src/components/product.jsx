import React, { useState, useEffect } from "react";
import { getproducts } from "../Service/productApiService";
import { NavLink,Link } from "react-router-dom";
import Nav from "./navbar";

const Product = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");

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
    item.productName && item.productName.toLowerCase().includes(searchTerm.toLowerCase())||
      item.productCategory.some((category) =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

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
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="mx-auto"
              />
              <Link to="/product/add" className='btn btn-secondary me-auto float-end'>Add Product</Link>
            </form>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th onClick={handleSortByName}>
                      P.Name {sortOrder === "ascending" ? "↑" : "↓"}
                    </th>
                    <th>P.Price</th>
                    <th>P.Category</th>
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
