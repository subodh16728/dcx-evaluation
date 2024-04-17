import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { Offers1,Decode } from "../utils/model";
import "../components/CSS/Offers.css" 
export default function Offers() {
    let token = localStorage.getItem("token");
    const navigate = useNavigate();
 
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])


    const [offers, setOffers] = useState([]);
 
    // Decode the token to access its payload
    let decodedToken: Decode;
    if (token) {
        decodedToken = jwtDecode(token);
        console.log(typeof decodedToken);
        console.log("Email Id: "+ (decodedToken.email));
    }
    
 
    useEffect(() => {
        if (!token) {
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
 
 
 
    const sendEmail = (data:Offers1) => {
 
        try {
            axios.post("http://localhost:3000/api/myoffers/sendmail", { email: decodedToken.email, data })
                .then((test) => {
                    console.log(test);
                    
                    toast.success("Offers sent to your Gmail")
                }
                )
        }
        catch (err) {
            console.error(`Error in Sending mail: ${err}`);
            toast.error("Error in Sending Mail");
        }
    }
 
    

    
   

    return (
        <div className="offer-container">
            {/* <div className="offer-box" > */}
                {offers.map((offer:Offers1, index) => (
                    <div className="offer-box"  key={index}>
                        <h3>{offer.Title}</h3>
                        <p><strong>Description:</strong> {offer.Description}</p>
                        <p><strong>Discount:</strong> {offer.Discount}%</p>
                        <p><strong>Start Date:</strong> {offer.StartDate}</p>
                        <p><strong>End Date:</strong> {offer.EndDate}</p>
                        
                        <p><strong>Availability:</strong> {offer.Availability}</p>
                        <p><strong>Redemption Method:</strong> {offer.RedemptionMethod}</p>
                        <button className="order-button" onClick={() => sendEmail(offer)}>Send</button>
                    </div>
                ))}
            </div>
        
    );
}
