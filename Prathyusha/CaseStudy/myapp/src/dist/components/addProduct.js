"use strict";
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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
require("bootstrap/dist/css/bootstrap.min.css");
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
const Features_1 = __importDefault(require("./Features"));
function ProductForm() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const token = localStorage.getItem("token");
    (0, react_1.useEffect)(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);
    const [data, setData] = (0, react_1.useState)({
        name: "",
        description: "",
        price: null,
        category: '',
        features: []
    });
    const [features, setFeatures] = (0, react_1.useState)([]);
    const changeHandler = (e) => {
        setData(Object.assign(Object.assign({}, data), { [e.target.name]: e.target.value }));
    };
    const addFeature = () => {
        setFeatures([...features, { title: '', value: '' }]);
    };
    const handleFeatureChange = (index, field, value) => {
        const updatedFeatures = [...data.features];
        updatedFeatures[index][field] = String(value);
        setFeatures(updatedFeatures);
    };
    const removeFeature = (index) => {
        const updatedFeatures = [...data.features];
        updatedFeatures.splice(index, 1);
        setFeatures(updatedFeatures);
    };
    const submitHandler = (e) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        try {
            const res = yield axios_1.default.post("http://localhost:4000/api/products", Object.assign(Object.assign({}, data), { features }));
            react_toastify_1.toast.success("Product added successfully");
            navigate('/dashboard');
        }
        catch (err) {
            console.error(err);
            console.log((_a = err.response) === null || _a === void 0 ? void 0 : _a.data);
            const errormessage = (_b = err.response) === null || _b === void 0 ? void 0 : _b.data;
            if (errormessage === "Product already exists") {
                react_toastify_1.toast.error("Product already exists");
            }
            else {
                console.error("Error:", err);
                react_toastify_1.toast.error("An error occurred. Please try again later.");
            }
        }
    });
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "vh-100 d-flex justify-content-center align-items-center" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "bg-white p-3 rounded w-50 scrollable-form-container" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { textAlign: "center" } }, { children: (0, jsx_runtime_1.jsx)("h3", { children: "Add New Products" }) })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: submitHandler }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "row container-fluid d-flex flex-row-reverse mt-3" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "btn btn-success -0", style: { width: "15%" } }, { children: "Save" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary me-2", onClick: () => navigate("/dashboard"), style: { width: "15%" } }, { children: "Cancel" }))] })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "name", className: "form-label" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "Product Name" }) })), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Enter Product Name", id: "name", autoComplete: "off", name: "name", onChange: changeHandler, className: "form-control rounded-0", required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "description", className: "form-label" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "Product Description" }) })), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Enter product description", id: "description", autoComplete: "off", name: "description", onChange: changeHandler, className: "form-control rounded-0", required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "price", className: "form-label" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "Product Price" }) })), (0, jsx_runtime_1.jsx)("input", { type: "number", placeholder: "Enter Price", id: "price", autoComplete: "off", name: "price", onChange: changeHandler, className: "form-control rounded-0", required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "category", className: "form-label" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "Category" }) })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ id: "category", name: "category", onChange: changeHandler, className: "form-control rounded-0", required: true }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "" }, { children: "Select a category" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "men's clothing" }, { children: "Men's Clothing" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "jewelery" }, { children: "Jewelery" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "electronics" }, { children: "Electronics" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "women's clothing" }, { children: "Women's Clothing" }))] }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-outline-primary", onClick: addFeature }, { children: "Features" })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), data.features.map((feature, index) => ((0, jsx_runtime_1.jsx)(Features_1.default, { index: index, title: feature.title, value: String(feature.value), onChange: (field, value) => handleFeatureChange(index, field, value), removeFeature: () => removeFeature(index), data: "" }, index)))] })] }))] })) })));
}
exports.default = ProductForm;
