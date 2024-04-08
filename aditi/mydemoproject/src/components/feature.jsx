
import "../css/features.css"
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const Features = ({ data, index, onChange, onDelete }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(index, name, value);
  };

  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <>
      <div className="container text-container mb-2">
        <div class="container text-center">
          <div class="row row-cols-3">
            <div class="col-5">
              <label htmlFor="title">
                <b>Title:</b>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div class="col-5 ms-2">
              <label htmlFor="value">
                <b>Value:</b>
              </label>
              <input
                type="text"
                id="value"
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
                <i
                className="trash bi bi-trash3"
                onClick={handleDelete}
              ></i>
                </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
