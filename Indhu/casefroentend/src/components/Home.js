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
// Home.js
const react_1 = __importStar(require("react"));
const react_toastify_1 = require("react-toastify");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
require("bootstrap/dist/css/bootstrap.min.css");
require("./CSS/Table.css");
const Home = () => {
    // const [userData, setUserData] = useState(null);
    const [tableData, setTableData] = (0, react_1.useState)([]);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [searchResults, setSearchResults] = (0, react_1.useState)([]);
    const [wishlist, setWishlist] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const token = localStorage.getItem("token");
    // useEffect(() => {
    //     if (!token) {
    //         navigate("/login")
    //     }
    // }, [])
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const userId = localStorage.getItem("userId");
                const response = yield fetch(`http://localhost:3000/api/bookmark/${userId}`);
                const data = yield response.json();
                console.log(data);
                // Check if the product property exists in the response
                if (data[0] && data[0].product) {
                    const dataArray = data[0].product;
                    setWishlist(dataArray);
                }
                else {
                    console.error('Product data not found in response:', data);
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        });
        fetchData();
    }, []);
    (0, react_1.useEffect)(() => {
        // Fetch table data
        axios_1.default.get("http://localhost:3000/api/table", {
            headers: {
                'x-token': token
            }
        })
            .then(res => {
            setTableData(res.data);
            setSearchResults(res.data);
        })
            .catch(err => console.log(err));
    }, [token]);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const results = tableData.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setSearchResults(results);
    };
    const handleremoveproduct = (pid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.delete(`http://localhost:3000/api/table/${pid}`);
            setTableData(prevTableData => prevTableData.filter(product => product._id !== pid));
            react_toastify_1.toast.success("Product removed successfully");
        }
        catch (error) {
            console.error('Error:', error);
            react_toastify_1.toast.error('Failed to remove product');
        }
    });
    const addToWishlist = (pId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const UserId = localStorage.getItem("userId");
            console.log(UserId);
            const response = yield axios_1.default.put(`http://localhost:3000/api/bookmark/add/${UserId}`, { product: pId });
            console.log(response.data.product);
            setWishlist(response.data.product);
            // console.log(wishlist)
        }
        catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    });
    const isProductInWishlist = (prodId) => {
        return wishlist && wishlist.includes(prodId);
    };
    return (<div className="row mx-auto  ">

            <div className="search-container d-flex justify-content-between  " style={{ marginTop: '20px' }}>
                <div className="search">
                    <input type="text" placeholder="Search by product name..." value={searchTerm} onChange={handleSearch}/> <i class="bi bi-search"></i>
                </div>
                
            </div>
            <center>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            
                            <th>Wishlist</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((product, index) => (<tr key={index}>
                                {/* <td>{product.name}</td> */}
                                <td>
                        <react_router_dom_1.NavLink to={`/productDetails/${product._id}`}>
                          {product.name}
                        </react_router_dom_1.NavLink>
                      </td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>
                                                        
                                                           
                                {wishlist && wishlist.length > 0 && (isProductInWishlist(product._id) ? (<button onClick={() => addToWishlist(product._id)} className='btn btn-danger'>
                                                                    <i className="bi bi-heart-fill"></i>
                                                                </button>) : (<button onClick={() => addToWishlist(product._id)} className='btn btn-success'>
                                                                    <i className="bi bi-heart"></i>
                                                                </button>))}
                                                        {wishlist && wishlist.length === 0 && (<button onClick={() => addToWishlist(product._id)} className='btn btn-success'>
                                                                <i className="bi bi-heart"></i>
                                                            </button>)}
                                                    </td>
                                
                                <td> <react_router_dom_1.NavLink className='w-pbuton' onClick={() => { handleremoveproduct(product._id); }}><i className="bi bi-trash3"></i></react_router_dom_1.NavLink>
                                <react_router_dom_1.NavLink className='text-dark' to={`/update/${product._id}`}>
                                                <i className="bi bi-pencil-square ms-3"></i>
                                            </react_router_dom_1.NavLink>
                                </td>
                                
                            </tr>))}
                    </tbody>
                </table>
            </center>
            
        </div>);
};
exports.default = Home;
