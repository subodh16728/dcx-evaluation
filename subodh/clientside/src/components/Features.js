"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
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
    return (<>
            <div className="container mb-3">
                <div className="row">
                    <div className="col-sm">
                        <div className="form-group">
                            <label htmlFor="title" className='mb-1'>Title</label>
                            <input type="text" className="form-control" id="title" name='title' value={data.title} onChange={handleFeatureChange} placeholder="Enter title" required/>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form-group">
                            <label htmlFor="value" className='mb-1'>Value</label>
                            <input type="text" className="form-control" id="value" name='value' value={data.value} onChange={handleFeatureChange} placeholder="Enter value" required/>
                        </div>
                    </div>
                    <div>
                        <OverlayTrigger_1.default overlay={(props) => (<Tooltip_1.default {...props}>
                                    Delete feature
                                </Tooltip_1.default>)} placement='top'><i className="bi bi-trash3-fill icon" data-toggle='tooltip' onClick={handleDelete}></i>
                        </OverlayTrigger_1.default>
                    </div>
                </div>
            </div>
        </>);
};
exports.default = Features;
