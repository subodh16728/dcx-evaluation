import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import "bootstrap/dist/css/bootstrap.min.css"
import { fetchProducts } from '../store/slice/getProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery';
import 'tablesorter';
import axios from 'axios'

const Bookmarks = () => {
    const [search, setSearch] = useState('')
    const [productdata, setProductdata] = useState([])

    useEffect(() => {
        $("#sort-table").tablesorter();
    }, []);

    const handleBookmark = (data) => {
        const productID = data._id
        const bookmarkToggle = !data.bookmarked
        console.log(productID)

        console.log("Data after click:", bookmarkToggle)

        const response = axios.put(`http://localhost:5000/api/products/edit/${productID}`, { bookmarked: bookmarkToggle })
            .then((data) => {
                console.log("Response: ", data)
            })
            .catch((error) => {
                console.error("Error", error)
            })

    }

    useEffect(() => {
        const response = axios.get("http://localhost:5000/api/products/bookmarks")
            .then((data) => {
                console.log("Data data is", response, data.data)
                setProductdata(data.data)
                console.log(data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [productdata])

    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <>

            <div className="container mt-5">
                <Container>
                    <Form>
                        <InputGroup className='my-3'>
                            <Form.Control onChange={handleChange} placeholder='Search products' className='me-1' />
                            {/* <Button variant="secondary"><NavLink className="nav-link active" to="/product/add">Add Product</NavLink></Button> */}
                        </InputGroup>
                    </Form>
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
                                productdata && productdata.filter((item) => {
                                    return search.toLowerCase() === "" ? item : item.category.toLowerCase().includes(search)
                                }).map((item, index) => (

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
                    </table>
                </Container>
            </div>

        </>
    )
}

export default Bookmarks