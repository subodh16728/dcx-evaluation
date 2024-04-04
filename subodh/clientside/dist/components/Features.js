"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../App.css");
require("bootstrap/dist/css/bootstrap.css");
const Tooltip_1 = __importDefault(require("react-bootstrap/Tooltip"));
const OverlayTrigger_1 = __importDefault(require("react-bootstrap/OverlayTrigger"));
const Features = ({ data, index, onChange, onDelete }) => {
    const handleFeatureChange = (e) => {
        const { name, value } = e.target;
        onChange(index, name, value);
    };
    const handleDelete = () => {
        onDelete(index);
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "container mb-3" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "row" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "col-sm" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-group" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "title", className: 'mb-1' }, { children: "Title" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "title", name: 'title', value: data.title, onChange: handleFeatureChange, placeholder: "Enter title", required: true })] })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "col-sm" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-group" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "value", className: 'mb-1' }, { children: "Value" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "value", name: 'value', value: data.value, onChange: handleFeatureChange, placeholder: "Enter value", required: true })] })) })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(OverlayTrigger_1.default, Object.assign({ overlay: (props) => ((0, jsx_runtime_1.jsx)(Tooltip_1.default, Object.assign({}, props, { children: "Delete feature" }))), placement: 'top' }, { children: (0, jsx_runtime_1.jsx)("i", { className: "bi bi-trash3-fill icon", "data-toggle": 'tooltip', onClick: handleDelete }) })) })] })) })) }));
};
exports.default = Features;
