import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { Offers1,Decode } from "../utils/model";
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
 
    const offerBoxStyle = {
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "20px",
        margin: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
    };

    const buttonStyle = {
        backgroundColor: "#4CAF50",
        border: "none",
        color: "white",
        padding: "10px 20px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px"
    };

    return (
        <div className="row mx-auto">
            <div className="row">
                {offers.map((offer:Offers1, index) => (
                    <div className="offer-box col-3" style={offerBoxStyle} key={index}>
                        <h3>{offer.Title}</h3>
                        <p><strong>Description:</strong> {offer.Description}</p>
                        <p><strong>Discount:</strong> {offer.Discount}%</p>
                        <p><strong>Start Date:</strong> {offer.StartDate}</p>
                        <p><strong>End Date:</strong> {offer.EndDate}</p>
                        
                        <p><strong>Availability:</strong> {offer.Availability}</p>
                        <p><strong>Redemption Method:</strong> {offer.RedemptionMethod}</p>
                        <button onClick={() => sendEmail(offer)}>Send</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
