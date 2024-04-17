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
const apiService_1 = require("../services/apiService");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const BookmarkedProducts = () => {
    const [bookmarkedProducts, setBookmarkedProducts] = (0, react_1.useState)([]);
    const [forceUpdate, setForceUpdate] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const fetchBookmarkedProducts = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield (0, apiService_1.getBookmarkedProducts)();
                setBookmarkedProducts(response);
            }
            catch (error) {
                console.error('Error fetching bookmarked products:', error);
            }
        });
        fetchBookmarkedProducts();
    }, [forceUpdate]);
    const handleRemoveBookmark = (product) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const productId = product._id;
            const bookMarkToggle = !product.bookmarked;
            // Toggle bookmark in backend
            yield (0, apiService_1.toggleBookmark)(productId, { bookmarked: bookMarkToggle });
            setForceUpdate(prevValue => prevValue + 1);
        }
        catch (error) {
            console.error('Error removing bookmark:', error);
        }
    });
    return (<div className="container">
            <h3>Bookmarked Products</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Bookmark</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarkedProducts && bookmarkedProducts.length > 0 ? (bookmarkedProducts.map(product => (<tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button onClick={() => handleRemoveBookmark(product)}>
                                        <react_fontawesome_1.FontAwesomeIcon icon={product.bookmarked ? free_solid_svg_icons_1.faHeart : free_solid_svg_icons_1.faHeart} style={{ color: product.bookmarked ? 'blue' : 'black' }}/>
                                    </button>
                                </td>
                            </tr>))) : (<tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No bookmarked products found.</td>
                        </tr>)}
                </tbody>
            </table>
        </div>);
};
exports.default = BookmarkedProducts;
