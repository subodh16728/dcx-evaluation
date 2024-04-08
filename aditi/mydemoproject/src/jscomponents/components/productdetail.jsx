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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const productApiService_1 = require("../Service/productApiService");
const react_toastify_1 = require("react-toastify");
require("../css/productdetail.css");
function ProductDetails() {
    const [data, setData] = (0, react_1.useState)({
        _id: "",
        name: "",
        description: "",
        price: "",
        category: "",
        features: [],
    });
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
        <div className="productdetailmain">
          <div className="productdetailformContainer">
            <div className=" p-2">
              <p className="h4 text-white bg-secondary p-2 text-center">
                Product Description
              </p>
              {data && (<div>
                  <div className="border border-secondary p-3">
                    <h3>{data.name}</h3>
                    <hr />
                    <div className="mb-2" style={{
                textAlign: "right",
                justifyContent: "space-between",
                display: "flex",
                textDecorationColor: "grey",
            }}>
                      <small className="ms-3">
                        <b>Category : </b> {data.category}
                      </small>
                      <small className="me-5">
                        <b>Price : </b> <i className="bi bi-currency-rupee"></i>
                        {data.price}
                      </small>
                    </div>
                    <hr />
                    <p className="descriptions">
                      <b> Product description:</b>
                      <br />
                      <small>{data.description}</small>
                    </p>
                    <p className="descriptions mb-2">
                      <b> Product Features:</b>
                    </p>
                    <div className="container text-container mb-2">
                      <div className="container text-center">
                        <div className="row row-cols-3">
                          {data.features.map((dataItem, index) => (<p key={index} className="title ms-5 mb-1">
                              <strong>{dataItem.title}</strong>:{" "}
                              {dataItem.value}
                            </p>))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
    </>);
}
exports.default = ProductDetails;
