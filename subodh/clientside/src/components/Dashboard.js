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
const react_router_dom_1 = require("react-router-dom");
const Button_1 = __importDefault(require("react-bootstrap/Button"));
const Container_1 = __importDefault(require("react-bootstrap/Container"));
const Form_1 = __importDefault(require("react-bootstrap/Form"));
const InputGroup_1 = __importDefault(require("react-bootstrap/InputGroup"));
require("bootstrap/dist/css/bootstrap.min.css");
const getProductsSlice_1 = require("../store/slice/getProductsSlice");
const react_redux_1 = require("react-redux");
const jquery_1 = __importDefault(require("jquery"));
require("tablesorter");
const axios_1 = __importDefault(require("axios"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const jwt_decode_1 = require("jwt-decode");
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const lodash_debounce_1 = __importDefault(require("lodash.debounce"));
const Dashboard = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const [search, setSearch] = (0, react_1.useState)('');
    // authentication using jwt token
    const token = js_cookie_1.default.get("token");
    (0, react_1.useEffect)(() => {
        if (!token) {
            navigate("/login");
        }
        return () => {
            debouncedSearch.cancel();
        };
    });
    (0, react_1.useEffect)(() => {
        dispatch((0, getProductsSlice_1.fetchProducts)(search));
    }, [search]);
    const data = (0, react_redux_1.useSelector)((state) => (state.api.data));
    (0, react_1.useEffect)(() => {
        (0, jquery_1.default)("#sort-table").tablesorter();
    }, [data]);
    const handleBookmark = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const productID = data._id;
        const decodedToken = (0, jwt_decode_1.jwtDecode)(token);
        const userID = decodedToken._id;
        try {
            const response = yield axios_1.default.post("http://localhost:5000/api/bookmarks/add", { userID: userID, products: [{ productID: productID }] }, { headers: { Authorization: `Bearer ${token}` } });
            const bookmarkMessage = response.data.message;
            const bookMarkStatus = response.status;
            if (bookMarkStatus === 201) {
                react_toastify_1.toast.success(bookmarkMessage);
            }
            else {
                react_toastify_1.toast.info(bookmarkMessage);
            }
        }
        catch (error) {
        }
    });
    const handleChange = (event) => {
        setSearch(event.target.value);
    };
    // using debouce to reduce api calls
    const debouncedSearch = (0, react_1.useMemo)(() => {
        return (0, lodash_debounce_1.default)(handleChange, 1000);
    }, []);
    return (<>

            <div className="container mt-5">
                <Container_1.default>
                    <Form_1.default>
                        <InputGroup_1.default className='my-3'>
                            <Form_1.default.Control type='text' onChange={debouncedSearch} placeholder='Search products...' className='me-1'/>
                            <Button_1.default variant="secondary"><react_router_dom_1.NavLink className="nav-link active" to="/products/add">Add Product</react_router_dom_1.NavLink></Button_1.default>
                        </InputGroup_1.default>
                    </Form_1.default>

                    <table id='sort-table' className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        {data && data.length > 0 ? (<tbody>
                                {data.map((item, index) => (<tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                        <td className='text-center'>
                                            <a className='text-dark' href="javascript:void(0)" onClick={() => handleBookmark(item)}>
                                                <i className={`bi-bookmark`}></i>
                                            </a>
                                            <react_router_dom_1.NavLink className='text-dark' to={`/products/edit/${item._id}`}>
                                                <i className="bi bi-pencil-square ms-3"></i>
                                            </react_router_dom_1.NavLink>
                                        </td>
                                    </tr>))}
                            </tbody>) : (<tbody>
                                <tr>
                                    <td colSpan={5} className='text-center'>No Results</td>
                                </tr>
                            </tbody>)}</table>
                </Container_1.default>
            </div>
            <react_router_dom_1.Outlet />
        </>);
};
exports.default = Dashboard;
