// // import React, { MouseEventHandler } from 'react';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { FeatureForms } from '../utils/model';

// function FeatureForm({ index, title, value, onChange, removeFeature }: FeatureForms) {
//     const handleChange = (field: any, e: any) => {
//         onChange(field, e.target.value);
//     };

//     return (
//         <div className="row mb-3" key={index}>
//             <div className="col">
//                 <label htmlFor={`title-${index}`}><strong>Title</strong></label>
//                 <input type="text" placeholder="Enter Feature Title" id={`title-${index}`} value={title} onChange={(e) => handleChange('title', e)} className="form-control rounded-0" required />
//             </div>
//             <div className="col">
//                 <label htmlFor={`value-${index}`}><strong>Value</strong></label>
//                 <input type="text" placeholder="Enter Feature Value" id={`value-${index}`} value={value} onChange={(e) => handleChange('value', e)} className="form-control rounded-0" required />
//             </div>
//             <div className="col align-self-end">
//                 <button type="button" className="btn btn-danger" onClick={(e) => removeFeature(index)}><i className="bi bi-trash3"></i></button>
//             </div>
//         </div>
//     );
// }

// export default FeatureForm;



import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Feature } from "../utils/model";

interface Props {
  data: Feature;
  index: number;
  onChange: (index: number, name: string, value: string) => void;
  onDelete: (index: number) => void;
}

const Features: React.FC<Props> = ({ data, index, onChange, onDelete }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange(index, name, value);
  };

  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <div className="container text-container mb-2">
      <div className="container text-center">
        <div className="row row-cols-3">
          <div className="col-5">
            <label htmlFor={`title${index}`}>
              <b>Title:</b>
            </label>
            <input
              type="text"
              id={`title${index}`}
              name="title"
              value={data.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-5 ms-2">
            <label htmlFor={`value${index}`}>
              <b>Value:</b>
            </label>
            <input
              type="text"
              id={`value${index}`}
              name="value"
              value={data.value}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-1 mt-4">
            <OverlayTrigger
              overlay={(props) => (
                <Tooltip {...props}>Delete this feature here!</Tooltip>
              )}
              placement="top"
            >
              <i className="trash bi bi-trash3" onClick={handleDelete}></i>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
