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
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const productApiService_1 = require("../Service/productApiService");
const navbar_1 = __importDefault(require("./navbar"));
const react_toastify_1 = require("react-toastify");
const productApiService_2 = require("../Service/productApiService");
const productApiService_3 = require("../Service/productApiService");
const AddModify = () => {
    const [data, setData] = (0, react_1.useState)({});
    const [originalData, setOriginalData] = (0, react_1.useState)({});
    const postData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let receivedProduct = yield (0, productApiService_1.postProduct)(data);
            console.log(receivedProduct);
            navigate("/product");
        }
        catch (error) {
            console.error("Error fetching products:", error);
            react_toastify_1.toast.error("Product already availabe!", { autoClose: 1000 });
        }
    });
    const populateModifiedProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("ID:", id);
            console.log("Data:", data);
            let receivedProduct = yield (0, productApiService_2.modifyById)(id, data);
            console.log(receivedProduct);
            if (!receivedProduct) {
                throw new Error("Failed to update product");
            }
            navigate("/product");
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    });
    const populateProductById = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let receivedProduct = yield (0, productApiService_3.getProductById)(id);
            console.log(receivedProduct);
            setData(receivedProduct);
            setOriginalData(receivedProduct);
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id } = (0, react_router_dom_1.useParams)();
    const handleChange = (event) => {
        console.log(event);
        console.log(event.target.name);
        console.log(event.target.value);
        let newData = Object.assign({}, data);
        newData[event.target.name] = event.target.value;
        setData(newData);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            if (id) {
                // Check if the data is modified
                const isDataModified = data.productName !== originalData.productName ||
                    data.productImageUrl !== originalData.productImageUrl ||
                    data.productDiscription !== originalData.productDiscription ||
                    data.productPrice !== originalData.productPrice ||
                    data.productCategory !== originalData.productCategory;
                if (isDataModified) {
                    populateModifiedProduct(id, data);
                }
                else {
                    react_toastify_1.toast.error("update atleast any one filed.", { autoClose: 1000 });
                    console.log("No changes made");
                }
            }
            else {
                postData();
            }
        }
        catch (error) {
            console.error("Error:", error.message);
        }
    };
    (0, react_1.useEffect)(() => {
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
        <div className="w-50 mx-auto mt-3">
          <div className=" shadow p-3 bg-body-tertiary rounded mx-auto my-auto">
            <p className="h4 text-white bg-secondary p-2 text-center">
              {id ? "Update Product" : "Add Product"}
            </p>
            <form className=" border border-secondary p-3  " onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label" htmlFor="productName">
                  <b>Product Name</b>
                </label>
                <input value={data.productName} name="productName" onChange={handleChange} className="form-control" id="productName" type="text" required/>
              </div>
              <div className="mb-2">
                <label className="form-label" htmlFor="productImageUrl">
                  <b>Product Images</b>
                </label>
                <input onChange={handleChange} name="productImageUrl" className="form-control" id="productImageUrl" type="file" accept="image/*" required/>
              </div>

              <div className="mb-2">
                <label className="form-label" htmlFor="productDiscription">
                  <b>Product Description</b>
                </label>
                <input name="productDiscription" onChange={handleChange} value={data.productDiscription} className="form-control" id="productDiscription" type="text" required/>
              </div>
              <div className="mb-2">
                <label className="form-label" htmlFor="productCategory">
                  <b>Product Category</b>
                </label>
                <input name="productCategory" onChange={handleChange} value={data.productCategory} className="form-control" id="productCategory" type="text" required/>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="productPrice">
                  <b>Product Price</b>
                </label>
                <input name="productPrice" onChange={handleChange} value={data.productPrice} className="form-control" id="productPrice" type="number" min={1} required/>
              </div>
              <div className="container-fluid d-flex flex-row-reverse ">
                <button type="submit" className="btn btn-secondary">
                  {id ? "Update Product" : "Add Product"}
                </button>
                <button className="btn btn-secondary me-2" onClick={() => navigate("/product")}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>);
};
exports.default = AddModify;
