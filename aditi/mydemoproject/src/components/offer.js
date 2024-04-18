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
const react_router_dom_1 = require("react-router-dom");
require("react-toastify/dist/ReactToastify.css");
const react_toastify_1 = require("react-toastify");
const jwt_decode_1 = require("jwt-decode");
const navbar_1 = __importDefault(require("./navbar"));
const offerApiService_1 = require("../Service/offerApiService");
const emailApiService_1 = require("../Service/emailApiService");
function Offers() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    let token = localStorage.getItem("token");
    const [offers, setOffers] = (0, react_1.useState)([]);
    let decodedToken = null;
    if (token) {
        decodedToken = (0, jwt_decode_1.jwtDecode)(token);
    }
    const populateOffers = () => __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, offerApiService_1.getProductOffers)();
        try {
            console.log(response);
            setOffers(response);
        }
        catch (error) {
            console.error(`Error fetching Offers: ${error}`);
        }
    });
    (0, react_1.useEffect)(() => {
        populateOffers();
    }, []);
    const sendEmail = (data) => __awaiter(this, void 0, void 0, function* () {
        const email = decodedToken.email;
        try {
            const receivedInfo = yield (0, emailApiService_1.sendEmailtoUser)(email, data);
            console.log("Data", receivedInfo);
            if (receivedInfo) {
                react_toastify_1.toast.success("Offers sent to your Gmail", { autoClose: 1000 });
            }
        }
        catch (err) {
            console.error(`Error in Sending mail: ${err}`);
            react_toastify_1.toast.error("Error in Sending Mail", { autoClose: 1000 });
        }
    });
    (0, react_1.useEffect)(() => {
        if (!token) {
            react_toastify_1.toast.success("Please login first.", { autoClose: 1000 });
            navigate("/signin");
        }
    }, []);
    return (<>
      <div className="row" style={{
            minHeight: "100vh",
            backgroundImage: 'url("/images/product1.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            display: "flex",
            flexDirection: "column",
        }}>
        <div className="w-50 mx-auto mt-5">
          <div className="shadow p-3 mb-5 bg-body-tertiary rounded my-auto">
            <p className="h4 text-white bg-secondary p-2 text-center">
              Available Offers
            </p>
            <div className="ms-3">
              {offers &&
            offers.map((offer, index) => (<div className="offer-box" key={index}>
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
                    <button className="order-button" onClick={() => sendEmail(offer)}>
                      Send
                    </button>
                    <hr />
                  </div>))}
            </div>
          </div>
        </div>
      </div>
    </>);
}
exports.default = Offers;
