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
const react_router_dom_1 = require("react-router-dom");
const lodash_1 = __importDefault(require("lodash"));
const Dashboard = () => {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [sortBy, setSortBy] = (0, react_1.useState)('ProductName');
    const [sortDirection, setSortDirection] = (0, react_1.useState)('asc');
    const [filteredProduct, setFilteredProduct] = (0, react_1.useState)([]);
    const [finalProduct, setFinalProduct] = (0, react_1.useState)([]);
    //Search and Fetching Functionality
    (0, react_1.useEffect)(() => {
        const fetchProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get("http://localhost:4000/api/product/getProduct?q=" + searchTerm);
                setFilteredProduct(response.data);
                setFinalProduct(response.data);
            }
            catch (error) {
                console.error(`Error fetching Products: ${error}`);
            }
        });
        fetchProducts(searchTerm);
    }, [searchTerm]);
    //const abcd = useCallback(()=>_.debounce(handleSearchInputChange, 4000), []); 
    //Sort Functionality
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortBy(column);
            setSortDirection('asc');
        }
    };
    (0, react_1.useEffect)(() => {
        const sortedProducts = [...filteredProduct].sort((a, b) => {
            const aValue = (sortBy === 'price') ? parseFloat(a[sortBy]) : a[sortBy];
            const bValue = (sortBy === 'price') ? parseFloat(b[sortBy]) : b[sortBy];
            console.log("sorting applied");
            if (aValue < bValue) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFinalProduct(sortedProducts);
    }, [filteredProduct, sortBy, sortDirection]);
    return (<div>
            <div className="search-container">
                <input type="text" placeholder="Search Product...." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className="search-button">
                    <i className="fa fa-search"></i>
                </button>
            </div>
            <div className="row product-table-container shadow rounded p-3">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('ProductName')}>
                                Product Name
                                {sortBy === 'ProductName' && (<i className={`fa fa-sort-${sortDirection === 'asc' ? 'asc' : 'desc'}`}></i>)}
                            </th>
                            <th onClick={() => handleSort('category')}>
                                Category
                                {sortBy === 'category' && (<i className={`fa fa-sort-${sortDirection === 'asc' ? 'asc' : 'desc'}`}></i>)}
                            </th>
                            <th onClick={() => handleSort('price')}>
                                Price
                                {sortBy === 'price' && (<i className={`fa fa-sort-${sortDirection === 'asc' ? 'asc' : 'desc'}`}></i>)}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {finalProduct.map((product, index) => (<tr key={index}>
                                <td><react_router_dom_1.NavLink to={`/productDetails/${product._id}`} className="product-link">{product.ProductName}</react_router_dom_1.NavLink></td>
                                <td>{product.category}</td>
                                <td>₹{product.price}</td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div>);
};
exports.default = Dashboard;
