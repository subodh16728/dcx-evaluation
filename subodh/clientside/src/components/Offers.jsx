import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from "axios";
import Cookie from "js-cookie"
import { useNavigate } from 'react-router-dom';

const Offers = () => {

    // authentication using jwt token
    const navigate = useNavigate();
    const token = Cookie.get("token")
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/offers")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleOffer = (offerID, index) => {
        axios.get(`http://localhost:5000/api/offers/${offerID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                // alert("Data")
                console.log("Data", response.data)
                alert("Offer sent successfully")
                setData(prevData => {
                    const newData = [...prevData];
                    newData[index].isSent = true;
                    return newData;
                });
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
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
                                {
                                    item.isSent ?
                                        <Button variant="primary" className='mt-3' disabled>Already sent</Button> :
                                        <Button variant="primary" className='mt-3' onClick={() => handleOffer(item._id, index)}>Send Offer</Button>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Offers;
