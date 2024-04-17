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
const apiService_1 = require("../services/apiService"); // Import the API function to fetch a single product
const ProductDetails = () => {
    const { productId } = (0, react_router_dom_1.useParams)(); // Get the productId from the URL params
    const [product, setProduct] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchProduct = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const receivedProduct = yield (0, apiService_1.getProductById)(productId); // Fetch the product details using the productId
                setProduct(receivedProduct);
            }
            catch (error) {
                console.error('Error fetching product:', error);
            }
        });
        fetchProduct();
    }, [productId]);
    return (<div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      {product && (<div className="card" style={{ width: '400px', minHeight: '400px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <h3 className="card-title mb-4">{product.name}</h3>
            <p className="card-text mb-2"><strong>Description:</strong> {product.description}</p>
            <p className="card-text mb-2"><strong>Category:</strong> {product.category}</p>
            <p className="card-text mb-2"><strong>Price:</strong> {product.price}</p>
            <p className='card-text mb-2'><strong>Features:</strong>{product.features && product.features.length > 0 && (<div className="descriptions">
                
                  {product.features.map((feature, index) => (<p key={index}>
                      {feature.title}: {feature.value}
                    </p>))}
              
              </div>)}</p>
            
          </div>
        </div>)}
    </div>);
};
exports.default = ProductDetails;
