import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { getProductOffers } from "../Service/offerApiService";
import { sendEmailtoUser } from "../Service/emailApiService";
import "../css/offer.css"

export default function Offers() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [offers, setOffers] = useState([
    { tittle: "", description: "", discount: 0, startDate: "", endDate: "" },
  ]);

  let decodedToken = null;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  const populateOffers = async () => {
    const response = await getProductOffers();
    try {
      setOffers(response);
    } catch (error) {
      console.error(`Error fetching Offers: ${error}`);
    }
  };

  const sendEmail = async (data) => {
    const email = decodedToken.email;
    try {
      const receivedInfo = await sendEmailtoUser(email, data);
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
      toast.success("Please login first.", { toastId: "1", autoClose: 1000 });
      navigate("/signin");
    } else {
      populateOffers();
    }
  }, []);

  return (
    <>
        <div className="offerMain">
          <div className="offerContainer">
            <p className="Ptag">
              Available Offers
            </p>
            <div className="offerField">
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
      </>
  );
}
