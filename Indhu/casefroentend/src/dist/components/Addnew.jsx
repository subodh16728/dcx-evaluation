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
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const react_toastify_1 = require("react-toastify");
const feature_1 = __importDefault(require("./feature"));
const Tooltip_1 = __importDefault(require("react-bootstrap/Tooltip"));
const OverlayTrigger_1 = __importDefault(require("react-bootstrap/OverlayTrigger"));
const AddModify = () => {
    const [data, setData] = (0, react_2.useState)({
        name: "",
        description: "",
        price: "",
        category: "",
        features: [],
    });
    const [originalData, setOriginalData] = (0, react_2.useState)({
        name: "",
        description: "",
        price: "",
        category: "",
        features: [],
    });
    const [features, setFeatures] = (0, react_2.useState)({
        title: "",
        value: "",
    });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id } = (0, react_router_dom_1.useParams)();
    const postData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let receivedProduct = yield axios_1.default.post("http://localhost:3000/api/table/add", data);
            react_toastify_1.toast.success("Product Added Successfully!", { autoClose: 1000 });
            navigate("/home");
        }
        catch (error) {
            console.error("Error fetching products:", error);
            react_toastify_1.toast.error("Product already availabe!", { autoClose: 1000 });
        }
    });
    const populateModifiedProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let receivedProduct = yield axios_1.default.put(`http://localhost:3000/api/table/update/${id}`, data);
            if (!receivedProduct) {
                throw new Error("Failed to update product");
            }
            navigate("/home");
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    });
    const populateProductById = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let receivedProduct = yield axios_1.default.get(`http://localhost:3000/api/table/${id}`);
            setData(receivedProduct.data);
            console.log("after setting data: ", data);
            setOriginalData(receivedProduct.data);
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    });
    const handleChange = (e) => {
        let newData = Object.assign({}, data);
        let keyName = e.target.name;
        newData[keyName] = e.target.value; // newData.features = event.target.value
        setData(newData);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            if (id) {
                // Check if the data is modified
                const isDataModified = data.name !== originalData.name ||
                    data.description !== originalData.description ||
                    data.price !== originalData.price ||
                    data.category !== originalData.category ||
                    data.features !== originalData.features;
                if (isDataModified) {
                    populateModifiedProduct(id, data);
                }
                else {
                    react_toastify_1.toast.error("Update atleast any one filed.", { autoClose: 1000 });
                    console.log("No changes made");
                }
            }
            else {
                postData();
            }
        }
        catch (error) {
            // console.error("Error:", error.message);
        }
    };
    (0, react_2.useEffect)(() => {
        try {
            if (id) {
                populateProductById();
            }
        }
        catch (error) {
            console.error("Error:", error.message);
        }
    }, []);
    const token = localStorage.getItem("token");
    (0, react_2.useEffect)(() => {
        if (!token) {
            react_toastify_1.toast.success("Please login first.", { toastId: "1", autoClose: 1000 });
            navigate("/login");
        }
    }, []);
    const addFeature = () => {
        setData(Object.assign(Object.assign({}, data), { features: [...data.features, features] }));
        setFeatures({ title: "", value: "" });
    };
    const handleChangeInChild = (index, name, value) => {
        const updatedFeatures = [...data.features];
        updatedFeatures[index][name] = value;
        setData(Object.assign(Object.assign({}, data), { features: updatedFeatures }));
    };
    const handleDeleteInChild = (index) => {
        const updatedFeatures = [...data.features];
        if (data.features.length === 1) {
            react_toastify_1.toast.success("Atleast one feature should be there.");
        }
        else {
            updatedFeatures.splice(index, 1);
        }
        setData(Object.assign(Object.assign({}, data), { features: updatedFeatures }));
    };
    console.log("arrayaaaa:", data.features);
    return (<>
      <div className="main">
        <div className="formContainer">
          <center>
          <p className="pTag">
            <h4>{id ? "Update Product" : "Add Product"}</h4>
          </p>
          </center>
          <form className="formField" onSubmit={handleSubmit}>
            <div className="fields">
              <div className="btnDiv ">
                <OverlayTrigger_1.default overlay={(props) => (<Tooltip_1.default {...props}>Save product from here!</Tooltip_1.default>)} placement="top">
                  <button type="submit" className="Btn">
                  {id ? " Save " : " Save "}
                </button>
                </OverlayTrigger_1.default>
                <OverlayTrigger_1.default overlay={(props) => (<Tooltip_1.default {...props}>Cancel change from here!</Tooltip_1.default>)} placement="top">
                  <button className="Btn1 me-2" title="Cancel" onClick={() => navigate("/home")}>
                  Cancel
                </button>
                </OverlayTrigger_1.default>
              </div>

              <label className="form-label" htmlFor="name">
                <b>Product Name :</b>
              </label>
              <input value={data.name} name="name" onChange={handleChange} className="form-control" id="name" type="text" required/>
            </div>
            <div className=" fields">
              <label className="form-label" htmlFor="category">
                <b>Product Category :</b>
              </label>
              <select id="category" className="form-control" name="category" value={data.category} onChange={handleChange} required>
                <option value="">Select Category For Product</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="jewelery">Jewelry</option>
                <option value="electronics">Electronics</option>
                <option value="women's clothing">Women's Clothing</option>
              </select>
            </div>
            <div className=" fields">
              <label className="form-label" htmlFor="price">
                <b>Product Price :</b>
              </label>
              <input name="price" onChange={handleChange} value={data.price} className="form-control" id="price" type="number" min={1} required/>
            </div>
            <div className="fields">
              <label className="form-label" htmlFor="description">
                <b>Product Description :</b>
              </label>
              <textarea name="description" onChange={handleChange} value={data.description} className="form-control" id="description" rows={3} required/>
            </div>
            
            <div>
              <label className="form-label" htmlFor="feature">
                
                <b>{data.features.length >= 1 ? "Product features" : ""}</b>
              </label>
              {data.features.map((dataItem, index) => {
            return (<feature_1.default key={index} index={index} data={dataItem} onChange={handleChangeInChild} onDelete={handleDeleteInChild}/>);
        })}
            </div>
            <div className=" fields">
              <div className="btnDiv">
                <OverlayTrigger_1.default overlay={(props) => (<Tooltip_1.default {...props}>Add Features from here!</Tooltip_1.default>)} placement="top">
                  <button className="featureBtn" onClick={addFeature} title="Add features">
                    Add Features
                  </button>
                </OverlayTrigger_1.default>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>);
};
exports.default = AddModify;
