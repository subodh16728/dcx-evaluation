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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const apiService_1 = require("../services/apiService");
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
function EditProduct() {
    const { productId } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    // State variables
    const [product, setProduct] = (0, react_1.useState)({});
    const [updatedProduct, setUpdatedProduct] = (0, react_1.useState)({});
    const [categories, setCategories] = (0, react_1.useState)([
        "men's clothing",
        "jewelry",
        "electronics",
        "women's clothing"
    ]);
    const [features, setFeatures] = (0, react_1.useState)([]);
    // Fetch product details when component mounts
    (0, react_1.useEffect)(() => {
        const fetchProductDetails = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchedProduct = yield (0, apiService_1.getProductById)(productId);
                setProduct(fetchedProduct);
                setUpdatedProduct(Object.assign({}, fetchedProduct));
                setFeatures(fetchedProduct.features || []);
            }
            catch (error) {
                console.error('Error fetching product details:', error);
            }
        });
        fetchProductDetails();
    }, [productId]);
    // Handle changes in input fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedProduct((prevProduct) => (Object.assign(Object.assign({}, prevProduct), { [name]: value })));
    };
    // Handle changes in feature fields
    const handleFeatureChange = (index, field, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index][field] = value;
        setFeatures(updatedFeatures);
    };
    // Add a new feature
    const addFeature = () => {
        setFeatures([...features, { title: '', value: '' }]);
    };
    const removeFeature = (index) => {
        const updatedFeatures = [...features];
        updatedFeatures.splice(index, 1);
        setFeatures(updatedFeatures);
    };
    const handleFormSubmit = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const updatedData = Object.assign(Object.assign({}, updatedProduct), { features });
            yield (0, apiService_1.putProduct)(productId, updatedData);
            react_toastify_1.toast.success('Product updated successfully');
            navigate('/dashboard');
        }
        catch (error) {
            console.error('Error updating product:', error);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Edit Product" }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleFormSubmit }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3 row" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "name", className: "col-sm-2 col-form-label" }, { children: "Title" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "col-sm-10" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "text", name: "name", value: updatedProduct.name || '', onChange: handleInputChange, className: "form-control" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3 row" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "description", className: "col-sm-2 col-form-label" }, { children: "Description" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "col-sm-10" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "text", name: "description", value: updatedProduct.description || '', onChange: handleInputChange, className: "form-control" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3 row" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "category", className: "col-sm-2 col-form-label" }, { children: "Category" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "col-sm-10" }, { children: (0, jsx_runtime_1.jsx)("select", Object.assign({ name: "category", value: updatedProduct.category || '', onChange: handleInputChange, className: "form-select" }, { children: categories.map((category, index) => ((0, jsx_runtime_1.jsx)("option", Object.assign({ value: category }, { children: category }), index))) })) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3 row" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "price", className: "col-sm-2 col-form-label" }, { children: "Price" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "col-sm-10" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "text", name: "price", value: updatedProduct.price || '', onChange: handleInputChange, className: "form-control" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-outline-primary me-2", onClick: addFeature }, { children: "Add Feature" })), features.map((feature, index) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-2 row" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "col-sm-5" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "text", value: feature.title || '', onChange: (e) => handleFeatureChange(index, 'title', e.target.value), className: "form-control me-2" }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "col-sm-5" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "text", value: feature.value || '', onChange: (e) => handleFeatureChange(index, 'value', e.target.value), className: "form-control me-2" }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "col-sm-2" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-danger", onClick: () => removeFeature(index) }, { children: (0, jsx_runtime_1.jsx)("i", { className: "bi bi-trash3" }) })) }))] }), index)))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "btn btn-success" }, { children: "Update" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-secondary", onClick: () => navigate("/dashboard") }, { children: "Cancel" }))] }))] }))] })));
}
exports.default = EditProduct;
