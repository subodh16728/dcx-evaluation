import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import "bootstrap/dist/css/bootstrap.min.css"
import { fetchProducts } from '../store/slice/getProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery';
import 'tablesorter';
import axios from 'axios';
import Cookie from "js-cookie"

const Dashboard = () => {

    const navigate = useNavigate()

    // authentication using jwt token
    const token = Cookie.get("token")
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])

    const [search, setSearch] = useState('')

    const dispatch = useDispatch()
    useEffect(() => {
        $("#sort-table").tablesorter();
        // let query = {}
        // if (showOnleB) {
        //     query.book = true
        // }
        dispatch(fetchProducts());
    }, []);

    const data = useSelector((state) => (
        state.api.data
    ))

    const params = useParams();
    const id = params.id

    const handleBookmark = (data) => {
        const productID = data._id
        const bookmarkToggle = !data.bookmarked
        console.log(productID)

        console.log("Data after click:", bookmarkToggle)

        const response = axios.put(`http://localhost:5000/api/products/edit/${productID}`, { bookmarked: bookmarkToggle })
            .then(() => {
                console.log("Response: ", response)
                dispatch(fetchProducts());
            })
            .catch((error) => {
                console.error("Error", error)
            })

    }

    const handleUpdate = (data) => {
        console.log(data);
    }

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
                            <Button variant="secondary"><NavLink className="nav-link active" to="/products/add">Add Product</NavLink></Button>
                        </InputGroup>
                    </Form>
                    <table id='sort-table' class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data.filter((item) => {
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
                                                    class={`bi ${item.bookmarked ? 'bi-bookmark-fill' : 'bi-bookmark'}`}
                                                ></i>
                                            </a>
                                            <NavLink
                                                className='text-dark'
                                                to={`/products/edit/${item._id}`}
                                                onClick={() => handleUpdate(item)}
                                            >
                                                <i class="bi bi-pencil-square ms-3"></i>
                                            </NavLink>
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

export default Dashboard