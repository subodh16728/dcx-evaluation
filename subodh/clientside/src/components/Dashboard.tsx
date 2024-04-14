import React, { useState, useEffect, useMemo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
// import $ from "jquery";
// import "tablesorter";
import axios from "axios";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash.debounce";
import { DefaultProductStructure, JwtHeader } from "../utils/model";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [productData, setProductData] = useState<DefaultProductStructure[]>([]);
  const token = Cookie.get("token");
  let userID: string;
  if (token) {
    const decodedToken: JwtHeader = jwtDecode(token);
    userID = decodedToken._id;
  }
  // TODO: Implement search functionality debounce using Vanilla JS
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  // TODO: Sort Functionality not working
  useEffect(() => {
    // $("#sort-table").tablesorter();
    fetchProducts();
  }, [searchQuery]);

  // Fetch all product details
  const fetchProducts = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/products?search=${searchQuery}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setProductData(response.data);
  };

  // Function to handle Bookmarks Add/Remove
  const handleBookmark = async (singleProduct: DefaultProductStructure) => {
    const productID = singleProduct._id;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookmarks/add",
        { userID: userID, products: [{ productID: productID }] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const bookmarkMessage = response.data.message;
      const bookMarkStatus = response.status;
      if (bookMarkStatus === 201) {
        toast.success(bookmarkMessage);
      } else {
        toast.info(bookmarkMessage);
      }
    } catch (error) {
      toast.error(`Error: Try again!`);
    }
  };

  // set Search query
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  // using debouce to reduce api calls
  const debouncedSearch = useMemo(() => {
    return debounce(handleChange, 250);
  }, []);

  return (
    <>
      <div className="container mt-5">
        <Container>
          <Form>
            <InputGroup className="my-3">
              <Form.Control
                type="text"
                onChange={debouncedSearch}
                placeholder="Search products..."
                className="me-1"
              />
              <Button variant="secondary">
                <NavLink className="nav-link active" to="/products/add">
                  Add Product
                </NavLink>
              </Button>
            </InputGroup>
          </Form>

          <table id="sort-table" className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {productData && productData.length > 0 ? (
              <tbody>
                {productData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td className="text-center">
                      <a
                        className="text-dark"
                        href="javascript:void(0)"
                        onClick={() => handleBookmark(item)}
                      >
                        <i className={`bi-bookmark`}></i>
                      </a>
                      <NavLink
                        className="text-dark"
                        to={`/products/edit/${item._id}`}
                      >
                        <i className="bi bi-pencil-square ms-3"></i>
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={5} className="text-center">
                    No Results
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </Container>
      </div>
      <Outlet />
    </>
  );
};

export default Dashboard;
