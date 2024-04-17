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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const joi_1 = __importDefault(require("joi"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const axios_1 = __importDefault(require("axios"));
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const Features_1 = __importDefault(require("./Features"));
const Products = () => {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [errors, setErrors] = (0, react_1.useState)({});
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [feature] = (0, react_1.useState)({
        title: "",
        value: ""
    });
    const [data, setData] = (0, react_1.useState)({
        name: "",
        category: "",
        price: "",
        description: "",
        features: []
    });
    const params = (0, react_router_dom_1.useParams)();
    const id = params.id;
    const token = js_cookie_1.default.get("token");
    (0, react_1.useEffect)(() => {
        if (!token) {
            navigate("/login");
        }
        else if (id !== undefined) {
            handleProducts();
        }
    }, []);
    const productSchema = joi_1.default.object({
        name: joi_1.default.string().required(),
        category: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        description: joi_1.default.string().required(),
        features: joi_1.default.array().required(),
        createdAt: joi_1.default.any().strip(),
        updatedAt: joi_1.default.any().strip()
    });
    const AddFeature = () => {
        setData(Object.assign(Object.assign({}, data), { features: [...data.features, feature] }));
    };
    const handleChangeFeatures = (index, name, value) => {
        const updatedFeatures = [...data.features];
        updatedFeatures[index][name] = value;
        setData(Object.assign(Object.assign({}, data), { features: updatedFeatures }));
    };
    const handleDeleteFeatures = (index) => {
        const updatedFeatures = [...data.features];
        updatedFeatures.splice(index, 1);
        setData(Object.assign(Object.assign({}, data), { features: updatedFeatures }));
    };
    const handleCancel = () => {
        navigate("/dashboard");
    };
    const handleChange = (e) => {
        let newData = Object.assign({}, data);
        newData[e.target.name] = e.target.value;
        setData(newData);
    };
    const handleProducts = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`http://localhost:5000/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            const _a = response.data, { _id, __v, bookmarked } = _a, updatedData = __rest(_a, ["_id", "__v", "bookmarked"]);
            setData(updatedData);
        }
        catch (error) {
            console.error(error);
        }
    });
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (loading) {
            return;
        }
        const json = JSON.parse(JSON.stringify(data));
        json["bookmarked"] = false;
        const { error } = productSchema.validate(data, { abortEarly: true });
        if (error) {
            const valErr = {};
            error.details.forEach((err) => {
                valErr[err.path[0]] = err.message;
            });
            setErrors(valErr);
            console.log(valErr);
            return;
        }
        setLoading(true);
        try {
            if (id) {
                const response = yield axios_1.default.put(`http://localhost:5000/api/products/edit/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
                if (response.status === 204) {
                    react_toastify_1.toast.success("Product updated successfully");
                    navigate("/dashboard");
                }
            }
            else {
                const response = yield axios_1.default.post("http://localhost:5000/api/products/add", json, { headers: { Authorization: `Bearer ${token}` } });
                if (response.status === 201) {
                    react_toastify_1.toast.success("Product created successfully");
                    navigate('/dashboard');
                }
            }
        }
        catch (error) {
            react_toastify_1.toast.error("Product already exists");
        }
        finally {
            setLoading(false);
            setErrors({});
        }
    });
    return (<>
            <div className="container mt-2 mb-3 w-100">
                <form className='w-50 mx-auto p-4 shadow-lg' onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-between'>
                        <h2 className=''>Product details</h2>
                        <div className='w-50 d-flex justify-content-end'>
                            <button type="submit" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="product-btn">{loading ? 'Loading...' : (id ? 'Update Product' : 'Add Product')}</button>
                        </div>
                    </div>

                    <hr />
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={data.name} onChange={handleChange}/>
                        <small className="text-danger">{errors.name}</small>
                    </div>
                    <div className="mb-3 w-full">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className='form-control' name="category" id="category" value={data.category} onChange={handleChange}>
                            <option value="">Select Category For Product</option>
                            <option value="men's clothing">Men's Clothing</option>
                            <option value="jewelery">Jewelery</option>
                            <option value="electronics">Electronics</option>
                            <option value="women's clothing">Women's Clothing</option>
                        </select>
                        <small className="text-danger">{errors.category}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" name="price" value={data.price} min={1} step="any" onChange={handleChange}/>
                        <small className="text-danger">{errors.price}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea id="description" className="form-control" rows={6} cols={20} name="description" value={data.description} onChange={handleChange}></textarea>
                        <small className="text-danger">{errors.description}</small>
                    </div>



                    <div className='w-75 ms-auto'>
                        <button type="button" className="w-25 btn btn-outline-secondary ms-auto d-block feature-btn" onClick={AddFeature}>Add feature</button>
                    </div>
                    {data.features.map((dataItem, index) => {
            return <Features_1.default key={index} index={index} data={dataItem} onChange={handleChangeFeatures} onDelete={handleDeleteFeatures}/>;
        })}

                </form>
            </div>
        </>);
};
exports.default = Products;
