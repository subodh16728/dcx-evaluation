"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_2 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
function AddProduct() {
    const navigate = (0, react_router_dom_2.useNavigate)();
    const [product, setProduct] = (0, react_1.useState)({
        ProductName: "",
        category: "",
        price: "",
        seller: "",
        description: ""
    });
    // protected routes
    const token = localStorage.getItem("token");
    (0, react_1.useEffect)(() => {
        if (!token) {
            react_toastify_1.toast.info("To Add product Details Please Login to you account", { toastId: "khandu" });
            navigate("/login");
        }
    }, []);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(Object.assign(Object.assign({}, product), { [name]: value }));
        console.log(event.target.value);
    };
    const addProduct = () => {
        axios_1.default.post("http://localhost:4000/api/product/createProduct", product)
            .then((product) => {
            console.log(product);
            react_toastify_1.toast.success("Product created successfully");
            navigate("/");
        })
            .catch((err) => {
            if (err.response && err.response.status === 400 && err.response.data === `Product already exists`) {
                react_toastify_1.toast.error(`Product already exists`);
            }
            else {
                console.log(`Product cannot be added: ${err}`);
            }
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
            // All required fields are filled, proceed with form submission
            addProduct();
        }
        else {
            // Some required fields are not filled, show pop-up message
            react_toastify_1.toast.error("Some required fields are not filled");
        }
    };
    return (<div className="border border dark rounded container-fluid w-50 shadow-lg p-3 mb-5 bg-white rounded mt-4 add-product-container">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="productName" className="col-form-label">Product Name</label>
                    <input type="productName" className="form-control" id="productName" name="ProductName" value={product.ProductName} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="category" className="col-form-label">Category</label>
                    <input type="category" className="form-control" id="category" name="category" value={product.category} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="price" className="col-form-label">Price</label>
                    <input type="price" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="seller" className="col-form-label">Seller</label>
                    <input type="seller" className="form-control" id="seller" name="seller" value={product.seller} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="col-form-label">Description</label>
                    <input type="description" className="form-control" id="description" name="description" value={product.description} onChange={handleChange} required/>
                </div>


                <div className="d-flex flex-row-reverse">
                    <button type="submit" className="btn btn-primary me-2">Add Product</button>
                    <react_router_dom_1.NavLink to='/'><button type="button" className="btn btn-secondary me-2">Cancel</button></react_router_dom_1.NavLink>

                </div>
            </form>
        </div>);
}
exports.default = AddProduct;
