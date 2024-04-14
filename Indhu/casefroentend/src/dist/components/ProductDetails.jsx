"use strict";
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
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
const axios_1 = __importDefault(require("axios"));
const react_2 = __importDefault(require("react"));
function ProductDetails() {
    const [data, setData] = (0, react_1.useState)({
        name: "",
        description: "",
        category: "",
        price: 0,
        features: [],
        _id: ""
    });
    const { id } = (0, react_router_dom_1.useParams)();
    const populateProductById = () => __awaiter(this, void 0, void 0, function* () {
        try {
            let receivedProduct = yield axios_1.default.get(`http://localhost:3000/api/table/${id}`);
            setData(receivedProduct.data);
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const token = localStorage.getItem("token");
    (0, react_1.useEffect)(() => {
        if (!token) {
            react_toastify_1.toast.success("Please login first.", { autoClose: 1000 });
            navigate("/signin");
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (token) {
            populateProductById();
        }
    }, []);
    const getImageUrl = (productName) => {
        if (productName === "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin") {
            return "https://images-cdn.ubuy.co.in/633ab9d36deffd67735b38eb-acer-sb220q-bi-21-5-inches-full-hd-1920.jpg";
        }
        else if (productName === "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats") {
            return "https://www.rei.com/media/2f6beb3d-18af-4c12-b7be-0cc91205f1c1.jpg";
        }
        else if (productName === "Beat London by Pepe Jeans") {
            return "https://rukminim2.flixcart.com/image/832/832/xif0q/jean/u/g/o/32-bm200520q05-beat-london-by-pepe-jeans-original-imagtdzxjnmhrngb.jpeg?q=70&crop=false";
        }
        else {
            // Add a default fallback image URL here
            return ""; // Provide the URL of a default image if needed
        }
    };
    return (<div className="row">
      <div className="product-container w-50 mx-auto mt-5">
        <div className="border border-dark shadow p-3 mb-5 bg-body-tertiary rounded my-auto">
          <div className="p-3">
            {data && (<div className="product d-flex">
                <div>
                  <h2 style={{ textAlign: "center" }}>{data.name}</h2>
                  
                  <p className="descriptions">
                    <strong>Description:</strong> {data.description}
                  </p>
                  <p className="descriptions">
                    <strong>Category:</strong> {data.category}
                  </p>
                  {data.features && data.features.length > 0 && (<div className="descriptions">
                      <strong>Features:</strong>
                      <ul>
                        {data.features.map((feature, index) => (<li key={index}>
                            <strong>{feature.title}:</strong> {feature.value}
                          </li>))}
                      </ul>
                    </div>)}
                   <div className="col text-start">
                            <button onClick={() => navigate("/home")} type="submit" className="btn btn-success rounded-0">Back</button>
                        </div>
                        <div className="col text-end">
                        <react_router_dom_1.NavLink to={`/update/${data._id}`}><button type="submit" className="btn btn-success rounded-0">Update</button></react_router_dom_1.NavLink>
                        </div>

                </div>
                
                <div>
                  <img src={getImageUrl(data.name)} alt="Product Image" width={150} height={200} style={{
                border: "1px solid #101010",
                borderRadius: "5px",
            }}/><br /><br />
                  <h5 style={{ textAlign: "center" }}>Price: ${data.price}</h5>
                  
                </div>
                
              </div>)}
          </div>
        </div>
      </div>
    </div>);
}
exports.default = ProductDetails;
