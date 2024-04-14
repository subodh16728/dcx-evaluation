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
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_2 = require("react-router-dom");
const ProfileEdit = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [formData, setFormData] = (0, react_1.useState)({
        name: '',
        email: '',
        age: '',
        gender: ''
    });
    const baseUrl = 'http://localhost:3000/api';
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (id) {
                    //edit mode if id as a parameter
                    const response = yield axios_1.default.get(`${baseUrl}/${id}`);
                    setFormData(response.data);
                }
            }
            catch (error) {
                console.error('Error fetching page details:', error.message);
            }
        });
        fetchData();
    }, []);
    const handleChange = (e) => {
        setFormData((prevForm) => (Object.assign(Object.assign({}, prevForm), { [e.target.name]: e.target.value })));
    };
    const handleUpdate = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        yield axios_1.default.put(`${baseUrl}/edit/${id}`, formData);
        react_toastify_1.toast.success('User updated successfully');
        navigate('/myprofile'); // Redirect to the userprofile page
    });
    return (<div className='border border dark rounded container-fluid w-50 shadow-lg p-3 mb-5 mt-5 bg-white rounded'>
            <h3 className="text-center mb-4">Edit Profile</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="name" className="col-form-label">Full Name:</label>
                    <input type="text" className="form-control" value={formData.name} id="name" onChange={handleChange} name="name"/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="age" className="col-form-label">Age:</label>
                    <input type="number" className="form-control" value={formData.age} id="age" onChange={handleChange} name="age"/>
                </div>
                <div className="form-group">
                    <label htmlFor="gender" className="col-form-label">Gender:</label>
                    <select className="form-control" value={formData.gender} id="gender" onChange={handleChange} name="gender">
                        <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div><br />
 
                <div className="text-center d-flex flex-row-reverse">
                    <button type="submit" onClick={handleUpdate} className="btn btn-primary">Update</button>
                    <react_router_dom_2.NavLink to='/userprofile'><button type="button" className="btn btn-secondary me-2" data-dismiss="modal">Cancel</button></react_router_dom_2.NavLink>
 
                </div>
            </form>
        </div>);
};
exports.default = ProfileEdit;
