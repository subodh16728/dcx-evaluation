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
        price: "",
        category: '',
        features: []
    });
    const [features, setFeatures] = (0, react_1.useState)([]);
    const changeHandler = e => {
        setData(Object.assign(Object.assign({}, data), { [e.target.name]: e.target.value }));
    };
    const addFeature = () => {
        setFeatures([...features, { title: '', value: '' }]);
    };
    const handleFeatureChange = (index, field, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index][field] = value;
        setFeatures(updatedFeatures);
    };
    const removeFeature = index => {
        const updatedFeatures = [...features];
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
    return (<div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="bg-white p-3 rounded w-50 scrollable-form-container">
                <div style={{ textAlign: "center" }}><h3>Add New Products</h3></div>
                
                <form onSubmit={submitHandler}>
                <div className="row container-fluid d-flex flex-row-reverse mt-3">
                        <button type="submit" className="btn btn-success -0" style={{ width: "15%" }}>Save</button>
                        <button type="button" className="btn btn-secondary me-2" onClick={() => navigate("/dashboard")} style={{ width: "15%" }}>Cancel</button>
                    </div>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"><strong>Product Name</strong></label>
                            <input type="text" placeholder="Enter Product Name" id="name" autoComplete="off" name="name" onChange={changeHandler} className="form-control rounded-0" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label"><strong>Product Description</strong></label>
                            <input type="text" placeholder="Enter product description" id="description" autoComplete="off" name="description" onChange={changeHandler} className="form-control rounded-0" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label"><strong>Product Price</strong></label>
                            <input type="number" placeholder="Enter Price" id="price" autoComplete="off" name="price" onChange={changeHandler} className="form-control rounded-0" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label"><strong>Category</strong></label>
                            <select id="category" name="category" onChange={changeHandler} className="form-control rounded-0" required>
                                <option value="">Select a category</option>
                                <option value="men's clothing">Men's Clothing</option>
                                <option value="jewelery">Jewelery</option>
                                <option value="electronics">Electronics</option>
                                <option value="women's clothing">Women's Clothing</option>
                            </select>
                        </div>
                        <button type="button" className="btn btn-outline-primary" onClick={addFeature}>Features</button><br /><br />
                        {features.map((feature, index) => (<Features_1.default key={index} index={index} title={feature.title} value={feature.value} onChange={(field, value) => handleFeatureChange(index, field, value)} removeFeature={() => removeFeature(index)}/>))}
                    </div>   
                </form>
            </div>
        </div>);
}
exports.default = ProductForm;
