import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Nav from "./navbar";
import { getProductOffers } from "../Service/offerApiService";
import { sendEmailtoUser } from "../Service/emailApiService";

export default function Offers() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [offers, setOffers] = useState([]);

  let decodedToken = null;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  const populateOffers = async () => {
    const response = await getProductOffers();
    try {
      console.log(response);
      setOffers(response);
    } catch (error) {
      console.error(`Error fetching Offers: ${error}`);
    }
  };

  useEffect(() => {
    populateOffers();
  }, []);

  const sendEmail = async (data) => {
    const email = decodedToken.email;
    try {
      const receivedInfo = await sendEmailtoUser(email, data);
      console.log("Data", receivedInfo);
      if (receivedInfo) {
        toast.success("Offers sent to your Gmail", { autoClose: 1000 });
      }
    } catch (err) {
      console.error(`Error in Sending mail: ${err}`);
      toast.error("Error in Sending Mail", { autoClose: 1000 });
    }
  };

  useEffect(() => {
    if (!token) {
      toast.success("Please login first.", { autoClose: 1000 });
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <div
        className="row"
        style={{
          minHeight: "100vh",
          backgroundImage: 'url("/images/product1.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="w-50 mx-auto mt-5">
          <div className="shadow p-3 mb-5 bg-body-tertiary rounded my-auto">
            <p className="h4 text-white bg-secondary p-2 text-center">
              Available Offers
            </p>
            <div className="ms-3">
              {offers &&
                offers.map((offer, index) => (
                  <div className="offer-box" key={index}>
                    <h3>{offer.tittle}</h3>
                    <p>
                      <strong>Description:</strong> {offer.description}
                    </p>
                    <p>
                      <strong>Discount:</strong> {offer.discount}%
                    </p>
                    <p>
                      <strong>Start Date:</strong> {offer.startDate}
                    </p>
                    <p>
                      <strong>End Date:</strong> {offer.endDate}
                    </p>
                    <button
                      className="order-button"
                      onClick={() => sendEmail(offer)}
                    >
                      Send
                    </button>
                    <hr />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
