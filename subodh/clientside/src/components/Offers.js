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
const react_bootstrap_1 = require("react-bootstrap");
const axios_1 = __importDefault(require("axios"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const Offers = () => {
    const [data, setData] = (0, react_1.useState)([]);
    const token = js_cookie_1.default.get("token");
    (0, react_1.useEffect)(() => {
        getOffers();
    }, []);
    // display all the offers
    const getOffers = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get("http://localhost:5000/api/offers", { headers: { Authorization: `Bearer ${token}` } });
            setData(response.data);
        }
        catch (error) {
            react_toastify_1.toast.error("Cannot fetch offers. Try again");
        }
    });
    // get particular offer and send
    const handleOffer = (offerID) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`http://localhost:5000/api/offers/${offerID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const message = response.data.message;
            react_toastify_1.toast.success(`${message}`);
        }
        catch (error) {
            react_toastify_1.toast.error("Please try again");
        }
    });
    return (<div className="container mb-5">
            <h1 className="text-center mt-4 mb-4">Latest Offers</h1>
            <react_bootstrap_1.Row xs={1} md={3} className="g-4">
                {data.map((item, index) => (<react_bootstrap_1.Col key={index}>
                        <react_bootstrap_1.Card style={{ width: '18rem', height: '100%' }}>
                            <react_bootstrap_1.Card.Body>
                                <react_bootstrap_1.Card.Title>{item.title}</react_bootstrap_1.Card.Title>
                                <react_bootstrap_1.Card.Text>{item.description}</react_bootstrap_1.Card.Text>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <small className='text-muted'>Location: {item.location}</small>
                                    <small className='text-muted'>Expiry date: {item.expiry_date}</small>
                                </div>
                                <react_bootstrap_1.Button variant="primary" className='mt-3' onClick={() => handleOffer(item._id, index)}>Send Offer</react_bootstrap_1.Button>
                            </react_bootstrap_1.Card.Body>
                        </react_bootstrap_1.Card>
                    </react_bootstrap_1.Col>))}
            </react_bootstrap_1.Row>
        </div>);
};
exports.default = Offers;
