"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
function ProductDetails() {
    const [productData, SetProductData] = (0, react_1.useState)([]);
    const { id } = (0, react_router_dom_1.useParams)();
    // Fetching the user based on id
    (0, react_1.useEffect)(() => {
        axios_1.default.get(`http://localhost:4000/api/product/id/${id}`)
            .then((data) => {
            console.log(data);
            SetProductData(data.data);
        })
            .catch((err) => {
            console.log(err);
        });
    }, []);
    return (<div className="product-container">
            {productData && (<div className="product shadow">
                    <h2>{productData.ProductName}</h2>
                    <p className="category">Category: {productData.category}</p>
                    <p className="price">Price: ${productData.price}</p>
                    <p className="seller">Seller: {productData.seller}</p>
                    <p className="description">{productData.description}</p>
                </div>)}
        </div>);
}
exports.default = ProductDetails;
