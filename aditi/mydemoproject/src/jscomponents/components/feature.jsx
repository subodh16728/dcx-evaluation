"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../css/features.css");
const Tooltip_1 = __importDefault(require("react-bootstrap/Tooltip"));
const OverlayTrigger_1 = __importDefault(require("react-bootstrap/OverlayTrigger"));
const Features = ({ data, index, onChange, onDelete }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        onChange(index, name, value);
    };
    const handleDelete = () => {
        onDelete(index);
    };
    return (<>
      <div className="container text-container mb-2">
        <div className="container text-center">
          <div className="row row-cols-3">
            <div className="col-5">
              <label htmlFor="title">
                <b>Title:</b>
              </label>
              <input type="text" id="title" name="title" value={data.title} onChange={handleChange} className="form-control" required/>
            </div>
            <div className="col-5 ms-2">
              <label htmlFor="value">
                <b>Value:</b>
              </label>
              <input type="text" id="value" name="value" value={data.value} onChange={handleChange} className="form-control" required/>
            </div>
            <div className="col-1 mt-4">
            <OverlayTrigger_1.default overlay={(props) => (<Tooltip_1.default {...props}>Delete this feature here!</Tooltip_1.default>)} placement="top">
                <i className="trash bi bi-trash3" onClick={handleDelete}></i>
                </OverlayTrigger_1.default>
            </div>
          </div>
        </div>
      </div>
    </>);
};
exports.default = Features;
