import React from 'react'
import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const Features = ({ data, index, onChange, onDelete }) => {

    const handleFeatureChange = (e) => {
        const { name, value } = e.target;
        onChange(index, name, value)
    }

    const handleDelete = () => {
        onDelete(index);
    };

    return (
        <>
            <div className="container mb-3">
                <div className="row">
                    <div className="col-sm">
                        <div className="form-group">
                            <label htmlFor="title" className='mb-1'>Title</label>
                            <input type="text" className="form-control" id="title" name='title' value={data.title} onChange={handleFeatureChange} placeholder="Enter title" required />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form-group">
                            <label htmlFor="value" className='mb-1'>Value</label>
                            <input type="text" className="form-control" id="value" name='value' value={data.value} onChange={handleFeatureChange} placeholder="Enter value" required />
                        </div>
                    </div>
                    <div>
                        <OverlayTrigger
                            overlay={(props) => (
                                <Tooltip {...props}>
                                    Delete feature
                                </Tooltip>
                            )}
                            placement='top'
                        ><i className="bi bi-trash3-fill icon" data-toggle='tooltip' onClick={handleDelete}></i>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Features