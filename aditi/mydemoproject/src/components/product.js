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
const productApiService_1 = require("../Service/productApiService");
const react_router_dom_1 = require("react-router-dom");
const jwt_decode_1 = require("jwt-decode");
const navbar_1 = __importDefault(require("./navbar"));
const userApiService_1 = require("../Service/userApiService");
const react_toastify_1 = require("react-toastify");
const Product = () => {
    const [data, setData] = (0, react_1.useState)([]);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const [sortOrder, setSortOrder] = (0, react_1.useState)("ascending");
    const navigate = (0, react_router_dom_1.useNavigate)();
    let token = localStorage.getItem("token");
    let decodedToken = null;
    if (token) {
        decodedToken = (0, jwt_decode_1.jwtDecode)(token);
    }
    const populateProduct = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let receivedProduct = yield (0, productApiService_1.getproducts)();
            if ((receivedProduct === null || receivedProduct === void 0 ? void 0 : receivedProduct.length) > 0) {
                setData(receivedProduct);
            }
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    });
    const populateWishlistedProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let receivedProduct = yield (0, userApiService_1.modifyById)(id, data);
            console.log(receivedProduct);
            react_toastify_1.toast.success(receivedProduct.message, { autoClose: 1000 });
        }
        catch (error) {
            console.error("Error fetching products:", error);
            react_toastify_1.toast.error(error.receivedProduct.message, { autoClose: 1000 });
        }
    });
    const searchedProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let receivedProduct = yield (0, productApiService_1.getsearchedProducts)(searchTerm);
            setData(receivedProduct);
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    });
    (0, react_1.useEffect)(() => {
        let timerOut = setTimeout(() => {
            searchedProducts(searchTerm);
        }, 1000);
        return () => clearTimeout(timerOut);
    }, [searchTerm]);
    (0, react_1.useEffect)(() => {
        populateProduct();
    }, []);
    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSortByName = () => {
        const sortedData = data;
        sortedData.sort((a, b) => {
            const nameA = a.productName.toLowerCase();
            const nameB = b.productName.toLowerCase();
            if (sortOrder === "ascending") {
                return nameA.localeCompare(nameB);
            }
            else {
                return nameB.localeCompare(nameA);
            }
        });
        setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
        setData(sortedData);
    };
    const handleBookmark = (data) => {
        if (!token) {
            react_toastify_1.toast.success("Please login first.", { autoClose: 1000 });
            navigate("/signin");
        }
        else {
            const productID = data._id;
            const userID = decodedToken._id;
            console.log(data);
            console.log(productID);
            populateWishlistedProduct(userID, { _id: productID });
        }
    };
    return (<>
      <div className="row" style={{
            minHeight: "100vh",
            backgroundImage: 'url("images/product1.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            display: "flex",
            flexDirection: "column",
        }}>
        <div className="w-50 mx-auto mt-5">
          <div className="shadow p-3 mb-5 bg-body-tertiary rounded my-auto">
            <p className="h4 text-white bg-secondary p-2 text-center">
              Product Table
            </p>
            <form className="d-flex" role="search">
              <input type="text" placeholder="Search for Product " value={searchTerm} onChange={handleSearchInputChange} className="searchBox mx-auto"/>
            </form>
            <div>
            {data.length > 0 ? (<table className="table">
                <thead>
                  <tr>
                    <th className="sorting-head" onClick={handleSortByName}>
                      P.Name {sortOrder === "ascending" ? "↑" : "↓"}
                    </th>
                    <th>P.Price</th>
                    <th>P.Category</th>
                    <th>Wishlist</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((product) => (<tr key={product._id}>
                      <td>
                        <react_router_dom_1.NavLink to={`/productDetails/${product._id}`}>
                          {product.productName}
                        </react_router_dom_1.NavLink>
                      </td>
                      <td>{product.productPrice}</td>
                      <td>{product.productCategory}</td>
                      <td className="text-center">
                        <a href="#" onClick={() => handleBookmark(product)}>
                          <i class={"bi bi-bookmark-heart-fill"}></i>
                        </a>
                      </td>
                      <td>
                        {product._id ? (<react_router_dom_1.NavLink to={`/product/modify/${product._id}`}>
                            <i className="bi bi-pencil-fill me-3"></i>
                          </react_router_dom_1.NavLink>) : null}
                      </td>
                    </tr>))}
                </tbody>
              </table>) : (<p className="text-center mt-3">No items found.</p>)}
            </div>
          </div>
        </div>
      </div>
    </>);
};
exports.default = Product;
