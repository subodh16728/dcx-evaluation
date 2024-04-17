"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
const react_redux_1 = require("react-redux");
function Nav() {
    const navigate = (0, react_router_dom_2.useNavigate)();
    let token = localStorage.getItem("token");
    const handleLogOut = () => {
        localStorage.clear();
        react_toastify_1.toast.success("You have been logged out.", { autoClose: 1000 });
        navigate("/");
    };
    const data = (0, react_redux_1.useSelector)((state) => state.api.data);
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <b className="navbar-brand ms-2">
          <i className="bi bi-shop-window"></i>
        </b>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <react_router_dom_1.NavLink className="nav-link active" aria-current="page" to="/">
                Products
              </react_router_dom_1.NavLink>
            </li>
            <li className="nav-item">
              <react_router_dom_1.NavLink className="nav-link active" aria-current="page" to="/product/add">
                Add Product
              </react_router_dom_1.NavLink>
            </li>
            <li className="nav-item">
              <react_router_dom_1.NavLink className="nav-link active" aria-current="page" to="/product/offer">
                Offers
              </react_router_dom_1.NavLink>
            </li>
            <li className="nav-item">
              <react_router_dom_1.NavLink className="nav-link active" aria-current="page" to="/product/wishlist">
                Wishlist
              </react_router_dom_1.NavLink>
            </li>
          </ul>
          <div className="navbar-text me-3">
            {token && data && data.username ? (<>
                <react_router_dom_1.NavLink className="nav-link">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </react_router_dom_1.NavLink>
                <b><span className="text-white">Welcome {data.username}!</span></b>
              </>) : (<b><span className="text-white">Welcome Guest!</span></b>)}
          </div>
          <div>
            {token ? (<button className="btn btn primary btn-sm  btn-outline-light" onClick={handleLogOut}>
                Logout
              </button>) : (<react_router_dom_1.NavLink to="/signin">
                <button className="btn btn primary btn-sm  btn-outline-light">
                  Login
                </button>
              </react_router_dom_1.NavLink>)}
          </div>
        </div>
      </div>
    </nav>);
}
exports.default = Nav;
