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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const jwt_decode_1 = require("jwt-decode");
const userApiService_1 = require("../Service/userApiService");
const userApiService_2 = require("../Service/userApiService");
const react_toastify_1 = require("react-toastify");
require("../css/wishlist.css");
const WishList = () => {
    const [data, setData] = (0, react_1.useState)([
        {
            _id: "",
            name: "",
            description: "",
            price: "",
            category: "",
            features: [],
        },
    ]);
    const [sortOrder, setSortOrder] = (0, react_1.useState)("ascending");
    const [userID, setUserID] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const token = localStorage.getItem("token");
    let decodedToken;
    (0, react_1.useEffect)(() => {
        if (!token) {
            react_toastify_1.toast.success("Please login first.", { toastId: '1', autoClose: 1000 });
            navigate("/signin");
        }
        else {
            decodedToken = (0, jwt_decode_1.jwtDecode)(token);
            setUserID(decodedToken._id);
            populateWishlist(decodedToken._id);
        }
    }, [token]);
    const populateWishlist = (userID) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let receivedProduct = yield (0, userApiService_2.getWishlistedProducts)(userID);
            setData(receivedProduct.wishlist);
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    });
    const populateWishlistedProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let receivedProduct = yield (0, userApiService_1.modifyById)(id, data);
            if (receivedProduct) {
                populateWishlist(userID);
            }
            react_toastify_1.toast.success(receivedProduct.message, { autoClose: 1000 });
        }
        catch (error) {
            console.error("Error fetching products:", error);
            react_toastify_1.toast.error(error.receivedProduct.message, { autoClose: 1000 });
        }
    });
    const handleSortByName = () => {
        const sortedData = data;
        sortedData.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
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
        const productID = data._id;
        populateWishlistedProduct(userID, { _id: productID });
    };
    return (<>
        <div className="wishlistMain">
          <div className="wishlistContainer">
            <p className="Ptag">
              Your Wishlist
            </p>
            {data.length > 0 ? (<div className="wishlistFormField">
                <table className="table table-striped">
                  <thead>
                    <tr>
                    <th className="sorting-head" onClick={handleSortByName}>
                      P.Name {sortOrder === "ascending" ? "↑" : "↓"}
                    </th>
                      <th>P.Price</th>
                      <th>P.Category</th>
                      <th>Wishlist</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product) => (<tr key={product._id}>
                        <td>
                          <react_router_dom_1.NavLink className="name" to={`/productDetails/${product._id}`}>
                            {product.name}
                          </react_router_dom_1.NavLink>
                        </td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>
                        <a href="javaScript:void(0)" onClick={() => handleBookmark(product)}>
                            <i className={"bi bi-bag-heart ms-4"}></i>
                          </a>
                        </td>
                      </tr>))}
                  </tbody>
                </table>
              </div>) : (<div style={{ textAlign: "center" }}>
                <img src="/images/NoWishlist.png" alt="wishlist" width={700} height={450}/>
              </div>)}
          </div>
        </div>
    </>);
};
exports.default = WishList;
