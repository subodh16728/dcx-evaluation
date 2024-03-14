import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import Header from "./Header";
export default function Offers() {
    let token = localStorage.getItem("token");

    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();
 
    // Decode the token to access its payload
    let decodedToken = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }
    console.log("Email Id: "+ decodedToken.email);
 
    useEffect(() => {
        if (!token) {
            toast.info("To see Latest Offers Please Login to you account", { toastId: "khandu" });
            navigate("/login")
        }
        const fetchOffers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/myoffers/all");
                setOffers(response.data);
                console.log(response.data);
 
 
            }
            catch (error) {
                console.error(`Error fetching Offers: ${error}`)
            }
        }
        fetchOffers();
    }, [])
 
 
 
    const sendEmail = (data) => {
 
        try {
            axios.post("http://localhost:3000/api/myoffers/sendmail", { email: decodedToken.email, data })
                .then((test) => {
                    console.log(test);
                    alert("Offers send to your Gmail, Check It")
                    toast.success("Offers sent to you Gmail")
                }
                )
        }
        catch (err) {
            console.error(`Error in Sending mail: ${err}`);
            toast.error("Error in Sending Mail");
        }
    }
 
 
 
 
    return (
        <>
        <Header/>
        <div class="row">

            
 
 
                {offers.map((offer, index) => (
 
                    <div className="offer-box col-4" key={index}>
                        <h3>{offer.Title}</h3>
                        <p><strong>Description:</strong> {offer.Description}</p>
                        <p><strong>Discount:</strong> {offer.Discount}%</p>
                        <p><strong>Start Date:</strong> {offer.StartDate}</p>
                        <p><strong>End Date:</strong> {offer.EndDate}</p>
                        <p><strong>Coupon Code:</strong> {offer.CouponCode}</p>
                        <p><strong>Availability:</strong> {offer.Availability}</p>
                        <p><strong>Redemption Method:</strong> {offer.RedemptionMethod}</p>
                        <button className="order-button" onClick={() => sendEmail(offer)}>Send</button>
                    </div>
 
                ))
                }
            </div>
          
            
 
        </>
    );
}