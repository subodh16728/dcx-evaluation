"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
require("../css/Product.css");
const ProductDetails = () => {
    const [productData, SetProductData] = (0, react_1.useState)({
        name: "",
        description: "",
        price: 0,
        category: "",
        features: []
    });
    const { id } = (0, react_router_dom_1.useParams)();
    // Fetching the user based on id
    (0, react_1.useEffect)(() => {
        axios_1.default.get(`http://localhost:4000/api/product/id/${id}`)
            .then((data) => {
            SetProductData(data.data);
        })
            .catch((err) => {
            console.log(err);
        });
    }, []);
    console.log(productData);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "product-container" }, { children: productData && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "product" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "header" }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h1", { children: "Product Details:" }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: `/addProduct/${id}` }, { children: (0, jsx_runtime_1.jsx)("i", { className: "fa fa-edit", title: "Edit Details" }) })) })] })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h2", { children: productData.name }), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "category" }, { children: ["Category: ", productData.category] })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "price" }, { children: ["Price: $", productData.price] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "description" }, { children: productData.description })), (0, jsx_runtime_1.jsx)("h5", { children: "Product Feature:" }), productData.features.map((dataItem, index) => ((0, jsx_runtime_1.jsx)("p", Object.assign({ className: "feature ms-5" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [dataItem.title, " : ", dataItem.value] }) }), index)))] }))) })));
};
exports.default = ProductDetails;
