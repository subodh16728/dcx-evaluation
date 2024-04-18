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
const productApiService_1 = require("../Service/productApiService");
const navbar_1 = __importDefault(require("./navbar"));
const react_toastify_1 = require("react-toastify");
function ProductDetails() {
    const [data, setData] = (0, react_1.useState)({});
    const { id } = (0, react_router_dom_1.useParams)();
    const populateProductById = () => __awaiter(this, void 0, void 0, function* () {
        try {
            let receivedProduct = yield (0, productApiService_1.getProductById)(id);
            setData(receivedProduct);
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
    return (<>
      <div className="row" style={{
            minHeight: "100vh",
            backgroundImage: 'url("/images/product1.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            display: "flex",
            flexDirection: "column",
        }}>
        <div className="product-container w-50 mx-auto mt-5">
          <div className="border border-dark shadow p-3 mb-5 bg-body-tertiary rounded my-auto">
            <div className=" p-3">
            {data && (<div className="product d-flex">
                <div style={{ marginLeft: "20px" }}>
                  <div>
                    <h2 style={{ textAlign: "center" }}>{data.productName}</h2>
                  </div>
                  <img src={`/images/${data.productImageUrl && data.productImageUrl.split("\\").pop()}`} alt={data.productName} width={150} height={200} style={{
                border: "1px solid #101010",
                borderRadius: "5px",
            }}/>
                  <h5 style={{ textAlign: "center" }}>
                    Price: ${data.productPrice}
                  </h5>
                </div>
                <div style={{ marginLeft: "20px", marginTop: "50px" }}>
                  <p className="descriptions">
                    <small>{data.productDiscription}</small>
                  </p>
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </>);
}
exports.default = ProductDetails;
