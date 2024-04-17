"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const OfferList = () => {
    const [offers, setOffers] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        // Fetch offers data when component mounts
        fetchOffers();
    }, []);
    const fetchOffers = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get('http://localhost:4000/api/offers');
            setOffers(response.data);
        }
        catch (error) {
            console.error('Error fetching offers:', error);
        }
    });
    const handleSendEmail = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Iterate over offers and send email for each offer
            for (const offer of offers) {
                const emailText = `Offer Name: ${offer.offername}\nOffer Code: ${offer.offercode}\nStart Date: ${offer.startdate}\nEnd Date: ${offer.enddate}\nAdditional Text: Great deals...`;
                // Send email request to backend API
                yield axios_1.default.post('http://localhost:4000/api/sendemail', {
                    to: 'prathyushakukala114@gmail.com',
                    subject: `Offer Details: ${offer.offername}`,
                    text: emailText
                });
            }
            alert('Emails sent successfully!');
        }
        catch (error) {
            console.error('Error sending emails:', error);
            alert('Error sending emails. Please try again later.');
        }
    });
    return (<div className="offer-list">
      <h2>Offers</h2>
      <div className="card-container">
        {offers.map((offer) => (<div className="card" key={offer._id}>
            <h3>{offer.offername}</h3>
            <p><strong>Code:</strong> {offer.offercode}</p>
            <p><strong>Start Date:</strong> {offer.startdate}</p>
            <p><strong>End Date:</strong> {offer.enddate}</p>
          </div>))}
      </div>
      <button onClick={handleSendEmail}>Send</button>
    </div>);
};
exports.default = OfferList;
