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
const jwt_decode_1 = require("jwt-decode");
const react_router_dom_1 = require("react-router-dom");
require("./CSS/Table.css");
const Wishlist = () => {
    const token = localStorage.getItem("token");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [wishlistItems, setWishlistItems] = (0, react_1.useState)([]);
    const [productDetails, setProductDetails] = (0, react_1.useState)({});
    const userId = (0, jwt_decode_1.jwtDecode)(token).user.id;
    console.log(userId);
    (0, react_1.useEffect)(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);
    (0, react_1.useEffect)(() => {
        const fetchWishlistItems = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`http://localhost:3000/api/bookmark/${userId}`);
                console.log(response.data);
                setWishlistItems(response.data);
            }
            catch (error) {
                console.error('Error fetching wishlist items:', error);
            }
        });
        if (userId) {
            fetchWishlistItems();
        }
    }, [userId]);
    (0, react_1.useEffect)(() => {
        if (!token) {
            navigate("/home");
        }
    }, [token, navigate]);
    (0, react_1.useEffect)(() => {
        const fetchProductDetails = (productId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`http://localhost:3000/api/table/${productId}`);
                const { name, description, price, category } = response.data;
                // Update product details state
                setProductDetails(prevDetails => (Object.assign(Object.assign({}, prevDetails), { [productId]: {
                        name,
                        description,
                        price,
                        category
                    } })));
            }
            catch (error) {
                console.error(`Error fetching product details for productId`, error);
            }
        });
        wishlistItems.forEach(wishlistItem => {
            wishlistItem.product.forEach(productId => {
                if (!productDetails[productId]) {
                    fetchProductDetails(productId);
                }
            });
        });
    }, [wishlistItems, productDetails]);
    const removeProductFromWishlist = (productId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = localStorage.getItem("userId");
            const response = yield axios_1.default.put(`http://localhost:3000/api/bookmark/add/${userId}`, { product: productId });
            console.log(response);
            setWishlistItems(prevItems => {
                const updatedItems = prevItems.map(item => {
                    if (item.product.includes(productId)) {
                        return Object.assign(Object.assign({}, item), { product: item.product.filter(id => id !== productId) });
                    }
                    return item;
                });
                return updatedItems.filter(item => item.product.length > 0);
            });
        }
        catch (error) {
            console.error('Error removing product from wishlist:', error);
        }
    });
    return (<div className="row mx-auto">
           
            <h1>Wishlist Items</h1>
            
            <table className='product-table'>
                <thead>
                    <tr>
                       
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {wishlistItems.length > 0 ?
            (wishlistItems.map(wishlistItem => (<react_1.default.Fragment key={wishlistItem._id}>
                            {wishlistItem.product.map(productId => (<tr key={productId}>
                                    
                                    {productDetails[productId] && (<react_1.default.Fragment>
                                            
                                            <td>{productDetails[productId].name}</td>
                                            <td>{productDetails[productId].description}</td>
                                            <td>{productDetails[productId].price}</td>
                                            <td>{productDetails[productId].category}</td>
                                           <td> <button className='w-pbutton' onClick={() => { removeProductFromWishlist(productId); }}><i class="bi bi-trash"></i></button></td>
                                        </react_1.default.Fragment>)}
                                </tr>))}
                        </react_1.default.Fragment>))) : <h1>Cart is empty</h1>}
                </tbody>
            </table>
        </div>);
};
exports.default = Wishlist;
