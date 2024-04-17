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
const Container_1 = __importDefault(require("react-bootstrap/Container"));
require("bootstrap/dist/css/bootstrap.min.css");
const jquery_1 = __importDefault(require("jquery"));
require("tablesorter");
const axios_1 = __importDefault(require("axios"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const Bookmarks = () => {
    const [productdata, setProductdata] = (0, react_1.useState)([]);
    const token = js_cookie_1.default.get("token");
    const userID = js_cookie_1.default.get("userID");
    (0, react_1.useEffect)(() => {
        (0, jquery_1.default)("#sort-table").tablesorter();
        fetchBookmarks();
    }, []);
    const fetchBookmarks = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`http://localhost:5000/api/bookmarks?userID=${userID}`, { headers: { Authorization: `Bearer ${token}` } });
            const bookmarks = response.data.products;
            const productRequests = bookmarks.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                const productResponse = yield axios_1.default.get(`http://localhost:5000/api/products/id?productID=${item.productID}`, { headers: { Authorization: `Bearer ${token}` } });
                return productResponse.data;
            }));
            const products = yield Promise.all(productRequests);
            setProductdata(products);
        }
        catch (error) {
            console.error(error);
        }
    });
    const handleBookmark = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const productID = data._id;
        try {
            yield axios_1.default.post("http://localhost:5000/api/bookmarks/add", { userID: userID, products: [{ productID: productID }] }, { headers: { Authorization: `Bearer ${token}` } });
            fetchBookmarks();
        }
        catch (error) {
            console.log(error);
        }
    });
    return (<>

            <div className="container mt-5">
                <Container_1.default>

                    <table id='sort-table' class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Bookmarks</th>
                            </tr>
                        </thead>
                        {productdata && productdata.length > 0 ? (<tbody>
                                    {productdata && productdata.map((item, index) => (<tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.description}</td>
                                                <td>{item.category}</td>
                                                <td>{item.price}</td>
                                                <td className='text-center'>
                                                    <a className='text-dark' href="javascript:void(0)" onClick={() => handleBookmark(item)}>
                                                        <i class='bi-bookmark-fill'></i>
                                                    </a>
                                                </td>
                                            </tr>))}

                                </tbody>) : (<tbody>
                                    <tr>
                                        <td colSpan={5} className='text-center'>No Bookmarks</td>
                                    </tr>
                                </tbody>)}
                    </table>
                </Container_1.default>
            </div>

        </>);
};
exports.default = Bookmarks;
