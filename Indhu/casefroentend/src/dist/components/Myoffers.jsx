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
const react_router_1 = require("react-router");
const axios_1 = __importDefault(require("axios"));
require("react-toastify/dist/ReactToastify.css");
const react_toastify_1 = require("react-toastify");
const jwt_decode_1 = require("jwt-decode");
function Offers() {
    let token = localStorage.getItem("token");
    const navigate = (0, react_router_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);
    const [offers, setOffers] = (0, react_1.useState)([]);
    // Decode the token to access its payload
    let decodedToken;
    if (token) {
        decodedToken = (0, jwt_decode_1.jwtDecode)(token);
        console.log(typeof decodedToken);
        console.log("Email Id: " + (decodedToken.email));
    }
    (0, react_1.useEffect)(() => {
        if (!token) {
            navigate("/login");
        }
        const fetchOffers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get("http://localhost:3000/api/myoffers/all");
                setOffers(response.data);
                console.log(response.data);
            }
            catch (error) {
                console.error(`Error fetching Offers: ${error}`);
            }
        });
        fetchOffers();
    }, []);
    const sendEmail = (data) => {
        try {
            axios_1.default.post("http://localhost:3000/api/myoffers/sendmail", { email: decodedToken.email, data })
                .then((test) => {
                console.log(test);
                react_toastify_1.toast.success("Offers sent to your Gmail");
            });
        }
        catch (err) {
            console.error(`Error in Sending mail: ${err}`);
            react_toastify_1.toast.error("Error in Sending Mail");
        }
    };
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
    return (<div className="row mx-auto">
            <div className="row">
                {offers.map((offer, index) => (<div className="offer-box col-3" style={offerBoxStyle} key={index}>
                        <h3>{offer.Title}</h3>
                        <p><strong>Description:</strong> {offer.Description}</p>
                        <p><strong>Discount:</strong> {offer.Discount}%</p>
                        <p><strong>Start Date:</strong> {offer.StartDate}</p>
                        <p><strong>End Date:</strong> {offer.EndDate}</p>
                        
                        <p><strong>Availability:</strong> {offer.Availability}</p>
                        <p><strong>Redemption Method:</strong> {offer.RedemptionMethod}</p>
                        <button onClick={() => sendEmail(offer)}>Send</button>
                    </div>))}
            </div>
        </div>);
}
exports.default = Offers;
