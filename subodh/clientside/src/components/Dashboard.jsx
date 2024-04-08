import React, { useState, useEffect, useMemo } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
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
import { jwtDecode } from "jwt-decode"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from "lodash.debounce";

const Dashboard = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')

    // authentication using jwt token
    const token = Cookie.get("token")
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
        return () => {
            debouncedSearch.cancel();
        }
    })

    useEffect(() => {
        dispatch(fetchProducts(search));
    }, [search]);

    const data = useSelector((state) => (
        state.api.data
    ))

    useEffect(() => {
        $("#sort-table").tablesorter();
    }, [data])

    const handleBookmark = async (data) => {
        const productID = data._id
        const decodedToken = jwtDecode(token)
        const userID = decodedToken._id

        try {
            const response = await axios.post("http://localhost:5000/api/bookmarks/add", { userID: userID, products: [{ productID: productID }] }, { headers: { Authorization: `Bearer ${token}` } })
            const bookmarkMessage = response.data.message
            const bookMarkStatus = response.status
            if (bookMarkStatus === 201) {
                toast.success(bookmarkMessage)
            } else {
                toast.info(bookmarkMessage)
            }

        } catch (error) {

        }
    }

    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    // using debouce to reduce api calls
    const debouncedSearch = useMemo(() => {
        return debounce(handleChange, 1000)
    }, [])

    return (
        <>

            <div className="container mt-5">
                <Container>
                    <Form>
                        <InputGroup className='my-3'>
                            <Form.Control type='text' onChange={debouncedSearch} placeholder='Search products...' className='me-1' />
                            <Button variant="secondary"><NavLink className="nav-link active" to="/products/add">Add Product</NavLink></Button>
                        </InputGroup>
                    </Form>

                    <table id='sort-table' className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        {data && data.length > 0 ? (
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                        <td className='text-center'>
                                            <a
                                                className='text-dark'
                                                href="javascript:void(0)"
                                                onClick={() => handleBookmark(item)}
                                            >
                                                <i className={`bi-bookmark`}></i>
                                            </a>
                                            <NavLink
                                                className='text-dark'
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
                                    <td colSpan={5} className='text-center'>No Results</td>
                                </tr>
                            </tbody>
                        )}</table>
                </Container>
            </div>
            <Outlet />
        </>
    )
}

export default Dashboard