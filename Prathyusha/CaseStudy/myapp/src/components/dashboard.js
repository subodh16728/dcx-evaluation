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
const apiService_1 = require("../services/apiService");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const free_solid_svg_icons_2 = require("@fortawesome/free-solid-svg-icons");
const apiService_2 = require("../services/apiService");
const Dashboard = () => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [sortOrder, setSortOrder] = (0, react_1.useState)('asc');
    const [bookmarkedProducts, setBookmarkedProducts] = (0, react_1.useState)([]);
    const [forceUpdate, setForceUpdate] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const populateProducts = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const receivedProducts = yield (0, apiService_1.getProducts)();
                setProducts(receivedProducts);
            }
            catch (error) {
                console.error('Error fetching products:', error);
            }
        });
        populateProducts();
    }, [forceUpdate]);
    (0, react_1.useEffect)(() => {
        const fetchBookmarked = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const bookmarked = yield (0, apiService_1.getBookmarkedProducts)();
                setBookmarkedProducts(bookmarked);
            }
            catch (error) {
                console.error('Error fetching bookmarked products:', error);
            }
        });
        fetchBookmarked();
    }, []);
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleSort = () => {
        const sortedProducts = [...products];
        sortedProducts.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            let comparison = 0;
            if (nameA > nameB) {
                comparison = 1;
            }
            else if (nameA < nameB) {
                comparison = -1;
            }
            return sortOrder === 'asc' ? comparison : comparison * -1;
        });
        setProducts(sortedProducts);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
    const handleBookmarkToggle = (product) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const productId = product._id;
            const bookMarkToggle = !product.bookmarked;
            yield (0, apiService_1.toggleBookmark)(productId, { bookmarked: bookMarkToggle });
            const updatedBookmarked = yield (0, apiService_1.getBookmarkedProducts)();
            setForceUpdate(prevValue => prevValue + 1);
            setBookmarkedProducts(updatedBookmarked);
        }
        catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    });
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return (<div className="container">
            <h2>Products</h2>
            <input type="text" placeholder="Search by product name" value={searchQuery} onChange={handleSearchInputChange}/>
            <button onClick={handleSort} className="btn btn-secondary">Sort</button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>WishList</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (<tr key={product._id}>
                            <td>
                                <react_router_dom_1.NavLink to={`/products/${product._id}`} style={{ color: 'black' }}>
                                    {product.name}
                                </react_router_dom_1.NavLink>
                            </td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => handleBookmarkToggle(product)}>
                                    <react_fontawesome_1.FontAwesomeIcon icon={product.bookmarked ? free_solid_svg_icons_1.faHeart : free_solid_svg_icons_1.faHeart} style={{ color: product.bookmarked ? 'blue' : 'black' }}/>
                                </button>
                            </td>
                            <td>
                                <react_router_dom_1.NavLink to={`/products/edit/${product._id}`}>
                                    <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_2.faEdit} style={{ color: 'black' }}/>
                                </react_router_dom_1.NavLink>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>);
};
exports.default = Dashboard;
