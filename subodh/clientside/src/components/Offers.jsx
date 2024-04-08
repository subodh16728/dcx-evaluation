import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from "axios";
import Cookie from "js-cookie"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Offers = () => {

    const [data, setData] = useState([]);
    const token = Cookie.get("token")
    useEffect(() => {
        getOffers();
    }, [])

    // display all the offers
    const getOffers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/offers", { headers: { Authorization: `Bearer ${token}` } })
            setData(response.data)
        } catch (error) {
            toast.error("Cannot fetch offers. Try again")
        }
    }

    // get particular offer and send
    const handleOffer = async (offerID) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/offers/${offerID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const message = response.data.message
            toast.success(`${message}`)
        } catch (error) {
            toast.error("Please try again")
        }
    }

    return (
        <div className="container mb-5">
            <h1 className="text-center mt-4 mb-4">Latest Offers</h1>
            <Row xs={1} md={3} className="g-4">
                {data.map((item, index) => (
                    <Col key={index}>
                        <Card style={{ width: '18rem', height: '100%' }}>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <small className='text-muted'>Location: {item.location}</small>
                                    <small className='text-muted'>Expiry date: {item.expiry_date}</small>
                                </div>
                                <Button variant="primary" className='mt-3' onClick={() => handleOffer(item._id, index)}>Send Offer</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Offers;
