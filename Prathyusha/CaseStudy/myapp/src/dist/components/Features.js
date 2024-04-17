"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// import React, { MouseEventHandler } from 'react';
require("bootstrap-icons/font/bootstrap-icons.css");
function FeatureForm({ index, title, value, onChange, removeFeature }) {
    const handleChange = (field, e) => {
        onChange(field, e.target.value);
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "row mb-3" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: `title-${index}` }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "Title" }) })), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Enter Feature Title", id: `title-${index}`, value: title, onChange: (e) => handleChange('title', e), className: "form-control rounded-0", required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: `value-${index}` }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "Value" }) })), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Enter Feature Value", id: `value-${index}`, value: value, onChange: (e) => handleChange('value', e), className: "form-control rounded-0", required: true })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "col align-self-end" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "btn btn-danger", onClick: (e) => removeFeature(index) }, { children: (0, jsx_runtime_1.jsx)("i", { className: "bi bi-trash3" }) })) }))] }), index));
}
exports.default = FeatureForm;
