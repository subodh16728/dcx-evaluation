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
const axios_1 = __importDefault(require("axios"));
function Userprofile() {
    const token = localStorage.getItem("token");
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);
    const [data1, setData] = (0, react_1.useState)({
        name: "",
        email: "",
        age: 0,
        gender: "",
    });
    const userId = localStorage.getItem('userId');
    console.log(userId);
    const ProfileHandler = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = localStorage.getItem('userId');
            console.log(userId);
            const response = yield axios_1.default.get(`http://localhost:3000/api/${userId}`);
            setData(response.data);
        }
        catch (error) {
            console.error('Error fetching user profile:', error.message);
        }
    });
    (0, react_1.useEffect)(() => {
        ProfileHandler();
    }, []);
    return (<>
       
            <section>
                <div class="container shadow-lg p-3 mb-5 mt-5 bg-white rounded p-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="book-header">
                                        <div className="row">
                                            <div className=" col xs={6} sm={6} md={6} lg={6}">
                                                <i className="glyphicon glyphicon-file"></i> Welcome {data1.name}
                                            </div>
                                            <div className="col xs={6} sm={6} md={6} lg={6} d-flex flex-row-reverse">
                                                <react_router_dom_1.NavLink to={`/edit/${data1._id}`}><button type="button" className="btn btn-primary shadow-lg"><i className="bi bi-pencil-square"></i> Edit</button></react_router_dom_1.NavLink>  </div>
                                        </div>
                                    </h1>
                                </div>
                                <div className="row">
 
                                    <div className="col-md-6">
 
                                        <p><strong>Name:</strong> {data1.name}</p>
                                        <p><strong>Email:</strong> {data1.email}</p>
 
                                        <p><strong>Gender:</strong> {data1.gender}</p>
                                        <p><strong>Age:</strong> {data1.age}</p>
 
                                    </div>
 
 
                                </div>
 
 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>);
}
exports.default = Userprofile;
