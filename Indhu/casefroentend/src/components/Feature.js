"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// FeatureForm.js
const react_1 = __importDefault(require("react"));
function FeatureForm({ index, title, value, onChange, removeFeature }) {
    const handleChange = (field, e) => {
        onChange(field, e.target.value);
    };
    return (<div className="row mb-3" key={index}>
            <div className="col">
                <label htmlFor="title"><strong>Title</strong></label>
                <input type="text" required placeholder="Enter Feature Title" id="title" value={title} onChange={(e) => handleChange('title', e)} className="form-control rounded-0"/>
            </div>
            <div className="col">
                <label htmlFor="value"><strong>Value</strong></label>
                <input type="text" required placeholder="Enter Feature Value" id="value" value={value} onChange={(e) => handleChange('value', e)} className="form-control rounded-0"/>
            </div>
            <div className="col align-self-end">
                <button type="button" className="btn btn-danger" onClick={removeFeature}><i className="bi bi-trash3"></i></button>
            </div>
        </div>);
}
exports.default = FeatureForm;
