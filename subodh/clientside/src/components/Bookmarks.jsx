import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import "bootstrap/dist/css/bootstrap.min.css"
import $ from 'jquery';
import 'tablesorter';
import axios from 'axios'
import Cookie from "js-cookie"
import { jwtDecode } from "jwt-decode"

const Bookmarks = () => {
    const [productdata, setProductdata] = useState([])
    const navigate = useNavigate()
    const token = Cookie.get("token")
    useEffect(() => {
        if (token) {
            $("#sort-table").tablesorter();
            fetchBookmarks();
        }
        navigate("/login")

    }, []);

    const handleBookmark = async (data) => {

        const token = Cookie.get("token")
        const productID = data._id
        const decodedToken = jwtDecode(token)
        const userID = decodedToken._id

        try {
            const response = await axios.post("http://localhost:5000/api/bookmarks/add", { userID: userID, products: [{ productID: productID }] }, { headers: { Authorization: `Bearer ${token}` } })
            fetchBookmarks();
        } catch (error) {
            const err = error.response.data.message
            fetchBookmarks();
        }

    }

    const fetchBookmarks = async () => {
        const token = Cookie.get("token")
        const decodedToken = jwtDecode(token)
        const userID = decodedToken._id

        try {
            const response = await axios.get(`http://localhost:5000/api/bookmarks?userID=${userID}`, { headers: { Authorization: `Bearer ${token}` } })
            const bookmarks = response.data.products;
            const productRequests = bookmarks.map(async (item) => {
                const productResponse = await axios.get(`http://localhost:5000/api/products/id?productID=${item.productID}`, { headers: { Authorization: `Bearer ${token}` } });
                return productResponse.data;
            });

            const products = await Promise.all(productRequests);
            setProductdata(products);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>

            <div className="container mt-5">
                <Container>
                    {
                        productdata && productdata.length > 0 ? (
                            <table id='sort-table' class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Bookmarks</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        productdata && productdata.map((item, index) => (

                                            <tr key={index}>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td>{item.category}</td>
                                                <td>{item.price}</td>
                                                <td className='text-center'>
                                                    <a
                                                        className='text-dark'
                                                        href="javascript:void(0)"
                                                        onClick={() => handleBookmark(item)}
                                                    >
                                                        <i
                                                            class='bi-bookmark-fill'
                                                        ></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>) : (
                            <h1 className='text-center'>No Bookmarks</h1>
                        )}
                </Container>
            </div>

        </>
    )
}

export default Bookmarks