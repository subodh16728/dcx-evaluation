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
const Feature_1 = __importDefault(require("./Feature"));
function ProductForm() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id } = (0, react_router_dom_1.useParams)();
    const token = localStorage.getItem("token");
    const [data, setData] = (0, react_1.useState)({
        name: "",
        description: "",
        price: "",
        category: '',
        features: []
    });
    const [features, setFeatures] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        if (!token) {
            navigate("/login");
        }
        else if (id !== undefined) {
            handleProduct();
        }
    }, []);
    const handleProduct = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`http://localhost:3000/api/table/${id}`);
            const productData = response.data;
            setData(productData);
            setFeatures(productData.features || []); // Set features if they exist
        }
        catch (error) {
            console.error(error);
        }
    });
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
            const requestData = Object.assign(Object.assign({}, data), { features: features // Include updated features in the request
             });
            if (id) {
                const response = yield axios_1.default.put(`http://localhost:3000/api/table/update/${id}`, requestData);
                if (response.status === 200) {
                    react_toastify_1.toast.success("Product updated successfully");
                    navigate("/home");
                }
                else {
                    react_toastify_1.toast.error("Failed to update product");
                }
            }
            else {
                const response = yield axios_1.default.post("http://localhost:3000/api/table/add", requestData);
                if (response.status === 201) {
                    react_toastify_1.toast.success("Product created successfully");
                    navigate('/home');
                }
                else {
                    react_toastify_1.toast.error("Failed to create product");
                }
            }
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
                <form onSubmit={submitHandler}>
                    <div style={{ textAlign: "center" }}><h4>{id ? "Update Product" : "Add Product"}</h4></div>
                    <div className="row container-fluid d-flex flex-row-reverse mt-3">
                        <button type="submit" className="btn btn-success rounded-0" style={{ width: "15%" }}>{(id ? 'Update Product' : 'Add Product')}</button>
                        <button type="button" className="btn btn-secondary me-2" onClick={() => navigate("/home")} style={{ width: "15%" }}>Cancel</button>
                    </div>
                    <div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="name"><strong>Product Name</strong></label>
                                <input type="text" placeholder="Enter Product Name" id="name" autoComplete="off" name="name" value={data.name} onChange={changeHandler} required className="form-control rounded-0"/>
                            </div>
                            <div className="col">
                                <label htmlFor="description"><strong>Product Description</strong></label>
                                <textarea type="text" required placeholder="Enter product description" id="description" autoComplete="off" value={data.description} name="description" onChange={changeHandler} className="form-control rounded-0"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="price"><strong>Product Price</strong></label>
                                <input type="Number" min="0" placeholder="Enter Price" required id="price" autoComplete="off" value={data.price} name="price" onChange={changeHandler} className="form-control rounded-0"/>
                            </div>
                            <div className="col">
                                <label htmlFor="category"><strong>Category</strong></label>
                                <select id="category" name="category" value={data.category} onChange={changeHandler} required className="form-control rounded-0">
                                    <option value="">Select a category</option>
                                    <option value="men's clothing">Men's Clothing</option>
                                    <option value="jewelery">Jewelery</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="women's clothing">Women's Clothing</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary" required onClick={addFeature}>Add Feature</button><br /><br />
                        {features.map((feature, index) => (<Feature_1.default key={index} index={index} title={feature.title} value={feature.value} onChange={(field, value) => handleFeatureChange(index, field, value)} removeFeature={() => removeFeature(index)}/>))}
                    </div>
                </form>
            </div>
        </div>);
}
exports.default = ProductForm;
