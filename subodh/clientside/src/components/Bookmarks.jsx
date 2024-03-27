import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container"
import "bootstrap/dist/css/bootstrap.min.css"
import $ from 'jquery';
import 'tablesorter';
import axios from 'axios'
import Cookie from "js-cookie"

const Bookmarks = () => {
    const [productdata, setProductdata] = useState([])

    const token = Cookie.get("token")
    const userID = Cookie.get("userID")

    useEffect(() => {
        $("#sort-table").tablesorter();
        fetchBookmarks();
    }, []);

    const fetchBookmarks = async () => {

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

    const handleBookmark = async (data) => {
        const productID = data._id;

        try {
            await axios.post("http://localhost:5000/api/bookmarks/add", { userID: userID, products: [{ productID: productID }] }, { headers: { Authorization: `Bearer ${token}` } })
            fetchBookmarks();
        } catch (error) {
            console.log(error)
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
                                <tbody>
                                    <tr>
                                        <td colSpan={5} className='text-center'>No Bookmarks</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                </Container>
            </div>

        </>
    )
}

export default Bookmarks;