import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OfferList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Fetch offers data when component mounts
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/offers');
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const handleSendEmail = async () => {
    try {
      // Iterate over offers and send email for each offer
      for (const offer of offers) {
        const emailText = `Offer Name: ${offer.offername}\nOffer Code: ${offer.offercode}\nStart Date: ${offer.startdate}\nEnd Date: ${offer.enddate}\nAdditional Text: Great deals...`;

        // Send email request to backend API
        await axios.post('http://localhost:4000/api/sendemail', {
          to: 'prathyushakukala114@gmail.com',
          subject: `Offer Details: ${offer.offername}`,
          text: emailText
        });
      }

      alert('Emails sent successfully!');
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Error sending emails. Please try again later.');
    }
  };

  return (
    <div className="offer-list">
      <h2>Offers</h2>
      <div className="card-container">
        {offers.map((offer) => (
          <div className="card" key={offer._id}>
            <h3>{offer.offername}</h3>
            <p><strong>Code:</strong> {offer.offercode}</p>
            <p><strong>Start Date:</strong> {offer.startdate}</p>
            <p><strong>End Date:</strong> {offer.enddate}</p>
          </div>
        ))}
      </div>
      <button onClick={handleSendEmail}>Send</button>
    </div>
  );
};

export default OfferList;
